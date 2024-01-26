export interface Root {
	posts: Post[]
	total: number
}

export interface Post {
	id: number
	title: string
	text: string
	coverPath: string
	authorId: number
	author: Author
	tags: Tag[]
	rating: number
	commentsCount: number
	createdAt: string
	updatedAt: string
}

export interface Author {
	id: number
	firstName: string
	lastName: string
	email: string
	avatarPath: string
	createdAt: string
	updatedAt: string
}

export interface Tag {
	id: number
	value: string
	createdAt: string
	updatedAt: string
}
