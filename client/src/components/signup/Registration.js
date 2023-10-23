import React from "react";
import styled from "styled-components";
import device from "../../assets/img/device";
import SubmitButton from "../SubmitButton";
import Transition from "../Transition";

const Registration = () => {
  return (
    <Container>
      <Transition>
        <div className="context t-center">
          <div className="logo">
            <img src={device} alt="device-logo" />
          </div>
          <div className="text">
            <span>
              STEP <strong>1</strong> OF <strong>3</strong>
            </span>
            <h1>Finish setting up your account</h1>
            <p>
              Netflix is personalized for you. Create a password to start
              watching Netflix.
            </p>
          </div>
          <SubmitButton text="Next" path="/signup/regform" />
        </div>
      </Transition>
    </Container>
  );
};

export default Registration;

const Container = styled.div`
  margin: 7rem auto;

  .context {
    background-color: white;
    max-width: 22rem;
    display: grid;

    .logo {
      img {
        width: 16rem;
        padding: 1rem 0;
      }
    }

    .text {
      font-size: 1.3rem;

      span {
        font-size: 0.9rem;
      }

      p {
        font-size: 1.2rem;
        padding: 0.8rem 1.5rem;
      }
    }
  }

  @media screen and (max-width: 600px) {
    .context {
      text-align: left;
      margin: 0 2rem;

      .text {
        p {
          padding: 0.8rem 0;
        }
      }
    }
  }
`;
