import styled from "styled-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const SliderControl = ({ arrowDirection, onClick }) => {
  return (
    <Container>
      <div
        className={`slider-control ${arrowDirection} flex a-center j-center`}
        onClick={onClick}
      >
        {arrowDirection === "right" ? (
          <i>
            <FaChevronRight />
          </i>
        ) : (
          <i>
            <FaChevronLeft />
          </i>
        )}
      </div>
    </Container>
  );
};

export default SliderControl;

const Container = styled.div`
  .slider-control {
    position: absolute;
    z-index: 1;
    top: 50%;
    transform: translateY(-50%) !important;
    width: 4%;
    min-width: 2rem;

    i {
      font-size: 2rem;
    }

    i:hover {
      transform: scale(1.5);
      transition: 0.2s ease-out;
      cursor: pointer;
    }
  }

  .left {
    left: 0;
  }

  .right {
    right: 0;
  }

  @media screen and (max-width: 600px) {
    .slider-control {
      i {
        font-size: 1.5rem;
      }
    }
  }

  @media screen and (max-width: 400px) {
    .slider-control {
      i {
        font-size: 1rem;
      }
    }
  }
`;
