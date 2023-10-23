import styled from "styled-components";

const LoadingSpinner = () => {
  return (
    <Container>
      <div className="spinner"></div>
    </Container>
  );
};

export default LoadingSpinner;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .spinner {
    display: grid;
    place-items: center;
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 50%;
    background: conic-gradient(
      from 180deg at 50% 50%,
      rgba(255, 255, 255, 0) 0deg,
      white 360deg
    );
    animation: spin 0.75s infinite linear;
  }
  .spinner::before {
    content: "";
    border-radius: 50%;
    width: 80%;
    height: 80%;
    background-color: #e50914;
  }

  @keyframes spin {
    to {
      transform: rotate(1turn);
    }
  }
`;
