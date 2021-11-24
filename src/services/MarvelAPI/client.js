import axios from 'axios'
import secrets from '../../config'

const client = axios.create({
  baseURL: secrets.marvelAPIUrl,
  params: { apikey: secrets.marvelAPIKey },
})

export default client
