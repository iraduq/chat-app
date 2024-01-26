import React, { useEffect, useRef, useState } from 'react'
import { MantineProvider, AppShell, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { ChatControls } from './chat-controls'
import { ChatContacts } from './chat-contacts'
import { ChatDiscussions } from './chat-discussions'
import { ChatMessages } from './chat-messages'
import { theme } from '../theme'
import './style.css'
import '@mantine/core/styles.css'

export const useDisclosureWrapper = () => {
  const { state: contactsAreVisible, toggle: toggleContacts } = useDisclosure(false)

  return { contactsAreVisible, showContacts: toggleContacts, hideContacts: toggleContacts }
}

export function ChatApp() {
  const darkModeToggleRef = useRef(null)
  const [contactsAreVisible, { open: showContacts, close: hideContacts }] = useDisclosure(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.lordicon.com/lordicon.js'
    script.async = true

    document.body.appendChild(script)

    const darkModeToggle = darkModeToggleRef.current

    const handleDarkModeToggle = (event) => {
      const newIsDarkMode = event.target.checked
      setIsDarkMode(newIsDarkMode)
      document.body.classList.toggle('dark', newIsDarkMode)
    }

    darkModeToggle.addEventListener('change', handleDarkModeToggle)

    return () => {
      document.body.removeChild(script)
      darkModeToggle.removeEventListener('change', handleDarkModeToggle)
    }
  }, [])

  return (
    <MantineProvider theme={theme}>
      <AppShell header={{ height: 70 }} navbar={{ width: 300 }} padding="lg">
        <AppShell.Header className="flex items-center">
          <ChatControls showContacts={showContacts} />
        </AppShell.Header>

        <AppShell.Navbar className="p-4">
          <label htmlFor="darkmode" className="d-flex align-items-center">
            <div className="custom-checkbox mx-auto">
              <input
                type="checkbox"
                id="darkmode"
                ref={darkModeToggleRef}
                checked={isDarkMode}
                onChange={() => setIsDarkMode(!isDarkMode)}
                className="custom-checkbox-input"
              />
              <span className="custom-checkbox-label ms-2">DarkMode</span>
            </div>
          </label>
          <ChatDiscussions />
        </AppShell.Navbar>

        <AppShell.Main>
          <Modal size={700} opened={contactsAreVisible} onClose={hideContacts}>
            <ChatContacts />
          </Modal>

          <ChatMessages />
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  )
}
