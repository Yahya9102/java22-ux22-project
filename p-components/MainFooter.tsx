import styles from "./styles/mainFooter.module.css"
import RegisterForm from "./RegisterForm"
import React, { useState } from "react"





function MainFooter() {
    return(
        <div className={styles.footer_body}>
            <footer className={styles.main_footer}>
                <button type="submit" onClick={()=>{console.log("Click")}}>
                <img src="./images/Group8.png" alt="" /></button>
            </footer>
        </div>
    )
}

export default MainFooter
