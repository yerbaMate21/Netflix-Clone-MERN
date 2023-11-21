import styled from "styled-components";
import { useState, useEffect } from "react";
import SliderControl from "./SliderControl";
import SliderItem from "./SliderItem";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Slider = (props) => {
  const [sliderHasMoved, setSliderHasMoved] = useState(false); // boolean to display prev arrow
  const [sliderMoving, setSliderMoving] = useState(false); // boolean for slider animation
  const [movePercentage, setMovePercentage] = useState(0); // move percentage to shift slider during animation
  const [sliderMoveDirection, setSliderMoveDirection] = useState(null); // direction of movement of animation
  const [lowestVisibleIndex, setLowestVisibleIndex] = useState(0); // lowest visible index of slider content
  const [itemsInRow, setItemsInRow] = useState(5); // number of items in the slider content changed dynamically on window size

  const [slideDirection, setSlideDirection] = useState(null);
  const [isMoving, setIsMoving] = useState(false);

  const { movies } = props;
  const totalItems = props.movies.length;

  useEffect(() => {
    handleWindowResize(window);
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  // handle window resize and sets items in row
  const handleWindowResize = (e) => {
    if (window.innerWidth >= 1440) {
      setItemsInRow(6);
    } else if (window.innerWidth >= 960) {
      setItemsInRow(5);
    } else if (window.innerWidth >= 768) {
      setItemsInRow(4);
    } else if (window.innerWidth >= 600) {
      setItemsInRow(3);
    } else {
      setItemsInRow(2);
    }
  };

  if (!movies.length) return null;

  const renderSliderContent = () => {
    // gets the indexes to be displayed
    const left = [];
    const mid = [];
    const right = [];

    for (let i = 0; i < itemsInRow; i++) {
      // left
      if (sliderHasMoved) {
        if (lowestVisibleIndex + i - itemsInRow < 0) {
          left.push(totalItems - itemsInRow + lowestVisibleIndex + i);
        } else {
          left.push(i + lowestVisibleIndex - itemsInRow); // issue here
        }
      }

      // mid
      if (i + lowestVisibleIndex >= totalItems) {
        mid.push(i + lowestVisibleIndex - totalItems);
      } else {
        mid.push(i + lowestVisibleIndex);
      }

      // right
      if (i + lowestVisibleIndex + itemsInRow >= totalItems) {
        right.push(i + lowestVisibleIndex + itemsInRow - totalItems);
      } else {
        right.push(i + lowestVisibleIndex + itemsInRow);
      }
    }

    // combine indexes
    const indexToDisplay = [...left, ...mid, ...right];

    // add on leading and trailing indexes for peek image when sliding
    if (sliderHasMoved) {
      const trailingIndex =
        indexToDisplay[indexToDisplay.length - 1] === totalItems - 1
          ? 0
          : indexToDisplay[indexToDisplay.length - 1] + 1;
      const leadingIndex =
        indexToDisplay[0] === 0 ? totalItems - 1 : indexToDisplay[0] - 1;

      indexToDisplay.unshift(leadingIndex);
      indexToDisplay.push(trailingIndex);
    }

    const sliderContents = [];
    for (let index of indexToDisplay) {
      sliderContents.push(
        <SliderItem
          movie={movies[index]}
          key={`${movies[index].id}-${index}`}
          width={100 / itemsInRow}
        />
      );
    }

    // adds empty divs to take up appropriate spacing when slider at initial position
    if (!sliderHasMoved) {
      for (let i = 0; i < itemsInRow; i++) {
        sliderContents.unshift(
          <div
            className="slider-item"
            style={{ width: `${100 / itemsInRow}%` }}
            key={i}
          />
        );
      }
    }

    return sliderContents;
  };

  const handlePrev = () => {
    console.log("Previous");
    // get the new lowest visible index
    let newIndex;
    if (lowestVisibleIndex < itemsInRow && lowestVisibleIndex !== 0) {
      newIndex = 0;
    } else if (lowestVisibleIndex - itemsInRow < 0) {
      newIndex = totalItems - itemsInRow;
    } else {
      newIndex = lowestVisibleIndex - itemsInRow;
    }

    // get the move percentage
    let newMovePercentage;
    if (lowestVisibleIndex === 0) {
      newMovePercentage = 0;
    } else if (lowestVisibleIndex - newIndex < itemsInRow) {
      newMovePercentage =
        ((itemsInRow - (lowestVisibleIndex - newIndex)) / itemsInRow) * 100;
    } else {
      newMovePercentage = 0;
    }

    setSliderMoving(true);
    setSliderMoveDirection("left");
    setMovePercentage(newMovePercentage);

    setTimeout(() => {
      setLowestVisibleIndex(newIndex);
      setSliderMoving(false);
    }, 750);
  };

  const handleNext = () => {
    console.log("Next");
    // get the new lowest visible index
    let newIndex;
    if (lowestVisibleIndex === totalItems - itemsInRow) {
      newIndex = 0;
    } else if (lowestVisibleIndex + itemsInRow > totalItems - itemsInRow) {
      newIndex = totalItems - itemsInRow;
    } else {
      newIndex = lowestVisibleIndex + itemsInRow;
    }

    // get the move percentage
    let newMovePercentage;
    if (newIndex !== 0) {
      newMovePercentage = ((newIndex - lowestVisibleIndex) / itemsInRow) * 100;
    } else {
      newMovePercentage = 100;
    }

    setSliderMoving(true);
    setSliderMoveDirection("right");
    setMovePercentage(newMovePercentage);

    setTimeout(() => {
      setLowestVisibleIndex(newIndex);
      setSliderMoving(false);
    }, 750);

    // slider has moved and show the previous arrow
    if (!sliderHasMoved) {
      setSliderHasMoved(true);
    }
  };

  // let style = {};
  // if (sliderMoving) {
  //   let translate = "";
  //   if (sliderMoveDirection === "right") {
  //     translate = `translateX(-${100 + movePercentage + 100 / itemsInRow}%)`;
  //   } else if (sliderMoveDirection === "left") {
  //     translate = `translateX(-${movePercentage + 100 / itemsInRow}%)`;
  //   }

  //   style = {
  //     transform: translate,
  //     transitionDuration: "750ms",
  //   };
  // } else {
  //   style = {
  //     transform: `translateX(-${
  //       100 + (sliderHasMoved ? 100 / itemsInRow : 0)
  //     }%)`,
  //   };
  // }

  const slidePrev = () => {
    console.log("slide previous");

    setIsMoving(true);
    setSlideDirection("left");

    setTimeout(() => {
      setIsMoving(false);
    }, 500);
  };

  const slideNext = () => {
    console.log("slide next");

    setIsMoving(true);
    setSlideDirection("right");

    setTimeout(() => {
      setIsMoving(false);
    }, 500);
  };

  let style = {};
  if (isMoving) {
    let translate = "";

    if (slideDirection === "left") {
      translate = "translateX(-25%)";
    } else if (slideDirection === "right") {
      translate = "translateX(25%)";
    }

    style = {
      transform: translate,
      transitionDuration: "500ms",
    };
  }

  return (
    <Container>
      {/* <div className="slider">
        {sliderHasMoved && (
          <SliderControl arrowDirection={"left"} onClick={handlePrev} />
        )}
        <div className="content" style={style}>
          {renderSliderContent()}
        </div>
        <SliderControl arrowDirection={"right"} onClick={handleNext} />
      </div> */}

      <div className="slider">
        <div className="arrow prev" onClick={slidePrev}>
          <i>
            <FaChevronLeft />
          </i>
        </div>
        <div className="arrow next" onClick={slideNext}>
          <i>
            <FaChevronRight />
          </i>
        </div>
        <div className="items" style={style}>
          <div className="item">1</div>
          <div className="item">2</div>
          <div className="item">3</div>
          <div className="item">4</div>
          <div className="item">5</div>
          <div className="item">6</div>
          <div className="item">7</div>
          <div className="item">8</div>
        </div>
      </div>
    </Container>
  );
};

export default Slider;

const Container = styled.div`
  .slider {
    position: relative;
    background-color: rgba(255, 255, 255, 0.3);

    .arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%) !important;
    }

    .prev {
      left: 0;
    }

    .next {
      right: 0;
    }

    .items {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      height: 50px;
      overflow: hidden;

      .item {
        background-color: rgba(140, 0, 0, 0.1);
        border: 1px solid red;
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

   {
    /* .slider {
    padding: 0 4%;
    position: relative;
    margin-bottom: 40px;
    overflow-x: hidden;

    &-content {
      white-space: nowrap;
    }

    &:hover,
    &:active {
      .slider-control {
        background-color: rgba(20, 20, 20, 0.7);
      }

      .slider-control-arrow {
        display: block;
      }
    }
  } */
  }
`;
