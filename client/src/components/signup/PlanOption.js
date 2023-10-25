import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { AiOutlineCheck } from "react-icons/ai";
import useScrollPosition from "../../hooks/useScrollPosition";
import useElementPosition from "../../hooks/useElementPosition";
import PlanTable from "./PlanTable";
import PlanForm from "./PlanForm";
import SubmitButton from "../SubmitButton";
import Transition from "../Transition";

const PlanOption = () => {
  const location = useLocation();
  const scrollPosition = useScrollPosition();
  const myRef = useRef();
  const yPos = useElementPosition(myRef);

  const [isScrolled, setIsScrolled] = useState(false);
  const [plan, setPlan] = useState({
    name: "Premium",
    price: "60zł",
  });

  const prices = {
    Basic: "29zł",
    Standard: "43zł",
    Premium: "60zł",
  };

  const handleChange = (e) => {
    const name = e.target.name;

    setPlan((prevPlan) => {
      const newPlan = { ...prevPlan };
      newPlan.name = name;
      newPlan.price = prices[name];

      return newPlan;
    });
  };

  const handleClick = (e) => {
    e.preventDefault();

    localStorage.setItem("planName", plan.name);
    localStorage.setItem("planPrice", plan.price);
  };

  useEffect(() => {
    const handleClassName = () => {
      if (scrollPosition >= yPos + 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleClassName();
  }, [scrollPosition, yPos]);

  const planName = localStorage.getItem("planName");
  const planPrice = localStorage.getItem("planPrice");

  useEffect(() => {
    if (planName) {
      setPlan((prevPlan) => {
        const newPlan = { ...prevPlan };
        newPlan.name = planName;
        newPlan.price = planPrice;

        return newPlan;
      });
    }
  }, [planName]);

  return (
    <Container>
      <Transition>
        <main>
          <div className="context">
            {location.pathname === "/signup/plan" && (
              <span>
                STEP <strong>2</strong> OF <strong>3</strong>
              </span>
            )}
            <h1>Choose the plan that’s right for you</h1>
            <div className="item">
              <i>
                <AiOutlineCheck />
              </i>
              <p>Watch all you want. Ad-free.</p>
            </div>
            <div className="item">
              <i>
                <AiOutlineCheck />
              </i>
              <p>Recommendations just for you.</p>
            </div>
            <div className="item">
              <i>
                <AiOutlineCheck />
              </i>
              <p>Change or cancel your plan anytime.</p>
            </div>
          </div>
          <PlanForm
            plan={plan.name}
            handleChange={handleChange}
            isScrolled={isScrolled}
            myRef={myRef}
          />
          <PlanTable plan={plan.name} isScrolled={isScrolled} />
          <div className="text">
            HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability
            subject to your internet service and device capabilities. Not all
            content is available in all resolutions. See our Terms of Use for
            more details. Only people who live with you may use your account.
            Watch on 4 different devices at the same time with Premium, 2 with
            Standard and 1 with Basic.
          </div>
          <div className="submit-container" onClick={handleClick}>
            <SubmitButton text="Next" path="/signup/creditOption" />
          </div>
        </main>
      </Transition>
    </Container>
  );
};

export default PlanOption;

const Container = styled.div`
  margin: 2rem auto 10rem auto;

  main {
    width: 70%;
    min-width: 16rem;
    margin: 0 auto;
    display: grid;
    gap: 1rem;

    .context {
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

    .text {
      font-size: 0.8rem;
      color: #555;
    }

    .submit-container {
      width: 50%;
      margin: 0 auto;
    }
  }

  @media screen and (max-width: 1280px) {
    main {
      width: 90%;
    }
  }

  @media screen and (max-width: 600px) {
    margin: 2rem 2rem 4rem 2rem;

    main {
      .submit-container {
        width: 100%;
        margin: 0 auto;
      }
    }
  }
`;
