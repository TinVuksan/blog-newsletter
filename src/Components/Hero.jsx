import {Container} from "react-bootstrap";

const Hero = () => {
  return (
    <Container fluid className="container mb-5 mt-3">
      <h1 className="mb-3">Their biggest vice - My awesome advice</h1>
      <h3 style={{fontStyle:"italic", fontSize:"1.5rem"}}>My recent short thoughts</h3>
    </Container>
  );
}
export default Hero;