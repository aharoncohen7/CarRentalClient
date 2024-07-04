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
          <Route path="register" element={<Register/>} />
          {/* <Route path="form" element={<CarRentalForm/>} /> */}
              {/* <Route path="login" element={<LoginPage />} />
              <Route path="forgot" element={<ForgotPassword />} /> */}
          <Route path="" element={<Layout />}>
            <Route path="dashboard/:categoryName" element={<Dashboard />} >


              {/* <Route path=":chatId" element={<Chat />} /> */}
            </Route>
            <Route path=":categoryName" element={<Home/>} >
            </Route>
          </Route>
        </Routes>
        {popUpContent && <PopUp />}
      </div>
    </PopupContext.Provider>
  );
}




// import { useState } from "react";
// // import DataTable from "./components/DataTable";

// export default function Dashboard() {
//    const types = [
//       { category: "users", i: 0 },
//       { category: "cars", i: 1 },
//       { category: "Rentals", i: 2 }
//    ];
//    const [type, setType] = useState(types[0]);

//    return (
//       <div>
//          <header className="p-4">
//             <div className='flex justify-between mb-4 border cursor-pointer text-xl bg-black text-white font-mono'>
//                <div className='flex gap-6'>
//                   {types.map((typeObj) => (
//                      <button
//                         key={typeObj.i}
//                         className="cursor-pointer first-letter:uppercase hover:text-black hover:bg-white p-2"
//                         onClick={() => setType(typeObj)}
//                         type="button"
//                      >
//                         {typeObj.category}
//                      </button>
//                   ))}
//                </div>
//                <h1 className="text-5xl font-bold font-mono">
//                   {type.category} Management
//                </h1>
//                <img src="./icon.png" alt="logo" />
//             </div>
//          </header>
//          <main className="p-4">
//             {/* <DataTable type={type.category} key={type.i} /> */}
//          </main>
//       </div>
//    );
// }
