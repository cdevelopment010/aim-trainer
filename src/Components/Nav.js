import { useState } from "react"
import navStyles from '@/styles/Nav.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faTwitch, faYoutube, faDiscord } from "@fortawesome/free-brands-svg-icons";


export default function Nav() {

    const [menuOpen,setMenuOpen] = useState(false)

    function openMenu() {
        setMenuOpen(true);
    }

    function closeMenu() {
        setMenuOpen(false)
    }

    return(
        <div className={navStyles.navContainer}>
            {
                !menuOpen &&
                <div className={navStyles.openMenu}>
                    <FontAwesomeIcon icon={faBars} className={`text-colour-4 cursor-pointer`} onClick={openMenu}/>
                </div>
            }
            {
                menuOpen &&
                <div className={` ${navStyles.navOpen} text-colour-white-60`}>  

                    <FontAwesomeIcon icon={faTimes} className={`text-colour-4 cursor-pointer ${navStyles.closeMenu}`} onClick={closeMenu} />
                    <nav className={`d-flex flex-column h-100 align-center justify-content-between `}>
                        <ul className={`d-flex flex-column gap-10 h-75 justify-content-center`}>
                            <li className={navStyles.navHover}>Menu option #1</li>
                            <li className={navStyles.navHover}>Menu option #2</li>
                            <li className={navStyles.navHover}>Menu option #3</li>
                        </ul>
                        <div className={navStyles.socials}>
                            <ul className={`d-flex gap-10 m-5`}>
                                <li>
                                    <FontAwesomeIcon icon={faYoutube} className={navStyles.youtube}/>
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faTwitch} className={navStyles.twitch}/>
                                </li>
                                <li>
                                    <FontAwesomeIcon icon={faDiscord} className={navStyles.discord}/>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>  
            }
        </div>
    )
}