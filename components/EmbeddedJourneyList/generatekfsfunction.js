import React from "react";
import axios from "axios";


export const getTenure = async (productId, mobileNumber) => {
    if (productId === 228265178 || productId === 519) { //for uat
        const formData = new FormData();
        formData.append("mobileNumber", mobileNumber);
        // const response = await axios.post("https://uat.credithaat.in/api/getUserDetails", formData);
        const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}api/getUserDetails`, formData);
        if (response.status === 200) {

            if (productId === 519) { //this 519 is for fibe (EarlySalary) 
                //criteria for fibe
                if (response.data.salary > 30000 && (response.data?.creditprofile > 750 && response.data?.creditprofile !== 1000)) {
                    const kfsTenure = "24 EMI";
                    return kfsTenure;

                } else if (response.data.salary > 22500 && response.data.creditprofile > 750) {
                    const kfsTenure = "12 EMI";
                    return kfsTenure;

                } else if (response.data.salary > 20000 && response.data.creditprofile > 700) {

                    const kfsTenure = "9 EMI";
                    return kfsTenure;
                } else {
                    return "NA";
                }

            }
        }
    }
}

export const getEMIAmount = async (productId, mobileNumber) => {
    try {

        console.log("Inside the getEmiAMount function");

        // if(productId === 228265178 || productId === 519){ //for production
        if (productId === 519) { //for uat
            const formData = new FormData();
            formData.append("mobileNumber", mobileNumber);
            // const response = await axios.post("https://uat.credithaat.in/api/getUserDetails", formData);
            const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}api/getUserDetails`,formData);
            if (response.status === 200) {

                console.log("Inside getEMIAmount function");

                if (productId === 519) { //this 519 is for fibe (EarlySalary) 



                    //criteria for fibe
                    if (response.data.salary > 30000 && (response.data?.creditprofile > 750 && response.data?.creditprofile !== 1000)) {
                        const principal = response.data.salary * 5;
                        //here calculate the pf from 3.5 % of principal amount
                        // Calculate EMI
                        const annualInterestRate = 24; // 24% annual
                        const monthlyInterestRate = annualInterestRate / 12 / 100; // 24% ÷ 12 ÷ 100
                        const tenureMonths = 24; // 24 months

                        const emi =
                            (principal *
                                monthlyInterestRate *
                                Math.pow(1 + monthlyInterestRate, tenureMonths)) /
                            (Math.pow(1 + monthlyInterestRate, tenureMonths) - 1);

                        console.log("the emi before returning is : ",emi);
                        // return emi;
                        return `₹${emi.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;


                    } else if (response.data.salary > 22500 && response.data.creditprofile > 750) {
                        const principal = response.data.salary * 3.5;
                        //here calculate the pf from 4 % of principal amount

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

                            console.log("the emi before returning is : ",emi);
                        // return emi;
                        return `₹${emi.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

                    } else if (response.data.salary > 20000 && response.data.creditprofile > 700) {
                        const principal = response.data.salary * 2;

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

                            console.log("the emi before returning is : ",emi);
                        // return emi;
                        return `₹${emi.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

                    } else {
                        console.log("returning NA");
                        return "NA";
                    }
                }


            }
        }

    } catch (error) {
        console.log("the error while generating the kfs is : ", error);
    }
}

export const getROI = async (productId, mobileNumber) => {
    if (productId === 228265178 || productId === 519) { //for uat
        const formData = new FormData();
        formData.append("mobileNumber", mobileNumber);
        // const response = await axios.post("https://uat.credithaat.in/api/getUserDetails", formData);
        const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}api/getUserDetails`, formData);
        if (response.status === 200) {

            if (productId === 519) { //this 519 is for fibe (EarlySalary) 
                //criteria for fibe
                if (response.data.salary > 30000 && (response.data?.creditprofile > 750 && response.data?.creditprofile !== 1000)) {
                    return "24%";

                } else if (response.data.salary > 22500 && response.data.creditprofile > 750) {
                    return "27%";

                } else if (response.data.salary > 20000 && response.data.creditprofile > 700) {
                    return "30%";
                } else {
                    return "NA";
                }

            }
        }
    }
}