import {Container} from "react-bootstrap";

const Hero = ({signOut}) => {
  return (
    <Container fluid className="container mb-5 mt-3">
      <div className = "div-container">
      <h1 className="mb-3">Their biggest vice - My awesome advice</h1>
      <button onClick = {signOut} type="button" id="logoutBtn" className = "btn btn-dark">Sign out</button>
      </div>
      
      <h3 style={{fontStyle:"italic", fontSize:"1.5rem"}}>My recent short thoughts</h3>
    </Container>
  );
}
export default Hero;