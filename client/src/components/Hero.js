import styled from "styled-components";
import CreateEmail from "./signup/CreateEmail";
import FinishRegisterButton from "./FinishRegisterButton";
import { useAuthContext } from "../hooks/useAuthContext";

const Hero = () => {
  const { user } = useAuthContext();

  return (
    <Container>
      <div className="hero flex column a-center t-center">
        <div className="text flex column">
          <h1>Unlimited movies, TV shows, and more</h1>
          <p>Watch anywhere. Cancel anytime.</p>
        </div>
        {user ? <FinishRegisterButton /> : <CreateEmail />}
      </div>
    </Container>
  );
};

export default Hero;

const Container = styled.div`
  .hero {
    .text {
      gap: 1rem;
    }
  }
`;
