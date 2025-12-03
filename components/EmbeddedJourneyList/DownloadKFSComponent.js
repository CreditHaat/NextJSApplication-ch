// const KycSummaryPage = () => {
//     const cur = (value) => `₹${Number(value || 0).toLocaleString("en-IN")}`;

//     // ✅ Replace with your actual logo URL (or Base64 if you want offline support)
//     const companyLogo =
//         "https://lowscore.club/logo.png"; // Example — change to your logo path

//     const handleDownloadKYC2 = () => {
//         const doc = new jsPDF();

//         // Add logo
//         const imgWidth = 40;
//         const imgHeight = 15;
//         // doc.addImage(companyLogo, "PNG", 15, 10, imgWidth, imgHeight);

//         // Add header
//         doc.setFontSize(16);
//         doc.text("KFS(Key Fact Sheet) Report", 105, 25, { align: "center" });

//         // Add table content
//         doc.setFontSize(12);
//         autoTable(doc, {
//             startY: 40,
//             theme: "striped",
//             head: [["Field", "Details"]],
//             body: [
//                 ["Lender", kfsLender || "-"],
//                 // ["Loan ID", "987654321"],
//                 ["Principal Amount", kfsPrincipalAmount],
//                 ["Disbursal Amount", kfsDisbursalAmount],
//                 ["Processing Fee", kfsPFAmt],
//                 ["Rate of Interest", kfsROI],
//                 ["Tenure", kfsTenure],
//                 ["EMI Amount", kfsEmiAmount],
//                 // ["Total Payable", cur({kfs})],
//                 ["PF with GST + Stamp Duty", kfsPFAmt],
//                 // ["Insurance with GST", "Included"],
//                 // ["Late Payment Charges", "₹500 per EMI"],
//                 // ["Foreclosure Charges", "2% of balance"],
//             ],
//         });

//         // Add footer (signature + timestamp)
//         const pageHeight = doc.internal.pageSize.height;
//         doc.text("Authorized Signatory", 150, pageHeight - 30);
//         doc.line(130, pageHeight - 35, 190, pageHeight - 35); // Signature line

//         doc.setFontSize(10);
//         doc.text(
//             "Generated on: " + new Date().toLocaleString(),
//             15,
//             pageHeight - 15
//         );
//         doc.text("© CreditHaat Pvt. Ltd.", 150, pageHeight - 15);

//         // Save file
//         doc.save(`KFS_Summary_${mobileNumber || "user"}.pdf`);
//     };


// };

