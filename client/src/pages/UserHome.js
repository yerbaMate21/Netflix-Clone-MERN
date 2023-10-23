import styled from "styled-components";
import { useAuthContext } from "../hooks/useAuthContext";
import Navbar from "../components/Navbar";
import Background from "../components/Background";
import bgImage from "../assets/img/background_userHome.jpg";

const UserHome = () => {
  const { user } = useAuthContext();

  return (
    <Container>
      <Navbar />
      <Background image={bgImage} />
      <h1>UserHome Page</h1>
      <span>{user.email}</span>
    </Container>
  );
};

export default UserHome;

const Container = styled.div``;
