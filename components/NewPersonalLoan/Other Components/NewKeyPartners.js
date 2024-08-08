// GridContainer.js
import styles from './NewKeyPartners.module.css'; // Import CSS module for styling
import exp from '../../../images/Experian.svg';
import aws from '../../../images/aws.svg';
import ssl from '../../../images/ssl.png';
import Image from 'next/image';

const NewKeyPartners = () => {
  return (
    // <footer style={{backgroundColor:"#F2EDFF80",marginTop:"10px",paddingTop:"10px",paddingBottom:"10px"}}>
    <>
    
    <h2 style={{ marginTop : '15px', textAlign :' center', fontSize : 'calc(1.325rem + 0.9vw)'}}>Key partners</h2>
<div className={styles.gridContainer}>
      {/* Grid items (columns) */}
      {/* <div className={styles.gridItem}>All rights reserved</div> */}
      <div className={styles.gridItem}>
      <div ><i class="">
        {/* <img className={styles.NewKeyPartnersImg} src="/static/media/Experian.1ac846805d6f19e266d663598026bed4.svg" /> */}
        <Image
        src={exp}
        className={styles.NewKeyPartnersImg}
        width={100}
        height={100}/>
        </i></div>
      <div >Credit score</div>
      </div>
      <div className={styles.gridItem}>
      <div >
        <i class="">
        <Image
        src={aws}
        className={styles.NewKeyPartnersImg}
        width={100}
        height={100}/>
          {/* <img className={styles.NewKeyPartnersImg} src="/static/media/aws.cc38dbe9487d55943d42132de41bbf53.svg" /> */}
          </i></div>
      <div >AWS</div>
      </div>
      <div className={styles.gridItem}>
        <div ><i class="">
        <Image
        src={ssl}
        className={styles.NewKeyPartnersImg}
        width={100}
        height={100}/>
          {/* <img className={styles.NewKeyPartnersImg} src="data:image/png;base64,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"/> */}
          </i></div>
         <div >SSL</div>
      </div>
     
    </div>
    
    
    
    </>
    
  );
};

export default NewKeyPartners;