"use client"
import { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const DownloadKFSComponent = ({ productId, mobileNumber }) => {

    const [kfsPrincipalAmount, setKfsPrincipalAmount] = useState();
    const [kfsDisbursalAmount, setKfsDisbursalAmount] = useState();
    const [kfsPFAmt, setKfsPFAmt] = useState();
    const [kfsROI, setKFSROI] = useState();
    const [kfsTenure, setKfsTenure] = useState();
    const [kfsEmiAmount, setKfsEmiAmount] = useState();
    const [kfsFinalPF, setKfsFinalPF] = useState();
    const [kfsInsuranceWithGST, setKfsInsuranceWithGST] = useState();
    const [kfsTotalCharges, setKfsTotalCharges] = useState();

    const generateKFS = async () => {
        try {

            // if(productId === 228265178 || productId === 519){ //for production
            if (productId === 519) { //for uat
                const formData = new FormData();
                formData.append("mobileNumber", mobileNumber);
                // const response = await axios.post("https://uat.credithaat.in/api/getUserDetails", formData);
                const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}api/getUserDetails`, formData);
                if (response.status === 200) {

                    if (productId === 519) { //this 519 is for fibe (EarlySalary) 

                        //criteria for fibe
                        if (response.data.salary > 30000 && (response.data?.creditprofile > 750 && response.data?.creditprofile !== 1000)) {
                            const principal = response.data.salary * 5;
                            setKfsPrincipalAmount(principal); //5x of salary
                            setKfsTenure("24 EMI");
                            setKFSROI("24%");
                            //here calculate the pf from 3.5 % of principal amount
                            const pf = principal * 0.035;
                            // Format PF in rupees with commas
                            const formattedPF = `₹${pf.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
                            setKfsPFAmt(pf); // store calculated PF amount



                            // Calculate EMI
                            const annualInterestRate = 24; // 24% annual
                            const monthlyInterestRate = annualInterestRate / 12 / 100; // 24% ÷ 12 ÷ 100
                            const tenureMonths = 24; // 24 months

                            const emi =
                                (principal *
                                    monthlyInterestRate *
                                    Math.pow(1 + monthlyInterestRate, tenureMonths)) /
                                (Math.pow(1 + monthlyInterestRate, tenureMonths) - 1);

                            setKfsEmiAmount(`₹${emi.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`);

                            // PF with GST (18%) and Stamp Duty (₹100)
                            const pfWithGSTAndStamp = Math.round(pf * 1.18) + 100;
                            setKfsFinalPF(`₹${pfWithGSTAndStamp.toLocaleString("en-IN")}`);

                            setKfsFinalPF(pfWithGSTAndStamp);

                            // const disbursalAmt = principal - pfWithGSTAndStamp; //we will need to calculate it using the finalPf amount but now we are just calculating it using pf
                            // setKfsDisbursalAmount(disbursalAmt);

                            // Insurance with GST (0.75% * 1.18)
                            const insuranceWithGST = principal * 0.0075 * 1.18;
                            setKfsInsuranceWithGST(`₹${insuranceWithGST.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`);

                            const totaldisbursalamt = insuranceWithGST + pfWithGSTAndStamp;
                            const disbursalAmt = principal - totaldisbursalamt;
                            setKfsDisbursalAmount(disbursalAmt);

                            setKfsTotalCharges("");

                            handleDownloadKYC(principal, "9 EMI", pfWithGSTAndStamp, insuranceWithGST, `₹${emi.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`);

                        } else if (response.data.salary > 22500 && response.data.creditprofile > 750) {
                            const principal = response.data.salary * 3.5;
                            setKfsPrincipalAmount(principal); //5x of salary
                            setKfsTenure("12 EMI");
                            setKFSROI("27%");
                            //here calculate the pf from 4 % of principal amount
                            const pf = principal * 0.04;
                            // Format PF in rupees with commas
                            const formattedPF = `₹${pf.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
                            setKfsPFAmt(pf); // store calculated PF amount

                            // const disbursalAmt = principal - pf; //we will need to calculate it using the finalPf amount but now we are just calculating it using pf
                            // setKfsDisbursalAmount(disbursalAmt);

                            // Calculate EMI
                            const annualInterestRate = 27; // 24% annual
                            const monthlyInterestRate = annualInterestRate / 12 / 100; // 24% ÷ 12 ÷ 100
                            const tenureMonths = 12; // 24 months

                            const emi =
                                (principal *
                                    monthlyInterestRate *
                                    Math.pow(1 + monthlyInterestRate, tenureMonths)) /
                                (Math.pow(1 + monthlyInterestRate, tenureMonths) - 1);

                            setKfsEmiAmount(`₹${emi.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`);


                            // PF with GST (18%) and Stamp Duty (₹100)
                            const pfWithGSTAndStamp = Math.round(pf * 1.18) + 100;
                            setKfsFinalPF(`₹${pfWithGSTAndStamp.toLocaleString("en-IN")}`);

                            setKfsFinalPF(pfWithGSTAndStamp);

                            // const disbursalAmt = principal - pfWithGSTAndStamp; //we will need to calculate it using the finalPf amount but now we are just calculating it using pf
                            // setKfsDisbursalAmount(disbursalAmt);

                            // Insurance with GST (0.75% * 1.18)
                            const insuranceWithGST = principal * 0.0075 * 1.18;
                            setKfsInsuranceWithGST(`₹${insuranceWithGST.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`);

                            const totaldisbursalamt = insuranceWithGST + pfWithGSTAndStamp;
                            const disbursalAmt = principal - totaldisbursalamt;
                            setKfsDisbursalAmount(disbursalAmt);

                            // setKfsFinalPF("");
                            // setKfsInsuranceWithGST("");
                            setKfsTotalCharges("");

                            handleDownloadKYC(principal, "9 EMI", pfWithGSTAndStamp, insuranceWithGST, `₹${emi.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`);

                        } else if (response.data.salary > 20000 && response.data.creditprofile > 700) {
                            const principal = response.data.salary * 2;
                            setKfsPrincipalAmount(principal); //5x of salary
                            setKfsTenure("9 EMI");
                            setKFSROI("30%");
                            //here calculate the pf from 4 % of principal amount
                            const pf = principal * 0.04;
                            // Format PF in rupees with commas
                            const formattedPF = `₹${pf.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
                            setKfsPFAmt(pf); // store calculated PF amount

                            // const disbursalAmt = principal - pf; //we will need to calculate it using the finalPf amount but now we are just calculating it using pf
                            // setKfsDisbursalAmount(disbursalAmt);

                            // Calculate EMI
                            const annualInterestRate = 30; // 24% annual
                            const monthlyInterestRate = annualInterestRate / 12 / 100; // 24% ÷ 12 ÷ 100
                            const tenureMonths = 9; // 24 months

                            const emi =
                                (principal *
                                    monthlyInterestRate *
                                    Math.pow(1 + monthlyInterestRate, tenureMonths)) /
                                (Math.pow(1 + monthlyInterestRate, tenureMonths) - 1);

                            setKfsEmiAmount(`₹${emi.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`);

                            // PF with GST (18%) and Stamp Duty (₹100)
                            const pfWithGSTAndStamp = Math.round(pf * 1.18) + 100;
                            setKfsFinalPF(`₹${pfWithGSTAndStamp.toLocaleString("en-IN")}`);

                            setKfsFinalPF(pfWithGSTAndStamp);

                            // const disbursalAmt = principal - pfWithGSTAndStamp; //we will need to calculate it using the finalPf amount but now we are just calculating it using pf
                            // setKfsDisbursalAmount(disbursalAmt);
                            // Insurance with GST (0.75% * 1.18)
                            const insuranceWithGST = principal * 0.0075 * 1.18;
                            setKfsInsuranceWithGST(`₹${insuranceWithGST.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`);

                            const totaldisbursalamt = insuranceWithGST + pfWithGSTAndStamp;
                            const disbursalAmt = principal - totaldisbursalamt;
                            setKfsDisbursalAmount(disbursalAmt);

                            // setKfsFinalPF("");
                            // setKfsInsuranceWithGST("");
                            setKfsTotalCharges("");

                            handleDownloadKYC(principal, "9 EMI", pfWithGSTAndStamp, insuranceWithGST, `₹${emi.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`);

                        }
                    }
                }
            } else {
                console.log("Data not compatable to download kfs sheet");
            }

        } catch (error) {
            console.log("the error while generating the kfs is : ", error);
        }
    }

    const handleDownloadKYC = (kfsPrincipalAmount, kfsTenure, kfsFinalPF, kfsInsuranceWithGST, kfsEMIAmount) => {

        const doc = new jsPDF("p", "mm", "a4");
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 10;

        // ==================== PAGE 1 ====================
        // Company Header
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("Fibe", margin, 12);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(7);
        doc.text("EarlySalary Services Private Limited", margin, 17);
        doc.text("Unit no. 404, The Chambers, Viman Nagar, Pune-411014", margin, 20);
        doc.text("Maharashtra, India", margin, 23);
        doc.text("CIN: U67120PN1994PTC134868", margin, 26);
        doc.text("Email: care@earlysalary.com", margin, 29);
        doc.text("Contact no.: 020-67639797", margin, 32);
        doc.text("Website: www.earlysalary.in", margin, 35);

        // Date & Validity
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        const currentDate = new Date().toLocaleDateString('en-GB');
        doc.text(`Date: - ${currentDate}`, margin, 42);
        doc.text("Validity: 5 days.", margin, 47);

        // Annex A Title
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.text("Annex A", pageWidth / 2, 55, { align: "center" });
        doc.setFontSize(9);
        doc.text("Key Fact statement", pageWidth / 2, 60, { align: "center" });
        doc.setFontSize(8);
        doc.text("Part 1 (Interest rate and fees/charges)", pageWidth / 2, 65, { align: "center" });

        // Main Table Page 1
        autoTable(doc, {
            startY: 70,
            head: [],
            body: [
                ['1', 'Loan proposal/ account No.', '', '{{{loan_account_no}}}', 'Type of Loan', 'Unsecured Personal\nLoan'],
                ['2', 'Sanctioned Loan amount (in Rupees)', '', `${kfsPrincipalAmount ? '₹' + kfsPrincipalAmount.toLocaleString("en-IN") : ''}`, '', ''],
                [{ content: '3', rowSpan: 2 }, { content: 'Disbursal schedule', rowSpan: 2, colSpan: 2 }, '(i) Disbursement in stages or 100% upfront.\n(ii) If it is stage wise, mention the clause of loan\nagreement having relevant details', '', '100% Upfront'],
                ['', '', '', ''],
                ['4', 'Loan tenure (year/months/days)', '', `${kfsTenure} months`, '', ''],
                [{ content: '5', rowSpan: 6 }, { content: 'Instalment details', colSpan: 5 }],
                ['Type of instalments', '', 'Number of\nEPIs', 'EPI (₹)', 'Commencement of\nrepayment, post disbursement', ''],
                ['Monthly', '', `${kfsTenure}`, `${kfsEMIAmount}`, '{{{start_emi_date}}}', ''],
                [{ content: '6', rowSpan: 3 }, { content: '(i)', rowSpan: 2 }, { content: 'Interest Rate (Interest will be applied on a reducing\nbalance basis) *\n\n* The aforesaid Interest Rate will also be charged on\nUnpaid EMI (i.e., on overdue Principal & Interest) till the\nUnpaid EMI is paid in full.', rowSpan: 2, colSpan: 2 }, '(i) {{{interest_rate}}}\np.a.', '', ''],
                ['(ii) Fixed', '', ''],
                ['(ii)', 'Interest Type (fixed or floating or hybrid)', '', '', ''],
                [{ content: '7', rowSpan: 3 }, { content: 'Additional Information in case of Floating rate of interest: Not Applicable', colSpan: 5 }],
                ['Reference\nBenchmark', 'Benchmark\nrate (%) (B)', 'Spread (%) (S)', 'Final rate\n(%) R =\n(B) + (S)', 'Reset periodicity\n(Months)', 'Impact of change\nin the reference\nbenchmark\n\nFor 25 bps change in\n\'R\', change m:'],
                ['', '', '', '', { content: 'B', colSpan: 0 }, 'S', 'EPI (₹)', 'No. of\nEPIs'],
                ['NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA', 'NA'],
            ],
            theme: 'grid',
            styles: {
                fontSize: 6,
                cellPadding: 1.5,
                lineColor: [0, 0, 0],
                lineWidth: 0.1,
                valign: 'middle',
                halign: 'left',
            },
            columnStyles: {
                0: { cellWidth: 8, halign: 'center' },
                1: { cellWidth: 38 },
                2: { cellWidth: 25 },
                3: { cellWidth: 28 },
                4: { cellWidth: 28 },
                5: { cellWidth: 30 },
            },
        });

        doc.setFontSize(7);
        doc.text("Page 1 of 7", pageWidth - margin - 15, pageHeight - 8);

        // ==================== PAGE 2 ====================
        doc.addPage();

        // Company Header Page 2
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("Fibe", margin, 12);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7);
        doc.text("EarlySalary Services Private Limited", margin, 17);
        doc.text("Unit no. 404, The Chambers, Viman Nagar, Pune-411014", margin, 20);
        doc.text("Maharashtra, India", margin, 23);
        doc.text("CIN: U67120PN1994PTC134868", margin, 26);
        doc.text("Email: care@earlysalary.com", margin, 29);
        doc.text("Contact no.: 020-67639797", margin, 32);
        doc.text("Website: www.earlysalary.in", margin, 35);

        // Page 2 Table
        autoTable(doc, {
            startY: 42,
            head: [],
            body: [
                [{ content: '8', rowSpan: 9 }, { content: 'Fee/ Charges', colSpan: 5 }],
                [{ content: '' }, { content: 'Payable to the RE (A)', colSpan: 2 }, { content: 'Payable to a third party through RE (B)', colSpan: 2 }],

                ['One-time/\nRecurring', 'Amount (in ₹) or\nPercentage\n(%) as applicable', 'One\ntime/Re\ncurring', 'Amount (in ₹) or\nPercentage (%) as\napplicable'],
                ['(i)', 'Processing fees', 'One Time', `${kfsFinalPF}`, 'NA', 'NA'],
                ['(ii)', 'Insurance charges', 'NA', `${kfsInsuranceWithGST}`, 'One Time', `${kfsInsuranceWithGST}`],
                ['(iii)', 'Valuation fees', '-', '-', 'NA', 'NA'],
                ['(iv)', 'Any other (please specify)', '-', '-', 'NA', 'NA'],
                ['(iv) a)', 'GST', 'One Time', "18%", 'NA', 'NA'],
                ['(iv) b)', 'Stamp Duty', 'One Time', '{{{stamp_duty}}}', 'NA', 'NA'],
                [{ content: '9', rowSpan: 1 }, { content: 'Annual Percentage Rate (APR) (%)', colSpan: 5 }],
                [{ content: '', colSpan: 6 }, { content: '{{{annual_percentage_rate}}}', colSpan: 1 }],
                [{ content: '10', rowSpan: 7 }, { content: 'Details of Contingent Charges (in ₹ or %, as applicable)', colSpan: 5 }],
                ['(i)', { content: 'Penal charges, if any, in case of delayed payment including on unpaid EMI (On overdue Principal & Interest)', colSpan: 2 }, { content: 'Nill', colSpan: 2 }],
                ['(ii)', { content: 'NACH registration failure charges', colSpan: 2 }, { content: 'INR 250+GST\n\n(These charges are applicable only if the registration failure is on account of any reasons directly attributable to customer\'s error. If the registration failure is not due to customer\'s fault, then no charges are applied.)', colSpan: 2 }],
                ['(iii)', { content: 'Foreclosure charges, if applicable', colSpan: 2 }, { content: 'NA', colSpan: 2 }],
                ['(iv)', { content: 'Charges for switching of loans from floating to fixed rate and vice versa', colSpan: 2 }, { content: 'NA', colSpan: 2 }],
                ['(v)', { content: 'NACH/E-mandate bounce charges', colSpan: 2 }, { content: 'INR 500 per instance', colSpan: 2 }],
                ['(vi)', { content: 'Late Payment charges in case of delayed payment', colSpan: 2 }, { content: 'INR 500.00 or 3% of the overdue EMI amount for every delay in monthly EMI, whichever is higher.', colSpan: 2 }],
            ],
            theme: 'grid',
            styles: {
                fontSize: 6.5,
                cellPadding: 1.5,
                lineColor: [0, 0, 0],
                lineWidth: 0.1,
                valign: 'middle',
            },
            columnStyles: {
                0: { cellWidth: 8, halign: 'center' },
                1: { cellWidth: 45 },
                2: { cellWidth: 20 },
                3: { cellWidth: 30 },
                4: { cellWidth: 20 },
                5: { cellWidth: 35 },
            },
        });

        doc.setFontSize(7);
        doc.text("Page 2 of 7", pageWidth - margin - 15, pageHeight - 8);

        // ==================== PAGE 3 ====================
        doc.addPage();

        // Company Header Page 3
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("Fibe", margin, 12);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7);
        doc.text("EarlySalary Services Private Limited", margin, 17);
        doc.text("Unit no. 404, The Chambers, Viman Nagar, Pune-411014", margin, 20);
        doc.text("Maharashtra, India", margin, 23);
        doc.text("CIN: U67120PN1994PTC134868", margin, 26);
        doc.text("Email: care@earlysalary.com", margin, 29);
        doc.text("Contact no.: 020-67639797", margin, 32);
        doc.text("Website: www.earlysalary.in", margin, 35);

        // Part 2 Title
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.text("Part 2 (Other qualitative information)", pageWidth / 2, 45, { align: "center" });

        // Page 3 Table
        autoTable(doc, {
            startY: 52,
            head: [],
            body: [
                ['1', { content: 'Clause of Loan agreement relating to engagement of recovery agents', colSpan: 1 }, { content: 'Clause No. 11.5', colSpan: 1 }],
                ['2', { content: 'Clause of Loan agreement which details grievance redressal mechanism', colSpan: 1 }, { content: 'Clause No. 13.16', colSpan: 1 }],
                [{ content: '3', rowSpan: 1 }, { content: 'Phone number and email id of the nodal grievance redressal officer', colSpan: 1 }, { content: 'EarlySalary Services Pvt. Ltd.\nMr. Amit Noana (ESPL - GRO)\nAddress: Unit No. 404, The Chambers, Viman Nagar Pune, 411014\nEmail ID: grievance@earlysalary.com\nPhone No.: 02067639797\n\nSocial Worth Technologies Pvt. Ltd.\nMr. Abhiroop Khainnar (GRO)\nAddress: Unit No. 404, Social Worth Technologies Pvt Ltd, The Chambers, Viman Nagar, Pune 411014\nEmail ID: grievance@fibe.in\nPhone No.: 02067639797', colSpan: 1 }],
                ['4', { content: 'Whether the loan is, or in future maybe, subject to transfer to other REs or securitization (Yes/ No)', colSpan: 1 }, { content: 'Yes', colSpan: 1 }],
                [{ content: '5', rowSpan: 2 }, { content: 'In case of lending under collaborative lending arrangements (e.g., co-lending/ outsourcing), following additional details may be furnished:', colSpan: 2 }],
                [{ content: 'Name of the originating RE, along with its funding proportion', colSpan: 1 }, { content: 'Name of the partner RE along with its proportion of funding', colSpan: 1 }, { content: 'Blended rate of interest', colSpan: 1 }],
                [{ content: '', colSpan: 1 }, { content: 'NA', colSpan: 1 }, { content: 'NA', colSpan: 1 }, { content: 'NA', colSpan: 1 }],
            ],
            theme: 'grid',
            styles: {
                fontSize: 7,
                cellPadding: 2,
                lineColor: [0, 0, 0],
                lineWidth: 0.1,
                valign: 'middle',
            },
            columnStyles: {
                0: { cellWidth: 8, halign: 'center' },
                1: { cellWidth: 65 },
                2: { cellWidth: 60 },
                3: { cellWidth: 45 },
            },
        });

        doc.setFontSize(7);
        doc.text("Page 3 of 7", pageWidth - margin - 15, pageHeight - 8);

        // ==================== PAGE 4 ====================
        doc.addPage();

        // Company Header Page 4
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("Fibe", margin, 12);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7);
        doc.text("EarlySalary Services Private Limited", margin, 17);
        doc.text("Unit no. 404, The Chambers, Viman Nagar, Pune-411014", margin, 20);
        doc.text("Maharashtra, India", margin, 23);
        doc.text("CIN: U67120PN1994PTC134868", margin, 26);
        doc.text("Email: care@earlysalary.com", margin, 29);
        doc.text("Contact no.: 020-67639797", margin, 32);
        doc.text("Website: www.earlysalary.in", margin, 35);

        // Page 4 Table
        autoTable(doc, {
            startY: 42,
            head: [],
            body: [
                [{ content: '6', rowSpan: 4 }, { content: 'In case of digital loans, following specific disclosures may be furnished:', colSpan: 2 }],
                ['(i) Cooling off/look-up period, in terms of RE\'s board approved policy, during which borrower shall not be charged any penalty on prepayment of loan', { content: '{{{cooling_off_period}}} days from Disbursement', colSpan: 1 }],
                ['(ii) Details of LSP acting as recovery agent and authorized to approach the borrower', { content: 'https://www.earlysalary.in/our-collection-agencies/', colSpan: 1 }],
                ['(iii) One-time processing fee retained if the customer exits the loan during cooling-off period (if applicable)', { content: 'Proportionate to number of days till repayment.', colSpan: 1 }],
            ],
            theme: 'grid',
            styles: {
                fontSize: 7,
                cellPadding: 2,
                lineColor: [0, 0, 0],
                lineWidth: 0.1,
                valign: 'middle',
            },
            columnStyles: {
                0: { cellWidth: 8, halign: 'center' },
                1: { cellWidth: 95 },
                2: { cellWidth: 75 },
            },
        });

        doc.setFontSize(7);
        doc.text("Page 4 of 7", pageWidth - margin - 15, pageHeight - 8);

        // ==================== PAGE 5 ====================
        doc.addPage();

        // Company Header Page 5
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("Fibe", margin, 12);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7);
        doc.text("EarlySalary Services Private Limited", margin, 17);
        doc.text("Unit no. 404, The Chambers, Viman Nagar, Pune-411014", margin, 20);
        doc.text("Maharashtra, India", margin, 23);
        doc.text("CIN: U67120PN1994PTC134868", margin, 26);
        doc.text("Email: care@earlysalary.com", margin, 29);
        doc.text("Contact no.:020-67639797", margin, 32);
        doc.text("Website: www.earlysalary.in", margin, 35);

        // Annex B Title
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.text("Annex B", pageWidth / 2, 45, { align: "center" });
        doc.setFontSize(9);
        doc.text("Computation of APR for Retail loans", pageWidth / 2, 50, { align: "center" });

        // Page 5 Table - Annex B
        autoTable(doc, {
            startY: 55,
            head: [],
            body: [
                [{ content: 'Sr. No.', halign: 'center' }, { content: 'Parameter', halign: 'center' }, { content: 'Details', halign: 'center' }],
                ['1', 'Sanctioned Loan amount (in Rupees)', `${kfsPrincipalAmount}`],
                ['2', 'Loan Term (months)', `${kfsTenure}`],
                ['a)', 'No. of instalments for payment of principal, in case of non-equated periodic loans', 'NA'],
                [{ content: 'b)', rowSpan: 3 }, 'Type of EPI', 'Monthly'],
                ['Amount of each EPI (in Rupees)', `${kfsEMIAmount}`],
                ['No. of EPIs (e.g., no. of EMIs in case of monthly instalments) (Sr. No. 5 of the KFS template – Part 1)', '{{{loan_tenure}}}'],
                ['c)', 'No. of instalments for payment of capitalized interest, if any', 'NA'],
                ['d)', 'Commencement of repayments, post disbursement', '{{{commencement_of_repayments}}} days'],
                ['3', 'Interest rate type (fixed or floating or hybrid) (Sr. No. 6 of the KFS template – Part 1)', 'Fixed'],
                ['4', 'Rate of Interest', '{{{interest_rate}}} p.a. Fixed'],
                ['5', 'Total Interest Amount to be charged during the entire tenor of the loan as per the rate prevailing on sanction date (in Rupees)', '{{{total_interest_charged}}}'],
                ['6', 'Fee/ Charges payable (in Rupees)', '{{{upfront_charges}}}'],
                ['A', 'Payable to the RE', '{{{Payable_charges}}}'],
                ['B', 'Payable to third-party routed through RE', '{{{insurance_charges}}}'],
                ['7', 'Net disbursed amount (difference of amount between Sr. No. 1 and Sr. No. 6) (in Rupees)', '{{{disbursed_amount}}}'],
                ['8', 'Total amount to be paid by the borrower (sum of Sr. No. 1 and Sr. No. 5) (in Rupees)', '{{{total_amount_to_be_paid}}}'],
            ],
            theme: 'grid',
            styles: {
                fontSize: 7,
                cellPadding: 2,
                lineColor: [0, 0, 0],
                lineWidth: 0.1,
                valign: 'middle',
            },
            columnStyles: {
                0: { cellWidth: 15, halign: 'center' },
                1: { cellWidth: 95 },
                2: { cellWidth: 68 },
            },
        });

        doc.setFontSize(7);
        doc.text("Page 5 of 7", pageWidth - margin - 15, pageHeight - 8);

        // ==================== PAGE 6 ====================
        doc.addPage();

        // Company Header Page 6
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("Fibe", margin, 12);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7);
        doc.text("EarlySalary Services Private Limited", margin, 17);
        doc.text("Unit no. 404, The Chambers, Viman Nagar, Pune-411014", margin, 20);
        doc.text("Maharashtra, India", margin, 23);
        doc.text("CIN: U67120PN1994PTC134868", margin, 26);
        doc.text("Email: care@earlysalary.com", margin, 29);
        doc.text("Contact no.:020-67639797", margin, 32);
        doc.text("Website: www.earlysalary.in", margin, 35);

        // Page 6 Table - Continuation
        autoTable(doc, {
            startY: 42,
            head: [],
            body: [
                ['10', 'Schedule of disbursement as per terms and conditions', 'As mentioned in Sr. No. 3 of the Part 1 of the Key Fact Statement'],
                ['11', 'Due date of payment of instalment and interest', '{{{due_date}}} of every month'],
            ],
            theme: 'grid',
            styles: {
                fontSize: 7,
                cellPadding: 2,
                lineColor: [0, 0, 0],
                lineWidth: 0.1,
                valign: 'middle',
            },
            columnStyles: {
                0: { cellWidth: 15, halign: 'center' },
                1: { cellWidth: 95 },
                2: { cellWidth: 68 },
            },
        });

        doc.setFontSize(7);
        doc.text("Page 6 of 7", pageWidth - margin - 15, pageHeight - 8);

        // ==================== PAGE 7 ====================
        doc.addPage();

        // Company Header Page 7
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("Fibe", margin, 12);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7);
        doc.text("EarlySalary Services Private Limited", margin, 17);
        doc.text("Unit no. 404, The Chambers, Viman Nagar, Pune-411014", margin, 20);
        doc.text("Maharashtra, India", margin, 23);
        doc.text("CIN: U67120PN1994PTC134868", margin, 26);
        doc.text("Email: care@earlysalary.com", margin, 29);
        doc.text("Contact no.:020-67639797", margin, 32);
        doc.text("Website: www.earlysalary.in", margin, 35);

        // Annex C Title
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.text("Annex C", pageWidth / 2, 45, { align: "center" });
        doc.setFontSize(8);
        doc.text("Repayment Schedule under Equated Periodic Instalment for the loan as in Annex B", pageWidth / 2, 50, { align: "center" });
        doc.text("{{{rps_updated}}}", pageWidth / 2, 55, { align: "center" });

        // Note section
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.text("Note:", margin, 65);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(7);
        const noteText1 = "The Repayment Schedule and its figures and calculation are as on {{{disbursedOn_date}}} and may vary based on the applicable date of disbursement.";
        doc.text(noteText1, margin, 72, { maxWidth: pageWidth - 2 * margin });

        const noteText2 = "I confirm that I have thoroughly read and understood the Key Facts Statement";
        doc.text(noteText2, margin, 82);

        doc.text("{{{namePerUtility}}}", margin, 92);

        doc.text("Borrower", margin, 102);

        doc.setFontSize(7);
        doc.text("Page 7 of 7", pageWidth - margin - 15, pageHeight - 8);

        // 💾 Save PDF
        // const lenderName = kfsLender ? kfsLender.replace(/\s+/g, "_") : "KFS";
        const lenderName = "KFS"
        doc.save(`${lenderName}_KFS_${Date.now()}.pdf`);
    };

    return (
        <>
            <a
                style={{
                    color: "#0070f3",
                    textDecoration: "none",
                    fontWeight: "500",
                    fontSize: "15px",
                }} onClick={generateKFS}>
                Download KFS
            </a>
        </>
    )
}

export default DownloadKFSComponent;