import styles from './Menu.module.scss'

export interface MenuProps {
	hide: boolean
}

export const Menu = ({ hide }: MenuProps) => {
	return (
		<div className={hide ? styles.container : styles.hidden}>
			<ul className={styles.menu}>
				<li>Главная</li>
				<li>Тема</li>
				<li>Аккаунт</li>
			</ul>
		</div>
	)
}
