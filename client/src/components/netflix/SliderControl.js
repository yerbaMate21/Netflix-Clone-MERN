import styled from "styled-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const SliderControl = ({ arrowDirection, onClick }) => {
  return (
    <Container>
      <div
        className={`slider-control ${arrowDirection} flex a-center j-center`}
      >
        {arrowDirection === "right" ? (
          <i onClick={onClick}>
            <FaChevronRight />
          </i>
        ) : (
          <i onClick={onClick}>
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
    width: 6%;
    min-width: 1rem;
    height: 100%;
    font-size: 125%;
    background-color: rgba(10, 10, 10, 0.75);

    i {
      opacity: 0.5;
      cursor: pointer;
    }

    i:hover {
      transform: scale(1.25);
      transition: 0.2s ease;
      opacity: 1;
    }
  }

  .left {
    left: 0;
  }

  .right {
    right: 0;
  }
`;
