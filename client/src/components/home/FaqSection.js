import { useState } from "react";
import styled from "styled-components";
import Divider from "./Divider";
import FaqAccordion from "./FaqAccordion";

const FaqSection = () => {
  const itemsData = [
    {
      title: "What is Netflix?",
      description: {
        part_1:
          "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
        part_2: `You can watch as much as you want, whenever you want without a single commercial – all for one low monthly price. There's always something new to discover and new TV shows and movies are added every week!`,
      },
    },
    {
      title: "How much does Netflix cost?",
      description: {
        part_1:
          "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from 29 zł to 60 zł a month. No extra costs, no contracts.",
        part_2: null,
      },
    },
    {
      title: "Where can I watch?",
      description: {
        part_1:
          "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.",
        part_2: `You can also download your favorite shows with the iOS, Android, or Windows 10 app. Use downloads to watch while you're on the go and without an internet connection.Take Netflix with you anywhere.`,
      },
    },
    {
      title: "How do I cancel?",
      description: {
        part_1:
          "Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.",
        part_2: null,
      },
    },
    {
      title: "What can I watch on Netflix?",
      description: {
        part_1:
          "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.",
        part_2: null,
      },
    },
    {
      title: "Is Netflix good for kids?",
      description: {
        part_1:
          "The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space.",
        part_2:
          "Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see.",
      },
    },
  ];

  const [openId, setOpenId] = useState(null);

  const handleToggle = (id) => {
    setOpenId(openId !== id ? id : null);
  };

  return (
    <Container>
      <Divider />
      <h1>Frequently Asked Questions</h1>
      {itemsData.map((item, index) => (
        <FaqAccordion
          key={index}
          id={index}
          title={item.title}
          description_1={item.description.part_1}
          description_2={item.description.part_2}
          toggle={handleToggle}
          open={openId === index}
        />
      ))}
    </Container>
  );
};

export default FaqSection;

const Container = styled.div`
  background-color: black;

  h1 {
    padding: 3rem 1rem 2rem 1rem;
    text-align: center;
    display: flex;
    justify-content: center;
    background-color: black;
  }
`;
