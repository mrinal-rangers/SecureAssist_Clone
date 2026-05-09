import './App.css'

const todayChats = [
  'How to be a better person?',
  'Fix SSL/TLS Error on Nginx server',
  'React Next.js tutorial roadmap',
  'Build better client communication habits',
  'Mobile app prototyping library ideas',
]

const previousChats = [
  'Platform template for developers',
  'Troubleshooting reverse proxy failures',
  'ROM types and practical use cases',
  'How to teach JavaScript effectively',
]

const messages = [
  {
    role: 'user',
    text: 'Create a launch strategy for our new AI chatbot app in 30 days.',
  },
  {
    role: 'assistant',
    text: 'Great goal. Start with a focused audience, run a lightweight private beta, then ship weekly improvements from feedback.',
  },
  {
    role: 'user',
    text: 'Also include pricing experiments and retention ideas.',
  },
  {
    role: 'assistant',
    text: 'Use three pricing tiers, test annual discounts, and add onboarding checklists with first-value milestones to improve week-1 retention.',
  },
]

function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar rail">
        <div className="rail-logo">◎</div>
        <div className="rail-dot" />
        <div className="rail-dot" />
      </aside>

      <aside className="sidebar history">
        <div className="brand-row">
          <h1>slothGPT</h1>
          <button className="ghost-btn">+</button>
        </div>

        <div className="menu-group">
          <button>Explore GPTs</button>
          <button>GPT Store</button>
          <button>Custom Instructions</button>
        </div>

        <section>
          <div className="section-head">
            <h2>Today</h2>
            <span>12 total</span>
          </div>
          <ul>
            {todayChats.map((chat) => (
              <li key={chat}>{chat}</li>
            ))}
          </ul>
        </section>

        <section>
          <div className="section-head">
            <h2>Previous 7 Days</h2>
            <span>118</span>
          </div>
          <ul>
            {previousChats.map((chat) => (
              <li key={chat}>{chat}</li>
            ))}
          </ul>
        </section>

        <div className="upgrade-card">
          <div className="avatar" />
          <div>
            <p className="title">Upgrade Plan</p>
            <p className="subtitle">Get GPT-8 and more</p>
          </div>
        </div>
      </aside>

      <main className="chat-area">
        <header className="chat-header">
          <button className="pill">slothpilot 7</button>
          <div className="header-actions">
            <button className="ghost-btn">⌕</button>
            <button className="ghost-btn">⚙</button>
            <div className="avatar small" />
          </div>
        </header>

        <section className="messages">
          {messages.map((message, idx) => (
            <article key={`${message.role}-${idx}`} className={`bubble ${message.role}`}>
              <p>{message.text}</p>
            </article>
          ))}
        </section>

        <footer className="composer">
          <input placeholder="Write your message here" />
          <div className="composer-actions">
            <button className="ghost-btn">📎</button>
            <button className="send-btn">➤</button>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default App
