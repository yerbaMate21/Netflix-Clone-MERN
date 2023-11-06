// img
import enjoyTV from "../../assets/img/enjoyTV.png";
import download from "../../assets/img/download";
import watchEverywhere from "../../assets/img/watchEverywhere";
import kids from "../../assets/img/kids";
// video
import enjoyTV_video from "../../assets/video/enjoyTV.m4v";
import watchEverywhere_video from "../../assets/video/watchEverywhere.m4v";

import StoryCard from "./StoryCard";

const itemsData = [
  {
    imgSrc: enjoyTV,
    alt: "enjoy_TV",
    title: "Enjoy on your TV",
    text: "Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.",
    videoSrc: enjoyTV_video,
    className: {
      div: null,
      video: null,
    },
  },
  {
    imgSrc: download,
    alt: "download",
    title: "Download your shows to watch offline",
    text: "Save your favorites easily and always have something to watch.",
    videoSrc: null,
    className: {
      div: " row-reverse",
      video: null,
    },
  },
  {
    imgSrc: watchEverywhere,
    alt: "watch_Everywhere",
    title: "Watch everywhere",
    text: "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.",
    videoSrc: watchEverywhere_video,
    className: {
      div: null,
      video: "small-screen",
    },
  },
  {
    imgSrc: kids,
    alt: "kids",
    title: "Create profiles for kids",
    text: "Send kids on adventures with their favorite characters in a space made just for them—free with your membership.",
    videoSrc: null,
    className: {
      div: " row-reverse",
      video: null,
    },
  },
];

const StoryCardsContainer = () => {
  return (
    <>
      {itemsData.map((item, index) => (
        <StoryCard
          classNameDiv={item.className.div}
          classNameVideo={item.className.video}
          key={index}
          alt={item.alt}
          imgSrc={item.imgSrc}
          videoSrc={item.videoSrc}
          title={item.title}
          text={item.text}
        />
      ))}
    </>
  );
};

export default StoryCardsContainer;
