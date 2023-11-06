import styled from "styled-components";

const LoadingSpinner = ({ width, height, color }) => {
  return (
    <Container>
      <div
        className="loading"
        style={{ width: width, height: height, borderTopColor: color }}
      ></div>
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

  .loading {
    display: inline-block;
    border: 5px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    animation: spin 0.75s ease-in-out infinite;
    -webkit-animation: spin 0.75s ease-in-out infinite;
  }

  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`;
