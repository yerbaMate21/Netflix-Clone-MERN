import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserHome from "./pages/UserHome";
import NotFound from "./pages/NotFound";
// components
import ScrollToTop from "./components/ScrollToTop";
import Registration from "./components/signup/Registration";
import RegistrationForm from "./components/signup/RegistrationForm";
import Plan from "./components/signup/Plan";
import PlanOption from "./components/signup/PlanOption";
import CreditOption from "./components/signup/CreditOption";

const App = () => {
  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* <Route path='/' element={user ? <UserHome /> : <Home />} /> */}
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
            path="/signup/creditOption"
            element={<Signup children={<CreditOption />} />}
          />
        </>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
