import styled from "styled-components";
import { useEffect, useState } from "react";
import SliderControl from "./SliderControl";
import SliderItem from "./SliderItem";
import useWindowSize from "../../hooks/useWindowSize";

const Slider = ({ movies, genre }) => {
  const [itemsInRow, setItemsInRow] = useState(5);
  const [isMoved, setIsMoved] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [moveDirection, setMoveDirection] = useState(null);

  // const { movies } = props;
  // const { category } = props;
  const totalItems = movies.length;

  const { width } = useWindowSize();

  useEffect(() => {
    handleWindowResize();
  }, [width]);

  const handleWindowResize = () => {
    if (width >= 1440) {
      setItemsInRow(6);
    } else if (width >= 960) {
      setItemsInRow(5);
    } else if (width >= 768) {
      setItemsInRow(4);
    } else if (width >= 600) {
      setItemsInRow(3);
    } else if (width >= 400) {
      setItemsInRow(2);
    } else {
      setItemsInRow(1);
    }
  };

  const handlePrev = () => {
    setIsMoving(true);
    setMoveDirection("left");

    setTimeout(() => {
      setIsMoving(false);
    }, 750);
  };

  const handleNext = () => {
    setIsMoving(true);
    setMoveDirection("right");

    setTimeout(() => {
      setIsMoving(false);
    }, 750);

    if (!isMoved) {
      setIsMoved(true);
    }
  };

  let style = {};

  if (isMoving) {
    let translate = "";

    if (moveDirection === "right") {
      translate = "translateX(-100%)";
    } else if (moveDirection === "left") {
      translate = "translateX(100%)";
    }

    style = {
      transform: translate,
      transitionDuration: "750ms",
    };
  } else {
    style = {
      transform: `translateX(${isMoved ? 100 / itemsInRow : 0}%)`,
    };
  }

  return (
    <Container>
      <div className="title">
        <h4>{genre}</h4>
      </div>
      <div className="slider">
        {isMoved && (
          <SliderControl arrowDirection="left" onClick={handlePrev} />
        )}
        <div className="content" style={style}>
          {movies.map((movie) => (
            <div
              className="item-container"
              key={movie.id}
              style={{ width: `${100 / itemsInRow}%` }}
            >
              <SliderItem movie={movie} />
            </div>
          ))}
        </div>
        <SliderControl arrowDirection="right" onClick={handleNext} />
      </div>
    </Container>
  );
};

export default Slider;

const Container = styled.div`
  display: grid;
  gap: 12%;
  padding: 2.5rem 0;
  // margin-bottom: 1rem;

  .title {
    margin: 0 6%;
    white-space: nowrap;
  }

  .slider {
    position: relative;
    padding: 0 6%;

    .content {
      white-space: nowrap;
      line-height: 0;

      .item-container {
        transition: transform 300ms ease 100ms;
        display: inline-block;
      }

      .item-container:hover ~ .item-container {
        transform: translateX(12.5%);
      }

      .item-container:hover {
        transform: scale(1.25) !important;
      }
    }

    .content:hover .item-container {
      transform: translateX(-12.5%);
    }
  }
`;
