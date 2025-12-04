import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
//     import jsPDF from "jspdf";
// import "jspdf-autotable";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { X, Download } from "lucide-react";


const embeddedGetLoanButton = ({ lenderProduct, productsArr, lenderCpi, lenderApplicationLink, lender_id, setLenderProduct, setProductsArr, setLenderCpi, setLenderApplicationLink, setLender_id, lender, isOtpVerified, setIsVisible, mobileNumber, setStgOneHitId, setstgTwoHitId, sett_experian_log_id, getLoanBackend, principalAmount, ROI }) => {

  const [kycPage, setKycPage] = useState(false);
  // store data temporarily for later use after KYC
  const [pendingKycData, setPendingKycData] = useState(null);
  const [kfsLender, setKfsLender] = useState();
  const [kfsPrincipalAmount, setKfsPrincipalAmount] = useState();
  const [kfsDisbursalAmount, setKfsDisbursalAmount] = useState();
  const [kfsPFAmt, setKfsPFAmt] = useState();
  const [kfsROI, setKFSROI] = useState();
  const [kfsTenure, setKfsTenure] = useState();
  const [kfsEmiAmount, setKfsEmiAmount] = useState();
  const [kfsFinalPF, setKfsFinalPF] = useState();
  const [kfsInsuranceWithGST, setKfsInsuranceWithGST] = useState();
  const [kfsTotalCharges, setKfsTotalCharges] = useState();

  const [summary, setSummary] = useState({
    loanAmount: 150000,
    processingFees: 2500,
    netDisbursedAmount: 147500,
    interestRate: 12.5,
    interestPayable: 10000,
    totalPayable: 160000,
    emi: 5000,
    emiTenure: 12,
    numInstallments: 12,
  });

  const [contCharges, setContCharges] = useState({
    closureCharge: "2% of balance",
    latePaymentCharge: "₹500 per EMI",
  });


  // useEffect(()=>{
  //   const localStorage = localStorage.get('isOtpVerified');
  //   if(localStorage){
  //     setIsOtpVerified(localStorage)
  //   }

  // },[])

  // useEffect(()=>{
  //   if(isOtpVerified){
  //     console.log("Inside embedded is otp cerified is t",isOtpVerified);
  //   }else{
  //     console.log("Inside embedded is otp cerified is f",isOtpVerified);
  //   }
  // },[isOtpVerified])

  // const [lenderProduct, setLenderProduct] = useState('');
  // const [lenderCpi, setLenderCpi] = useState('');
  // const [lenderApplicationLink, setLenderApplicationLink] = useState('');
  // const [lender_id, setLender_id] = useState('');
  // const [productsArr, setProductsArr] = useState([]);

  useEffect(() => { //This will be called when the user clicks on the getLoan button 
    if (lenderProduct !== '') {
      handleOTPComponent();
      console.log("Inside Usestate of lender product productsArr ", productsArr);
      console.log("Inside Usestate of lender product lenderProduct ", lenderProduct);
      console.log("Inside Usestate of lender product lenderCpi ", lenderCpi);
      console.log("Inside Usestate of lender product lenderApplicationLink ", lenderApplicationLink);
      console.log("Inside Usestate of lender product lender_id ", lender_id);

    }
  }, [lenderProduct, productsArr, lenderCpi, lenderApplicationLink, lender_id])

  // useEffect(()=>{
  //   console.log("HIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII");
  //   if(lenderProduct !== ''){
  //     handleOTPComponent();
  //   }
  // },[lenderProduct])

  const handleOTPComponent = () => {
    OTPGenerate();

    // setIsVisible(true);

  };


  //this function will generate the kfs according to the user's data
  const generateKFS = async (product, addProductCallback, cpi, applicationLink, productId) => {
    try {

      if(productId === 228265178){ //for production
      // if (productId === 15365588) { //for uat
        setKfsLender(product);
        const formData = new FormData();
        formData.append("mobileNumber", mobileNumber);
        // const response = await axios.post("https://uat.credithaat.in/api/getUserDetails", formData);
        const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}api/getUserDetails`,formData);
        if (response.status === 200) {

          //here we will set kfs details according to the lender
          if (productId === 228265178) { //Id only for uat not for production5

            //this is for Poonawalla Fincorp

            if (response.data.profession === "Salaried" || response.data.profession === "salaried") {
              if (response.data.creditprofile >= 700 && response.data.creditprofile < 720 && (response.data.profession === "Salaried" || response.data.profession === "salaried")) {
                const principal = 443720;
                setKfsPrincipalAmount(443720); //5x of salary
                setKfsTenure("36");
                setKFSROI("14.3%");
                const pf = principal * 0.04;
                // Format PF in rupees with commas
                const formattedPF = `₹${pf.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
                setKfsPFAmt(pf); // store calculated PF amount

                const disbursalAmt = principal - pf; //we will need to calculate it using the finalPf amount but now we are just calculating it using pf
                setKfsDisbursalAmount(disbursalAmt);

                // Calculate EMI
                const annualInterestRate = 14.3; // 24% annual
                const monthlyInterestRate = annualInterestRate / 12 / 100; // 24% ÷ 12 ÷ 100
                const tenureMonths = 36; // 24 months

                const emi =
                  (principal *
                    monthlyInterestRate *
                    Math.pow(1 + monthlyInterestRate, tenureMonths)) /
                  (Math.pow(1 + monthlyInterestRate, tenureMonths) - 1);

                setKfsEmiAmount(`₹${emi.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`);

                // PF with GST (18%) and Stamp Duty (₹100)
                // const pfWithGSTAndStamp = Math.round(pf * 1.18) + 100;
                // setKfsFinalPF(`₹${pfWithGSTAndStamp.toLocaleString("en-IN")}`);

                // setKfsFinalPF(pfWithGSTAndStamp);

                // const disbursalAmt = principal - pfWithGSTAndStamp; //we will need to calculate it using the finalPf amount but now we are just calculating it using pf
                // setKfsDisbursalAmount(disbursalAmt);
                // Insurance with GST (0.75% * 1.18)
                // const insuranceWithGST = principal * 0.0075 * 1.18;
                // setKfsInsuranceWithGST(`₹${insuranceWithGST.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`);

                // const totaldisbursalamt = insuranceWithGST + pfWithGSTAndStamp;
                // const disbursalAmt = principal - totaldisbursalamt;
                // setKfsDisbursalAmount(disbursalAmt);

                //here we wil need to add some values like pf which we didn't got in documents
              } else if (response.data.creditprofile >= 720 && response.data.creditprofile <= 749 && (response.data.profession === "Salaried" || response.data.profession === "salaried")) {
                const principal = 446600;
                setKfsPrincipalAmount(446600); //5x of salary
                setKfsTenure("36");
                setKFSROI("13.5%");

                const pf = principal * 0.04;
                // Format PF in rupees with commas
                const formattedPF = `₹${pf.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
                setKfsPFAmt(pf); // store calculated PF amount

                const disbursalAmt = principal - pf; //we will need to calculate it using the finalPf amount but now we are just calculating it using pf
                setKfsDisbursalAmount(disbursalAmt);

                // Calculate EMI
                const annualInterestRate = 13.5; // 24% annual
                const monthlyInterestRate = annualInterestRate / 12 / 100; // 24% ÷ 12 ÷ 100
                const tenureMonths = 36; // 24 months

                const emi =
                  (principal *
                    monthlyInterestRate *
                    Math.pow(1 + monthlyInterestRate, tenureMonths)) /
                  (Math.pow(1 + monthlyInterestRate, tenureMonths) - 1);

                setKfsEmiAmount(`₹${emi.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`);

                // PF with GST (18%) and Stamp Duty (₹100)
                // const pfWithGSTAndStamp = Math.round(pf * 1.18) + 100;
                // setKfsFinalPF(`₹${pfWithGSTAndStamp.toLocaleString("en-IN")}`);

                // setKfsFinalPF(pfWithGSTAndStamp);

                // const disbursalAmt = principal - pfWithGSTAndStamp; //we will need to calculate it using the finalPf amount but now we are just calculating it using pf
                // setKfsDisbursalAmount(disbursalAmt);

                // Insurance with GST (0.75% * 1.18)
                // const insuranceWithGST = principal * 0.0075 * 1.18;
                // setKfsInsuranceWithGST(`₹${insuranceWithGST.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`);

                // const totaldisbursalamt = insuranceWithGST + pfWithGSTAndStamp;
                // const disbursalAmt = principal - totaldisbursalamt;
                // setKfsDisbursalAmount(disbursalAmt);

                //here we wil need to add some values like pf which we didn't got in documents
              } else if (response.data.creditprofile >= 750 && (response.data.profession === "Salaried" || response.data.profession === "salaried")) {
                const principal = 488000;
                setKfsPrincipalAmount(488000); //5x of salary
                setKfsTenure("36");
                setKFSROI("13.5%");

                const pf = principal * 0.04;
                // Format PF in rupees with commas
                const formattedPF = `₹${pf.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
                setKfsPFAmt(pf); // store calculated PF amount

                const disbursalAmt = principal - pf; //we will need to calculate it using the finalPf amount but now we are just calculating it using pf
                setKfsDisbursalAmount(disbursalAmt);

                // Calculate EMI
                const annualInterestRate = 13.5; // 24% annual
                const monthlyInterestRate = annualInterestRate / 12 / 100; // 24% ÷ 12 ÷ 100
                const tenureMonths = 36; // 24 months

                const emi =
                  (principal *
                    monthlyInterestRate *
                    Math.pow(1 + monthlyInterestRate, tenureMonths)) /
                  (Math.pow(1 + monthlyInterestRate, tenureMonths) - 1);

                setKfsEmiAmount(`₹${emi.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`);

                // PF with GST (18%) and Stamp Duty (₹100)
                // const pfWithGSTAndStamp = Math.round(pf * 1.18) + 100;
                // setKfsFinalPF(`₹${pfWithGSTAndStamp.toLocaleString("en-IN")}`);

                // setKfsFinalPF(pfWithGSTAndStamp);

                // const disbursalAmt = principal - pfWithGSTAndStamp; //we will need to calculate it using the finalPf amount but now we are just calculating it using pf
                // setKfsDisbursalAmount(disbursalAmt);

                // Insurance with GST (0.75% * 1.18)
                // const insuranceWithGST = principal * 0.0075 * 1.18;
                // setKfsInsuranceWithGST(`₹${insuranceWithGST.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`);

                // const totaldisbursalamt = insuranceWithGST + pfWithGSTAndStamp;
                // const disbursalAmt = principal - totaldisbursalamt;
                // setKfsDisbursalAmount(disbursalAmt);

                //here we wil need to add some values like pf which we didn't got in documents
              }
            } else {

              //condition for non salaried
              if (response.data.creditprofile >= 700 && response.data.creditprofile < 720) {
                const principal = 403600;
                setKfsPrincipalAmount(403600); //5x of salary
                setKfsTenure("36");
                setKFSROI("23%");

                const pf = principal * 0.04;
                // Format PF in rupees with commas
                const formattedPF = `₹${pf.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
                setKfsPFAmt(pf); // store calculated PF amount

                const disbursalAmt = principal - pf; //we will need to calculate it using the finalPf amount but now we are just calculating it using pf
                setKfsDisbursalAmount(disbursalAmt);

                // Calculate EMI
                const annualInterestRate = 23; // 24% annual
                const monthlyInterestRate = annualInterestRate / 12 / 100; // 24% ÷ 12 ÷ 100
                const tenureMonths = 36; // 24 months

                const emi =
                  (principal *
                    monthlyInterestRate *
                    Math.pow(1 + monthlyInterestRate, tenureMonths)) /
                  (Math.pow(1 + monthlyInterestRate, tenureMonths) - 1);

                setKfsEmiAmount(`₹${emi.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`);

                // PF with GST (18%) and Stamp Duty (₹100)
                // const pfWithGSTAndStamp = Math.round(pf * 1.18) + 100;
                // setKfsFinalPF(`₹${pfWithGSTAndStamp.toLocaleString("en-IN")}`);

                // setKfsFinalPF(pfWithGSTAndStamp);

                // const disbursalAmt = principal - pfWithGSTAndStamp; //we will need to calculate it using the finalPf amount but now we are just calculating it using pf
                // setKfsDisbursalAmount(disbursalAmt);

                // Insurance with GST (0.75% * 1.18)
                // const insuranceWithGST = principal * 0.0075 * 1.18;
                // setKfsInsuranceWithGST(`₹${insuranceWithGST.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`);

                // const totaldisbursalamt = insuranceWithGST + pfWithGSTAndStamp;
                // const disbursalAmt = principal - totaldisbursalamt;
                // setKfsDisbursalAmount(disbursalAmt);

                //here we wil need to add some values like pf which we didn't got in documents
              } else if (response.data.creditprofile >= 720 && response.data.creditprofile <= 749) {
                const principal = 457800;
                setKfsPrincipalAmount(457800); //5x of salary
                setKfsTenure("36");
                setKFSROI("23%");

                const pf = principal * 0.04;
                // Format PF in rupees with commas
                const formattedPF = `₹${pf.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
                setKfsPFAmt(pf); // store calculated PF amount

                const disbursalAmt = principal - pf; //we will need to calculate it using the finalPf amount but now we are just calculating it using pf
                setKfsDisbursalAmount(disbursalAmt);

                // Calculate EMI
                const annualInterestRate = 23; // 24% annual
                const monthlyInterestRate = annualInterestRate / 12 / 100; // 24% ÷ 12 ÷ 100
                const tenureMonths = 36; // 24 months

                const emi =
                  (principal *
                    monthlyInterestRate *
                    Math.pow(1 + monthlyInterestRate, tenureMonths)) /
                  (Math.pow(1 + monthlyInterestRate, tenureMonths) - 1);

                setKfsEmiAmount(`₹${emi.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`);

                // PF with GST (18%) and Stamp Duty (₹100)
                // const pfWithGSTAndStamp = Math.round(pf * 1.18) + 100;
                // setKfsFinalPF(`₹${pfWithGSTAndStamp.toLocaleString("en-IN")}`);

                // setKfsFinalPF(pfWithGSTAndStamp);

                // const disbursalAmt = principal - pfWithGSTAndStamp; //we will need to calculate it using the finalPf amount but now we are just calculating it using pf
                // setKfsDisbursalAmount(disbursalAmt);

                // Insurance with GST (0.75% * 1.18)
                // const insuranceWithGST = principal * 0.0075 * 1.18;
                // setKfsInsuranceWithGST(`₹${insuranceWithGST.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`);

                // const totaldisbursalamt = insuranceWithGST + pfWithGSTAndStamp;
                // const disbursalAmt = principal - totaldisbursalamt;
                // setKfsDisbursalAmount(disbursalAmt);

                //here we wil need to add some values like pf which we didn't got in documents
              } else if (response.data.creditprofile >= 750) {
                const principal = 465620;
                setKfsPrincipalAmount(465620); //5x of salary
                setKfsTenure("36");
                setKFSROI("23%");

                const pf = principal * 0.04;
                // Format PF in rupees with commas
                const formattedPF = `₹${pf.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
                setKfsPFAmt(pf); // store calculated PF amount

                const disbursalAmt = principal - pf; //we will need to calculate it using the finalPf amount but now we are just calculating it using pf
                setKfsDisbursalAmount(disbursalAmt);

                // Calculate EMI
                const annualInterestRate = 23; // 24% annual
                const monthlyInterestRate = annualInterestRate / 12 / 100; // 24% ÷ 12 ÷ 100
                const tenureMonths = 36; // 24 months

                const emi =
                  (principal *
                    monthlyInterestRate *
                    Math.pow(1 + monthlyInterestRate, tenureMonths)) /
                  (Math.pow(1 + monthlyInterestRate, tenureMonths) - 1);

                setKfsEmiAmount(`₹${emi.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`);

                // PF with GST (18%) and Stamp Duty (₹100)
                // const pfWithGSTAndStamp = Math.round(pf * 1.18) + 100;
                // setKfsFinalPF(`₹${pfWithGSTAndStamp.toLocaleString("en-IN")}`);

                // setKfsFinalPF(pfWithGSTAndStamp);

                // const disbursalAmt = principal - pfWithGSTAndStamp; //we will need to calculate it using the finalPf amount but now we are just calculating it using pf
                // setKfsDisbursalAmount(disbursalAmt);
                // Insurance with GST (0.75% * 1.18)
                // const insuranceWithGST = principal * 0.0075 * 1.18;
                // setKfsInsuranceWithGST(`₹${insuranceWithGST.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`);

                // const totaldisbursalamt = insuranceWithGST + pfWithGSTAndStamp;
                // const disbursalAmt = principal - totaldisbursalamt;
                // setKfsDisbursalAmount(disbursalAmt);

                //here we wil need to add some values like pf which we didn't got in documents
              }

            }

          } else if (productId === 519) { //this 519 is for fibe (EarlySalary) 



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

            }

            // setKfsPrincipalAmount(lender.maxloanamount);
            // setKfsDisbursalAmount();
            // setKfsPFAmt();
            // setKFSROI();
            // setKfsTenure();
            // setKfsEmiAmount();
            // setKfsFinalPF();
            // setKfsInsuranceWithGST();
            // setKfsTotalCharges();
          }

          setKycPage(true);
          setPendingKycData({ product, addProductCallback, cpi, applicationLink, productId });
        }
      } else {
        setLenderProduct(product);
        setProductsArr(addProductCallback);
        setLenderCpi(cpi);
        setLenderApplicationLink(applicationLink);
        setLender_id(productId);
        handleOTPComponent();
      }

    } catch (error) {
      console.log("the error while generating the kfs is : ", error);
    }
  }

  const OTPGenerate = async () => {
    // e.preventDefault();

    const localStatus = localStorage.getItem('verifiedOTP');
    if (localStatus) {
      console.log("localStorage valule is :: ", localStatus);
    }

    if (localStatus === "false") {
      try {
        setIsVisible(true);
        const queryParams = new URLSearchParams(location.search);

        // Retrieve values for the specified parameters
        const channel = queryParams.get('channel') || '';
        const dsa = queryParams.get('dsa') || '';
        const source = queryParams.get('source') || '';
        const subSource = queryParams.get('sub_source') || '';
        const subDsa = queryParams.get('sub_dsa') || '';

        console.log(mobileNumber);
        console.log("Inside OTP Generate....................., mobileNumber : ", mobileNumber);

        const urllink = location.search?.split('?')[1] || 'null';

        const formData1 = new FormData();
        formData1.append('userPhoneNumber', mobileNumber);
        // formData1.append('firstName', formData.firstName);
        // formData1.append('lastName', formData.lastName);
        // formData1.append('profession', formData.profession);
        formData1.append('dsa', dsa);
        formData1.append('channel', channel);
        formData1.append('source', source);
        formData1.append('sub_source', subSource);
        formData1.append('campaign', urllink);
        formData1.append('sub_dsa', subDsa);


        // const response = await axios.post(`${process.env.REACT_APP_BASE_URL}chfronetendotpgenerator`, formData1, {
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // });

        const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}chEmbeddedList_OTPGenerate`, formData1);

        if (response.data.code === 0) {

          setStgOneHitId(response.data.obj.stgOneHitId);
          setstgTwoHitId(response.data.obj.stgTwoHitId);
          sett_experian_log_id(response.data.obj.t_experian_log_id);

        }

        // console.log("tejas", response);

        if (response.status === 200) {
          console.log('Submission successful:', response.data);
        } else {
          console.error('Submission failed:', response.statusText);
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    } else {
      console.log("Inside else");
      getLoanBackend(lenderProduct);
    }

  };

  const handleKycConfirm = () => {
    if (pendingKycData) {
      const { product, addProductCallback, cpi, applicationLink, productId } = pendingKycData;

      // perform those tasks after KYC
      console.log("The lender product value is : ", product);
      setLenderProduct(product);
      setProductsArr(addProductCallback);
      setLenderCpi(cpi);
      setLenderApplicationLink(applicationLink);
      setLender_id(productId);
      handleOTPComponent();

      // close overlay and clear state
      setKycPage(false);
      setPendingKycData(null);
    }
  };

  // ======================================================
  //  Overlay (KYC Page)
  // ======================================================
  // const KycOverlay = () => (
  //   <div style={{
  //     position: 'fixed',
  //     top: 0, left: 0,
  //     width: '100vw',
  //     height: '100vh',
  //     backgroundColor: 'rgba(0,0,0,0.7)',
  //     zIndex: 9999,
  //     display: 'flex',
  //     alignItems: 'center',
  //     justifyContent: 'center'
  //   }}>
  //     <div style={{
  //       background: '#fff',
  //       color: '#000',
  //       borderRadius: '16px',
  //       padding: '2rem',
  //       width: '90%',
  //       maxWidth: '500px',
  //       textAlign: 'center',
  //       boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
  //     }}>
  //       <h2>KYC Verification</h2>
  //       <p>We need to verify your details before proceeding with your loan application.</p>

  //       <button
  //         style={{
  //           marginTop: '1rem',
  //           padding: '0.75rem 1.5rem',
  //           background: '#007bff',
  //           color: '#fff',
  //           border: 'none',
  //           borderRadius: '8px',
  //           cursor: 'pointer'
  //         }}
  //         onClick={handleKycConfirm} // 🔥 trigger next steps
  //       >
  //         OK
  //       </button>
  //     </div>
  //   </div>
  // );

  // ============ KYC Summary Page ============

  const KycSummaryPage = () => {
    const cur = (value) => `₹${Number(value || 0).toLocaleString("en-IN")}`;

    // ✅ Replace with your actual logo URL (or Base64 if you want offline support)
    const companyLogo =
      "https://lowscore.club/logo.png"; // Example — change to your logo path

    const handleDownloadKYC2 = () => {
      const doc = new jsPDF();

      // Add logo
      const imgWidth = 40;
      const imgHeight = 15;
      // doc.addImage(companyLogo, "PNG", 15, 10, imgWidth, imgHeight);

      // Add header
      doc.setFontSize(16);
      doc.text("KFS(Key Fact Sheet) Report", 105, 25, { align: "center" });

      // Add table content
      doc.setFontSize(12);
      autoTable(doc, {
        startY: 40,
        theme: "striped",
        head: [["Field", "Details"]],
        body: [
          ["Lender", kfsLender || "-"],
          // ["Loan ID", "987654321"],
          ["Principal Amount",kfsPrincipalAmount],
          ["Disbursal Amount",kfsDisbursalAmount],
          ["Processing Fee",kfsPFAmt],
          ["Rate of Interest",kfsROI],
          ["Tenure",kfsTenure],
          ["EMI Amount",kfsEmiAmount],
          // ["Total Payable", cur({kfs})],
          ["PF with GST + Stamp Duty", kfsPFAmt],
          // ["Insurance with GST", "Included"],
          // ["Late Payment Charges", "₹500 per EMI"],
          // ["Foreclosure Charges", "2% of balance"],
        ],
      });

      // Add footer (signature + timestamp)
      const pageHeight = doc.internal.pageSize.height;
      doc.text("Authorized Signatory", 150, pageHeight - 30);
      doc.line(130, pageHeight - 35, 190, pageHeight - 35); // Signature line

      doc.setFontSize(10);
      doc.text(
        "Generated on: " + new Date().toLocaleString(),
        15,
        pageHeight - 15
      );
      doc.text("© CreditHaat Pvt. Ltd.", 150, pageHeight - 15);

      // Save file
      doc.save(`KFS_Summary_${mobileNumber || "user"}.pdf`);
    };

    const handleDownloadKYC = () => {

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
          ['Monthly', '', '{{{loan_tenure}}}', '{{{per_emi_amount}}}', '{{{start_emi_date}}}', ''],
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
          [{ content: ''}, { content: 'Payable to the RE (A)', colSpan: 2 }, { content: 'Payable to a third party through RE (B)', colSpan: 2 }],
          
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
          ['1', 'Sanctioned Loan amount (in Rupees)', '{{{loan_amount}}}'],
          ['2', 'Loan Term (months)', '{{{loan_tenure}}}'],
          ['a)', 'No. of instalments for payment of principal, in case of non-equated periodic loans', 'NA'],
          [{ content: 'b)', rowSpan: 3 }, 'Type of EPI', 'Monthly'],
          ['Amount of each EPI (in Rupees)', '{{{fixed_emi_amount}}}'],
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
      const lenderName = kfsLender ? kfsLender.replace(/\s+/g, "_") : "KFS";
      doc.save(`${lenderName}_KFS_${Date.now()}.pdf`);
    };

    return (
      <div
  style={{
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.7)",
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}
>
  <div
    style={{
      background: "#fff",
      padding: "24px",
      borderRadius: "12px",
      width: "90%",
      maxWidth: "600px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
      fontFamily: "Arial, sans-serif",
      position: "relative",
    }}
  >
    {/* 🔹 Header Row */}
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "8px",
      }}
    >
      {/* 📄 Download Link (Left) */}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();

          if (kfsLender === "Poonawalla Fincorp") {
            handleDownloadKYC2();
          } else {
            handleDownloadKYC();
          }

          // handleDownloadKYC();
        }}
        style={{
          color: "#0070f3",
          textDecoration: "none",
          fontWeight: "500",
          fontSize: "15px",
        }}
      >
        📄 Download KFS
      </a>

      {/* ❌ Close Icon (Right) */}
      <span
        onClick={() => setKycPage(false)}
        style={{
          cursor: "pointer",
          fontSize: "20px",
          fontWeight: "bold",
          color: "#666",
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#000")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
      >
        ×
      </span>
    </div>

    <h2
      style={{
        textAlign: "center",
        fontSize: "22px",
        fontWeight: "600",
        marginBottom: "20px",
        color: "#333",
      }}
    >
      KFS Summary
    </h2>

    {/* 🔹 Details Grid */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        rowGap: "0px",
        columnGap: "0px",
        fontSize: "15px",
        color: "#333",
        marginBottom: "15px",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Vertical divider line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "50%",
          width: "1px",
          backgroundColor: "#e0e0e0",
        }}
      ></div>

      {/* Each pair of cells */}
      {[
        ["Lender:", kfsLender],
        ["Principal Amount:", `₹${kfsPrincipalAmount}`],
        ["Disbursal Amount:", `₹${kfsDisbursalAmount}`],
        ["PF Amount:", `₹${kfsPFAmt}`],
        ["PF (incl. GST + Stamp):", `₹${kfsFinalPF}`],
        ["Insurance (with GST):", `${kfsInsuranceWithGST}`],
        ["ROI:", kfsROI],
        ["Tenure:", kfsTenure],
        ["EMI Amount:", kfsEmiAmount],
      ].map(([label, value], index) => (
        <React.Fragment key={index}>
          <div
            style={{
              padding: "10px 12px",
              borderBottom:
                index < 8 ? "1px solid #e0e0e0" : "none", // light grey line between rows
              backgroundColor: index % 2 === 0 ? "#fafafa" : "#fff",
            }}
          >
            <b>{label}</b>
          </div>
          <div
            style={{
              padding: "10px 12px",
              borderBottom:
                index < 8 ? "1px solid #e0e0e0" : "none", // light grey line between rows
              backgroundColor: index % 2 === 0 ? "#fafafa" : "#fff",
            }}
          >
            {value}
          </div>
        </React.Fragment>
      ))}
    </div>

    <hr style={{ margin: "10px 0 20px" }} />
    <div>Note:-The offer details presented are bound to change once the loan process is completed on the lender’s application.
      </div>
    {/* 🔹 OK Button */}
    <div style={{ textAlign: "center", marginTop: "10px" }}>
      <button
        onClick={handleKycConfirm}
        style={{
          padding: "10px 20px",
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Proceed
      </button>
      
    </div>
  </div>
</div>

    

    );
  };

  return (

    <>

      {kycPage && <KycSummaryPage />} {/* 🔥 Fullscreen overlay */}

      {
        kycPage ? (<></>) : (<><div  >

          <button size="small"
            className="card-button"
            onClick={(e) => {
              // setLenderProduct(lender.product);
              // setProductsArr((prevProductsArr) => [...prevProductsArr, lender.product]);
              // setLenderCpi(lender.cpi);
              // setLenderApplicationLink(lender.applicationlink);
              // setLender_id(lender.product_id);
              // handleOTPComponent();

              //here we will call one more product which will get the users data from backend and according to that data will generate the kfs for that particular user if the lender is pfl and earlysalary
              generateKFS(lender.product, (prevProductsArr) => [...prevProductsArr, lender.product], lender.cpi, lender.applicationlink, lender.product_id);
            }}
            variant="contained"
          // className="getLoanButton"
          >

            Get Loan
          </button>
          {/* </Link> */}
        </div></>)
      }

    </>


  )
}

export default embeddedGetLoanButton