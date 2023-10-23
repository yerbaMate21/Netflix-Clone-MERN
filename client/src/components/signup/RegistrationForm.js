import styled from "styled-components";
import { useEffect } from "react";
import useRegistrationForm from "../../hooks/useRegistrationForm";
import { useSignup } from "../../hooks/useSignup";
import Transition from "../Transition";
import InputContainer from "../InputContainer";
import SubmitButton from "../SubmitButton";

const RegistrationForm = () => {
  const { state, setState, onChange, onBlur, onSubmit } = useRegistrationForm();
  const { signup, error, isLoading } = useSignup();

  const createdEmail = localStorage.getItem("email");

  useEffect(() => {
    if (createdEmail) {
      setState((prevState) => {
        const newState = { ...prevState };
        newState.email.value = createdEmail;
        newState.email.isValid = true;

        return newState;
      });
    }
  }, []);

  useEffect(() => {
    setState((prevState) => {
      const newState = { ...prevState };
      newState.email.error = error.email;
      newState.password.error = error.password;

      return newState;
    });
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    onSubmit(e);

    let email = state.email.value;
    let password = state.password.value;

    if (state.email.isValid && state.password.isValid) {
      await signup(email, password);
    }
  };

  return (
    <Container>
      <Transition>
        <form onSubmit={handleSubmit} noValidate>
          <div className="text">
            <span>
              STEP <strong>1</strong> OF <strong>3</strong>
            </span>
            <h1>Create a password to start your membership</h1>
            <p>
              Just a few more steps and you're done! We hate paperwork, too.
            </p>
          </div>
          <InputContainer
            id="input-validation"
            className="bordered"
            type="email"
            name="email"
            autoComplete="off"
            placeholder="Email"
            value={state.email.value}
            error={state.email.error}
            isValid={error.email ? false : state.email.isValid}
            onChange={onChange}
            onBlur={onBlur}
          />
          <InputContainer
            id="input-validation"
            className="bordered"
            type="password"
            name="password"
            autoComplete="off"
            placeholder="Add a password"
            value={state.password.value}
            error={state.password.error}
            isValid={error.password ? false : state.password.isValid}
            onChange={onChange}
            onBlur={onBlur}
          />
          <SubmitButton text="Next" isLoading={isLoading} />
        </form>
      </Transition>
    </Container>
  );
};

export default RegistrationForm;

const Container = styled.div`
  margin: 2rem auto 10rem auto;
  position: sticky;

  form {
    display: grid;
    max-width: 28rem;
    min-width: 16rem;
    font-size: 1.3rem;

    .text {
      margin-bottom: 1rem;

      span {
        font-size: 0.9rem;
      }

      h1 {
        margin-bottom: 1rem;
      }

      p {
        font-size: 1.2rem;
      }
    }
  }

  @media screen and (max-width: 600px) {
    form {
      margin: 0 2rem;
    }
  }
`;
