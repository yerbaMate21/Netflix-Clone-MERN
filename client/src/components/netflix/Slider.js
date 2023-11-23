import styled from "styled-components";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import SliderItem from "./SliderItem";

const Slider = (props) => {
  const [visibleItems, setVisibleItems] = useState(5);

  const { movies } = props;
  const totalItems = movies.length;

  useEffect(() => {
    handleWindowResize(window);
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  const handleWindowResize = (e) => {
    if (window.innerWidth >= 1440) {
      setVisibleItems(6);
    } else if (window.innerWidth >= 960) {
      setVisibleItems(5);
    } else if (window.innerWidth >= 768) {
      setVisibleItems(4);
    } else if (window.innerWidth >= 600) {
      setVisibleItems(3);
    } else {
      setVisibleItems(2);
    }
  };

  return (
    <Container>
      <div className="slider">
        <div className="control prev">
          <FaChevronLeft />
        </div>
        <div className="content">
          {movies.map((movie) => (
            <SliderItem
              key={movie.id}
              movie={movie}
              width={100 / visibleItems}
            />
          ))}
        </div>
        <div className="control next">
          <FaChevronRight />
        </div>
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

    .control {
      position: absolute;
      top: 0;
      height: 100%;
      display: flex;
      align-items: center;
      background-color: rgba(0, 255, 0, 0.3);
    }

    .prev {
      left: 0;
    }

    .next {
      right: 0;
    }

    .content {
      white-space: nowrap;
      overflow-x: hidden;
      line-height: 0;
    }
  }
`;
