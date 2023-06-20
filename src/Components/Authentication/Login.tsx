import { ChangeEvent, SyntheticEvent, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { User } from "../../interfaces";
import { useLoginSubmit } from "../../utils/hooks/useSubmit";
import Input from "../../utils/Form/Input/Input";
import styles from "./styles.module.css";

const Login = () => {
  const [email, setEmail] = useState<User["email"]>("");
  const [password, setPassword] = useState<User["password"]>("");
  const navigate = useNavigate();
  const [handleLogin] = useLoginSubmit();

  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();
    handleLogin(email, password);
    navigate("/home");
    setPassword("");
    setEmail("");
  };

  return (
    <Container
      className="d-flex flex-column min-vh-100 justify-content-center align-items-center"
      fluid
    >
      <Form className={styles["form"]}>
        <h1 className="mb-3">Login</h1>

        <Input
          label="Email"
          name="email"
          placeholder="youremail@mail.com"
          value={email}
          required={true}
          type="email"
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            setEmail(e.target.value);
          }}
        />

        <Input
          label="Password"
          name="password"
          placeholder="Your password"
          value={password}
          required={true}
          type="password"
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            setPassword(e.target.value);
          }}
        />

        <Button className="btn btn-info mt-1" onClick={handleSubmit}>
          SIGN IN
        </Button>

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
