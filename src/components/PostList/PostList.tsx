import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getPosts } from '../../store/modules/post';
import { PostItem } from '../PostItem';

import styles from './PostList.module.scss';

export const PostList = () => {
  const dispatch = useAppDispatch();
  const startCountPosts = useAppSelector(state => state.post.startCountPosts);
  const endCountPosts = useAppSelector(state => state.post.endCountPosts);
  const posts = useAppSelector(state => state.post.postList.slice(startCountPosts, endCountPosts));

  useEffect(() => {
    dispatch(getPosts());
  }, [startCountPosts]);

  if (posts.length === 0) return null;

  return (
    <div className={styles.postList}>
      {posts.map(post => (
        <PostItem
          key={post.id}
          post={post}
          onClick={() => {}}
        />
      ))}
    </div>
  );
};
