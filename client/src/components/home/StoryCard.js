import React from "react";
import styled from "styled-components";
import Divider from "./Divider";

const StoryCard = ({
  classNameDiv,
  classNameVideo,
  alt,
  imgSrc,
  videoSrc,
  title,
  text,
}) => {
  return (
    <Container>
      <Divider />
      <div className={`item flex a-center j-center row ${classNameDiv}`}>
        <div className="text">
          <h1>{title}</h1>
          <p>{text}</p>
        </div>
        <div className="animation flex a-center j-center">
          <div className="animation-items">
            <img src={imgSrc} alt={alt} />
            <video className={classNameVideo} autoPlay loop muted>
              <source src={videoSrc} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default StoryCard;

const Container = styled.div`
  .item {
    min-height: 32rem;
    padding: 4.5rem 12%;

    .text {
      flex-basis: 50%;
      display: grid;
      gap: 0.5rem;
      margin: auto;
      text-align: left;
      width: 100%;
      height: 100%;
    }

    .animation {
      flex-basis: 50%;
      padding: 0;
      z-index: 1;

      .animation-items {
        position: relative;

        img {
          width: 100%;
        }

        video {
          position: absolute;
          z-index: -1;
          overflow: hidden;
          width: 100%;
          height: 100%;
          max-width: 73%;
          max-height: 54%;
          top: 47%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .small-screen {
          max-width: 64%;
          top: 32%;
        }
      }
    }
  }

  .row-reverse {
    flex-direction: row-reverse;
  }

  @media screen and (max-width: 1280px) {
    .item {
      padding: 0 3%;
    }
  }

  @media screen and (max-width: 960px) {
    .item {
      min-width: 12rem;
      min-height: auto;
      flex-direction: column;
      padding: 4.5rem 1rem;

      .text {
        text-align: center;
      }
    }
  }
`;
