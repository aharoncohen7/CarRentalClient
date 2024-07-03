
import styles from './style.module.css'
import { Outlet } from 'react-router-dom'

import { useState } from 'react'
import MainNav from '../../components/MainNav'

const Layout = () => {
  const [isChangeList, setIsChangeList] = useState(true)
  return (

    <main className={styles.layout}>
      <MainNav />
      <div className={styles.main}>
        {/* <EmailList isChangeList={isChangeList} setIsChangeList={setIsChangeList}/> */}
      </div>
      < Outlet context={{ isChangeList, setIsChangeList }} />
    </main>


  )
}

export default Layout
