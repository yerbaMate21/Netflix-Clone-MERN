import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";

const InputContainer = (props) => {
  const location = useLocation();

  return (
    <Container>
      <div className={`input-container ${props.className}`}>
        <div className="input-box">
          <input
            id={props.id}
            className={
              (props.error || props.isValid) && !props.isLoading
                ? "border-none"
                : ""
            }
            style={
              location.pathname.includes("login")
                ? { height: "3rem" }
                : { height: "3.5rem" }
            }
            type={props.type}
            name={props.name}
            maxLength={props.maxLength}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
          />
          <div
            id="input-border"
            className={props.isValid ? "valid" : "invalid"}
          ></div>
        </div>
        <div
          id="error-message"
          className={props.error && !props.isLoading ? "visible" : ""}
        >
          <i>
            <AiOutlineCloseCircle />
          </i>
          <span>{props.error}</span>
        </div>
      </div>
    </Container>
  );
};

export default InputContainer;

const Container = styled.div`
  .input-container {
    width: 100%;
    min-width: 10rem;
    display: inline-flex;
    flex-wrap: wrap;

    .input-box {
      position: relative;
      width: 100%;

      input {
        width: 100%;
        padding: 1.2rem;
        font-size: 1rem;
        font-weight: 600;
        color: white;
        background: none;
        border-radius: 0.25rem;
        border: none;
      }

      input:focus {
        outline: 2px solid white;
        outline-offset: 2px;
      }

      input::placeholder {
        color: rgb(120, 120, 120);
      }

      #input-border {
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 0.25rem;
        border: 1.6px solid;
      }

      #input-border.valid {
        border-color: #2bb871;
        background-color: rgba(180, 180, 255, 0.2);
      }

      #input-border.invalid {
        border-color: #eb3942;
      }
    }

    #error-message {
      width: 100%;
      color: #eb3942;
      font-size: 0.9rem;
      display: inline-flex;
      gap: 0.25rem;
      line-height: 0.9;
      text-align: left;
      visibility: hidden;
    }

    #error-message.visible {
      visibility: visible;
      margin-top: 0.5rem;
      margin-bottom: 1rem;
    }
  }

  .input-container.default {
    max-width: 24rem;

    .input-box {
      input {
        height: 3.5rem;
        border: 1.6px solid rgb(120, 120, 120);
        color: white;
      }

      input:focus {
        outline-color: white;
      }

      #input-border {
        background-color: rgba(20, 20, 20, 0.7);
      }

      #input-border.valid {
        border-color: #2bb871;
        background-color: rgba(180, 180, 255, 0.2);
      }

      input.border-none {
        border: none;
      }
    }
  }

  .input-container.bordered {
    .input-box {
      input {
        height: 3.2rem;
        border: 1px solid #333333;
        color: #333333;
      }

      input:focus {
        outline-color: black;
      }

      #input-border {
        background: none;
      }

      input.border-none {
        border: none;
      }
    }
  }

  .input-container.login {
    width: 100%;

    .input-box {
      input {
        height: 3.5rem;
        background-color: rgb(51, 51, 51);
        color: white;
      }

      input:focus {
        outline: none;
        background-color: rgb(77, 77, 77);
        border-color: rgb(77, 77, 77);
      }

      input::placeholder {
        color: rgb(150, 150, 150);
      }

      input.border-none {
        border-bottom: 2px solid #e87c03;
      }
    }

    #error-message {
      color: #e87c03;
    }
  }
`;
