import { Button, Container } from "react-bootstrap";
import styles from "../home.module.css";

type Props = {
  signOut(): void;
};
const Hero = ({ signOut }: Props) => {
  return (
    <Container fluid className="container mb-5 mt-3">
      <div className={styles.divContainer} role="presentation">
        <h1 className="mb-3">My recent short thoughts</h1>
        <Button
          onClick={signOut}
          type="button"
          id="logoutBtn"
          className="btn btn-dark"
        >
          Sign out
        </Button>
      </div>

      <h2 style={{ fontStyle: "italic", fontSize: "1.5rem" }}>
        Their biggest vice - My awesome advice
      </h2>
    </Container>
  );
};
export default Hero;
