import Hero from '../Components/Hero';
import {useEffect} from 'react';

import ThoughtTable from '../Components/ThoughtTable'
import { Container } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const Home = () => {

  //Check if user is logged in and sign out function
  const navigate = useNavigate();
  useEffect(() : void => {
        const checkUser = () : void => {
            if (!localStorage.getItem("username")) {
                navigate("/");
            }
        };
        checkUser();
    }, [navigate]);

    const handleSignOut = () : void => {
        localStorage.removeItem("username");
        navigate("/");
    };

  return (
    <Container style = {{color:"white"}} fluid>
      <Hero signOut = {handleSignOut} />
      <ThoughtTable />
    </Container>
  );
}

export default Home;