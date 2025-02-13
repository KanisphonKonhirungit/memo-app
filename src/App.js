import React from "react";
import { Routes, Route , BrowserRouter} from 'react-router-dom';
import Login from "./components/Login";
import MemoList from "./components/MemoList";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MemoList />} />
      <Route path="/auth/login" element={<Login />} />
  </Routes>
    </BrowserRouter>
  );
}

export default App;

