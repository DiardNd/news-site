import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCurrentImage } from '../../utils';

import { toggleSetModal } from '../../store/modules/modal/modalSlice';
import styles from './UserItem.module.scss';

export const UserItem = () => {
	const user = useAppSelector(state => state.auth.authUser);
	const dispatch = useAppDispatch();

	const handleOpenModal = () => {
		dispatch(toggleSetModal({ isOpen: true, modalType: 'EDIT USER' }));
	};

	if (!user) return;

	return (
		<div className={styles.userItem}>
			<div className={styles.leftBlock}>
				<div className={styles.avatar}>
					{user.avatarPath ? (
						<img
							src={getCurrentImage(user.avatarPath, 'avatar')}
							alt='Avatar'
						/>
					) : (
						<img
							src=''
							alt='defaultAvatar'
						/>
					)}
				</div>
				<div className={styles.userInfo}>
					<p>
						<strong>First Name:</strong> {user.firstName || 'N/A'}
					</p>
					<p>
						<strong>Last Name:</strong> {user.lastName || 'N/A'}
					</p>
					<p>
						<strong>Email:</strong> {user.email}
					</p>
				</div>
				<p>
					<strong>Created At:</strong> {new Date(user.createdAt).toLocaleString()}
				</p>
				<p>
					<strong>Updated At:</strong> {new Date(user.updatedAt).toLocaleString()}
				</p>
				<button
					onClick={handleOpenModal}
					className={styles.button}>
					Edit
				</button>
				<button
					onClick={() => {}}
					className={styles.button}>
					Post
				</button>
			</div>
			<div className={styles.rightBlock}></div>
		</div>
	);
};
