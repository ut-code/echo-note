import { Routes, Route } from "react-router-dom";
import Home from "./pages";
import UserInfo from "./pages/user";
import EditPage from "./pages/edit";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/user/:uuid" element={<UserInfo />}></Route>
      <Route path="/edit" element={<EditPage />}></Route>
    </Routes>
  );
}

export default App;
