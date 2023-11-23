import styled from "styled-components";
import { useEffect, useState } from "react";
import SliderControl from "./SliderControl";
import SliderItem from "./SliderItem";
import useWindowSize from "../../hooks/useWindowSize";

const Slider = (props) => {
  const [visibleItems, setVisibleItems] = useState(5);

  const { movies } = props;
  const totalItems = movies.length;

  const { width } = useWindowSize();
  console.log(width);

  useEffect(() => {
    handleWindowResize(window);
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  const handleWindowResize = () => {
    if (window.innerWidth >= 1440) {
      setVisibleItems(6);
    } else if (window.innerWidth >= 960) {
      setVisibleItems(5);
    } else if (window.innerWidth >= 768) {
      setVisibleItems(4);
    } else if (window.innerWidth >= 600) {
      setVisibleItems(3);
    } else if (window.innerWidth >= 400) {
      setVisibleItems(2);
    } else {
      setVisibleItems(1);
    }
  };

  return (
    <Container>
      <div className="slider">
        <SliderControl arrowDirection="left" />
        <div className="content">
          {movies.map((movie) => (
            <SliderItem
              key={movie.id}
              movie={movie}
              width={100 / visibleItems}
            />
          ))}
        </div>
        <SliderControl arrowDirection="right" />
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
