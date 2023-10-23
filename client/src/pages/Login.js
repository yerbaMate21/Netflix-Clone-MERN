import styled from "styled-components";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import useRegistrationForm from "../hooks/useRegistrationForm";
import { useLogin } from "../hooks/useLogin";
import bgImage from "../assets/img/background_login.jpg";
import Logo from "../components/Logo";
import Background from "../components/Background";
import InputContainer from "../components/InputContainer";
import SubmitButton from "../components/SubmitButton";
import SignLogFooter from "../components/SignLogFooter";

const Login = () => {
  const { state, setState, onChange, onBlur, onSubmit } = useRegistrationForm();
  const { login, error, isLoading } = useLogin();

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

    if (state.email.isValid && !state.password.error) {
      await login(email, password);
    }
  };

  return (
    <Container>
      <Logo />
      <Background image={bgImage} />
      <section>
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <InputContainer
            id="input-validation"
            className="login"
            type="email"
            name="email"
            placeholder="Email"
            value={state.email.value}
            error={state.email.error}
            onChange={onChange}
            onBlur={onBlur}
          />
          <InputContainer
            id="input-validation"
            className="login"
            type="password"
            name="password"
            placeholder="Password"
            value={state.password.value}
            error={state.password.error}
            isLoading={isLoading}
            onChange={onChange}
            onBlur={onBlur}
          />
          <SubmitButton text="Sign In" isLoading={isLoading} />
        </form>
        <div className="text">
          <span>New to Netflix?&nbsp;</span>
          <Link to="/">Sign up now.</Link>
        </div>
      </section>
      <footer>
        <SignLogFooter />
      </footer>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  section {
    width: 28rem;
    padding: 4rem;
    margin: 0 auto;
    display: grid;
    gap: 2rem;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 0.25rem;

    h2 {
      font-size: 2rem;
    }

    form {
      display: grid;
      gap: 0.25rem;

      button {
        margin: 1rem 0;
      }
    }

    .text {
      display: flex;
      font-size: 1rem;

      span {
        color: rgb(120, 120, 120);
      }

      a {
        color: white;
      }

      a:hover {
        text-decoration: underline;
      }
    }
  }

  footer {
    margin-top: 3rem;
  }

  @media screen and (max-width: 740px) {
    background-color: black;

    section {
      width: 100%;
      padding: 4rem 2rem;
    }

    footer {
      border-top: 0.1rem solid #757575;
    }
  }
`;
