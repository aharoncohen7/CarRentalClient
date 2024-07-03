import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { IoMdContacts } from "react-icons/io";
import { FaCar } from "react-icons/fa";
import { MdCarRental } from "react-icons/md";
import styles from './style.module.css'


const mainNavIcons = [
    { icon: FaCar, name: "Cars" },
    { icon: IoMdContacts, name: "Customers" },
    { icon: MdCarRental, name: "Rentals" },
]

const MainNav = () => {
    return (
        <header>
            <div className={styles.main}>
                <ul className={styles.ul}>
                    {mainNavIcons.map((obj) => (
                        <NavLink
                            key={obj.name}
                            to={`/${obj.name.toLowerCase()}`}
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
