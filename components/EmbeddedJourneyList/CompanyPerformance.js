import React from "react";

function CompanyPerformance() {
    return (
        <>
            <style>
                {
                    `
                .webtracfficdata {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.trafficbox {
  flex: 1;
  margin: 4px;
  padding: 10px;
//   background-color: #f0f0f0;
background-color: white;
  text-align: center;
}

/* Media query for desktop screens */
@media (min-width: 515px) {
  .thirdblock {
   display:none;
  }
            `
                }
            </style>


            <div className="container">
                <div className="webtracfficdata" style={{ fontSize: '11px' }}>
                    <div className="trafficbox" >
                        <div className="row" style={{ justifyContent: 'center', marginBottom: '0px' }} >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                version="1.1"
                                // width="256"
                                // height="256"
                                viewBox="0 0 256 256"
                                xmlSpace="preserve"

                                style={{ width: '30px', height: '30px', padding: '4px' }}
                            >
                                <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                                    <path
                                        d="M 85.347 90 c 0 -22.283 -18.064 -40.347 -40.347 -40.347 S 4.653 67.717 4.653 90 H 85.347 z"
                                        style={{
                                            stroke: 'none',
                                            strokeWidth: 1,
                                            strokeDasharray: 'none',
                                            strokeLinecap: 'round',
                                            strokeLinejoin: 'miter',
                                            strokeMiterlimit: 10,
                                            fill: 'rgb(62, 39, 128)',
                                            fillRule: 'nonzero',
                                            opacity: 1,
                                        }}
                                    />
                                    <circle
                                        cx="45.003"
                                        cy="21.413"
                                        r="21.413"
                                        style={{
                                            stroke: 'none',
                                            strokeWidth: 1,
                                            strokeDasharray: 'none',
                                            strokeLinecap: 'round',
                                            strokeLinejoin: 'miter',
                                            strokeMiterlimit: 10,
                                            fill: 'rgb(62, 39, 128)',
                                            fillRule: 'nonzero',
                                            opacity: 1,
                                        }}
                                    />
                                </g>
                            </svg>
                        </div>
                        <div className="row">
                            <center><b>80L</b></center>
                        </div>
                        <div className="row" >
                            <center>Registered users</center>
                        </div>
                    </div>
                    <div className="trafficbox" style={{ borderLeft: '2px solid #3e2780' }}>
                        <div className="row" style={{ justifyContent: 'center' }}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                version="1.1"
                                //   width="256"
                                //   height="256"
                                viewBox="0 0 256 256"
                                xmlSpace="preserve"
                                style={{ width: '30px', height: '30px', padding: '4px' }}
                            >
                                <defs></defs>
                                <g
                                    transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                                    style={{
                                        stroke: 'none',
                                        strokeWidth: 0,
                                        strokeDasharray: 'none',
                                        strokeLinecap: 'butt',
                                        strokeLinejoin: 'miter',
                                        strokeMiterlimit: 10,
                                        fill: 'none',
                                        fillRule: 'nonzero',
                                        opacity: 1
                                    }}
                                >
                                    <path
                                        d="M 70.323 56.443 L 66.281 52.2 l -11.346 -20.51 c -0.109 -0.174 -0.266 -0.31 -0.451 -0.393 l -19.179 -8.541 c -0.131 -0.059 -0.273 -0.089 -0.416 -0.089 H 21.204 c -0.02 0 -0.037 0.01 -0.056 0.011 c -0.069 0.004 -0.134 0.023 -0.201 0.041 c -0.063 0.017 -0.125 0.029 -0.182 0.056 c -0.055 0.026 -0.101 0.065 -0.151 0.101 c -0.059 0.043 -0.117 0.084 -0.166 0.139 c -0.012 0.014 -0.03 0.02 -0.042 0.035 c -6.256 7.804 -8.785 15.987 -7.731 25.015 c 0.004 0.034 0.022 0.062 0.03 0.096 c 0.013 0.059 0.03 0.114 0.053 0.17 c 0.029 0.07 0.065 0.133 0.108 0.194 c 0.019 0.027 0.025 0.059 0.047 0.085 c 10.803 12.675 21.9 24.703 30.491 24.703 c 1.592 0 3.098 -0.42 4.501 -1.319 l 0.216 0.219 c 0.966 0.978 2.259 1.521 3.641 1.529 c 0.011 0 0.022 0 0.033 0 c 1.369 0 2.656 -0.526 3.626 -1.484 c 0.853 -0.843 1.329 -1.915 1.469 -3.023 c 0.951 0.788 2.108 1.207 3.279 1.207 c 1.31 -0.001 2.623 -0.495 3.627 -1.487 c 1.13 -1.117 1.612 -2.629 1.49 -4.101 c 0.348 0.087 0.705 0.144 1.066 0.165 c 0.115 0.006 0.229 0.01 0.343 0.01 c 1.36 0 2.592 -0.481 3.497 -1.374 C 72.188 61.683 72.236 58.474 70.323 56.443 z"
                                        style={{
                                            fill: 'rgb(90, 70, 147)',
                                            strokeLinecap: 'round'
                                        }}
                                        transform="matrix(1 0 0 1 0 0)"
                                    />
                                    <path
                                        d="M 78.731 48.489 c 0.001 -0.004 0.002 -0.007 0.003 -0.011 c 2.42 -8.092 -0.164 -16.507 -7.901 -25.721 c -0.097 -0.117 -0.22 -0.21 -0.358 -0.273 c -6.523 -2.984 -16.832 -4.767 -25.63 -4.42 c -6.664 0 -15.499 7.583 -18.058 13.791 c -1.427 3.463 -0.498 5.41 0.533 6.434 c 0.027 0.027 0.055 0.052 0.085 0.076 c 3.93 3.113 7.8 3.901 13.83 -2.335 c 2.046 0.129 3.789 -0.231 5.301 -1.088 c 7.739 5.409 14.911 11.967 21.326 19.5 c 0.007 0.009 0.019 0.011 0.026 0.02 c 0.09 0.099 0.194 0.178 0.31 0.234 c 0.021 0.01 0.041 0.016 0.062 0.025 c 0.122 0.049 0.249 0.082 0.381 0.082 c 0.105 0 0.209 -0.021 0.312 -0.054 c 0.034 -0.011 0.065 -0.028 0.098 -0.043 c 0.04 -0.018 0.082 -0.029 0.12 -0.052 l 9.097 -5.537 c 0.042 -0.025 0.066 -0.065 0.103 -0.095 c 0.06 -0.049 0.122 -0.094 0.17 -0.157 c 0.047 -0.061 0.075 -0.131 0.107 -0.2 c 0.02 -0.044 0.053 -0.079 0.068 -0.127 C 78.723 48.521 78.726 48.505 78.731 48.489 z"
                                        style={{
                                            fill: 'rgb(62, 39, 128)',
                                            strokeLinecap: 'round'
                                        }}
                                        transform="matrix(1 0 0 1 0 0)"
                                    />
                                    <path
                                        d="M 0 17.997 v 31.548 c 0 0.956 0.775 1.73 1.73 1.73 h 9.654 c 0.758 0 1.429 -0.494 1.653 -1.218 l 8.881 -28.672 c 0.299 -0.965 -0.289 -1.986 -1.275 -2.204 c -6.36 -1.409 -12.648 -2.483 -18.804 -2.917 C 0.843 16.193 0 16.998 0 17.997 z"
                                        style={{
                                            fill: 'rgb(62, 39, 128)',
                                            strokeLinecap: 'round'
                                        }}
                                        transform="matrix(1 0 0 1 0 0)"
                                    />
                                    <path
                                        d="M 90 17.997 v 31.548 c 0 0.956 -0.775 1.73 -1.73 1.73 h -9.654 c -0.758 0 -1.429 -0.494 -1.653 -1.218 l -8.881 -28.672 c -0.299 -0.965 0.289 -1.986 1.275 -2.204 c 6.36 -1.409 12.648 -2.483 18.804 -2.917 C 89.157 16.193 90 16.998 90 17.997 z"
                                        style={{
                                            fill: 'rgb(62, 39, 128)',
                                            strokeLinecap: 'round'
                                        }}
                                        transform="matrix(1 0 0 1 0 0)"
                                    />
                                </g>
                            </svg>
                        </div>
                        <div className="row">
                            <center><b>45+</b></center>
                        </div>
                        <div className="row">
                            <center>Lending Partners</center>
                        </div>
                    </div>
                    <div className="trafficbox" style={{ borderLeft: '2px solid #3e2780' }}>
                        <div className="row" style={{ justifyContent: 'center' }}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                version="1.1"
                                //   width="256"
                                //   height="256"
                                viewBox="0 0 256 256"
                                xmlSpace="preserve"
                                style={{ width: '30px', height: '30px', padding: '4px' }}
                            >
                                <defs></defs>
                                <g
                                    transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                                    style={{
                                        stroke: 'none',
                                        strokeWidth: 0,
                                        strokeDasharray: 'none',
                                        strokeLinecap: 'butt',
                                        strokeLinejoin: 'miter',
                                        strokeMiterlimit: 10,
                                        fill: 'none',
                                        fillRule: 'nonzero',
                                        opacity: 1,
                                    }}
                                >
                                    <rect
                                        x="19.3"
                                        y="0"
                                        rx="0"
                                        ry="0"
                                        width="51.39"
                                        height="12"
                                        style={{
                                            stroke: 'none',
                                            strokeWidth: 1,
                                            strokeDasharray: 'none',
                                            strokeLinecap: 'butt',
                                            strokeLinejoin: 'miter',
                                            strokeMiterlimit: 10,
                                            fill: 'rgb(62,39,128)',
                                            fillRule: 'nonzero',
                                            opacity: 1,
                                        }}
                                        transform="matrix(1 0 0 1 0 0)"
                                    />
                                    <rect
                                        x="19.3"
                                        y="20.24"
                                        rx="0"
                                        ry="0"
                                        width="51.39"
                                        height="12"
                                        style={{
                                            stroke: 'none',
                                            strokeWidth: 1,
                                            strokeDasharray: 'none',
                                            strokeLinecap: 'butt',
                                            strokeLinejoin: 'miter',
                                            strokeMiterlimit: 10,
                                            fill: 'rgb(62,39,128)',
                                            fillRule: 'nonzero',
                                            opacity: 1,
                                        }}
                                        transform="matrix(1 0 0 1 0 0)"
                                    />
                                    <path
                                        d="M 63.838 26.24 C 63.838 11.771 52.066 0 37.598 0 H 19.304 v 12 h 18.294 c 7.852 0 14.24 6.388 14.24 14.24 s -6.388 14.24 -14.24 14.24 H 19.304 v 15.214 L 47.919 90 l 9.107 -7.814 L 32.359 52.48 h 5.239 C 52.066 52.48 63.838 40.709 63.838 26.24 z"
                                        style={{
                                            stroke: 'none',
                                            strokeWidth: 1,
                                            strokeDasharray: 'none',
                                            strokeLinecap: 'butt',
                                            strokeLinejoin: 'miter',
                                            strokeMiterlimit: 10,
                                            fill: 'rgb(62,39,128)',
                                            fillRule: 'nonzero',
                                            opacity: 1,
                                        }}
                                        transform="matrix(1 0 0 1 0 0)"
                                        strokeLinecap="round"
                                    />
                                </g>
                            </svg>
                        </div>
                        <div className="row">
                            <center><b>₹1200Cr+</b></center>
                        </div>
                        <div className="row">
                            <center>Disbursed</center> <span className="thirdblock" style={{ color: 'white' }}></span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CompanyPerformance;