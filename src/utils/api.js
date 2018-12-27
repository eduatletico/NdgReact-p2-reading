const api = "http://localhost:3001"


// Generate a unique token for storing your posts data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}


function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

function formatPost (post) {
  const { title, body, author, category } = post

  return {
    id: generateUID(),
    timestamp: Date.now(),
    title,
    body,
    author,
    category
  }
}
function formatComment (comment) {
  const { body, author, parentId } = comment

  return {
    id: generateUID(),
    timestamp: Date.now(),
    body,
    author,
    parentId
  }
}


export function getInitialData () {
  return Promise.all([
    getAllPosts(),
    getAllCategories(),
  ]).then(([posts, categories]) => ({
    posts,
    categories,
  }))
}


export function savePost (title, body, author, category) {
  return new Promise((ret) => {
    const formattedPost = formatPost({
      title,
      body,
      author,
      category
    })

    fetch(`${api}/posts`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formattedPost)
    }).then(res => res.json()).then(data => ret(data))

  }).then(post => post)
}

export function updatePost (id, title, body) {
  return new Promise((ret) => {
    const formattedPost = {
      title,
      body
    }

    fetch(`${api}/posts/${id}`, {
      method: 'PUT',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formattedPost)
    }).then(res => res.json()).then(data => ret(data))

  }).then(post => post)
}

export function saveDisablePost (post) {

  return new Promise((ret) => {
    fetch(`${api}/posts/${post.id}/`, {
      method: 'DELETE',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(data => ret(data))

  }).then(post => post)

}

export function saveVotePost (post, vote) {

  const voteString = vote === true ? 'upVote' : 'downVote'

  return new Promise((ret) => {
    fetch(`${api}/posts/${post.id}/`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({option: voteString})
    }).then(res => res.json()).then(data => ret(data))

  }).then(post => post)

}


export function saveComment (body, author, parentId) {
  return new Promise((ret) => {
    const formattedComment = formatComment({
      body,
      author,
      parentId
    })

    fetch(`${api}/comments`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formattedComment)
    }).then(res => res.json()).then(data => ret(data))

  }).then(post => post)

}

export function updateComment (id, body) {

  return new Promise((ret) => {
    const formattedComment = {
      body
    }

    fetch(`${api}/comments/${id}`, {
      method: 'PUT',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formattedComment)
    }).then(res => res.json()).then(data => ret(data))

  }).then(comment => comment)

}

export function saveDisableComment (comment) {
  return new Promise((ret) => {
    fetch(`${api}/comments/${comment.id}/`, {
      method: 'DELETE',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(data => ret(data))

  }).then(comment => comment)
}

export function saveVoteComment (comment, vote) {

  const voteString = vote === true ? 'upVote' : 'downVote'

  return new Promise((ret) => {
    fetch(`${api}/comments/${comment.id}/`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({option: voteString})
    }).then(res => res.json()).then(data => ret(data))

  }).then(comment => comment)

}


export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => {
        let obj = {}
        data.map(dt => obj[dt.id] = dt)
        return obj
      }
    )

export const getCategoryPosts = (category) =>
  fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json())
    .then(data => {
        let obj = {}
        data.map(dt => obj[dt.id] = dt)
        return obj
      }
    )

export const getAllCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)


export const getPostComments = (postId) =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
    .then(data => {
      let obj = {}
      data.map(dt => obj[dt.id] = dt)
      return obj
    }
  )



export const get = (bookId) =>
  fetch(`${api}/books/${bookId}`, { headers })
    .then(res => res.json())
    .then(data => data.book)

export const update = (book, shelf) =>
  fetch(`${api}/books/${book.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ shelf })
  }).then(res => res.json())

export const search = (query) =>
  fetch(`${api}/search`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  }).then(res => res.json())
    .then(data => data.books)