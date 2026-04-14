import { acceptHMRUpdate, defineStore } from 'pinia'
import type { IChatMessage, IChatSession, IChatSessionStorage } from '@/types/chat'
import { getStorage, setStorage } from '@/utils/storage'

const CHAT_SESSION_STORAGE_KEY = 'vue3-h5-chat-sessions'
const MAX_CHAT_SESSION_COUNT = 20
const AI_REPLY_DELAY = 1500
const INTERRUPTED_REPLY_TEXT = '正在思考中...'

function createId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function truncateText(text: string, maxLength: number): string {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text
}

function buildSessionTitle(messages: IChatMessage[]): string {
  const firstUserMessage = messages.find((message) => message.role === 'user' && message.content.trim())

  if (!firstUserMessage) {
    return '新对话'
  }

  return truncateText(firstUserMessage.content.trim(), 16)
}

function buildSessionPreview(messages: IChatMessage[]): string {
  const latestMessage = [...messages]
    .reverse()
    .find((message) => message.content.trim())

  return latestMessage?.content.trim() || '暂无消息'
}

function normalizeMessage(message: IChatMessage): IChatMessage {
  if (message.status === 'loading') {
    return {
      ...message,
      content: INTERRUPTED_REPLY_TEXT,
      status: 'error',
    }
  }

  return {
    ...message,
    content: message.content || '',
    createdAt: Number(message.createdAt) || Date.now(),
  }
}

function normalizeSession(session: IChatSession): IChatSession {
  const messages = Array.isArray(session.messages) ? session.messages.map(normalizeMessage) : []
  const createdAt = Number(session.createdAt) || Date.now()
  const updatedAt = Number(session.updatedAt) || createdAt

  return {
    id: session.id || createId('session'),
    title: buildSessionTitle(messages),
    preview: buildSessionPreview(messages),
    isPinned: Boolean(session.isPinned),
    createdAt,
    updatedAt,
    messages,
  }
}

function sortSessionList(sessionList: IChatSession[]): IChatSession[] {
  return [...sessionList].sort((prev, next) => {
    if (prev.isPinned !== next.isPinned) {
      return Number(next.isPinned) - Number(prev.isPinned)
    }

    return next.updatedAt - prev.updatedAt
  })
}

function limitSessionList(sessionList: IChatSession[]): IChatSession[] {
  return sortSessionList(sessionList).slice(0, MAX_CHAT_SESSION_COUNT)
}

function buildAiReply(content: string): string {
  return `关于您提到的“${content}”，根据医疗AI分析，建议您注意休息并保持良好作息。如症状持续，请及时就医。`
}

