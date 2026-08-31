import { useState } from 'react'
import './App.css'

function App() {
  const [theme, setTheme] = useState('light')
  const [clickCount, setClickCount] = useState(0)

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <div className={`container ${theme}`}>
      <header className="header">
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
      </header>

      <main className="main-content">
        <div className="card">
          <h1 className="title">Hello, World! 🚀</h1>
          <p className="subtitle">
            hi  i am nitish <strong>React + Vite</strong> project.
          </p>

          <div className="interactive-section">
            <button
              onClick={() => setClickCount((prev) => prev + 1)}
              className="btn btn-primary"
            >
              Click me: {clickCount}
            </button>

            {clickCount > 0 && (
              <p className="fade-in">
                🎉 You have clicked the button {clickCount} {clickCount === 1 ? 'time' : 'times'}!
              </p>
            )}
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>Created with ❤️ on your Desktop</p>
      </footer>
    </div>
  )
}

export default App
