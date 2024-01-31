import { Link } from 'react-router-dom'
import styles from './Menu.module.scss'

export interface MenuProps {
	hide: boolean
	isLoggedIn: boolean
}

export const Menu = ({ hide, isLoggedIn }: MenuProps) => {
	return (
		<div className={hide ? styles.container : styles.hidden}>
			<ul className={styles.menu}>
				<Link to='/' className={styles.link}>
					<li className={styles.menuElement}>Home</li>
				</Link>
				<Link to={isLoggedIn ? '/users' : '/Auth'} className={styles.link}>
					<li className={styles.menuElement}>Account</li>
				</Link>
				<Link to='/' className={styles.link}>
					<li className={styles.menuElement}>Theme</li>
				</Link>
			</ul>
		</div>
	)
}
