import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker'; // Import jQuery UI datepicker
import 'jquery-ui/themes/base/all.css'; // Import jQuery UI theme CSS (all components)

const DatePicker = ({dob,dob1,setDob, setDob1, handleDateChange, setErrorMessage}) => {
  const datepickerRef = useRef(null);
  const [age, setAge] = useState(0);
  const [flag, setFlag] = useState(true); // Initialize flag as true

  useEffect(() => {
    $(datepickerRef.current).datepicker({
      dateFormat: 'dd/mm/yy', // Date format (adjust as needed)
      changeMonth: true,
      changeYear: true,
      showButtonPanel: true,
      yearRange: '1900:+1', // Example: from 1900 to one year ahead
      onSelect: (dateText, inst) => {
        // console.log(dateText); // Handle date selection if needed
        setDob(dateText);
        setDob1(dateText);
      }
    });

  }, []);

  useEffect(() => {

    if (dob) {
      // Split the date string (assuming it's in dd-mm-yyyy format)
      const parts = dob.split('/');
      
      if (parts.length === 3) {
        // Rearrange parts into yyyy-mm-dd format
        const formattedDob = `${parts[2]}-${parts[1]}-${parts[0]}`;
        
        // Parse the formatted date string into a Date object
        const birthDate = new Date(formattedDob);
        
        // Check if the parsed date is valid
        if (isValidDate(birthDate)) {
          const today = new Date();
          let ageDiff = today.getFullYear() - birthDate.getFullYear();
          
          // Adjust age if birthday hasn't occurred yet this year
          if (today < new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate())) {
            ageDiff--;
          }
          
          // Update age state
          setAge(ageDiff);

          // Check age conditions
          if (ageDiff > 59 || ageDiff < 19) {
            setFlag(false); // Set flag to false if age is greater than 59 or less than 19
            setErrorMessage("Your age doesn't match our criteria");
            setDob('');
            setDob1('');
          } else {
            setFlag(true); // Set flag to true otherwise
            setErrorMessage('');
          }
        } else {
          // Handle invalid date format or NaN
          setAge(0);
          setFlag(false);
          setErrorMessage("Invalid date format. Please enter date in dd-mm-yyyy format.");
        }
      } else {
        // Handle invalid input format
        setAge(0);
        setFlag(false);
        setErrorMessage("Invalid input format. Please enter date in dd-mm-yyyy format.");
      }
    }
  }, [dob]);

  const isValidDate = (date) => {
    return date instanceof Date && !isNaN(date);
  };

  return (
    <>
      <style>{`
        .datepicker-container {
          position: relative;
          width: 100%;
          max-width: 400px; /* Increased max-width for the entire datepicker */
          margin: 0 auto;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          z-index:10;
        }
        
        .datepicker-input {
          width: 100%; /* Ensure input field width is 100% */
          padding: 8px;
          font-size: 1rem;
          line-height: 1.5;
          color: #495057;
          
          border: 1px solid #ced4da;
          border-radius: 4px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        }

        @media (min-width: 767px) {
          .datepicker-input {
          width: 100%; /* Ensure input field width is 100% */
          padding:8px;
          font-size: 1rem;
          line-height: 1.5;
          color: #495057;
          width:100px;
          border: 1px solid #ced4da;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        }
        }

        .datepicker-input:focus {
          outline: none;
          border-color: #80bdff;
          box-shadow: 0 0 10px rgba(0, 123, 255, 0.5);
        }

        @media (max-width: 767px) {
          .ui-datepicker {
            font-size: 0.9rem;
            border: none;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            background-color: #fff;
            width: 85%; /* Ensure the calendar popup fills its container */
            margin-top: 100px;
            z-index:10;
          }
        }

        @media (min-width: 768px) {
          .ui-datepicker {
            font-size: 0.9rem;
            border: none;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            background-color: #fff;
            width: 30%; /* Ensure the calendar popup fills its container */
            margin-top: 100px;
            z-index:10;
          }
        }

        .ui-datepicker-header {
          background-color: #007bff;
          border: none;
          color: #fff;
          border-radius: 4px 4px 0 0;
          padding: 8px;
        }

        .ui-datepicker-title {
          font-size: 1.2rem;
          font-weight: bold;
        }

        .ui-datepicker-prev, .ui-datepicker-next {
          background-color: transparent;
          border: none;
          color: #fff;
          font-size: 1rem;
          cursor: pointer;
        }

        .ui-datepicker-prev:hover, .ui-datepicker-next:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }

        .ui-datepicker-calendar {
          border: none;
          width: 100%; /* Ensure the calendar table fills its container width */
          table-layout: fixed; /* Fix table layout to prevent overflowing */
        }

        .ui-datepicker-calendar tbody td {
          padding: 10px;
          width: calc(100% / 7); /* Distribute evenly across 7 days */
          text-align: center;
        }

        .ui-datepicker-calendar tbody td a {
          color: #495057;
          display: block;
          padding: 8px;
          border-radius: 4px;
          transition: background-color 0.2s ease, color 0.2s ease;
        }

        .ui-datepicker-calendar tbody td a:hover {
          background-color: #007bff;
          color: #fff;
        }

        .ui-datepicker-current-day a {
          background-color: #007bff;
          color: #fff;
          font-weight: bold;
        }

        .ui-datepicker-close {
          display: none;
        }
      `}</style>
      
      <div className="datepicker-container">
        <input
        value={dob && dob1}
        onChange={handleDateChange}
          type="text"
          id="datepicker"
          className="datepicker-input"
          placeholder="Select Date of Birth"
          ref={datepickerRef}
        />
      </div>
    </>
  );
};

export default DatePicker;
