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
  background-color: rgba(50, 50, 50, 0.3);
`;
