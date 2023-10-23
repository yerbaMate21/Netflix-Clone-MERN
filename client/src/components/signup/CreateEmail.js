import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useRegistrationForm from "../../hooks/useRegistrationForm";
import InputContainer from "../InputContainer";
import { IoIosArrowForward } from "react-icons/io";

const CreateEmail = () => {
  const navigate = useNavigate();
  const { state, onChange, onBlur, onSubmit } = useRegistrationForm();

  const saveToStorage = () => {
    if (state.email.isValid) {
      localStorage.setItem("email", state.email.value);

      // navigate to MultiStepForm
      navigate("/signup/registration");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(e);
    saveToStorage();
  };

  return (
    <Container className="flex column a-center t-center">
      <p>Ready to watch? Enter your email to create or restart membership.</p>
      <form onSubmit={handleSubmit} noValidate>
        <InputContainer
          id="input-validation"
          className="default"
          type="email"
          name="email"
          placeholder="Email address"
          value={state.email.value}
          error={state.email.error}
          isValid={state.email.isValid}
          onChange={onChange}
          onBlur={onBlur}
        />
        <button className="btn flex a-center j-center" type="submit">
          <span>Get Started</span>
          <i>
            <IoIosArrowForward />
          </i>
        </button>
      </form>
    </Container>
  );
};

export default CreateEmail;

const Container = styled.div`
  margin-bottom: 4rem;
  padding: 0 12%;

  p {
    margin-top: 1.5rem;
    margin-bottom: 1.2rem;
  }

  form {
    margin: 0 1rem;
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 0.5rem;

    button {
      min-width: 12rem;
      font-size: 1.5rem;
    }

    button:hover {
      background-color: #a8050d;
    }
  }

  @media screen and (max-width: 600px) {
    form {
      grid-template-columns: 1fr;
      margin-bottom: 4rem;
      width: 100%;
      max-height: 3rem;

      .input-container {
        max-width: 100%;

        .input-box {
          input {
            height: 3rem;
            font-size: 1rem;
          }
        }
      }

      button {
        min-width: 5rem;
        height: 3rem;
        font-size: 1rem;
        margin: 0 auto;
      }
    }
  }
`;
