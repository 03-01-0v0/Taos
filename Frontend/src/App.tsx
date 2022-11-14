import { lazy, useState } from "react";
import { Routes, Route } from "react-router-dom";

import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';

function App() {
  return (
    <Routes>
      <Route path="/sign-up" element={<SignUpPage />}></Route>
      <Route path="/sign-in" element={<SignInPage />}></Route>
    </Routes>
  );
}

export default App;
