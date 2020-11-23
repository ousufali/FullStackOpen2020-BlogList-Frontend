import React, { useState } from 'react'
import BlogServices from '../services/blogs'


const Blog = ({ blog, blogs, setBlog, user }) => {

  const [showDetails, setShowDetails] = useState(false)
  const [canDelete, setCanDelete] = useState(false)



  const blogstyle = {
    border: 'solid',
    borderWidth: 2,
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5

  }

  const toggdetails = () => setShowDetails(!showDetails)


  const updateLike = async () => {
    console.log("like clicked")
    /////////////////////////////////////////////////

//////////////////////////////////////////////////////

    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }
    console.log("likes", updatedBlog.likes)

    const recievedBlog = await BlogServices.update(updatedBlog, blog.id)


    const newBlogs = [...blogs]
    const blogIndex = newBlogs.findIndex(x => x.id === blog.id)
    newBlogs.splice(blogIndex, 1, recievedBlog)
    newBlogs.sort((a, b) => a.likes - b.likes)
    setBlog(newBlogs)
  }
  const deleteBlog = async () => {
    const condition = window.confirm(`Remove blog '${blog.title}'`)
    if (condition) {
      const deletedBlog = await BlogServices.remove(blog.id)

      const newBlogs = [...blogs]
      const blogIndex = newBlogs.findIndex(x => x.id === blog.id)
      newBlogs.splice(blogIndex, 1)
      newBlogs.sort((a, b) => a.likes - b.likes)
      setBlog(newBlogs)
    }
  }

  const Details = () => {


    return (
      <>
        <button  onClick={toggdetails}>hide</button>
        <div className="url">
          {blog.url}
        </div>
        <div className="likes">
          likes {blog.likes} <button onClick={updateLike}>like</button>
        </div>
        <div className="author">
          {blog.author}
        </div>
        <div>
          {(user.id === blog.user.id) ? <button onClick={deleteBlog}>delete</button> : ''}
        </div>
      </>

    )
  }

  return (<div style={blogstyle} className="title" >
    {blog.title} {showDetails ? <Details></Details> : <button onClick={toggdetails}>view</button>}
  </div>)
}

export default Blog
