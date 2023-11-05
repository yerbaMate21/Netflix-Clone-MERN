import styled from "styled-components";
import Navbar from "../components/Navbar";
import Background from "../components/Background";
import bgImage from "../assets/img/background_userHome.jpg";

const UserPage = ({ userDetails }) => {
  console.log("User details: =>>>>", userDetails);

  return (
    <Container>
      <Navbar />
      <Background image={bgImage} />
      <div>
        {userDetails.map((item) => (
          <div key={item._id}>
            <h4>{item.cardName}</h4>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default UserPage;

const Container = styled.div`
  h4 {
    color: magenta;
  }
`;
