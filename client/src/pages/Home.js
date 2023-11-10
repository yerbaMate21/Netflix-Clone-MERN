import styled from "styled-components";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useUserDetailsContext } from "../hooks/useUserDetailsContext";
import LoadingPage from "./LoadingPage";
import Netflix from "./Netflix";
import Background from "../components/Background";
import bgHome from "../assets/img/background_home.jpg";
import bgBreakingBad from "../assets/img/breakingBad.jpg";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import StoryCardsContainer from "../components/home/StoryCardsContainer";
import FaqSection from "../components/home/FaqSection";
import CreateEmail from "../components/signup/CreateEmail";
import FinishRegisterButton from "../components/FinishRegisterButton";
import Divider from "../components/home/Divider";
import Footer from "../components/home/Footer";

const Home = () => {
  const { user } = useAuthContext();
  const { userDetails, dispatch } = useUserDetailsContext();

  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    if (user) {
      fetchUserDetails();
    }
  }, [user, dispatch]);

  const fetchUserDetails = async () => {
    setIsLoading(true);

    const response = await fetch("/api/userDetails", {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "SET_USERDETAILS", payload: json });
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          {userDetails && userDetails.length > 0 ? (
            <Netflix user={user} userDetails={userDetails} />
          ) : (
            <HomeContainer>
              <div className="top-section">
                <Background image={user ? bgBreakingBad : bgHome} />
                <Navbar />
                <div className="content">
                  <Hero />
                </div>
              </div>
              <div className="bottom-section">
                <StoryCardsContainer />
                <FaqSection />
                <div className="submit-container">
                  {user ? <FinishRegisterButton /> : <CreateEmail />}
                </div>
              </div>
              <footer>
                <Divider />
                <Footer />
              </footer>
            </HomeContainer>
          )}
        </>
      )}
    </>
  );
};

export default Home;

const HomeContainer = styled.div`
  .top-section {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    display: grid;
    padding: 0 12%;

    .content {
      margin-top: 12rem;
    }
  }

  .bottom-section {
    .submit-container {
      padding: 0 12%;
    }
  }

  @media screen and (max-width: 1280px) {
    .top-section {
      padding: 0 3%;
    }
  }

  @media screen and (max-width: 960px) {
    .top-section {
      .content {
        margin-top: 6rem;
      }
    }
  }

  @media screen and (max-width: 960px) and (min-width: 600px) {
    .top-section {
      min-height: 80vh;
    }
  }

  @media screen and (max-width: 600px) {
    .top-section {
      min-height: 80vh;

      .content {
        margin-top: 2rem;
      }
    }
  }
`;
