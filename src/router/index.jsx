import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../components/login/Login";
import Home from "../components/home/Home";
import Timeline from "../components/timeline/Timeline";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes>
      <Routes>
        <Route path="/timeline" element={<Timeline />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
