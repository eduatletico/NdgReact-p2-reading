import { ADD_POST, EDIT_POST, RECEIVE_POSTS, SORT_POSTS_BY_DATE, SORT_POSTS_BY_VOTE, RECEIVE_CATEGORY_POSTS, DISABLE_POST, VOTE_POST } from '../actions/posts'
import { ADD_COMMENT, DISABLE_COMMENT } from '../actions/comments'

export default function posts (state = {}, action) {
	switch (action.type) {
		case RECEIVE_POSTS:
			return {
				...state,
				...action.posts
			}
		case SORT_POSTS_BY_DATE:
			let postsByDate = {}
			const postIdsByDate = Object.keys(action.posts).sort((a, b) => action.posts[b].timestamp - action.posts[a].timestamp)
			postIdsByDate.map(id => postsByDate[id] = action.posts[id])

			return postsByDate
		case SORT_POSTS_BY_VOTE:
			let postsByVote = {}
			const postIdsByVote = Object.keys(action.posts).sort((a, b) => action.posts[b].voteScore - action.posts[a].voteScore)
			postIdsByVote.map(id => postsByVote[id] = action.posts[id])

			return postsByVote
		case RECEIVE_CATEGORY_POSTS:
			return {
				...state,
				...action.posts
			}
		case DISABLE_POST:
			state[action.post.id].deleted = action.post.deleted
			let newState = {}
			Object.entries(state).map(([key, obj]) => {
				if (obj.deleted === false) {
					newState[key] = obj
				}
				return true
			})
			return {
				...newState
			}
		case ADD_POST:
			return {
				...state,
				[action.post.id]: action.post
			}
		case EDIT_POST:
			return {
				...state,
				[action.post.id]: action.post
			}
		case VOTE_POST:
			return {
				...state,
				[action.post.id]: action.post
			}
		case ADD_COMMENT :
      return {
				...state,
				[action.comment.parentId]: {
					...state[action.comment.parentId],
					commentCount: state[action.comment.parentId].commentCount + 1
				}
      }
    case DISABLE_COMMENT :
      return {
				...state,
				[action.comment.parentId]: {
					...state[action.comment.parentId],
					commentCount: state[action.comment.parentId].commentCount - 1
				}
      }
		default:
			return state
	}
}