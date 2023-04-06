import { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PhoneVerify = () => {
    const [code, setCode] = useState("");
    const navigate = useNavigate();

    const postVerification = async () => {
      fetch("http://localhost:4000/api/verification", {
        method:"POST",
        body:JSON.stringify({
          code,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.json())
      .then((data) => {
        if(data.error_message) {
          alert(data.error_message);
        } else {
          navigate("/home")
        }
      })
      .catch((err) => console.error(err));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ code });
        postVerification();
        setCode("");
        navigate("/home");
    };
    return (
          <Container responsive className = "verify">
            <h2 style={{ marginBottom: "30px" }}>Verify your Phone number</h2>
            <form className='verify__form' onSubmit={handleSubmit}>
                <label htmlFor='code' style={{ marginBottom: "10px" }}>
                    A code has been sent your phone
                </label>
                <input
                    type='text'
                    name='code'
                    id='code'
                    className='code'
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                />
                <button className='btn btn-primary'>AUTHENTICATE</button>
            </form>
          </Container>
            
       
    );
};

export default PhoneVerify;