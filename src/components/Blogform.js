import React, { useState } from 'react'

const Blogform = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleTitle = (event) => {
        setTitle(event.target.value)
    }
    const handleAuthor = (event) => {
        setAuthor(event.target.value)
    }
    const handleUrl = (event) => {
        setUrl(event.target.value)
    }

    const addBlog = (event) => {
        event.preventDefault()

        createBlog({
            title: title,
            author: author,
            url: url,
            likes: Math.floor(Math.random() * Math.floor(200))
        })

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h2>Create new blog</h2>
            <form onSubmit={addBlog}>
                <div>
                   title:
                <input value={title} onChange={handleTitle} placeholder={"blog title"} />
                </div>
                <div>
                    author:
                <input value={author} onChange={handleAuthor} placeholder={"author name"} />
                </div>
                <div>
                    url:
                    <input value={url} onChange={handleUrl} placeholder={"url"} />
                </div>
                <button type="submit" >Create</button>
            </form>
        </div>
    )
}

export default Blogform