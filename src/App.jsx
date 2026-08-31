import { useState } from 'react'
import './App.css'

function App() {
  const [theme, setTheme] = useState('dark')
  const [clickCount, setClickCount] = useState(0)
  const [activeTab, setActiveTab] = useState('pipeline')

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const features = [
    { icon: '🐳', title: 'Docker Containerized', desc: 'Running inside Nginx Docker container on port 3000' },
    { icon: '⚙️', title: 'Jenkins CI/CD', desc: 'Automated build, test, and push pipeline' },
    { icon: '⚡', title: 'React + Vite', desc: 'Lightning fast frontend build and instant HMR' },
    { icon: '🚀', title: 'Auto Deployment', desc: 'Pushed to Docker Hub & deployed automatically' }
  ]

  return (
    <div className={`container ${theme}`}>
      <header className="header">
        <div className="logo-badge">
          <span className="live-dot"></span>
          <span>Jenkins CI/CD Live</span>
        </div>
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
      </header>

      <main className="main-content">
        <div className="hero-card">
          <div className="status-pill">✨ Release v2.0 - Active Pipeline</div>
          <h1 className="title">Hello Nitish! 🚀</h1>
          <p className="subtitle">
            Welcome to your <strong>React + Docker + Jenkins</strong> Automated Pipeline Demo
          </p>

          <div className="pipeline-banner">
            <div className="pipeline-step">
              <span className="step-icon">💻</span>
              <span className="step-label">Git Push</span>
            </div>
            <span className="pipeline-arrow">➔</span>
            <div className="pipeline-step">
              <span className="step-icon">🏗️</span>
              <span className="step-label">Jenkins Build</span>
            </div>
            <span className="pipeline-arrow">➔</span>
            <div className="pipeline-step">
              <span className="step-icon">📦</span>
              <span className="step-label">Docker Hub</span>
            </div>
            <span className="pipeline-arrow">➔</span>
            <div className="pipeline-step active">
              <span className="step-icon">🌐</span>
              <span className="step-label">Live App</span>
            </div>
          </div>

          <div className="interactive-section">
            <div className="button-group">
              <button
                onClick={() => setClickCount((prev) => prev + 1)}
                className="btn btn-primary"
              >
                🔥 Counter: {clickCount}
              </button>
              <button
                onClick={() => setClickCount(0)}
                className="btn btn-secondary"
              >
                🔄 Reset
              </button>
            </div>

            {clickCount > 0 && (
              <p className="fade-in count-badge">
                🎉 Great! You pushed the button <strong>{clickCount}</strong> {clickCount === 1 ? 'time' : 'times'}!
              </p>
            )}
          </div>
        </div>

        <div className="features-grid">
          {features.map((item, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="footer">
        <p>Built with ❤️ by Nitish | Deployed via Jenkins CI/CD Pipeline</p>
      </footer>
    </div>
  )
}

export default App

