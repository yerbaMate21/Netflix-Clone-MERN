import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineCreditCard } from "react-icons/ai";
import useRegistrationForm from "../../hooks/useRegistrationForm";
import visa from "../../assets/img/VISA.png";
import mastercard from "../../assets/img/MASTERCARD.png";
import amex from "../../assets/img/AMEX.png";
import CreateImage from "../CreateImage";
import Transition from "../Transition";
import SubmitButton from "../SubmitButton";
import InputContainer from "../InputContainer";
import formatCardNumber, { CardType } from "./CardType";
import Checkbox from "./Checkbox";

const CreditOption = () => {
  const navigate = useNavigate();

  const [activeCard, setActiveCard] = useState();
  const [isConset, setIsConset] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const { state, onChange, onBlur, onSubmit } = useRegistrationForm();

  useEffect(() => {
    let card = CardType(state.cardNumber.value);

    setActiveCard(card);
  }, [state.cardNumber.value]);

  const handleToggle = () => {
    setIsChecked(true);
    setIsConset(!isConset);
  };

  const planName = localStorage.getItem("planName");
  const planPrice = localStorage.getItem("planPrice");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsChecked(true);
    onSubmit(e);
  };

  // update a user
  // credit card

  return (
    <Container>
      <Transition>
        <form onSubmit={handleSubmit} noValidate>
          <div className="text">
            <span>
              STEP <strong>3</strong> OF <strong>3</strong>
            </span>
            <h1>Set up your credit or debit card</h1>
            <div className="logos">
              <CreateImage img={visa} />
              <CreateImage img={mastercard} />
              <CreateImage img={amex} />
            </div>
          </div>
          <div className="field-container flex column">
            <div className="cardNumber-container">
              <InputContainer
                id="input-validation"
                className="bordered"
                type="text"
                name="cardNumber"
                maxLength="19"
                placeholder="Card number"
                value={formatCardNumber(state.cardNumber.value)}
                error={state.cardNumber.error}
                isValid={state.cardNumber.isValid}
                onChange={onChange}
                onBlur={onBlur}
              />
              <span className="active-icon flex a-center">
                {activeCard ? (
                  <CreateImage img={activeCard} />
                ) : (
                  <AiOutlineCreditCard />
                )}
              </span>
            </div>
            <div className="card-details">
              <InputContainer
                id="input-validation"
                className="bordered"
                type="text"
                name="expirationDate"
                maxLength="5"
                placeholder="Expiration date"
                value={state.expirationDate.value}
                error={state.expirationDate.error}
                isValid={state.expirationDate.isValid}
                onChange={onChange}
                onBlur={onBlur}
              />
              <InputContainer
                id="input-validation"
                className="bordered"
                type="text"
                name="cvv"
                maxLength="3"
                placeholder="CVV"
                value={state.cvv.value}
                error={state.cvv.error}
                isValid={state.cvv.isValid}
                onChange={onChange}
                onBlur={onBlur}
              />
            </div>
            <InputContainer
              id="input-validation"
              className="bordered"
              type="text"
              name="name"
              maxLength="40"
              placeholder="Name on card"
              value={state.name.value}
              error={state.name.error}
              isValid={state.name.isValid}
              onChange={onChange}
              onBlur={onBlur}
            />
          </div>
          <div className="order-item flex j-between">
            <div className="order-info">
              <div className="text">{planPrice}&nbsp;month</div>
              <div className="description">{planName}</div>
            </div>
            <button type="button" onClick={() => navigate("/signup/plan")}>
              <span>Change</span>
            </button>
          </div>
          <div className="user-consent">
            By clicking the “Start Paid Membership” button below, you agree to
            our Terms of Use and that you are over 18 and acknowledge the
            Privacy Statement. Netflix will automatically continue your
            membership and charge the membership fee (currently 29 zł/month) to
            your payment method until you cancel. You may cancel at any time to
            avoid future charges.
          </div>
          <Checkbox
            labelText="You agree that your membership will begin immediately, and acknowledge that you will therefore lose your right of withdrawal."
            errorText="You must acknowledge that you have read and agree to the Terms of Use to continue."
            value={isConset}
            checked={isChecked}
            onChange={handleToggle}
          />
          <SubmitButton text="Start Paid Membership" path={isConset && "/"} />
        </form>
      </Transition>
    </Container>
  );
};

export default CreditOption;

const Container = styled.div`
  margin: 2rem auto 10rem auto;
  position: sticky;

  form {
    display: grid;
    gap: 1rem;
    max-width: 28rem;
    min-width: 16rem;
    font-size: 1.3rem;

    .text {
      span {
        font-size: 0.9rem;
      }

      h1 {
        margin-bottom: 1rem;
      }

      .logos {
        font-size: 1.2rem;
      }
    }

    .field-container {
      .cardNumber-container {
        position: relative;

        .active-icon {
          position: absolute;
          top: 0;
          right: 1.25rem;
          height: 3.2rem;
          font-size: 1.8rem;
          pointer-events: none;
        }
      }

      .card-details {
        gap: 0.5rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
      }
    }

    .order-item {
      background-color: #f4f4f4;
      border-radius: 0.25rem;
      padding: 1rem;

      .order-info {
        font-size: 1rem;
        font-weight: 600;

        .description {
          color: rgb(120, 120, 120);
        }
      }

      button {
        font-size: 1rem;
        font-weight: 600;
        color: #0073eb;
        border: none;
        background: none;
        cursor: pointer;
      }

      button:hover {
        text-decoration: underline;
      }
    }

    .user-consent {
      font-size: 0.8rem;
      color: rgb(120, 120, 120);
    }
  }

  @media screen and (max-width: 600px) {
    form {
      margin: 0 2rem;
    }
  }
`;
