import { useEffect } from 'react';
import { PostItem } from '../PostItem/PostItem';
import styles from './PostList.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getPosts } from '../../store/modules/post';

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
