import Image from 'next/image';

function KeyPartners() {
    return (
        <>
            <div className="" style={{ margin: 'auto' }}>
                <h5 style={{ marginTop: '15px', textAlign: 'center', fontFamily: '', fontWeight: '', fontSize: 'calc(1.325rem + .9vw)' }}>Our lending partners</h5>
            </div>
            <div className="lenders">
                <div style={{ marginTop: '15px', loading: "lazy" }}>
                    <div className="brandcontainer" style={{ display: 'flex', height: 'auto', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', margin: '20px' }}>
                        {/* <div className="brandbox" style={{ width: '80px', height: '80px', margin: '10px', textAlign: 'center' }}> */}
                        <div className="brandbox" style={{ margin: '20px' }}>
                            {/* <img style={{ height: '55px', width: '70px', margin: 'auto', borderRadius: '2px', loading: "lazy" }} src="https://credithaatimages.s3.ap-south-1.amazonaws.com/siteimages/LnTFinance.jpeg" alt="L&T" /> */}
                            <Image
                                src="https://credithaatimages.s3.ap-south-1.amazonaws.com/siteimages/LnTFinance.jpeg"
                                width={55}
                                height={70}
                                style={{ margin: 'auto', borderRadius: '2px' }}
                                alt="Moneyview" />
                            <p className="brandname" style={{ fontSize: '15px', textAlign: 'center', fontFamily: '', fontWeight: '' }}>L&T</p>
                        </div>

                        <div className="brandbox" style={{ margin: '20px' }}>
                            {/* <img style={{ height: '70px', width: '70px', margin: 'auto', borderRadius: '2px', loading: "lazy" }} src="https://chdocsusers.s3.ap-south-1.amazonaws.com/partners/ABFL.png" alt="ABFL" /> */}
                            <Image
                                src="https://chdocsusers.s3.ap-south-1.amazonaws.com/partners/ABFL.png"
                                width={70}
                                height={70}
                                style={{ margin: 'auto', borderRadius: '2px' }}
                                alt="Moneyview" />
                            <p className="brandname" style={{ fontSize: '15px', textAlign: 'center', fontFamily: '', fontWeight: '' }}>ABFL</p>
                        </div>

                        <div className="brandbox" style={{ margin: '20px' }}>
                            {/* <img style={{ height: '70px', width: '70px', margin: 'auto', borderRadius: '2px', loading: "lazy" }} src="https://chdocsusers.s3.ap-south-1.amazonaws.com/partners/fibe.png" alt="Fibe" /> */}
                            <Image
                                src="https://chdocsusers.s3.ap-south-1.amazonaws.com/partners/fibe.png"
                                width={70}
                                height={70}
                                style={{ margin: 'auto', borderRadius: '2px' }}
                                alt="Moneyview" />
                            <p className="brandname" style={{ fontSize: '15px', textAlign: 'center', fontFamily: '', fontWeight: '' }}>Fibe</p>
                        </div>

                        <div className="brandbox" style={{ margin: '20px' }}>
                            {/* <img style={{ height: '55px', width: '70px', margin: 'auto', borderRadius: '2px', loading: "lazy" }} src="https://chdocsusers.s3.ap-south-1.amazonaws.com/partners/yes_bank_logo.png" alt="Yes Bank" /> */}
                            <Image
                                src="https://chdocsusers.s3.ap-south-1.amazonaws.com/partners/yes_bank_logo.png"
                                width={70}
                                height={70}
                                style={{ margin: 'auto', borderRadius: '2px' }}
                                alt="Moneyview" />
                            <p className="brandname" style={{ fontSize: '15px', textAlign: 'center', fontFamily: '', fontWeight: '' }}>Yes Bank</p>
                        </div>

                        <div className="brandbox" style={{ margin: '20px' }}>
                            {/* <img style={{ height: '70px', width: '70px', margin: 'auto', borderRadius: '2px', loading: "lazy" }} src="https://chdocsusers.s3.ap-south-1.amazonaws.com/partners/smartcoin.jpg" alt="Smartcoin" /> */}
                            <Image
                                src="https://chdocsusers.s3.ap-south-1.amazonaws.com/partners/smartcoin.jpg"
                                width={70}
                                height={70}
                                style={{ margin: 'auto', borderRadius: '2px' }}
                                alt="Moneyview" />
                            <p className="brandname" style={{ fontSize: '15px', textAlign: 'center', fontFamily: '', fontWeight: '' }}>Smartcoin</p>

                        </div>

                        <div className="brandbox" style={{ margin: '20px' }}>
                            {/* <img style={{ height: '70px', width: '70px', margin: 'auto', borderRadius: '2px', loading: "lazy" }} src="https://credithaatimages.s3.ap-south-1.amazonaws.com/siteimages/StashFin.webp" alt="Stashfin" /> */}
                            <Image
                                src="https://credithaatimages.s3.ap-south-1.amazonaws.com/siteimages/StashFin.webp"
                                width={70}
                                height={70}
                                style={{ margin: 'auto', borderRadius: '2px' }}
                                alt="Moneyview" />
                            <p className="brandname" style={{ fontSize: '15px', textAlign: 'center', fontFamily: '', fontWeight: '' }}>Stashfin</p>
                        </div>

                        <div className="brandbox" style={{ margin: '20px' }}>
                            {/* <img style={{ height: '70px', width: '70px', margin: 'auto', borderRadius: '2px', loading: "lazy" }} src="https://chdocsusers.s3.ap-south-1.amazonaws.com/partners/kreditbee.png" alt="Kreditbee" /> */}
                            <Image
                                src="https://chdocsusers.s3.ap-south-1.amazonaws.com/partners/kreditbee.png"
                                width={70}
                                height={70}
                                style={{ margin: 'auto', borderRadius: '2px' }}
                                alt="Moneyview" />
                            <p className="brandname" style={{ fontSize: '15px', textAlign: 'center', fontFamily: '', fontWeight: '' }}>Kreditbee</p>
                        </div>

                        <div className="brandbox" style={{ margin: '20px' }}>
                            {/* <img style={{ height: '70px', width: '70px', margin: 'auto', borderRadius: '2px', loading: "lazy" }} src="https://chdocsusers.s3.ap-south-1.amazonaws.com/partners/zype.png" alt="Zype" /> */}
                            <Image
                                src="https://chdocsusers.s3.ap-south-1.amazonaws.com/partners/zype.png"
                                width={70}
                                height={70}
                                style={{ margin: 'auto', borderRadius: '2px' }}
                                alt="Moneyview" />
                            <p className="brandname" style={{ fontSize: '15px', textAlign: 'center', fontFamily: '', fontWeight: '' }}>Zype</p>
                        </div>

                        <div className="brandbox" style={{ margin: '20px' }}>
                            {/* <img style={{ height: '70px', width: '70px', margin: 'auto', borderRadius: '2px', loading: "lazy" }} src="https://credithaatimages.s3.ap-south-1.amazonaws.com/siteimages/MoneyView.webp" alt="Moneyview" /> */}
                            <Image
                                src="https://credithaatimages.s3.ap-south-1.amazonaws.com/siteimages/MoneyView.webp"
                                width={70}
                                height={70}
                                style={{ margin: 'auto', borderRadius: '2px' }}
                                alt="Moneyview" />
                            <p className="brandname" style={{ fontSize: '15px', textAlign: 'center', fontFamily: '', fontWeight: '' }}>Moneyview</p>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default KeyPartners;