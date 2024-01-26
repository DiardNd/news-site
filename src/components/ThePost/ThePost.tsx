import styles from './ThePost.module.scss'
import { Post } from '../../types/post'

type ThePostProps = {
	post: Post
}

export const ThePost = ({ post }: ThePostProps): JSX.Element => {
	return (
		<div>
			<h2>{post.title}</h2>
			<p>{post.coverPath}</p>
			<p>Author: {post.author.firstName}</p>
			<p>Published at: {post.createdAt}</p>
		</div>
	)
}
