import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { logOutUser } from '../../store/modules/auth/authSlice';
import { ModalType, toggleSetModal } from '../../store/modules/modal/modalSlice';

import styles from './Menu.module.scss';

interface MenuProps {
	isOpened: boolean;
}

export const Menu = ({ isOpened }: MenuProps) => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
  const userId = useAppSelector(state => state.auth.authUser?.id);

  const handleOpenModal = () => {
    dispatch(toggleSetModal({ isOpen: !isLoggedIn, modalType: ModalType.SIGN_IN }));
  };

  const handleLogOut = () => dispatch(logOutUser());

  return (
    <div
      className={classNames({
        [styles.container]: isOpened,
        [styles.hidden]: !isOpened
      })}>
      <ul className={styles.menu}>
        <Link
          to='/'
          className={styles.link}>
          <li className={styles.menuElement}>Home</li>
        </Link>
        {isLoggedIn ? (
          <Link
            to={`/users/${userId}`}
            className={styles.link}>
            <li className={styles.menuElement}>Account</li>
          </Link>
        ) : (
          <li
            className={styles.menuElement}
            onClick={handleOpenModal}>
						Sign In
          </li>
        )}
        <Link
          to='/'
          className={styles.link}>
          <li className={styles.menuElement}>Theme</li>
        </Link>
        <li
          className={classNames({
            [styles.menuElement]: isLoggedIn,
            [styles.hidden]: !isLoggedIn
          })}
          onClick={handleLogOut}>
          <Link
            to='/'
            className={styles.link}>
						Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};
