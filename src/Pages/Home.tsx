import Hero from "../Components/Hero";
import { useCheckUser, useHandleSignout } from "../utils/hooks/useCheckUser";
import ThoughtTable from "../Components/ThoughtTable";
import { Container } from "react-bootstrap";

const Home = () => {
  useCheckUser();
  const [handleSignout] = useHandleSignout();

  return (
    <Container style={{ color: "white" }} fluid>
      <Hero signOut={handleSignout} />
      <ThoughtTable />
    </Container>
  );
};

export default Home;
