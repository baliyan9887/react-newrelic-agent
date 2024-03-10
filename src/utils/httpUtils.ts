/**
 * @file request.ts
 * @description
 * This module provides a function for making HTTP requests using Axios.
 * It includes support for common request options, such as method, headers, URL, and body.
 * Additionally, it checks whether the code is running on the server or in the browser and
 * includes a polyfill for the fetch API if needed.
 */

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { RequestOptions } from '@/types'

// Check if the code is running on the server or in the browser
const isServer = typeof window === 'undefined'

// Polyfill for fetch if it doesn't exist (browser-side)
if (!isServer && !('fetch' in window)) {
  // Install a fetch polyfill, for example, whatwg-fetch
  require('whatwg-fetch')
}

/**
 * Perform an HTTP request using Axios.
 * @param options - The request options, including method, headers, URL, and body.
 * @returns A Promise that resolves to the response data as a string.
 */
async function request(options: RequestOptions): Promise<string> {
  // Convert the RequestOptions to AxiosRequestConfig
  const axiosConfig: AxiosRequestConfig = {
    method: options.method || 'GET',
    headers: options.headers || {},
    url: options.url,
    data: options.body
    // Add other Axios options as needed
  }

  try {
    // Make the HTTP request using Axios
    const response: AxiosResponse = await axios(axiosConfig)

    // Check if the response is successful (status code 200)
    if (!response || response.status !== 200) {
      throw new Error(
        `HTTP error! Status: ${response ? response.status : 'unknown'}`
      )
    }

    // Log the successful response to the console
    console.info('response:', response)

    // Return the response data as a string
    return response.data as string
  } catch (error: any) {
    // Handle errors during the Axios request
    throw new Error(`Axios request failed: ${error.message}`)
  }
}

// Export the request function as the default export
export default request
