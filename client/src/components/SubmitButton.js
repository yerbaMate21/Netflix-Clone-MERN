import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const SubmitButton = ({ text, path, isLoading }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Container>
      <button
        className={isLoading ? "btn loading" : "btn"}
        style={
          location.pathname.includes("login")
            ? { height: "3rem" }
            : { height: "4rem" }
        }
        type="submit"
        onClick={() => navigate(path)}
      >
        <span
          style={
            location.pathname.includes("login")
              ? { fontSize: "1rem" }
              : { fontSize: "1.5rem" }
          }
        >
          {isLoading ? <LoadingSpinner /> : text}
        </span>
      </button>
    </Container>
  );
};

export default SubmitButton;

const Container = styled.div`
  button {
    width: 100%;
    max-height: 4rem;
    border-radius: 0.25rem;
  }
`;
