import { Link } from 'react-router-dom'
import styles from './Menu.module.scss'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { toggleSetModal } from '../../store/modules/modal/modalSlice'
import { LogInUser, logOutUser } from '../../store/modules/auth/authSlice'

interface MenuProps {
	isOpened: boolean
}

export const Menu = ({ isOpened }: MenuProps) => {
	const dispatch = useAppDispatch()
	const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

	const handleOpenModal = () => {
		dispatch(toggleSetModal({ isOpen: !isLoggedIn }))
	}

	const handleLogOut = () => dispatch(logOutUser())

	return (
		<div className={isOpened ? styles.container : styles.hidden}>
			<ul className={styles.menu}>
				<Link to='/' className={styles.link}>
					<li className={styles.menuElement}>Home</li>
				</Link>
				<li className={styles.menuElement} onClick={handleOpenModal}>
					{isLoggedIn ? (
						<Link to='/users' className={styles.link}>
							<li className={styles.menuElement}>Account</li>
						</Link>
					) : (
						<li className={styles.menuElement}>Sign In</li>
					)}
				</li>
				<Link to='/' className={styles.link}>
					<li className={styles.menuElement}>Theme</li>
				</Link>
				<li
					className={isLoggedIn ? styles.menuElement : styles.hidden}
					onClick={handleLogOut}
				>
					Logout
				</li>
			</ul>
		</div>
	)
}
