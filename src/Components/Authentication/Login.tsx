import { SyntheticEvent, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { User } from "../../interfaces";
import { useLoginSubmit } from "../../utils/hooks/useSubmit";
import Input from "../../utils/Form/Input/Input";

const Login = () => {
  const [email, setEmail] = useState<User["email"]>("");
  const [password, setPassword] = useState<User["password"]>("");
  const navigate = useNavigate();
  const [handleLogin] = useLoginSubmit();

  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();
    handleLogin(email, password);
    setPassword("");
    setEmail("");
  };

  return (
    <Container
      className="d-flex flex-column min-vh-100 justify-content-center align-items-center"
      fluid
    >
      <Form
        aria-label="Log in form"
        className="login-form"
        onSubmit={handleSubmit}
      >
        <h1 className="mb-3">Login</h1>

        <Input
          label="Email"
          name="email"
          placeholder="youremail@mail.com"
          value={email}
          required={true}
          type="email"
        />

        <Input
          label="Password"
          name="password"
          placeholder="Your password"
          value={password}
          required={true}
          type="password"
        />

        <button className="btn btn-info mt-1">SIGN IN</button>

        <p className="mt-1">
          Don't have an account?{" "}
          <a
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Sign up
          </a>
        </p>
      </Form>
    </Container>
  );
};

export default Login;
