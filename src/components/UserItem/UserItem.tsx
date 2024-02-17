import { useAppDispatch, useAppSelector } from '../../hooks';
import { ModalType, toggleSetModal } from '../../store/modules/modal/modalSlice';
import { getCurrentImage } from '../../utils';
import { PostForm } from '../PostForm';

import styles from './UserItem.module.scss';

export const UserItem = () => {
  const user = useAppSelector(state => state.auth.authUser);
  const dispatch = useAppDispatch();

  const handleOpenModal = () => {
    dispatch(toggleSetModal({ isOpen: true, modalType: ModalType.EDIT_USER   }));
  };

  const toLocaleDate = (payload: string) => {
    return new Date(payload).toLocaleString();
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
          <strong>Created At:</strong> {toLocaleDate(user.createdAt)}
        </p>
        <p>
          <strong>Updated At:</strong> {toLocaleDate(user.updatedAt)}
        </p>
        <button
          onClick={handleOpenModal}
          className={styles.button}>
					Edit
        </button>
      </div>
      <div className={styles.rightBlock}>
        <PostForm />
      </div>
    </div>
  );
};
