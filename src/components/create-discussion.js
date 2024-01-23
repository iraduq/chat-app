const API = 'http://172.16.1.134:8000/api'
const CONVERSATIONS_ENDPOINT = '/conversations'

async function createConversation(selectedContacts) {
  try {
    const response = await fetch(`${API}${CONVERSATIONS_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contacts: selectedContacts,
      }),
    })

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error creating conversation:', error)
    throw error
  }
}

export { createConversation }
