const emailValidator = (email) => {
  const regex = /[^\s@]+@[^\s@]+\.[^\s@]+/;

  if (!email) {
    return "Email is required";
  } else if (!regex.test(email)) {
    return "Please enter a valid email address.";
  }

  return "";
};

const passwordValidator = (password) => {
  const regex = /^[\w@_-]{6,60}$/i;

  if (!password) {
    return "Password is required";
  } else if (password.length < 6 || password.length > 60) {
    return "Password should be between 6 and 60 characters.";
  } else if (!regex.test(password)) {
    return "Please enter a valid password.";
  }

  return "";
};

const cardNumberValidator = (cardNumber) => {
  const visaRegex = /^[4][0-9_ ]{18}/;
  const mastercardRegex = /^[2,5][0-9_ ]{18}/;
  const amexpRegex = [/^(34[0-9_ ]{16})/, /^(37[0-9_ ]{16})/];
  const dinersRegex = [
    /^(38[0-9_ ]{15})/,
    /^(300[0-9_ ]{15})/,
    /^(301[0-9_ ]{15})/,
    /^(302[0-9_ ]{15})/,
    /^(303[0-9_ ]{15})/,
    /^(304[0-9_ ]{15})/,
    /^(305[0-9_ ]{15})/,
  ];
  const jcbRegex = /^(35[0-9_ ]{17})/;

  if (!cardNumber) {
    return "Please enter a card number.";
  } else if (visaRegex.test(cardNumber)) {
    return "";
  } else if (mastercardRegex.test(cardNumber)) {
    return "";
  } else if (amexpRegex.some((regex) => regex.test(cardNumber))) {
    return "";
  } else if (dinersRegex.some((regex) => regex.test(cardNumber))) {
    return "";
  } else if (jcbRegex.test(cardNumber)) {
    return "";
  } else {
    return "Please enter a valid card number.";
  }
};

const expirationDateValidator = (expirationDate) => {
  const regex = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;

  let date = new Date();

  let month = date.getMonth();
  let fullYear = date.getFullYear();
  let shortYear = parseInt(date.getFullYear().toString().substr(2));

  let enteredMonth = parseInt(expirationDate.substr(0, 2));
  let enteredYear = parseInt(expirationDate.substr(3));

  if (!expirationDate) {
    return "Please enter an expiration date.";
  } else if (
    !regex.test(expirationDate) ||
    enteredYear < shortYear ||
    enteredYear > shortYear + 15
  ) {
    return `Expiration Year must be between ${fullYear} and ${fullYear + 15}.`;
  } else if (enteredMonth <= month && enteredYear === shortYear) {
    return "The expiration date you entered is in the past.";
  }

  return "";
};

const cvvValidator = (cvv) => {
  const regex = /^[0-9]+$/;

  if (!cvv) {
    return "Please enter a CVV.";
  } else if (!regex.test(cvv) || cvv.length < 3) {
    return "Please enter a valid CVV code.";
  }

  return "";
};

const nameValidator = (name) => {
  const regex = /([A-Z][a-zA-Z]*)/;

  if (!name) {
    return "Name is required.";
  } else if (!regex.test(name)) {
    return "Please enter a valid name.";
  }

  return "";
};

let validation = {
  errors: {},
  isValid: false,
};

function validateInput(input) {
  if (input) {
    if (input.name === "email") {
      validation.errors = emailValidator(input.value);
    }

    if (input.name === "password") {
      validation.errors = passwordValidator(input.value);
    }

    if (input.name === "cardNumber") {
      validation.errors = cardNumberValidator(input.value);
    }

    if (input.name === "expirationDate") {
      validation.errors = expirationDateValidator(input.value);
    }

    if (input.name === "cvv") {
      validation.errors = cvvValidator(input.value);
    }

    if (input.name === "name") {
      validation.errors = nameValidator(input.value);
    }

    if (input.value && !validation.errors) {
      validation.isValid = true;
    } else if (!input.value || validation.errors) {
      validation.isValid = false;
    }

    return validation;
  }
}

export default validateInput;
