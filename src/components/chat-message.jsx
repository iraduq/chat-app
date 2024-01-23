import { Avatar } from '@mantine/core'

export function ChatMessage({ value, userName, isMe }) {
  return (
    <div
      className={`rounded-lg border-0 p-5 ${isMe ? ' border-l-8 border-blue-400 bg-blue-100' : 'border-r-8 border-green-400 bg-green-100'}`}>
      <div className={`flex items-center  ${isMe ? '' : 'flex-row-reverse'}`}>
        <Avatar color={isMe ? 'blue' : 'lime'} size="lg" className="mr-4">
          {userName.charAt(0).toUpperCase()}
        </Avatar>

        {value}
      </div>
    </div>
  )
}
