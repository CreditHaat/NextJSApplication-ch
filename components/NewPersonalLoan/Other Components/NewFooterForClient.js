"use client"

import styles from './NewFooter.module.css'; // Import CSS module for styling

const NewFooterForClient = () => {
    return (
        <>
            <div onClick={() => { window.location.href = "https://www.credithaat.com/tnc" }} className={styles.gridItem}>Terms of service</div>
            <div onClick={() => { window.location.href = "https://www.credithaat.com/privacy" }} className={styles.gridItem}>Privacy policy</div>
            <div onClick={() => { window.location.href = "https://www.credithaat.com/support" }} className={styles.gridItem}>Support</div>
        </>
    )
}

export default NewFooterForClient
