import styled from "styled-components";

const PlanForm = ({ plan, handleChange, isScrolled, myRef }) => {
  return (
    <Container>
      <form
        className={`flex column a-end ${isScrolled && "fixed"}`}
        ref={myRef}
      >
        <div className="items">
          <label>
            <input
              type="radio"
              id="1"
              name="Basic"
              value="Basic"
              checked={plan === "Basic"}
              className={plan === "Basic" ? "active" : null}
              onChange={handleChange}
            />
            <span>Basic</span>
          </label>
          <label>
            <input
              type="radio"
              id="2"
              name="Standard"
              value="Standard"
              checked={plan === "Standard"}
              className={plan === "Standard" ? "active" : null}
              onChange={handleChange}
            />
            <span>Standard</span>
          </label>
          <label>
            <input
              type="radio"
              id="3"
              name="Premium"
              value="Premium"
              checked={plan === "Premium"}
              className={plan === "Premium" ? "active" : null}
              onChange={handleChange}
            />
            <span>Premium</span>
          </label>
        </div>
      </form>
    </Container>
  );
};

export default PlanForm;

const Container = styled.div`
  form {
    padding: 12px 0;

    .items {
      width: 60%;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      margin-left: 50%;

      label {
        width: 7.5rem;
        height: 7.5rem;
        margin: auto;
        position: relative;

        input {
          position: absolute;
          visibility: hidden;
        }

        span {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.1rem;
          font-weight: 500;
          background-color: #e50914;
          border-radius: 0.15rem;
          color: white;
          opacity: 0.6;
        }
      }
    }

    input.active ~ span {
      opacity: 1;
      box-shadow: 0 0 4px 0 #e50914;
    }

    input.active ~ span::after {
      border: 10px solid transparent;
      border-top-color: #e50914;
      content: "";
      display: block;
      left: 50%;
      position: absolute;
      top: 100%;
      transform: translateX(-50%);
    }
  }

  form.fixed {
    position: fixed;
    top: 0;
    width: 70%;
    background-color: white;
  }

  @media screen and (max-width: 1280px) {
    form.fixed {
      width: 90%;
    }
  }

  @media screen and (max-width: 950px) {
    form {
      .items {
        label {
          width: 5.5rem;
          height: 5.5rem;
        }
      }
    }
  }

  @media screen and (max-width: 600px) {
    form {
      display: flex;
      flex-direction: row;
      align-items: center;

      .items {
        width: 100%;
        min-width: 16rem;
        margin-left: 0;
        gap: 0.5rem;

        label {
          width: 100%;
          height: 4.5rem;
        }
      }
    }

    form.fixed {
      padding: 12px 1.8rem;
      transform: translateX(-1.8rem);
    }
  }
`;
