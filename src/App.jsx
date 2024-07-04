import { useState, createContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
// import Chat from './pages/chat/Chat';
import PopUp from "./components/PopUp";
import Dashboard from "./components/DashBoard";
import Layout from "./layouts/Layout";
import Home from "./components/Home";
import Register from "./components/Register";
import CarRentalForm from "./components/CarRentalForm";
// import RegisterPage from "./components/loginPage/RegisterPage";
// import LoginPage from "./components/loginPage/Login";
// import NewMessage from "./components/NewMessage";
// import EmailsTypeLayout from "./layouts/EmailsTypeLayout";
// import EmailsListLayout from "./layouts/EmailsListLayout";
// import ForgotPassword from "./components/loginPage/ForgotPassword";
export const PopupContext = createContext(true);

export default function App() {
  const [popUpContent, setPopUpContent] = useState("");

  return (
    <PopupContext.Provider value={{ popUpContent, setPopUpContent }}>
      <div>
        <Routes>
          <Route path="register" element={<Register />} />
          <Route path="" element={<Layout />}>
            <Route path="dashboard/:categoryName" element={<Dashboard />} />
            <Route path=":categoryName" element={<Home />} />
          </Route>
        </Routes>
        {popUpContent && <PopUp />}
      </div>
    </PopupContext.Provider>
  );
}


