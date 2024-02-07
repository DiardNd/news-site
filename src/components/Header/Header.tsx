import { useState } from 'react'
import styles from './Header.module.scss'
import lupa from '../../assets/icon-lupa.png'
import menu from '../../assets/icon-menu.png'
import { Menu } from '../Menu/Menu'
import { Link } from 'react-router-dom'

export const Header = () => {
	const [hideSearch, setHideSearch] = useState(true)
	const [isMenuOpened, setIsMenuOpened] = useState(false)

	return (
		<div className={styles.container}>
			<Link to='/' className={styles.header}>
				News site
			</Link>
			<input
				className={hideSearch ? styles.hiddenSearchbar : styles.searchbar}
				type='text'
				placeholder='Search'
			/>
			<div className={styles.iconContainer}>
				<button
					className={styles.button}
					onClick={() => setHideSearch(!hideSearch)}
				>
					<img className={styles.icon} src={lupa} alt='icon-search' />
				</button>
				<button
					className={styles.button}
					onClick={() => {
						setIsMenuOpened(!isMenuOpened)
					}}
				>
					<img className={styles.icon} src={menu} alt='icon-menu' />
				</button>
			</div>
			<Menu isOpened={isMenuOpened} />
		</div>
	)
}
