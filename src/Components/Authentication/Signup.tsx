import { SyntheticEvent, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { User } from "../../interfaces";
import Input from "../../utils/Form/Input/Input";
import { useRegisterSubmit } from "../../utils/hooks/useSubmit";

const Signup = () => {
  const [email, setEmail] = useState<User["email"]>("");
  const [username, setUsername] = useState<User["username"]>("");
  const [tel, setTel] = useState<User["phone"]>("");
  const [password, setPassword] = useState<User["password"]>("");
  const navigate = useNavigate();
  const [handleRegister] = useRegisterSubmit();

  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();
    handleRegister(email, tel!, password, username!);
    setEmail("");
    setTel("");
    setUsername("");
    setPassword("");
  };

  return (
    <Container className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
      <Form
        className="signup-form"
        aria-label="Signup form"
        onSubmit={handleSubmit}
      >
        <h1 className="mb-3">Sign up </h1>

        <Input
          label="Email"
          placeholder="youremail@mail.com"
          name="email"
          type="email"
          required={true}
          value={email}
        />

        <Input
          label="Username"
          placeholder="Your username"
          name="username"
          type="text"
          required={true}
          value={username}
        />

        <Input
          label="Phone number"
          placeholder="385981234567"
          name="phone"
          type="tel"
          required={true}
          value={tel}
        />
        <Input
          label="Password"
          placeholder="Your password"
          name="password"
          type="password"
          required={true}
          value={password}
        />

        <button className="btn btn-info mt-1">SIGN UP</button>
        <p className="mt-1">
          Already have an account?{" "}
          <a
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Log in
          </a>
        </p>
      </Form>
    </Container>
  );
};

export default Signup;
