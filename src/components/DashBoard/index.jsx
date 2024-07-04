
import { useState } from "react";
import MainNav from "../MainNav";
import DataTable from "../DataTable";
import { NavLink } from "react-router-dom";
import styles from './style.module.css';


export default function Dashboard() {
   const types = [
      { name: "Customers", i: 0, ref: "/dashboard/customers" },
      { name: "cars", i: 1, ref: "/dashboard/cars" },
      { name: "Rentals", i: 2, ref: "/dashboard/rentals" }
   ];
   const [type, setType] = useState(types[0]);
   return (
      <div className={styles.main2}>
         <header  className="p-4 sticky">
            <div className='flex justify-between mb-4 border cursor-pointer text-xl bg-black text-white font-mono'>
               <div className='flex gap-6'>
                  {types.map((typeObj) => (

                     <NavLink
                        key={typeObj.name}
                        to={typeObj.ref}
                        className={({ isActive }) =>
                           `${isActive ? styles.active : ""} ${styles.box}`
                        }
                        onClick={() => setType(typeObj)}
                     >
                        <button
                           key={typeObj.i}
                           className="cursor-pointer first-letter:uppercase hover:text-black hover:bg-white p-2"
                           onClick={() => setType(typeObj)}
                           type="button"
                        >
                           {typeObj.name}
                        </button>
                     </NavLink>
                  ))}
               </div>
               <h1 className="text-5xl font-bold font-mono">
                  {type.name}
               </h1>
               <span></span>
               {/* <img src="./icon.png" alt="logo" /> */}
            </div>
         </header>
         <main className="p-4">
            {/* <MainNav/> */}
            <DataTable type={type.name} key={type.i} />
         </main>
      </div>
   );
}
