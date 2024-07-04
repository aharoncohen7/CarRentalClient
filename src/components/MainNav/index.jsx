import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { IoMdContacts } from "react-icons/io";
import { FaCar } from "react-icons/fa";
import { MdCarRental } from "react-icons/md";
import styles from './style.module.css'
import { IoMdStats } from "react-icons/io";
import { MdAppRegistration } from "react-icons/md";


const mainNavIcons = [
    { icon: FaCar, name: "Cars",ref: "cars" },
    { icon: IoMdContacts, name: "Customers",ref: "customers" },
    { icon: MdCarRental, name: "Rentals", ref: "rentals" },
    { icon: IoMdStats, name: "Dashboard",ref: "dashboard/rentals" },
    { icon: MdAppRegistration, name: "Registration",ref: "register" },
]

const MainNav = () => {
    return (
        <header>
            <div className={styles.main}>
                <ul className={styles.ul}>
                    {mainNavIcons.map((obj) => (
                        <NavLink
                            key={obj.name}
                            to={obj.ref}
                            className={({ isActive }) =>
                                `${isActive ? styles.active : ""} ${styles.box}`
                            }
                        >
                            <li className={styles.li} title={obj.name}>
                                <obj.icon className={styles.icon} />

                                <span className='flex'>{obj.name}</span>
                            </li>
                        </NavLink>
                    ))}
                </ul>
                {/* <h1 className="text-xl font-bold font-mono">
                    Management
                </h1> */}

                <img  style={{height:"40px", paddingRight:"20px"}} src="./icon.png" alt="logo" />
            </div>

        </header>
    )
}

export default MainNav
