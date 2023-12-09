import { Routes, Route } from "react-router-dom";
import Home from "./pages";
import UserInfo from "./pages/user";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/user/:uuid" element={<UserInfo />}></Route>
    </Routes>
  );
}

export default App;
