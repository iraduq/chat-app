import React, { useEffect, useState } from 'react'
import './style.css'

export function ChatDiscussions() {
  const [conversations, setConversations] = useState([])
  const userId = 'c4f65b98-48b9-4a32-80eb-2325558eed71'

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await fetch(`http://172.16.1.134:8000/api/discussions/?user_id=${userId}`)
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`)
        }

        const data = await response.json()
        setConversations(data)
      } catch (error) {
        console.error('Error fetching conversations:', error)
      }
    }

    fetchConversations()
  }, [userId])

  return (
    <div className="chat-discussions">
      <h2>Chat Discussions</h2>
      <ul className="conversation-list">
        {conversations.map((conversation) => (
          <li key={conversation.id} className="conversation-group">
            <strong>{conversation.name}</strong>
            {Array.isArray(conversation.contacts) ? (
              <ul className="contact-list">
                {conversation.contacts.map((contact) => (
                  <li key={contact.id}>{contact.message}</li>
                ))}
              </ul>
            ) : (
              <p>{conversation.contacts.message}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
