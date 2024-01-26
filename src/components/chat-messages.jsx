import React, { useEffect, useState } from 'react'
import { ChatMessage } from './chat-message'
import { ChatInput } from './chat-input'

const discussionId = '210a0b55-fcb4-43c3-9cd7-0c2813614334'
const userId = 'c4f65b98-48b9-4a32-80eb-2325558eed71'

const API = `http://192.168.115.225:8000/api/messages/?user_id=${userId}&discussion_id=${discussionId}`

async function fetchMessages() {
  const response = await window.fetch(API)
  const data = await response.json()
  return data
}

export function ChatMessages() {
  const [messages, setMessages] = useState([])

  async function loadMessages() {
    const data = await fetchMessages()
    setMessages(data)
  }

  useEffect(() => {
    loadMessages()
  }, [])

  return (
    <div className="mx-auto max-w-screen-lg">
      <ul className="mb-4 flex h-[70vh] list-none flex-col overflow-auto border-2 p-10">
        {messages.length > 0 ? (
          messages.map((message) => (
            <li
              key={message.id}
              className={`mb-10 w-1/2 ${message.user_id === userId ? 'self-start' : 'self-end'}`}>
              <ChatMessage
                value={message.value}
                userName={message.name}
                isMe={message.user_id === userId}
              />
            </li>
          ))
        ) : (
          <p>Loading messages...</p>
        )}
      </ul>

      <ChatInput />
    </div>
  )
}
