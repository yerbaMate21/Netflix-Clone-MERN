import React from "react";
import styled from "styled-components";
import SubmitButton from "../SubmitButton";
import { AiOutlineCheckCircle, AiOutlineCheck } from "react-icons/ai";
import Transition from "../Transition";

const Plan = () => {
  return (
    <Container>
      <Transition>
        <div className="context t-center">
          <div className="logo">
            <i>
              <AiOutlineCheckCircle />
            </i>
          </div>
          <div className="items">
            <span>
              STEP <strong>2</strong> OF <strong>3</strong>
            </span>
            <h1>Choose your plan.</h1>
            <div className="item">
              <i>
                <AiOutlineCheck />
              </i>
              <p>No commitments, cancel anytime.</p>
            </div>
            <div className="item">
              <i>
                <AiOutlineCheck />
              </i>
              <p>Everything on Netflix for one low price.</p>
            </div>
            <div className="item">
              <i>
                <AiOutlineCheck />
              </i>
              <p>Unlimited viewing on all your devices.</p>
            </div>
          </div>
          <SubmitButton text="Next" path="/signup/plan" />
        </div>
      </Transition>
    </Container>
  );
};

export default Plan;

const Container = styled.div`
  margin: 4rem auto;

  .context {
    background-color: white;
    max-width: 22rem;
    display: grid;
    gap: 1rem;

    .logo {
      margin: 0 auto;
      color: #e50914;
      font-size: 3.5rem;
    }

    .items {
      display: grid;
      font-size: 1.3rem;
      margin-bottom: 1rem;

      span {
        font-size: 0.9rem;
      }

      h1 {
        margin-bottom: 1rem;
      }

      .item {
        width: 100%;
        padding: 0 1.5rem;
        margin: 0.5rem auto;
        display: inline-flex;
        align-items: center;
        text-align: left;
        gap: 0.5rem;
        font-size: 1.2rem;

        i {
          color: #e50914;
          font-size: 2rem;
          vertical-align: top;
          height: 100%;
        }
      }
    }
  }

  @media screen and (max-width: 600px) {
    margin: 4rem 2rem;

    .context {
      text-align: left;
      min-width: 16rem;

      .logo {
        margin: 0;
      }

      .items {
        .item {
          padding: 0;
        }
      }
    }
  }
`;
