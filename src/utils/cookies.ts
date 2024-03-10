/**
 * Sets a cookie with the specified name, value, and optional expiration days.
 *
 * @param {string} name - The name of the cookie.
 * @param {string} value - The value to be stored in the cookie.
 * @param {number} [days=1] - Optional number of days until the cookie expires.
 */
function setCookie(name: string, value: string, days: number = 1): void {
  // Create a new date object to set the expiration date
  const expirationDate = new Date()
  expirationDate.setDate(expirationDate.getDate() + days)

  // Construct the cookie string with name, value, expiration, and path
  const cookieValue = `${name}=${encodeURIComponent(value)}; expires=${expirationDate.toUTCString()}; path=/`

  // Set the cookie in the document
  document.cookie = cookieValue
}

/**
 * Retrieves the value of a cookie by its name.
 *
 * @param {string} name - The name of the cookie to retrieve.
 * @returns {string | null} The value of the cookie, or null if not found.
 */
function getCookie(name: string): string | null {
  // Split document.cookie into an array of individual cookies
  const cookies = document.cookie.split(';')

  // Iterate through the cookies to find the one with the specified name
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=')
    const trimmedName = cookieName ? cookieName.trim() : undefined

    // If the cookie with the specified name is found, decode and return its value
    if (trimmedName && trimmedName === name && cookieValue) {
      return decodeURIComponent(cookieValue)
    }
  }

  // Return null if the cookie with the specified name is not found
  return null
}

/**
 * Deletes a cookie by setting its expiration date to a past time.
 *
 * @param {string} name - The name of the cookie to delete.
 */
function deleteCookie(name: string): void {
  // Set the cookie's expiration date to a past time to delete it
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}

// Export the cookie utility functions
export { deleteCookie, getCookie, setCookie }
