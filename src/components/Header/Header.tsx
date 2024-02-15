import classNames from 'classnames';
import { ChangeEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import MenuIcon from '../../shared/assets/icons-menu.svg?react';
import SearchIcon from '../../shared/assets/icons-search.svg?react';
import LeftArrowIcon from '../../shared/assets/leftArrow.svg?react';
import RightArrowIcon from '../../shared/assets/rightArrow.svg?react';
import { postsCounter } from '../../store/modules/post/postSlice';
import { Menu } from '../Menu';

import { getUserByToken } from '../../store/modules/auth/thunk';
import { getToken } from '../../utils';
import styles from './Header.module.scss';

export const Header = () => {
	const token = getToken();
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

	useEffect(() => {
		if (token) dispatch(getUserByToken());
	}, [dispatch, token]);

	return (
		<div className={styles.container}>
			<Link
				to='/'
				className={styles.header}>
				News site
			</Link>
			<button
				className={styles.button}
				onClick={previousPage}>
				<LeftArrowIcon
					height='15px'
					width='15px'
				/>
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
				className={styles.button}
				onClick={nextPage}>
				<RightArrowIcon
					height='15px'
					width='15px'
				/>
			</button>
			<div className={styles.iconContainer}>
				<button
					className={styles.button}
					onClick={() => setHideSearch(!hideSearch)}>
					<SearchIcon
						height='25px'
						width='25px'
					/>
				</button>
				<button
					className={styles.button}
					onClick={() => setIsMenuOpened(!isMenuOpened)}>
					<MenuIcon
						height='25px'
						width='25px'
					/>
				</button>
			</div>
			<Menu isOpened={isMenuOpened} />
		</div>
	);
};
