import styles from './PostItem.module.scss'
import { Post } from '../../types/post'
import { getCurrentImage } from '../../utils'

type PostItemProps = {
	post: Post
	onClick: () => void
}

export const PostItem = ({ post, onClick }: PostItemProps): JSX.Element => {
	return (
		<div
			className={styles.postItem}
			key={post.id}
			id={String(post.id)}
			onClick={onClick}
		>
			<h2>{post.title}</h2>
			<img
				className={styles.postImage}
				src={getCurrentImage(post.coverPath, 'image')}
				alt='image'
			></img>
			<p className={styles.author}>
				Author: {post.author.firstName} {post.author.lastName}
			</p>
			<p className={styles.publishedAt}>
				Published at: {new Date(post.createdAt).toLocaleString()}
			</p>
			<p className={styles.text}>{post.text}</p>
			<p className={styles.rating}>Rating: {post.rating}</p>
			<p className={styles.commentsCount}>Comments: {post.commentsCount}</p>
		</div>
	)
}
