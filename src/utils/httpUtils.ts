import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { RequestOptions } from '@/types'

const isServer = typeof window === 'undefined'

// Polyfill for fetch if it doesn't exist (browser-side)
if (!isServer && !('fetch' in window)) {
  // Install a fetch polyfill, for example, whatwg-fetch
  require('whatwg-fetch')
}

async function request(options: RequestOptions): Promise<string> {
  const axiosConfig: AxiosRequestConfig = {
    method: options.method || 'GET',
    headers: options.headers || {},
    url: options.url,
    data: options.body
    // Add other Axios options as needed
  }

  try {
    const response: AxiosResponse = await axios(axiosConfig)

    if (!response || response.status !== 200) {
      throw new Error(
        `HTTP error! Status: ${response ? response.status : 'unknown'}`
      )
    }

    console.info('response:', response)

    return response.data as string
  } catch (error: any) {
    throw new Error(`Axios request failed: ${error.message}`)
  }
}

export default request
