import { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import styles from './Header.module.scss';

import { Menu } from '../Menu';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postsCounter } from '../../store/modules/post/postSlice';

import SearchIcon from '../../shared/assets/icons-search.svg';
import MenuIcon from '../../shared/assets/icons-menu.svg';
import RightArrowIcon from '../../shared/assets/rightArrow.svg';
import LeftArrowIcon from '../../shared/assets/leftArrow.svg';

export const Header = () => {
	const [hideSearch, setHideSearch] = useState(true);
	const [find, setFind] = useState('');
	const [isMenuOpened, setIsMenuOpened] = useState(false);

	const dispatch = useAppDispatch();
	const startCountPosts = useAppSelector(state => state.post.startCountPosts);

	const nextPage = () => {
		if (startCountPosts < 80) {
			dispatch(postsCounter({ startCountPosts: startCountPosts + 8 }));
		}
	};

	const previousPage = () => {
		if (startCountPosts > 0) {
			dispatch(postsCounter({ startCountPosts: startCountPosts - 8 }));
		}
	};

	const findHandler = ({ target: { value } }: ChangeEvent<HTMLInputElement>): void => {
		setFind(value);
	};

	const handleHeaderBlur = () => {
		setIsMenuOpened(false);
	};

	return (
		<div className={styles.container}>
			<Link
				to='/'
				className={styles.header}>
				News site
			</Link>

			<button
				className={styles.buttonArrow}
				onClick={previousPage}>
				{/* <LeftArrowIcon /> */}
			</button>

			<input
				className={classNames({
					[styles.hiddenSearchbar]: hideSearch,
					[styles.searchbar]: !hideSearch,
				})}
				type='text'
				placeholder='Search'
				onChange={findHandler}
				value={find}
			/>

			<button
				className={styles.buttonArrow}
				onClick={nextPage}>
				{/* <RightArrowIcon /> */}
			</button>

			<div className={styles.iconContainer}>
				<button
					className={styles.button}
					onClick={() => setHideSearch(!hideSearch)}>
					<img
						className={styles.icon}
						src={SearchIcon}
						alt='icon-search'
					/>
				</button>
				<button
					className={styles.button}
					onClick={() => setIsMenuOpened(!isMenuOpened)}>
					<img
						className={styles.icon}
						src={MenuIcon}
						alt='icon-menu'
					/>
				</button>
			</div>
			<Menu isOpened={isMenuOpened} />
		</div>
	);
};
