import styled from "styled-components";
import Navbar from "../components/Navbar";
import Background from "../components/Background";
import Footer from "../components/home/Footer";
import bgImage from "../assets/img/background_home.jpg";

const UserPage = () => {
  return (
    <Container>
      <div className="top-section">
        <Navbar />
        <Background image={bgImage} />
      </div>
      <Footer />
    </Container>
  );
};

export default UserPage;

const Container = styled.div`
  .top-section {
    height: 100vh;
  }
`;
