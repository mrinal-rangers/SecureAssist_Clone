import { useMemo, useState } from 'react'
import './App.css'

const initialChats = [
  {
    id: 'chat-1',
    title: 'Launch Strategy for AI Chatbot',
    date: '2026-05-10',
    pinned: false,
    messages: [
      { role: 'user', text: 'Create a launch strategy for our new AI chatbot app in 30 days.' },
      {
        role: 'assistant',
        text: 'Start with a focused audience, run a private beta, and ship weekly improvements based on user feedback.',
      },
      { role: 'user', text: 'Include channels and weekly milestones.' },
      {
        role: 'assistant',
        text: 'Week 1 onboarding and waitlist, week 2 beta invites, week 3 launch content, week 4 conversion optimization.',
      },
    ],
  },
  {
    id: 'chat-2',
    title: 'Fix SSL/TLS Error on Nginx',
    date: '2026-05-09',
    pinned: true,
    messages: [
      { role: 'user', text: 'My domain shows SSL handshake failed. How do I fix it?' },
      {
        role: 'assistant',
        text: 'Verify certificate chain, confirm server_name mapping, and ensure port 443 points to the correct cert paths.',
      },
      { role: 'user', text: 'What is the fastest way to validate certs?' },
      { role: 'assistant', text: 'Use openssl s_client and check full chain + expiration, then reload nginx.' },
    ],
  },
  {
    id: 'chat-3',
    title: 'React + Next.js Learning Plan',
    date: '2026-05-08',
    pinned: false,
    messages: [
      { role: 'user', text: 'Give me a structured 4-week React and Next.js roadmap.' },
      {
        role: 'assistant',
        text: 'Week 1 React fundamentals, week 2 routing/data fetching, week 3 Next.js app router, week 4 deployment and performance.',
      },
      { role: 'user', text: 'Please add a portfolio project idea.' },
      {
        role: 'assistant',
        text: 'Build a SaaS dashboard with auth, role-based views, and analytics charts using Next.js and a mock API.',
      },
    ],
  },
  {
    id: 'chat-4',
    title: 'Client Communication Playbook',
    date: '2026-05-03',
    pinned: false,
    messages: [
      { role: 'user', text: 'How can I improve communication with software clients?' },
      {
        role: 'assistant',
        text: 'Use weekly status notes, clear risk flags, and short decision logs so clients always know what is blocked and why.',
      },
      { role: 'user', text: 'Can you give me a simple meeting structure?' },
      {
        role: 'assistant',
        text: 'Use agenda, demo, blockers, decisions, and next actions with owner and due date for each action item.',
      },
    ],
  },
]

const welcomePrompts = [
  'Review Azure Security Center alerts and suggest prioritized remediations.',
  'Generate step-by-step fixes for Defender for Cloud recommendations.',
  'Map failed policy checks to actionable Azure RBAC and network changes.',
]

