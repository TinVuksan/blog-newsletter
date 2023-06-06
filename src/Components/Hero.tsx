import { Container } from "react-bootstrap";
import styles from "../home.module.css";

type Props = {
  signOut(): void;
};
const Hero = ({ signOut }: Props) => {
  return (
    <Container fluid className="container mb-5 mt-3">
      <div className={styles.divContainer} role="presentation">
        <h1 className="mb-3">Their biggest vice - My awesome advice</h1>
        <button
          onClick={signOut}
          type="button"
          id="logoutBtn"
          className="btn btn-dark"
        >
          Sign out
        </button>
      </div>

      <h2 style={{ fontStyle: "italic", fontSize: "1.5rem" }}>
        My recent short thoughts
      </h2>
    </Container>
  );
};
export default Hero;
