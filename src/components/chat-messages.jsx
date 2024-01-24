import React, { useEffect, useState } from 'react'
import { ChatMessage } from './chat-message'
import { ChatInput } from './chat-input'

const discussionId = '921772a4-b673-479f-8586-b2bffd3348b3'
const userId = '19b22709-8dcc-4a7c-ba65-e6eeecfa5162'

const API = `http://192.168.0.31:8000/api/discussions/${discussionId}/messages?user_id=${userId}`

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
