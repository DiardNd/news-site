import { Link } from 'react-router-dom';

import { setSelectedPost } from '../../store/modules/post/postSlice';
import { ModalType, toggleSetModal } from '../../store/modules/modal/modalSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Post } from '../../types/post';
import { getCurrentImage } from '../../utils';

import styles from './PostItem.module.scss';

type PostItemProps = {
  post: Post;
};

export const PostItem = ({ post }: PostItemProps) => {
  const reduxDispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.authUser);

  const isCurrentUserPost = user && user.id === post.authorId;

  const handleEditPost = () => {
    reduxDispatch(toggleSetModal({ isOpen: true, modalType: ModalType.EDIT_POST }));
    reduxDispatch(setSelectedPost(post));
  };

  const handleDeletePost = () => {
    reduxDispatch(toggleSetModal({ isOpen: true, modalType: ModalType.DELETE_POST }));
    reduxDispatch(setSelectedPost(post));
  };

  return (
    <div className={styles.postItem} key={post.id} id={String(post.id)}>
      <Link to={`/posts/${post.id}`}>
        <h2 className={styles.postTitle}>{post.title}</h2>
      </Link>
      <img
        className={styles.postImage}
        src={getCurrentImage(post.coverPath, 'postImage')}
        alt="image"
      />
      <p className={styles.author}>
        Author: {post.author.firstName} {post.author.lastName}
      </p>
      <p className={styles.publishedAt}>
        Published at: {new Date(post.createdAt).toLocaleString()}
      </p>
      <p className={styles.text}>{post.text}</p>
      <p className={styles.rating}>Rating: {post.rating}</p>
      <p className={styles.commentsCount}>Comments: {post.commentsCount}</p>
      {isCurrentUserPost && (
        <div>
          <button onClick={handleEditPost}>Edit</button>
          <button onClick={handleDeletePost}>Delete</button>
        </div>
      )}
    </div>
  );
};
