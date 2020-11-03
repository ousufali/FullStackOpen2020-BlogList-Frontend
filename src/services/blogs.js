import axios from 'axios'
const baseUrl = '/api/blogs'


let token

const setToken = (usertoken) => {
  token = `bearer ${usertoken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  console.log("new saved return blog:    ", response.data)
  return response.data
}

const update = async (newBlog, id) => {
  const config = {
    headers: { Authorization: token }
  }
  const url = `${baseUrl}/${id}`
  const response = await axios.put(url, newBlog, config)
  console.log("updated return blog:    ", response.data)
  return response.data

}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const url = `${baseUrl}/${id}`
  const response = await axios.delete(url, config)
  console.log("deleted return blog:    ", response.data)
  return response.data

}

export default { getAll, setToken, create, update, remove }