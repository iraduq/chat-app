import React, { useEffect, useState } from 'react'
import { Badge, Button, Table } from '@mantine/core'

const API = 'http://192.168.0.31:8000/api'
const CONTACTS_ENDPOINT = '/contacts'
const DISCUSSIONS_ENDPOINT = '/discussions'

export function ChatContacts() {
  const [contacts, setContacts] = useState([])
  const [selectedContacts, setSelectedContacts] = useState([])

  async function loadContacts() {
    try {
      const response = await window.fetch(`${API}${CONTACTS_ENDPOINT}`)

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`)
      }

      const contentType = response.headers.get('content-type')

      if (contentType && contentType.includes('application/json')) {
        const data = await response.json()
        setContacts(data)
      } else {
        console.error('Error fetching contacts: Response is not JSON')
        setContacts([])
      }
    } catch (error) {
      console.error('Error fetching contacts:', error)
      setContacts([])
    }
  }

  useEffect(() => {
    loadContacts()
  }, [])

  const toggleSelectContact = (contactId) => {
    setSelectedContacts((prevSelected) => {
      if (prevSelected.includes(contactId)) {
        return prevSelected.filter((id) => id !== contactId)
      } else {
        return [...prevSelected, contactId]
      }
    })
  }

  const handleStartConversation = async () => {
    if (selectedContacts.length > 0) {
      try {
        const response = await window.fetch(`${API}${DISCUSSIONS_ENDPOINT}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contacts: selectedContacts,
            name: 'Generated Discussion',
          }),
        })

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`)
        }

        const data = await response.json()
        console.log('Conversation created:', data)
        setSelectedContacts([])
      } catch (error) {
        console.error('Error starting conversation:', error)
      }
    } else {
      alert('Select at least one contact to start a conversation.')
    }
  }

  return (
    <div>
      <h2>Contacts</h2>

      <Table verticalSpacing="md">
        <Table.Thead>
          <Table.Tr>
            <Table.Th w={300}>name</Table.Th>
            <Table.Th>id</Table.Th>
            <Table.Th>Actions</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {contacts.map((contact) => (
            <Table.Tr key={contact.id}>
              <Table.Td>{contact.name}</Table.Td>
              <Table.Td>
                <Badge color="blue" variant="light">
                  {contact.id}
                </Badge>
              </Table.Td>

              <Table.Td>
                <Button
                  variant="outline"
                  color="blue"
                  onClick={() => toggleSelectContact(contact.id)}>
                  {selectedContacts.includes(contact.id) ? 'Deselect' : 'Select'}
                </Button>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      <Button variant="outline" color="blue" onClick={handleStartConversation}>
        Start conversation
      </Button>
    </div>
  )
}
