
import {Container} from "react-bootstrap";
import './Hero.css';

const Hero = () => {
  return (
    <Container fluid className="container mb-5">
      <h1 className="mb-3">Their biggest vice - My awesome advice</h1>
      <h3 style={{fontStyle:"italic"}}>My recent short thoughts</h3>
    </Container>
  );
}
export default Hero;