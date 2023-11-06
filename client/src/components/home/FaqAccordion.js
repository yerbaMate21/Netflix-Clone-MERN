import styled from "styled-components";
import { RiCloseLine } from "react-icons/ri";

const FaqAccordion = ({
  id,
  title,
  description_1,
  description_2,
  toggle,
  open,
}) => {
  return (
    <Container>
      <div className="accordion">
        <div
          className="title flex a-center j-between"
          onClick={() => toggle(id)}
        >
          <span>{title}</span>
          <i>
            <RiCloseLine className={`toggle ${open && "active"}`} />
          </i>
        </div>
        <div className={open ? "content active" : "content"}>
          <span>
            <>{description_1}</>
            <>{description_2 && <br />}</>
            <>{description_2 && <br />}</>
            <>{description_2}</>
          </span>
        </div>
      </div>
    </Container>
  );
};

export default FaqAccordion;

const Container = styled.div`
  padding: 0 12%;

  .accordion {
    width: 100%;
    min-width: 9rem;
    margin: 0.4rem auto;
    display: grid;
    gap: 0.1rem;

    .title {
      padding: 1.2rem 1.7rem;
      background-color: rgb(45, 45, 45);
      cursor: pointer;
      transition: 0.2s background-color;

      i {
        .toggle {
          font-size: 3rem;
          transform: rotate(45deg);
        }

        .toggle.active {
          transform: rotate(90deg);
        }
      }
    }

    .title:hover {
      background-color: rgb(65, 65, 65);
    }

    .content {
      background-color: #2d2d2d;
      padding: 0 1.5rem;
      max-height: 0;
      visibility: collapse;
      overflow: hidden;
      transition: all 0.25s cubic-bezier(0.5, 0, 0.1, 1) 0s;
    }

    .content.active {
      visibility: visible;
      max-height: 75rem;
      padding-bottom: 1.5rem;
      padding-top: 1.5rem;
    }
  }

  @media screen and (max-width: 960px) {
    .accordion {
      .title {
        i {
          .toggle {
            font-size: 1.5rem;
          }
        }
      }
    }
  }
`;
