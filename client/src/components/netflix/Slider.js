import styled from "styled-components";
import { useEffect, useState } from "react";
import SliderControl from "./SliderControl";
import SliderItem from "./SliderItem";
import useWindowSize from "../../hooks/useWindowSize";

const Slider = (props) => {
  const [visibleItems, setVisibleItems] = useState(5);
  const [isMoving, setIsMoving] = useState(false);
  const [moveDirection, setMoveDirection] = useState(null);

  const { movies } = props;
  const totalItems = movies.length;

  const { width } = useWindowSize();

  useEffect(() => {
    handleWindowResize();
  }, [width]);

  const handleWindowResize = () => {
    if (width >= 1440) {
      setVisibleItems(6);
    } else if (width >= 960) {
      setVisibleItems(5);
    } else if (width >= 768) {
      setVisibleItems(4);
    } else if (width >= 600) {
      setVisibleItems(3);
    } else if (width >= 400) {
      setVisibleItems(2);
    } else {
      setVisibleItems(1);
    }
  };

  const handlePrev = () => {
    console.log("prev");

    setIsMoving(true);
    setMoveDirection("left");
  };

  const handleNext = () => {
    console.log("next");

    setIsMoving(true);
    setMoveDirection("right");
  };

  let style = {};

  if (isMoving) {
    let translate = "";

    if (moveDirection === "right") {
      translate = "translateX(-50%)";
    } else if (moveDirection === "left") {
      translate = "translateX(50%)";
    }

    style = {
      transform: translate,
      transitionDuration: "500ms",
    };
  }

  return (
    <Container>
      <div className="slider">
        <SliderControl arrowDirection="left" onClick={handlePrev} />
        <div className="content" style={style}>
          {movies.map((movie) => (
            <SliderItem
              key={movie.id}
              movie={movie}
              width={100 / visibleItems}
            />
          ))}
        </div>
        <SliderControl arrowDirection="right" onClick={handleNext} />
      </div>
    </Container>
  );
};

export default Slider;

const Container = styled.div`
  .slider {
    position: relative;
    padding: 0 2rem;
    margin: 5rem 0;

    .content {
      white-space: nowrap;
      overflow-x: hidden;
      line-height: 0;
    }
  }
`;
