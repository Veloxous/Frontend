/**
 * A wrapper around native fetch to intercept 401 Unauthorized responses.
 * When a 401 is encountered, we log the user out and dispatch an event
 * so the WalletProvider can update its state.
 */

export async function fetchWithAuth(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const response = await fetch(input, init)

  if (response.status === 401) {
    // Attempt to log out on the backend to clear the cookie
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } catch {
      // Ignore
    }

    // Dispatch a custom event that WalletProvider will listen to
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('auth-expired')
      window.dispatchEvent(event)
    }
  }

  return response
}
