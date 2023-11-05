import { BrowserRouter, Routes, Route } from "react-router-dom";
// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
// components
import ScrollToTop from "./components/ScrollToTop";
import Registration from "./components/signup/Registration";
import RegistrationForm from "./components/signup/RegistrationForm";
import Plan from "./components/signup/Plan";
import PlanOption from "./components/signup/PlanOption";
import UserDetailsForm from "./components/signup/UserDetailsForm";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
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
          <Route path="/signup" element={<Signup children={<Plan />} />} />
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
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
