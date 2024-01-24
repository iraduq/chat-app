import { useState } from 'react'
import { Button } from '@mantine/core'

const API = '192.168.0.31:8000/api/discussions/921772a4-b673-479f-8586-b2bffd3348b3/messages'

async function postMessage(message) {
  if (!message) {
    return
  }

  const body = {
    discussion_id: '210a0b55-fcb4-43c3-9cd7-0c2813614334',
    user_id: 'c4f65b98-48b9-4a32-80eb-2325558eed71,',
    value: message,
  }

  const response = await window.fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await response.json()

  return data
}

export function ChatInput() {
  const [value, setValue] = useState('')

  return (
    <div className="flex items-center gap-5">
      <textarea
        className="h-15 w-full border-2"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <Button
        variant="outline"
        color="blue"
        className="block h-full w-40 p-4"
        onClick={() => postMessage(value)}
        disabled={!value.trim()}>
        Send message
      </Button>
    </div>
  )
}
