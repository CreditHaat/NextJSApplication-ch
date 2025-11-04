import React, {useState} from 'react'
import EmbeddedContext from './EmbeddedContext'

const EmbeddedProvider = () => {

    const [lenderProduct, setLenderProduct] = useState("");
    const [lenderCpi, setLenderCpi] = useState("");
    const [lenderApplicationLink, setLenderApplicationLink] = useState("");
    const [lender_id, setLender_id] = useState("");
    const [lenderName, setlenderName] = useState("NA");
    const [productsArr, setProductsArr] = useState([]);

    // setLenderProduct(product);
    //   setProductsArr(addProductCallback);
    //   setLenderCpi(cpi);
    //   setLenderApplicationLink(applicationLink);
    //   setLender_id(productId);
    //   handleOTPComponent();

    return(
        <EmbeddedContext.Provider>
            {children}
        </EmbeddedContext.Provider>
    )

}

export default EmbeddedProvider