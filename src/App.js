import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Blogform from './components/Blogform'
import Togglable from './components/Togglable'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  const [notificaton, setNotification] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    // console.log("..........useeffect. .......start")
    const fetchBlogs = async () => {
      // console.log("..........fectching blog. .......start")
      const response = await blogService.getAll()
      // console.log("response:   ", response)
      response.sort((a, b) => a.likes - b.likes)
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



  const handleLogin = async (event) => {
    event.preventDefault()

    console.log("button pressed")

    try {
      const loggedUser = await loginService.login({ username, password })

      window.localStorage.setItem("LoggedInUser", JSON.stringify(loggedUser))
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
      setUsername('')
      setPassword('')

    } catch (exception) {
      console.log("login failed, invalid credentials")
      const message1 = `Wrong username or password`
      setNotification(message1)
      setTimeout(() => {
        setNotification(null)
      }, 4000)
    }


  }

  const addBlog = async (blogObject) => {

    const savedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(savedBlog))
    blogFormRef.current.toggleVisibility()
    const message = `a new blog '${blogObject.title}' by ${blogObject.author} added`


    setNotification(message)
    setTimeout(() => {
      // console.log("settimeout.........over")
      setNotification(null)
    }, 4000)

  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <div>
        <Notification message={notificaton}></Notification>
      </div>
      <div>Username
        <input name="Username" value={username} onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>Password
      <input name="Password" value={password} onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type="submit" >Login</button>

    </form>
  )

  const logout = () => {
    window.localStorage.removeItem('LoggedInUser')
    setUser(null)
  }

  const blogPage = () => (
    <div>
      <h2>Blog App</h2>
      {/* {console.log("first blog:   ", blogs[0])} */}

      <div>
        <Notification message={notificaton}></Notification>
      </div>

      <div>
        <p>{user.name} logged in {<button type="submit" onClick={logout} name="logout" >logout</button>}</p>

      </div>



      <Togglable buttonLable={"add blog"} ref={blogFormRef}>
        <Blogform createBlog={addBlog}>

        </Blogform>
      </Togglable>


      <h2>Blogs</h2>
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} blogs={blogs} setBlog={setBlogs} user={user} />
        )}
      </div>
    </div>
  )

  return (
    <div>

      {user === null ? loginForm() : blogPage()}


    </div>
  )
}

export default App