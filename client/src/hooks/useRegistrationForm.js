import { useState } from "react";
import validateInput from "../components/signup/Validation";

const RegistrationForm = () => {
  const [state, setState] = useState({
    email: {
      value: "",
      error: "",
      isValid: false,
    },
    password: {
      value: "",
      error: "",
      isValid: false,
    },
    cardNumber: {
      value: "",
      error: "",
      isValid: false,
    },
    expirationDate: {
      value: "",
      error: "",
      isValid: false,
    },
    cvv: {
      value: "",
      error: "",
      isValid: false,
    },
    name: {
      value: "",
      error: "",
      isValid: false,
    },
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);

  const onChange = (e) => {
    let input = e.target;

    let replacedValue = {};
    let validation = validateInput(input);
    let errors = validation.errors;
    let isValid = validation.isValid;

    if (input.name === "expirationDate") {
      replacedValue = input.value
        .replace(/^([2-9])$/g, "0$1")
        .replace(/^(1{1})([3-9]{1})$/g, "0$1/$2")
        .replace(/^0{1,}/g, "0")
        .replace(/^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g, "$1/$2");
    } else {
      replacedValue = input.value;
    }

    setState((prevState) => {
      const newState = { ...prevState };
      newState[input.name].value = replacedValue;
      if (isSubmitted || isBlurred) {
        newState[input.name].error = errors;
      }
      newState[input.name].isValid = isValid;

      return newState;
    });
  };

  const onBlur = (e) => {
    setIsBlurred(true);

    let input = e.target;

    let validation = validateInput(input);
    let errors = validation.errors;
    let isValid = validation.isValid;

    setState((prevState) => {
      const newState = { ...prevState };
      newState[input.name].error = errors;
      newState[input.name].isValid = isValid;

      return newState;
    });
  };

  const onSubmit = (e) => {
    setIsSubmitted(true);

    const inputs = e.target.querySelectorAll("#input-validation");

    [...inputs].forEach((input) => {
      let validation = validateInput(input);
      let errors = validation.errors;
      let isValid = validation.isValid;

      setState((prevState) => {
        const newState = { ...prevState };
        newState[input.name].error = errors;
        newState[input.name].isValid = isValid;

        return newState;
      });
    });
  };

  return {
    state,
    setState,
    onChange,
    onBlur,
    onSubmit,
  };
};

export default RegistrationForm;
