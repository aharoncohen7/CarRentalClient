import { useState, createContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Chat from './pages/chat/Chat';
import PopUp from "./components/PopUp";
import MainLayout from "./layouts/MainLayout";
import NewMessage from "./components/NewMessage";
import LoginPage from "./components/loginPage/Login";
import EmailsTypeLayout from "./layouts/EmailsTypeLayout";
import EmailsListLayout from "./layouts/EmailsListLayout";
import RegisterPage from "./components/loginPage/RegisterPage";
import ForgotPassword from "./components/loginPage/ForgotPassword";
export const PopupContext = createContext(true);

export default function App() {
  const [popUpContent, setPopUpContent] = useState("");


  // useEffect(()=>{
  //   if (popUpContent) {
  //     setTimeout(() => {
  //       setPopUpContent("");
  //     }, 3000);
  //   }
  // }, [popUpContent])

  return (
    <PopupContext.Provider value={{ popUpContent, setPopUpContent }}>
          <div>
            <Routes>
              <Route path="register" element={<RegisterPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="forgot" element={<ForgotPassword />} />
              <Route path="" element={<MainLayout />}>
                <Route path=":type" element={<EmailsTypeLayout />} >
                  <Route path="new-message" element={<NewMessage />} />
                  <Route path=":chatType" element={<EmailsListLayout />} >
                    <Route path=":chatId" element={<Chat />} />
                  </Route>
                </Route>
              </Route>
            </Routes>
            {popUpContent && <PopUp />}
          </div>
    </PopupContext.Provider>
  );
}
