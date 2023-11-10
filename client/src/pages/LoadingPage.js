import styled from "styled-components";
import LoadingSpinner from "../components/LoadingSpinner";

const LoadingPage = () => {
  return (
    <Container>
      <LoadingSpinner width="80px" height="80px" color="#f3f3f3" />
    </Container>
  );
};

export default LoadingPage;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(
    to bottom,
    #000000,
    #080506,
    #0f0b0b,
    #150f10,
    #191313,
    #191313,
    #191313,
    #191313,
    #150f10,
    #0f0b0b,
    #080506,
    #000000
  );
`;
