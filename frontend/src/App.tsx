import { Routes, Route } from "react-router-dom";
import UserInfo from "./pages/user";
import EditPage from "./pages/edit";
import AllFiles from "./pages/files";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AllFiles />}></Route>
      <Route path="/user/:uuid" element={<UserInfo />}></Route>
      <Route path="/edit/:uuid" element={<EditPage />}></Route>
      <Route path="/files" element={<AllFiles />}></Route>
    </Routes>
  );
}

export default App;