function formatDate(dateText) {
  const date = new Date(dateText)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function App() {
  const [isDark, setIsDark] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [chats, setChats] = useState(initialChats)
  const [activeChatId, setActiveChatId] = useState(initialChats[0].id)
  const [openMenuId, setOpenMenuId] = useState(null)
  const [showSettings, setShowSettings] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const [workstream, setWorkstream] = useState('azure')
  const [draftMessage, setDraftMessage] = useState('')

  const activeChat = useMemo(() => chats.find((chat) => chat.id === activeChatId) ?? null, [chats, activeChatId])

  const sortedChats = useMemo(() => {
    const pinned = chats.filter((chat) => chat.pinned)
    const regular = chats.filter((chat) => !chat.pinned)
    return [...pinned, ...regular]
  }, [chats])

  const togglePin = (chatId) => {
    setChats((prevChats) => prevChats.map((chat) => (chat.id === chatId ? { ...chat, pinned: !chat.pinned } : chat)))
    setOpenMenuId(null)
  }

  const deleteChat = (chatId) => {
    setChats((prevChats) => {
      const filtered = prevChats.filter((chat) => chat.id !== chatId)
      if (filtered.length === 0) {
        setActiveChatId('')
        setShowWelcome(true)
      } else if (chatId === activeChatId) {
        setActiveChatId(filtered[0].id)
      }
      return filtered
    })
    setOpenMenuId(null)
  }

  const sendMessage = () => {
    const trimmed = draftMessage.trim()
    if (!trimmed) {
      return
    }

    const assistantReply = 'I am secure assist, how can I help you'
    const now = new Date().toISOString().slice(0, 10)

    if (showWelcome || !activeChat) {
      const newId = `chat-${Date.now()}`
      const newChat = {
        id: newId,
        title: trimmed,
        date: now,
        pinned: false,
        messages: [
          { role: 'user', text: trimmed },
          { role: 'assistant', text: assistantReply },
        ],
      }
      setChats((prevChats) => [newChat, ...prevChats])
      setActiveChatId(newId)
      setShowWelcome(false)
    } else {
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === activeChat.id
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  { role: 'user', text: trimmed },
                  { role: 'assistant', text: assistantReply },
                ],
              }
            : chat,
        ),
      )
    }

    setDraftMessage('')
  }

  return (
    <div
      className={`app-shell ${isDark ? 'theme-dark' : 'theme-light'} ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}
    >
      <aside className="sidebar history">
        {isSidebarCollapsed ? (
          <div className="mini-rail">
            <button
              className="ghost-btn collapse-btn"
              onClick={() => setIsSidebarCollapsed(false)}
              aria-label="Expand sidebar"
              title="Expand sidebar"
            >
              ›
            </button>
            <button className="ghost-btn" onClick={() => setShowWelcome(true)} title="Home" aria-label="Home">
              🛡
            </button>
            <button className="ghost-btn" onClick={() => setShowSettings((prev) => !prev)} title="Settings" aria-label="Settings">
              ⚙
            </button>
            <button className="ghost-btn" onClick={() => setIsDark((prev) => !prev)} title="Theme" aria-label="Theme">
              {isDark ? '☀' : '🌙'}
            </button>
          </div>
        ) : (
          <>
            <div className="brand-row">
              <button className="brand-btn" onClick={() => setShowWelcome(true)}>
                <span className="brand-shield">🛡</span>
                <h1>Secure Assist</h1>
              </button>
              <button
                className="ghost-btn collapse-btn"
                onClick={() => setIsSidebarCollapsed(true)}
                aria-label="Collapse sidebar"
                title="Collapse sidebar"
              >
                ‹
              </button>
            </div>

            <section>
              <div className="section-head">
                <h2>Chats</h2>
                <span>{chats.length} total</span>
              </div>
              <ul>
                {sortedChats.map((chat) => (
                  <li key={chat.id}>
                    <div className={`chat-row ${chat.id === activeChat?.id && !showWelcome ? 'active' : ''}`}>
                      <button
                        className="chat-item"
                        onClick={() => {
                          setActiveChatId(chat.id)
                          setShowWelcome(false)
                          setShowSettings(false)
                        }}
                      >
                        <span className="chat-title">
                          {chat.pinned ? '📌 ' : ''}
                          {chat.title}
                        </span>
                        <span className="chat-date">{formatDate(chat.date)}</span>
                      </button>
                      <div className="menu-wrap">
                        <button
                          className="menu-btn"
                          onClick={() => setOpenMenuId((prev) => (prev === chat.id ? null : chat.id))}
                          aria-label="Chat options"
                        >
                          ⋯
                        </button>
                        {openMenuId === chat.id && (
                          <div className="chat-menu">
                            <button onClick={() => togglePin(chat.id)}>{chat.pinned ? 'Unpin Chat' : 'Pin Chat'}</button>
                            <button onClick={() => deleteChat(chat.id)}>Delete Chat</button>
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <div className="settings-wrap settings-bottom">
              <button
                className="settings-trigger"
                onClick={() => setShowSettings((prev) => !prev)}
                aria-label="Open settings"
                title="Settings"
              >
                <span>⚙</span>
                <span>Settings</span>
              </button>
              {showSettings && (
                <div className="settings-panel">
                  <p className="settings-user">Logged in as: mrinal-rangers</p>
                  <button className="settings-item" onClick={() => setIsDark((prev) => !prev)}>
                    {isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                  </button>
                  <button className="settings-item">Advanced Settings</button>
                </div>
              )}
            </div>
          </>
        )}
      </aside>

      <main className={`chat-area ${showWelcome ? 'welcome-mode' : ''}`}>
        {showWelcome ? (
          <section className="welcome-view">
            <h2>Secure Assist</h2>
            <p>"Secure Assist" helps you remediate all s360 action items.</p>
            <div className="welcome-top">
              <label htmlFor="workstream">Workstream</label>
              <select
                id="workstream"
                value={workstream}
                onChange={(event) => setWorkstream(event.target.value)}
              >
                <option value="azure">Azure</option>
                <option value="powerplatform">PowerPlatform</option>
                <option value="sfi-ti1-5">SFI TI1.5</option>
              </select>
            </div>
            <div className="welcome-grid">
              {welcomePrompts.map((prompt) => (
                <button
                  key={prompt}
                  className="welcome-card"
                  onClick={() => {
                    if (activeChat) {
                      setShowWelcome(false)
                    }
                  }}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </section>
        ) : (
          <>
            <header className="chat-header">
              <button className="pill">{activeChat?.title ?? 'No chat selected'}</button>
              <div className="header-actions">
                <button className="ghost-btn">⌕</button>
                <button className="ghost-btn">⚙</button>
                <div className="avatar small" />
              </div>
            </header>

            <section className="messages">
              {activeChat?.messages.map((message, idx) => (
                <article key={`${activeChat.id}-${message.role}-${idx}`} className={`bubble ${message.role}`}>
                  <p>{message.text}</p>
                </article>
              ))}
            </section>
          </>
        )}
        <footer className="composer">
          <input
            placeholder="Write your message here"
            value={draftMessage}
            onChange={(event) => setDraftMessage(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                sendMessage()
              }
            }}
          />
          <div className="composer-actions">
            <button className="ghost-btn">📎</button>
            <button className="send-btn" onClick={sendMessage}>
              ➤
            </button>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default App
