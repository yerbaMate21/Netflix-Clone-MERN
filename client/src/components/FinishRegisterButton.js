import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const FinishRegisterButton = () => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();

    navigate("/signup");
  };

  return (
    <Container>
      <button className="btn" onClick={handleClick}>
        Finish Sign Up
      </button>
    </Container>
  );
};

export default FinishRegisterButton;

const Container = styled.div`
  button {
    max-width: 14rem;
    min-width: 9rem;
    max-height: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    margin-top: 2rem;
    margin-bottom: 3rem;
    padding: 0.8rem 1.6rem;
    font-size: 1.5rem;
    text-align: center;
  }
`;
