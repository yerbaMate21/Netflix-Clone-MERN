import styled from "styled-components";

const Footer = () => {
  const itemsData = [
    "FAQ",
    "Media Center",
    "Redeem Gift Cards",
    "Terms of Use",
    "Corporate Information",
    "Legal Guarantee",
    "Help Center",
    "Investor Relations",
    "Buy Gift Cards",
    "Privacy",
    "Contact Us",
    "Legal Notices",
    "Account",
    "Jobs",
    "Ways to Watch",
    "Cookie Preferences",
    "Speed Test",
    "Only on Netflix",
  ];

  return (
    <Container>
      <main>
        <div className="heading">
          <a href="/*">Questions? Contact Us.</a>
        </div>
        <div className="links-container">
          {itemsData.map((item, index) => (
            <div className="item flex" key={index}>
              <a href="/*">{item}</a>
            </div>
          ))}
        </div>
        <p>Netflix Poland</p>
      </main>
    </Container>
  );
};

export default Footer;

const Container = styled.div`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);

  a {
    text-decoration: underline;
    color: rgba(255, 255, 255, 0.7);
  }

  main {
    padding: 1rem 12%;

    .heading,
    p {
      margin: 3rem 0;
      display: block;
    }

    .links-container {
      display: grid;
      grid-template-rows: repeat(6, 1fr);
      grid-auto-flow: column;
      gap: 0.75rem;
    }
  }

  @media screen and (max-width: 960px) {
    font-size: 0.8rem;

    main {
      .links-container {
        grid-template-rows: repeat(9, 1fr);
      }
    }
  }

  @media screen and (max-width: 400px) {
    main {
      .links-container {
        grid-template-rows: repeat(18, 1fr);
      }
    }
  }
`;
