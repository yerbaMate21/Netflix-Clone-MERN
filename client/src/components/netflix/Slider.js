import styled from "styled-components";
import { useEffect, useState } from "react";
import SliderControl from "./SliderControl";
import SliderItem from "./SliderItem";
import useWindowSize from "../../hooks/useWindowSize";

const Slider = ({ movies, genre, handleMovie }) => {
  const [itemsInRow, setItemsInRow] = useState(6);
  const [isMoved, setIsMoved] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [moveDirection, setMoveDirection] = useState(null);
  const [movePercentage, setMovePercentage] = useState(0);
  const [lowestVisibleIndex, setLowestVisibleIndex] = useState(0);

  const { width } = useWindowSize();
  const totalItems = movies.length;

  useEffect(() => {
    handleWindowResize();
  }, [width]);

  const handleWindowResize = () => {
    if (width >= 1440) {
      setItemsInRow(7);
    } else if (width >= 960) {
      setItemsInRow(6);
    } else if (width >= 768) {
      setItemsInRow(5);
    } else if (width >= 600) {
      setItemsInRow(4);
    } else {
      setItemsInRow(3);
    }
  };

  const renderSliderContent = () => {
    const left = [];
    const mid = [];
    const right = [];

    for (let i = 0; i < itemsInRow; i++) {
      // left
      if (isMoved) {
        if (lowestVisibleIndex + i - itemsInRow < 0) {
          left.push(totalItems - itemsInRow + lowestVisibleIndex + i);
        } else {
          left.push(i + lowestVisibleIndex - itemsInRow);
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

    const indexToDisplay = [...left, ...mid, ...right];

    if (isMoved) {
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
        <div
          className="item-container"
          key={movies[index].id}
          style={{ width: `${100 / itemsInRow}%` }}
        >
          <SliderItem movie={movies[index]} handleMovie={handleMovie} />
        </div>
      );
    }

    if (!isMoved) {
      for (let i = 0; i < itemsInRow; i++) {
        sliderContents.unshift(
          <div
            className="item-container"
            key={i}
            style={{ width: `${100 / itemsInRow}%` }}
          />
        );
      }
    }

    return sliderContents;
  };

  const handlePrev = () => {
    let newIndex;
    if (lowestVisibleIndex < itemsInRow && lowestVisibleIndex !== 0) {
      newIndex = 0;
    } else if (lowestVisibleIndex - itemsInRow < 0) {
      newIndex = totalItems - itemsInRow;
    } else {
      newIndex = lowestVisibleIndex - itemsInRow;
    }

    let newMovePercentage;
    if (lowestVisibleIndex === 0) {
      newMovePercentage = 0;
    } else if (lowestVisibleIndex - newIndex < itemsInRow) {
      newMovePercentage =
        ((itemsInRow - (lowestVisibleIndex - newIndex)) / itemsInRow) * 100;
    } else {
      newMovePercentage = 0;
    }

    setIsMoving(true);
    setMoveDirection("left");
    setMovePercentage(newMovePercentage);

    setTimeout(() => {
      setLowestVisibleIndex(newIndex);
      setIsMoving(false);
    }, 750);
  };

  const handleNext = () => {
    let newIndex;
    if (lowestVisibleIndex === totalItems - itemsInRow) {
      newIndex = 0;
    } else if (lowestVisibleIndex + itemsInRow > totalItems - itemsInRow) {
      newIndex = totalItems - itemsInRow;
    } else {
      newIndex = lowestVisibleIndex + itemsInRow;
    }

    let newMovePercentage;
    if (newIndex !== 0) {
      newMovePercentage = ((newIndex - lowestVisibleIndex) / itemsInRow) * 100;
    } else {
      newMovePercentage = 100;
    }

    setIsMoving(true);
    setMoveDirection("right");
    setMovePercentage(newMovePercentage);

    setTimeout(() => {
      setLowestVisibleIndex(newIndex);
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
      translate = `translateX(-${100 + movePercentage + 100 / itemsInRow}%)`;
    } else if (moveDirection === "left") {
      translate = `translateX(-${movePercentage + 100 / itemsInRow}%)`;
    }

    style = {
      transform: translate,
      transitionDuration: "750ms",
    };
  } else {
    style = {
      transform: `translateX(-${100 + (isMoved ? 100 / itemsInRow : 0)}%)`,
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
          {renderSliderContent()}
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

  .title {
    padding: 0 6%;
    white-space: nowrap;
  }

  .slider {
    position: relative;
    padding: 0 6%;
    white-space: nowrap;

    .content {
      line-height: 0;

      .item-container {
        transition: transform 0.3s ease;
        display: inline-block;
        cursor: pointer;
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
