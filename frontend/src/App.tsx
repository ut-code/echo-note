import { Routes, Route } from "react-router-dom";
import Home from "./pages";
import UserInfo from "./pages/user";
import EditPage from "./pages/edit";
import Files from "./pages/files";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/user/:uuid" element={<UserInfo />}></Route>
      <Route path="/edit" element={<EditPage />}></Route>
      <Route path="/files/:uuid" element={<Files />}></Route>
    </Routes>
  );
}

export default App;
