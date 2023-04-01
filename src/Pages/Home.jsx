import Hero from '../Components/Hero';
import './Home.css';
import ThoughtTable from '../Components/ThoughtTable'
import { Container } from 'react-bootstrap';

const Home = () => {
  return (
    
    <Container fluid>
      <Hero />
      <ThoughtTable />
    </Container>
      
    
    
    
  );
}
export default Home;