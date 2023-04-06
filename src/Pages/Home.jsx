import Hero from '../Components/Hero';
import './Home.css';
import ThoughtTable from '../Components/ThoughtTable'
import { Container } from 'react-bootstrap';

const Home = () => {

  // const navigate = useNavigate();
  // useEffect(() => {
  //       const checkUser = () => {
  //           if (!localStorage.getItem("username")) {
  //               navigate("/");
  //           }
  //       };
  //       checkUser();
  //   }, [navigate]);

  //   const handleSignOut = () => {
  //       localStorage.removeItem("username");
  //       navigate("/");
  //   };
  return (
    <Container style = {{color:"white"}} fluid>
      <Hero />
      <ThoughtTable />
    </Container>
  );
}

export default Home;