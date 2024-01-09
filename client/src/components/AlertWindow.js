import styled from "styled-components";

const AlertWindow = ({ message, showAlert }) => {
  return (
    <Container>
      {showAlert && (
        <div className="alert-window">
          <h4>{message}</h4>
        </div>
      )}
    </Container>
  );
};

export default AlertWindow;

const Container = styled.div`
  .alert-window {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    padding: 1.5%;
    text-align: center;
    border-radius: 0.25rem;
    background-color: white;
    color: black;
    box-shadow: 0 0 15px 10px rgba(0, 0, 0, 0.5);
  }
`;
