export type TChatRole = 'user' | 'ai'

export type TChatMessageStatus = 'loading' | 'success' | 'error'

export interface IChatMessage {
  id: string
  role: TChatRole
  content: string
  status?: TChatMessageStatus
  createdAt: number
}

export interface IChatSession {
  id: string
  title: string
  preview: string
  isPinned: boolean
  createdAt: number
  updatedAt: number
  messages: IChatMessage[]
}

export interface IChatSessionStorage {
  sessionList: IChatSession[]
  activeSessionId: string | null
}
