import styled from "styled-components";
import Navbar from "../components/Navbar";
import SignLogFooter from "../components/SignLogFooter";

const Signup = ({ children }) => {
  return (
    <Container>
      <nav>
        <Navbar />
      </nav>
      <section className="flex">{children}</section>
      <footer>
        <SignLogFooter />
      </footer>
    </Container>
  );
};

export default Signup;

const Container = styled.div`
  display: grid;
  min-height: 100vh;

  nav {
    background-color: white;
    border-bottom: 1px solid #e6e6e6;
  }

  section {
    background-color: white;
    color: #333333;
  }

  footer {
    background-color: #f3f3f3;
    border-top: 1px solid #e6e6e6;
  }
`;
