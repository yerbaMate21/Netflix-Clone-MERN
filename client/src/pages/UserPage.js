import styled from "styled-components";
import Navbar from "../components/Navbar";
import Background from "../components/Background";
import Footer from "../components/home/Footer";
import bgImage from "../assets/img/background_userPage.jpg";

const UserPage = ({ userDetails }) => {
  return (
    <Container>
      <div className="top-section">
        <Navbar />
        <Background image={bgImage} />
        <div>
          <h3>User Details</h3>
          {userDetails.map((item) => (
            <div key={item._id}>
              <div className="userDetails-item">{item.cardName}</div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </Container>
  );
};

export default UserPage;

const Container = styled.div`
  .top-section {
    height: 100vh;
    border: 1px solid green;

    .userDetails-item {
      color: magenta;
    }
  }
`;
