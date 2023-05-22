import {Container} from "react-bootstrap";
import {MouseEventHandler} from "react";
import styles from "../home.module.css";

type Props = {
    signOut: MouseEventHandler,
}
const Hero = ({signOut} : Props) => {
  return (
    <Container fluid className="container mb-5 mt-3">
      <div className = {styles.divContainer}>
      <h1 aria-label = "Hero title" className="mb-3">Their biggest vice - My awesome advice</h1>
      <button aria-label = "Sign out button" onClick = {signOut} type="button" id="logoutBtn" className = "btn btn-dark">Sign out</button>
      </div>
      
      <h3 aria-label = "Hero subtitle" style={{fontStyle:"italic", fontSize:"1.5rem"}}>My recent short thoughts</h3>
    </Container>
  );
}
export default Hero;