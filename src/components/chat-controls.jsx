import React from 'react'
import { Button, Group } from '@mantine/core'

export function ChatControls({ showContacts }) {
  return (
    <Group>
      <Button variant="outline" color="blue">
        <div style={{ width: '25px', height: '30px' }}>
          <lord-icon
            src="https://cdn.lordicon.com/fdxqrdfe.json"
            trigger="hover"
            style={{ width: '100%', height: '100%' }}></lord-icon>
        </div>
        Discussions
      </Button>

      <Button
        variant="outline"
        onClick={() => {
          showContacts(true)
        }}>
        <div style={{ width: '25px', height: '30px' }}>
          <lord-icon
            src="https://cdn.lordicon.com/kthelypq.json"
            trigger="hover"
            style={{ width: '100%', height: '100%' }}></lord-icon>
        </div>
        Show contacts
      </Button>
    </Group>
  )
}
