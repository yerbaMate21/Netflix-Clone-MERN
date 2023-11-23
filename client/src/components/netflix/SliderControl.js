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
    padding: 0 0.5rem;
    background-color: rgba(255, 255, 255, 0.3);
    top: 50%;
    transform: translateY(-50%) !important;
    height: 100%;
  }

  .slider-control:hover i {
    transform: scale(1.5);
  }

  .left {
    left: 0;
  }

  .right {
    right: 0;
  }
`;
