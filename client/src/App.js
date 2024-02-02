import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useAuthContext } from "./hooks/useAuthContext";
import { useUserDetailsContext } from "./hooks/useUserDetailsContext";
import LoadingPage from "./pages/LoadingPage";
import Home from "./pages/Home";
import Netflix from "./pages/Netflix";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LikedMovies from "./pages/LikedMovies";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import Registration from "./components/signup/Registration";
import RegistrationForm from "./components/signup/RegistrationForm";
import Plan from "./components/signup/Plan";
import PlanOption from "./components/signup/PlanOption";
import UserDetailsForm from "./components/signup/UserDetailsForm";

const App = () => {
  const { user, isLoading } = useAuthContext();
  const { userDetails, dispatch } = useUserDetailsContext();

  let userName = "";

  if (user) {
    const email = user.email;
    userName = email.substring(0, email.lastIndexOf("@"));
  }

  const fetchUserDetails = async () => {
    const response = await fetch(
      "https://netflix-clone-mern-2br2.onrender.com/api/userDetails",
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "SET_USERDETAILS", payload: json });
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserDetails();
    }
  }, [user, dispatch]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          index
          path="/"
          element={
            <>
              <>{isLoading && user && <LoadingPage />}</>
              <>
                {userDetails && userDetails.length > 0 ? <Netflix /> : <Home />}
              </>
            </>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="signup">
          <Route
            path="registration"
            element={<Signup children={<Registration />} />}
          />
          <Route
            path="regform"
            element={<Signup children={<RegistrationForm />} />}
          />
          <Route index element={<Signup children={<Plan />} />} />
          <Route path="plan" element={<Signup children={<PlanOption />} />} />
          <Route
            path="editplan"
            element={<Signup children={<PlanOption />} />}
          />
          <Route
            path="creditOption"
            element={<Signup children={<UserDetailsForm />} />}
          />
        </Route>
        <Route path={`${userName}/liked`} element={<LikedMovies />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
