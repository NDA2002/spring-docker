import { useState } from 'react'
import './App.css'

function App() {
  const [theme, setTheme] = useState('dark')
  const [clickCount, setClickCount] = useState(0)
  const [activeTab, setActiveTab] = useState('pipeline')
  const [healthCheck, setHealthCheck] = useState(null)

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const runHealthCheck = () => {
    setHealthCheck('checking')
    setTimeout(() => {
      setHealthCheck('healthy')
    }, 1000)
  }

  const features = [
    { icon: '⚡', title: 'GitHub Actions', desc: 'Automated 24/7 Cloud CI/CD runner on GitHub servers' },
    { icon: '⚙️', title: 'Jenkins CI/CD', desc: 'Automated local build, test, and container deployment' },
    { icon: '🐳', title: 'Docker Containerized', desc: 'Running inside Nginx Docker container on port 3000' },
    { icon: '🚀', title: 'Dual Auto Pipeline', desc: 'Pushed to Docker Hub & deployed automatically' }
  ]

  return (
    <div className={`container ${theme}`}>
      <header className="header">
        <div className="logo-badges">
          <div className="logo-badge">
            <span className="live-dot"></span>
            <span>Jenkins CI/CD</span>
          </div>
          <div className="logo-badge github-badge">
            <span className="live-dot blue-dot"></span>
            <span>GitHub Actions 24/7</span>
          </div>
        </div>
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
      </header>

      <main className="main-content">
        <div className="hero-card">
          <div className="status-pill v3-pill">🔥 Release v3.0 - Dual CI/CD Enabled</div>
          <h1 className="title">Hello Nitish! 🚀</h1>
          <p className="subtitle">
            Welcome to your <strong>React + Docker + Jenkins + GitHub Actionssssssssssss</strong> Pipeline
          </p>

          {/* Dual Pipeline Visualizer */}
          <div className="pipeline-banner">
            <div className="pipeline-step">
              <span className="step-icon">💻</span>
              <span className="step-label">Git Push</span>
            </div>
            <span className="pipeline-arrow">➔</span>
            <div className="pipeline-step active-blue">
              <span className="step-icon">⚡</span>
              <span className="step-label">GitHub Actions</span>
            </div>
            <span className="pipeline-arrow">➔</span>
            <div className="pipeline-step active-orange">
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

          {/* Interactive Section */}
          <div className="interactive-section">
            <div className="button-group">
              <button
                onClick={() => setClickCount((prev) => prev + 1)}
                className="btn btn-primary"
              >
                🔥 Counter: {clickCount}
              </button>
              <button
                onClick={runHealthCheck}
                className="btn btn-health"
              >
                🩺 System Health Check
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
                🎉 Great! You clicked the counter <strong>{clickCount}</strong> {clickCount === 1 ? 'time' : 'times'}!
              </p>
            )}

            {healthCheck === 'checking' && (
              <p className="fade-in checking-badge">
                ⏳ Running diagnostic health check...
              </p>
            )}

            {healthCheck === 'healthy' && (
              <p className="fade-in healthy-badge">
                ✅ System Status: 100% HEALTHY (Nginx: UP | Docker: RUNNING | Port 3000: ACTIVE)
              </p>
            )}
          </div>
        </div>

        {/* Features Grid */}
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
        <p>Built with ❤️ by Nitish | Powered by Jenkins & GitHub Actions</p>
      </footer>
    </div>
  )
}

export default App


