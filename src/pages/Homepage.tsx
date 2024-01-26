import { useEffect, useState } from 'react'
import api from '../modules/axios'
import { Post } from '../types/post'
import { ThePost } from '../components/ThePost/ThePost'

export const Homepage = (): JSX.Element => {
	const [posts, setPosts] = useState<Post[]>([])

	useEffect(() => {
		const getPosts = async () => {
			try {
				const response = await api.get('/posts')
				console.log('response', response)
				setPosts(response.data.posts)
				console.log(posts)
			} catch (error: any) {
				console.log(error)
			}
		}
		getPosts()
	}, [])

	return (
		<div>
			{posts.map(post => (
				<ThePost key={post.id} post={post} />
			))}
		</div>
	)
}
