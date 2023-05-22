import { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Form, Col} from "react-bootstrap";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const postLoginDetails = () => {
      fetch("http://localhost:4000/api/login", {
        method: "POST",
        body: JSON.stringify({
            email,
            password,
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
              console.log(data.data);
              localStorage.setItem("username", data.data.username);
              navigate("/home");
            }
        })
        .catch((err) => console.error(err));
    };

    const handleSubmit = (e)=> {
        e.preventDefault();
        postLoginDetails();
        setPassword("");
        setEmail("");
    };

    const gotoSignUpPage = () => navigate("/register");

    return (
        <Container className="d-flex flex-column min-vh-100 justify-content-center align-items-center" fluid>
            <Form aria-label = "Log in form" className='login-form' onSubmit={handleSubmit}>
              <h2 className="mb-3">Login</h2>
                <Col xs="auto" className="mb-3">
                <Form.Label id = "loginForm-email">Email</Form.Label>
                <Form.Control
                    type='text'
                    id='email'
                    aria-placeholder = "foo@bar.com"
                    aria-labelledby = "loginForm-email"
                    placeholder="foo@bar.com"
                    name='email'
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
                </Col>
                <Col xs="auto" className="mb-3">
                <Form.Label id = "loginForm-password">Password</Form.Label>
                <Form.Control
                    type='password'
                    id='password'
                    placeholder="A strong password"
                    aria-placeholder = "A strong password"
                    aria-labelledby = "loginForm-password"
                    name='password'
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
                </Col>
              
                <button aria-label = "Login button" className='btn btn-info mt-1'>SIGN IN</button>
                
                <p className="mt-1">
                Don't have an account? <span aria-label = "Jump to register page" aria-description = "Click here if you don't have an account" style = {{color:"red", cursor:"pointer"}} onClick={gotoSignUpPage}>Sign up</span>
                </p>
            </Form>
          </Container>
          
          
        
    );
};

export default Login;