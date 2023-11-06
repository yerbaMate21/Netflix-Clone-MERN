import styled from "styled-components";

const SignLogFooter = () => {
  const itemsData = [
    "FAQ",
    "Help Center",
    "Netflix Shop",
    "Terms of Use",
    "Privacy",
    "Cookie Preferences",
    "Corporate Information",
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
      </main>
    </Container>
  );
};

export default SignLogFooter;

const Container = styled.div`
  main {
    padding: 0 6%;

    .heading {
      display: block;
      padding: 1.75rem 0;
      font-size: 1rem;
      font-weight: 500;
    }

    .links-container {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0.75rem;
      font-size: 0.9rem;
      padding-bottom: 5rem;
    }

    a {
      color: #757575;
    }

    a:hover {
      text-decoration: underline;
    }
  }

  @media screen and (max-width: 740px) {
    main {
      .links-container {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  }

  @media screen and (max-width: 500px) {
    main {
      .links-container {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }
`;
