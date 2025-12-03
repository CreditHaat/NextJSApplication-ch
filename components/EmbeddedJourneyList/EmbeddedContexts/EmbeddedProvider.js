import React, { useState } from 'react'
import EmbeddedContext from './EmbeddedContext'

const EmbeddedProvider = () => {

    const [lenderProduct, setLenderProduct] = useState("");
    const [lenderCpi, setLenderCpi] = useState("");
    const [lenderApplicationLink, setLenderApplicationLink] = useState("");
    const [lender_id, setLender_id] = useState("");
    const [lenderName, setlenderName] = useState("NA");
    const [productsArr, setProductsArr] = useState([]);

    const [kfsPrincipalAmount, setKfsPrincipalAmount] = useState();
    const [kfsDisbursalAmount, setKfsDisbursalAmount] = useState();
    const [kfsPFAmt, setKfsPFAmt] = useState();
    const [kfsROI, setKFSROI] = useState();
    const [kfsTenure, setKfsTenure] = useState();
    const [kfsEmiAmount, setKfsEmiAmount] = useState();
    const [kfsFinalPF, setKfsFinalPF] = useState();
    const [kfsInsuranceWithGST, setKfsInsuranceWithGST] = useState();
    const [kfsTotalCharges, setKfsTotalCharges] = useState();

    // setLenderProduct(product);
    //   setProductsArr(addProductCallback);
    //   setLenderCpi(cpi);
    //   setLenderApplicationLink(applicationLink);
    //   setLender_id(productId);
    //   handleOTPComponent();

    return (
        <EmbeddedContext.Provider value={{kfsPrincipalAmount, kfsDisbursalAmount, kfsPFAmt, kfsROI, kfsTenure, kfsEmiAmount, kfsFinalPF, kfsInsuranceWithGST, kfsTotalCharges}}>
            {children}
        </EmbeddedContext.Provider>
    )

}

export default EmbeddedProvider