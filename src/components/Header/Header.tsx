import react, { useState } from 'react';
import styles from './Front.module.scss'
import lupa from '../../assets/icon-lupa.png'
import menu from '../../assets/icon-menu.png'
import { Menu } from '../Menu/Menu'





export const Front = () => {

const [hideSearch, setHideSearch] = useState(false);
const [hideMenu, setHideMenu] = useState(false)

return(
  <>
  <div className={styles.container}>
    <span className={styles.header}>News site</span>
    <input className={hideSearch ? styles.hiddenSearchbar : styles.searchbar} type="text"
    placeholder='Search'
     />
    <button className={styles.button} onClick={()=>setHideSearch(!hideSearch)}>
      <img className={styles.icon} src={lupa} alt="icon-search"  />
      </button>
      <button className={styles.button} onClick={()=>{setHideMenu(!hideMenu)}}> 
      <img className={styles.icon} src={menu} alt="icon-menu" /> 
      </button>
      <Menu hide={hideMenu}></Menu>
  </div>
  </>
)

}
