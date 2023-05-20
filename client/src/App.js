import { Route, Routes } from "react-router-dom";
import Signup from "./pages/signup/Signup";
import Login from "./pages/Login/Login";
import RequireUser from "./components/RequireUser";
import Home from "./components/Home/Home";

function App() {
  return (
    <>
      <Routes>
        <Route element={<RequireUser />}>
          <Route path="/home" element={<Home />} />
        </Route>

        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
