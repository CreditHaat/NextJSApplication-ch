"use client"

import { useEffect, useState, useRef } from "react";
import { useSharedState } from './SharedStateContext';
// import { SharedStateProvider } from './SharedStateContext';

const FormInputs = ({errors,formData,handleChange, handleInputChange}) => {

    const inputRef = useRef(null);
    const formContainerRef = useRef(null);
    const selectRef = useRef(null);

    // Function to scroll the form container
    const scrollToInput = () => {
        // inputRef.current is the DOM node of the input field
        if (inputRef.current && window.innerWidth < 768) {
            inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
        }
    };

    // Function to scroll the form container to the select element
    const scrollToSelect = () => {
        if (selectRef.current && window.innerWidth < 768) {
            selectRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
        }
    };

    

    

  return (
    <>
      <div>
                        {/* <div className="input-group mb-5">
                            <input type="text" className={`form-control textBox `} placeholder="First name" aria-label="First Name" aria-describedby="first-name-icon" name="firstName" style={{ border: '1px solid #3e2780', borderRadius: '5px', borderRight: 'none', borderTopRightRadius: '0px', borderBottomRightRadius: '0px' }} />
                            <span className="input-group-text" id="first-name-icon" style={{ border: '1px solid #3e2780', borderRadius: '5px', borderLeft: 'none', borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }}><i className="bi bi-person"></i></span>
                        </div>
                        <div className="input-group mb-5">
                            <input type="text" className={`form-control textBox `} placeholder="Last name" aria-label="Last Name" aria-describedby="last-name-icon" name="lastName" style={{ border: '1px solid #3e2780', borderRadius: '5px', borderRight: 'none', borderTopRightRadius: '0px', borderBottomRightRadius: '0px' }} />
                            <span className="input-group-text" id="last-name-icon" style={{ border: '1px solid #3e2780', borderRadius: '5px', borderLeft: 'none', borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }}><i className="bi bi-person"></i></span>

                        </div>
                        <div className="input-group mb-5">
                            <select className={`form-select textBox `} aria-label="First Name" aria-describedby="first-name-icon"

                                style={{ border: '1px solid #3e2780', borderRadius: '5px' }}
                            >
                                <option value="">Profession Type </option>
                                <option>Salaried</option>
                                <option value="Self employed">Self Employed</option>
                                <option value="Business">Business</option>
                            </select>

                        </div>
                        <div className="input-group mb-2" >
                            <input type="number" className={`form-control textBox `} placeholder="Mobile number" aria-label="Mobile Number" aria-describedby="mobile-number-icon" name="mobileNumber" style={{ border: '1px solid #3e2780', borderRadius: '5px', borderRight: 'none', borderTopRightRadius: '0px', borderBottomRightRadius: '0px' }} />
                            <span className="input-group-text" id="mobile-number-icon" style={{ border: '1px solid #3e2780', borderRadius: '5px', borderLeft: 'none', borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }} ><i className="bi bi-phone"></i></span>

                        </div> */}


<div className="input-group mb-5">
                                    <input ref={inputRef} type="text" className={`form-control textBox ${errors.firstName ? 'is-invalid' : 'tejas'}`} placeholder="First name" onFocus={scrollToInput} aria-label="First Name" aria-describedby="first-name-icon" name="firstName" value={formData.firstName || ''} onChange={handleChange} style={{ border: '1px solid #3e2780', borderRadius: '5px', borderRight: 'none', borderTopRightRadius: '0px', borderBottomRightRadius: '0px' }} />
                                    <span className="input-group-text" id="first-name-icon" style={{ border: '1px solid #3e2780', borderRadius: '5px', borderLeft: 'none', borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }}><i className="bi bi-person"></i></span>
                                    {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                                </div>
                                <div className="input-group mb-5">
                                    <input ref={inputRef} type="text" className={`form-control textBox ${errors.lastName ? 'is-invalid' : ''}`} placeholder="Last name" onFocus={scrollToInput} aria-label="Last Name" aria-describedby="last-name-icon" name="lastName" value={formData.lastName || ''} onChange={handleChange} style={{ border: '1px solid #3e2780', borderRadius: '5px', borderRight: 'none', borderTopRightRadius: '0px', borderBottomRightRadius: '0px' }} />
                                    <span className="input-group-text" id="last-name-icon" style={{ border: '1px solid #3e2780', borderRadius: '5px', borderLeft: 'none', borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }}><i className="bi bi-person"></i></span>
                                    {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                                </div>
                                <div className="input-group mb-5">
                                    <select ref={selectRef} className={`form-select textBox ${errors.profession ? 'is-invalid' : ''}`} onFocus={scrollToSelect} aria-label="First Name" aria-describedby="first-name-icon"
                                        value={formData.profession || ''}
                                        style={{ border: '1px solid #3e2780', borderRadius: '5px' }}
                                        onChange={(e) => handleInputChange(e.target.value, 'profession') && handleChange}
                                    >
                                        <option value="">Profession Type </option>
                                        <option>Salaried</option>
                                        <option value="Self employed">Self Employed</option>
                                        <option value="Business">Business</option>
                                    </select>
                                    {errors.profession && <div className="invalid-feedback">{errors.profession}</div>}

                                </div>
                                <div className="input-group mb-2" >
                                    <input ref={inputRef} type="number" className={`form-control textBox ${errors.mobileNumber ? 'is-invalid' : ''}`} placeholder="Mobile number" onFocus={scrollToInput} aria-label="Mobile Number" aria-describedby="mobile-number-icon" name="mobileNumber" value={formData.mobileNumber || ''} onChange={handleChange} style={{ border: '1px solid #3e2780', borderRadius: '5px', borderRight: 'none', borderTopRightRadius: '0px', borderBottomRightRadius: '0px' }} />
                                    <span className="input-group-text" id="mobile-number-icon" style={{ border: '1px solid #3e2780', borderRadius: '5px', borderLeft: 'none', borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }} ><i className="bi bi-phone"></i></span>
                                    {errors.mobileNumber && <div className="invalid-feedback">{errors.mobileNumber}</div>}
                                </div>

                        </div>   
                    
                    </>
  )
}

export default FormInputs
