import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { ModalType, toggleSetModal } from '../../store/modules/modal/modalSlice';
import { getCurrentImage } from '../../utils';
import { PostForm } from '../PostForm';
import defaultAvatar from '../../shared/assets/Default-avatar.jpg';
import { PostItem } from '../../components/PostItem';
import { getPosts } from '../../store/modules/post';

import styles from './UserItem.module.scss';

export const UserItem = () => {
  const reduxDispatch = useAppDispatch();

  const user = useAppSelector(state => state.auth.authUser);
  const myPostList = useAppSelector(state => state.post.postList);

  useEffect(() => {
    if (myPostList.length === 0) {
      reduxDispatch(getPosts());
    }
  }, []);

  const handleOpenModal = () => {
    reduxDispatch(toggleSetModal({ isOpen: true, modalType: ModalType.EDIT_USER }));
  };

  const toLocaleDate = (payload: string) => {
    return new Date(payload).toLocaleString();
  };

  if (!user) return;

  return (
    <div className={styles.userItem}>
      <div className={styles.itemInfo}>
        <div className={styles.leftBlock}>
          <div className={styles.avatar}>
            {user.avatarPath ? (
              <img
                src={getCurrentImage(user.avatarPath, 'avatar')}
                alt='Avatar'
              />
            ) : (
              <img
                src={defaultAvatar}
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
      <div className={styles.myPost}>
        <h2 className={styles.header}>My posts</h2>
        {myPostList.filter(post => post.authorId === user.id).map(post => (
          <>
            <PostItem
              key={post.id}
              post={post}
            />
          </>
        ))}
      </div>
    </div>
  );
};
