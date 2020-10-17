import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [notificaton , setNotification] = useState(null)



  useEffect(() => {
    // console.log("..........useeffect. .......start")
    const fetchBlogs = async () => {
      // console.log("..........fectching blog. .......start")
      const response = await blogService.getAll()
      // console.log("response:   ", response)
      setBlogs(response)
    }

    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('LoggedInUser')
    if (loggedInUser) {
      const userjson = JSON.parse(loggedInUser)
      setUser(userjson)
      blogService.setToken(userjson.token)
    }
  }, [])

  const logout = () => {
    window.localStorage.removeItem('LoggedInUser')

  }

  const handleLogin = async (event) => {
    event.preventDefault()

    console.log("button pressed")

    try {
      const loggedUser = await loginService.login({ username, password })

      window.localStorage.setItem("LoggedInUser", JSON.stringify(loggedUser))
      setUser(loggedUser)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')

    } catch (exception) {
      console.log("login failed, invalid credentials")
    }


  }

  const addBlog = async (event) => {
    event.preventDefault()
    console.log("blog addition form handle")

    const newBlog = {
      title: title,
      author: author,
      url: url,
      likes: 42
    }

    const savedBlog = await blogService.create(newBlog)
    setBlogs(blogs.concat(savedBlog))

    setAuthor('')
    setTitle('')
    setUrl('')
    
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <div>Username
        <input name="Username" value={username} onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>Password
      <input name="Password" value={password} onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type="submit" >Login</button>

    </form>
  )


  const blogFormm = () => (
    <form onSubmit={addBlog}>
      <h2>Blogs</h2>

      <div>
          
      </div>

      <div>
        <p>{user.name} logged in {<button onClick={logout} name="logout" >logout</button>}</p>

      </div>



      <div>
        <h2>Create new</h2>
      </div>
      <div>Title
        <input value={title} name="Tile" onChange={({ target }) => setTitle(target.value)} />
      </div>
      <div>Author
        <input value={author} name="author" onChange={({ target }) => setAuthor(target.value)} />
      </div>
      <div>Url
       <input value={url} name="Url" onChange={({ target }) => setUrl(target.value)} />
      </div>

      <button type='submit'>Create</button>

      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </form>
  )

  return (
    <div>

      {user === null ? loginForm() : blogFormm()}


    </div>
  )
}

export default App