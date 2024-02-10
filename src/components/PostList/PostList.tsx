import { useEffect, useState } from 'react'
import { Post } from '../../types/post'
import api from '../../modules/axios'
import { PostItem } from '../PostItem/PostItem'
import styles from './PostList.module.scss'

export const PostList = () => {
	const [posts, setPosts] = useState<Post[]>([])
	useEffect(() => {
		const getPosts = async () => {
			try {
				const response = await api.get('/posts')
				console.log('response', response)
				setPosts(response.data.posts.slice(0, 8))
			} catch (error) {
				console.log(error)
			}
		}
		getPosts()
	}, [])

	if (posts.length === 0) return null

	return (
		<div className={styles.postList}>
			{posts.map(post => (
				<PostItem key={post.id} post={post} onClick={() => {}} />
			))}
		</div>
	)
}
