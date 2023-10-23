import visa from "../../assets/img/VISA.png";
import mastercard from "../../assets/img/MASTERCARD.png";
import amex from "../../assets/img/AMEX.png";
import dinners from "../../assets/img/DINERS.png";
import jcb from "../../assets/img/JCB.png";

const CardType = (cardNumber) => {
  let card;

  const visaRegex = /^[4]/;
  const mastercardRegex = /^(2{1}|5{1})/;
  const amexpRegex = [/^(34{1})|(37{1})/];
  const dinersRegex = [
    /^(38{1})/,
    /^(300{1})/,
    /^(301{1})/,
    /^(302{1})/,
    /^(303{1})/,
    /^(304{1})/,
    /^(305{1})/,
  ];
  const jcbRegex = /^(35{1})/;

  if (visaRegex.test(cardNumber)) {
    card = visa;
  }
  if (mastercardRegex.test(cardNumber)) {
    card = mastercard;
  }
  if (amexpRegex.some((regex) => regex.test(cardNumber))) {
    card = amex;
  }
  if (dinersRegex.some((regex) => regex.test(cardNumber))) {
    card = dinners;
  }
  if (jcbRegex.test(cardNumber)) {
    card = jcb;
  }

  return card;
};

const formatCardNumber = (value) => {
  let v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
  let matches = v.match(/\d{4,16}/g);
  let match = (matches && matches[0]) || "";
  let parts = [];
  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }
  if (parts.length) {
    return parts.join(" ");
  } else {
    return value;
  }
};

export { CardType };
export default formatCardNumber;
