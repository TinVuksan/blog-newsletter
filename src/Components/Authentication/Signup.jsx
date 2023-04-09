import { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {Form, Col} from "react-bootstrap";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [tel, setTel] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const postSignUpDetails = () => {
      fetch("http://localhost:4000/api/register", {
          method: "POST",
          body: JSON.stringify({
              email,
              password,
              tel,
              username,
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
                alert(data.message);
                navigate("/");
              }
          })
          .catch((err) => console.error(err));
  };

    const handleSubmit = (e) => {
        e.preventDefault();
       // console.log({ email, username, tel, password });
        postSignUpDetails();
        setEmail("");
        setTel("");
        setUsername("");
        setPassword("");
    };
    const gotoLoginPage = () => navigate("/");

    return (
            <Container className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
              
            <Form className='signup-form' onSubmit={handleSubmit}>
            <h2 className="mb-3">Sign up </h2>
            <Col xs="auto" className="mb-3">
            <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type='email'
                    name='email'
                    placeholder="Enter email"
                    id='email'
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Col>
            <Col xs="auto" className="mb-3"> 
            <Form.Label>Username</Form.Label>
                <Form.Control
                    type='text'
                    id='username'
                    placeholder="Enter username"
                    name='username'
                    value={username}
                    required
                    onChange={(e) => setUsername(e.target.value)}
                />
            </Col>
            <Col xs="auto" className="mb-3">
            <Form.Label>Phone Number</Form.Label>
                <Form.Control
                    type='tel'
                    name='tel'
                    placeholder="Enter phone number"
                    id='tel'
                    value={tel}
                    required
                    onChange={(e) => setTel(e.target.value)}
                />
            </Col>
            <Col xs="auto" className="mb-3">
            <Form.Label>Password</Form.Label>
                <Form.Control
                    type='password'
                    name='password'
                    placeholder="Enter password"
                    id='password'
                    minLength={8}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Col>
                
                <button className='btn btn-info mt-1'>SIGN UP</button>
                <p className="mt-1">
                Already have an account? <span style = {{color:"red", cursor:"pointer"}} onClick={gotoLoginPage}>Log in</span>
                </p>
            </Form>
            </Container>
            
       
    );
};

export default Signup;