export const useChatStore = defineStore('chat', () => {
  const sessionList = ref<IChatSession[]>([])
  const activeSessionId = ref<string | null>(null)
  const hydrated = ref(false)
  const pendingReplyMap = new Map<string, Set<ReturnType<typeof setTimeout>>>()

  const activeSession = computed<IChatSession | null>(() => {
    if (!activeSessionId.value) {
      return null
    }

    return sessionList.value.find((session) => session.id === activeSessionId.value) || null
  })

  const activeMessages = computed<IChatMessage[]>(() => activeSession.value?.messages || [])

  function persistState(): void {
    if (!hydrated.value) {
      return
    }

    setStorage<IChatSessionStorage>(CHAT_SESSION_STORAGE_KEY, {
      sessionList: limitSessionList(sessionList.value),
      activeSessionId: activeSessionId.value,
    })
  }

  function commitSession(session: IChatSession): void {
    const nextSession = normalizeSession(session)
    const nextList = sessionList.value.filter((item) => item.id !== nextSession.id)

    sessionList.value = limitSessionList([nextSession, ...nextList])
    persistState()
  }

  function findSession(sessionId: string | null): IChatSession | undefined {
    if (!sessionId) {
      return undefined
    }

    return sessionList.value.find((session) => session.id === sessionId)
  }

  function addPendingReply(sessionId: string, timer: ReturnType<typeof setTimeout>): void {
    const timerSet = pendingReplyMap.get(sessionId) || new Set<ReturnType<typeof setTimeout>>()
    timerSet.add(timer)
    pendingReplyMap.set(sessionId, timerSet)
  }

  function removePendingReply(sessionId: string, timer: ReturnType<typeof setTimeout>): void {
    const timerSet = pendingReplyMap.get(sessionId)

    if (!timerSet) {
      return
    }

    timerSet.delete(timer)

    if (timerSet.size === 0) {
      pendingReplyMap.delete(sessionId)
    }
  }

  function clearPendingReplies(sessionId: string): void {
    const timerSet = pendingReplyMap.get(sessionId)

    if (!timerSet) {
      return
    }

    timerSet.forEach((timer) => {
      clearTimeout(timer)
    })

    pendingReplyMap.delete(sessionId)
  }

  function hydrateFromStorage(): void {
    if (hydrated.value) {
      return
    }

    const snapshot = getStorage<IChatSessionStorage>(CHAT_SESSION_STORAGE_KEY, {
      sessionList: [],
      activeSessionId: null,
    })

    const normalizedSessionList = limitSessionList(
      (snapshot.sessionList || []).map((session) => normalizeSession(session)),
    )

    sessionList.value = normalizedSessionList
    hydrated.value = true

    if (snapshot.activeSessionId && normalizedSessionList.some((session) => session.id === snapshot.activeSessionId)) {
      activeSessionId.value = snapshot.activeSessionId
    } else {
      activeSessionId.value = null
    }

    persistState()
  }

  function startNewChat(): void {
    activeSessionId.value = null
    persistState()
  }

  function selectSession(sessionId: string): void {
    if (!findSession(sessionId)) {
      return
    }

    activeSessionId.value = sessionId
    persistState()
  }

  function finalizeAiReply(sessionId: string, messageId: string, content: string): void {
    const session = findSession(sessionId)

    if (!session) {
      return
    }

    const nextMessages = session.messages.map((message) => {
      if (message.id !== messageId) {
        return message
      }

      return {
        ...message,
        content,
        status: 'success' as const,
      }
    })

    commitSession({
      ...session,
      messages: nextMessages,
      updatedAt: Date.now(),
    })
  }

  function sendMessage(text: string): void {
    const content = text.trim()

    if (!content) {
      return
    }

    const now = Date.now()
    const userMessage: IChatMessage = {
      id: createId('msg'),
      role: 'user',
      content,
      createdAt: now,
    }
    const aiMessage: IChatMessage = {
      id: createId('msg'),
      role: 'ai',
      content: '',
      status: 'loading',
      createdAt: now + 1,
    }

    let currentSession = activeSession.value

    if (!currentSession) {
      currentSession = {
        id: createId('session'),
        title: '',
        preview: '',
        isPinned: false,
        createdAt: now,
        updatedAt: now,
        messages: [],
      }
      activeSessionId.value = currentSession.id
    }

    commitSession({
      ...currentSession,
      messages: [...currentSession.messages, userMessage, aiMessage],
      updatedAt: Date.now(),
    })

    const currentSessionId = activeSessionId.value

    if (!currentSessionId) {
      return
    }

    const timer = setTimeout(() => {
      finalizeAiReply(currentSessionId, aiMessage.id, buildAiReply(content))
      removePendingReply(currentSessionId, timer)
    }, AI_REPLY_DELAY)

    addPendingReply(currentSessionId, timer)
  }

  function getActiveMessages(): IChatMessage[] {
    return activeMessages.value
  }

  function pinSession(sessionId: string): void {
    const session = findSession(sessionId)

    if (!session || session.isPinned) {
      return
    }

    commitSession({
      ...session,
      isPinned: true,
      updatedAt: Date.now(),
    })
  }

  function unpinSession(sessionId: string): void {
    const session = findSession(sessionId)

    if (!session || !session.isPinned) {
      return
    }

    commitSession({
      ...session,
      isPinned: false,
    })
  }

  function deleteSession(sessionId: string): void {
    const session = findSession(sessionId)

    if (!session) {
      return
    }

    clearPendingReplies(sessionId)
    sessionList.value = sessionList.value.filter((item) => item.id !== sessionId)

    if (activeSessionId.value === sessionId) {
      activeSessionId.value = null
    }

    persistState()
  }

  return {
    sessionList,
    activeSessionId,
    pendingReplyMap,
    activeSession,
    activeMessages,
    hydrateFromStorage,
    startNewChat,
    selectSession,
    sendMessage,
    getActiveMessages,
    pinSession,
    unpinSession,
    deleteSession,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useChatStore, import.meta.hot))
}
