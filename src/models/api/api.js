import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://s3-ap-southeast-1.amazonaws.com',
  headers: {
    'content-type': 'application/json',
  },
})

const getAPIData = async (method, url, postData) => {
  const response = await instance({
    method,
    url,
    data: postData,
  })
  return response
}

export default getAPIData
