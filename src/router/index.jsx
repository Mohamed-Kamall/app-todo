import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../components/login/Login";
import Home from "../components/home/Home";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
