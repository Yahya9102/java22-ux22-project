import React from "react"
import styles from "./styles/mainFooter.module.css"




function MainFooter() {
    return(
        <div className={styles.footer_body}>
            <footer className={styles.main_footer}>
                <button type="submit" className={styles.submitButton}>Submit</button>
            </footer>
        </div>
    );
}

export default MainFooter