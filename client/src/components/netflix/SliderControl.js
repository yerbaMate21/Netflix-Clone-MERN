import styled from "styled-components";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const SliderControl = ({ arrowDirection, onClick }) => {
  return (
    <Container>
      <div
        className={`slider-control ${arrowDirection} flex a-center j-center`}
        onClick={onClick}
      >
        {arrowDirection === "right" ? (
          <i>
            <BsChevronRight />
          </i>
        ) : (
          <i>
            <BsChevronLeft />
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
    height: 100%;
    width: 2.5rem;
    background-color: rgb(35, 35, 35);
    cursor: pointer;

    i {
      transform: scale(1.5);
    }
  }

  .slider-control:hover i {
    transform: scale(1.75);
    transition: 0.2s;
  }

  .left {
    left: 0;
  }

  .right {
    right: 0;
  }

  @media screen and (max-width: 960px) {
    .slider-control {
      width: 2rem;
    }
  }
`;
