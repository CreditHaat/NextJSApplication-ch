

const FormSubmitBtn = ({handleSubmit}) => {

    const handleClick = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        handleSubmit(event);
    //    handleFormSubmit(event);
        // Add your logic here for handling the button click
      };

    return (
        <div className="input-group mb-5 justify-content-center">
            <button onClick={handleClick} className="btn" style={{ backgroundColor: "#3e2780", color: "#ffffff", padding: "15px" }}>Send OTP</button>
        </div>
    )
}

export default FormSubmitBtn
