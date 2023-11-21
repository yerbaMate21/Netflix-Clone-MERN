import styled from "styled-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const SliderControl = ({ arrowDirection, onClick }) => {
  return (
    <Container>
      <div className={`slider-control ${arrowDirection}`}>
        <div className="slider-control-arrow" onClick={onClick}>
          {arrowDirection === "right" ? <FaChevronRight /> : <FaChevronLeft />}
        </div>
      </div>
    </Container>
  );
};

export default SliderControl;

const Container = styled.div`
  .slider-control {
    position: absolute;
    top: 0;
    height: 100%;
    width: 4%;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 3rem;
    cursor: pointer;
    color: #ffffff;
    z-index: 10;

    &-arrow {
      transition-duration: 0.4s;
    }

    &.right {
      right: 0;
    }

    &.left {
      left: 0;
    }

    &-arrow {
      display: none;
    }

    &:hover,
    &:active {
      .slider-control-arrow {
        transform: scale(1.3);
      }
    }
  }
`;
