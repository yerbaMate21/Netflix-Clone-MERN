import styled from "styled-components";
import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useUserDetailsContext } from "../hooks/useUserDetailsContext";

import Navbar from "../components/Navbar";
import Background from "../components/Background";
import bgImage from "../assets/img/background_userHome.jpg";

const UserHome = () => {
  const { user } = useAuthContext();
  const { userDetails, dispatch } = useUserDetailsContext();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const response = await fetch("/api/userDetails", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_USERDETAILS", payload: json });
      }
    };

    if (user) {
      fetchUserDetails();
    }
  }, [user, dispatch]);

  return (
    <Container>
      <Navbar />
      <Background image={bgImage} />
      {userDetails && (
        <div>
          {userDetails.map((item) => (
            <div key={item._id}>
              <h4>{item.cardName}</h4>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};

export default UserHome;

const Container = styled.div`
  h4 {
    color: magenta;
  }
`;
