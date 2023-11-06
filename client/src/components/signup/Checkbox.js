import styled from "styled-components";

const Checkbox = (props) => {
  return (
    <Container>
      {!props.value && props.checked && (
        <div className="error">{props.errorText}</div>
      )}
      <div className="checkbox-container">
        <input
          className={!props.value && props.checked ? "detailed" : ""}
          type="checkbox"
          value={props.value}
          onChange={props.onChange}
        />
        <label htmlFor="checkbox">{props.labelText}</label>
      </div>
    </Container>
  );
};

export default Checkbox;

const Container = styled.div`
  .error {
    font-size: 1rem;
    font-weight: 500;
    padding: 0.5rem 1rem;
    color: #a8050d;
  }

  .checkbox-container {
    display: flex;
    gap: 0.75rem;
    padding: 0.5rem 0;

    input[type="checkbox"] {
      position: relative;
      border: 2px solid #777;
      border-radius: 2px;
      background-color: white;
      cursor: pointer;
      vertical-align: text-top;
      height: 20px;
      min-width: 20px;
      max-width: 20px;
      -webkit-appearance: none;
      transition: background-color 0.3s;
    }

    input[type="checkbox"]:hover {
      box-shadow: inset 0 0 2px 2px rgba(0, 0, 0, 0.2);
    }

    input[type="checkbox"]:checked {
      background-color: black;
      border-color: black;
    }

    input[type="checkbox"]:before {
      content: "";
      position: absolute;
      right: 50%;
      top: 50%;
      width: 4px;
      height: 10px;
      border: solid white;
      border-width: 0 2px 2px 0;
      margin: -1px -1px 0 -1px;
      transform: rotate(45deg) translate(-50%, -50%);
      z-index: 2;
    }

    input[type="checkbox"].detailed {
      border-color: #a8050d;
    }

    label {
      font-size: 1rem;
      font-weight: 500;
      color: rgb(70, 70, 70);
    }
  }
`;
