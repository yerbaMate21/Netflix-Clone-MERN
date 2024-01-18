import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Home from "./pages/Home";
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
  const { user } = useAuthContext();

  let userName = "";

  if (user) {
    const email = user.email;
    userName = email.substring(0, email.lastIndexOf("@"));
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <>
          <Route
            path="/signup/registration"
            element={<Signup children={<Registration />} />}
          />
          <Route
            path="/signup/regform"
            element={<Signup children={<RegistrationForm />} />}
          />
          <Route
            exact
            path="/signup"
            element={<Signup children={<Plan />} />}
          />
          <Route
            path="/signup/plan"
            element={<Signup children={<PlanOption />} />}
          />
          <Route
            path="/signup/editplan"
            element={<Signup children={<PlanOption />} />}
          />
          <Route
            path="/signup/creditOption"
            element={<Signup children={<UserDetailsForm />} />}
          />
        </>
        <Route path={`/${userName}/liked`} element={<LikedMovies />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
