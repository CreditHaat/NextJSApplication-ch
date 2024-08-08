"use server"

import { Typography } from '@mui/material';
import GetLoanButton from './GetLoanButton';
// import GetLoanButton from './GetLoanButton';
import './CHEmbeddedList.css';

const CHEmbeddedListCards = ({ json1 }) => {

  return (
    <div>

      {console.log(json1)}

      <div style={{ padding: '10px', paddingTop: '0px' }}>
        {json1.lender_details.map((lender, index) => (
          <div key={index} className={lender.product_id} >
            <div className="card-container">
              <div className="card-content">
                <div className="" style={{ width: '50%', float: 'left', margin: 'auto' }}>
                  <div className="text-content" style={{ width: '50%', padding: '10px', margin: 'auto', marginLeft: '0px' }}>
                    <img alt="logo" src={lender.logo} className="logo" style={{ display: 'flex', justifyContent: 'center', width: '100%', height: 'auto', maxWidth: '60px', minWidth: '0px' }} />

                  </div>
                </div>
                <div className="text-content" style={{ width: '50%', float: 'right' }}>
                  <Typography variant="h5" component="div" className="title" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                    {lender.product}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" className="data" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                    {lender.description}
                  </Typography>
                </div>
              </div>
              <div className="details">
                <div className="detail">
                  <Typography variant="body2" color="textSecondary" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                    <span className="detail-label">{lender.maxloanamount}</span> <br />Max Amount
                  </Typography>
                </div>
                <div className="detail">
                  <Typography variant="body2" color="textSecondary" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                    <span className="detail-labels" >{lender.tenure}</span> <br />Tenure
                  </Typography>
                </div>
                <div className="detail">
                  <Typography variant="body2" color="textSecondary" style={{ fontFamily: 'Times New Roman, Times, serif' }}>
                    <span className="detail-labels" >{lender.interest}</span> <br />Interest
                  </Typography>
                </div>
              </div>
              <div className="action-button">
                <GetLoanButton lender={lender} />
              </div>

            </div>
          </div>
        ))}
      </div>

      <style>
        {`
        .hide{
          display: none;
        }
        .show{
        display:block;
        }
      `}
      </style>
    </div>
  )
}

export default CHEmbeddedListCards
