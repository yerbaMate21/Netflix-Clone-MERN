import styled from "styled-components";

const AlertWindow = ({ message, showAlert }) => {
  return (
    <Container>
      {showAlert && (
        <div className="alert-window flex a-center j-center">
          <h5>{message}</h5>
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
    min-height: 3rem;
    text-align: center;
    border-radius: 0.25rem;
    background-color: #f83637;
    box-shadow: 0 0 30px 15px rgba(0, 0, 0, 0.5);
  }
`;
