import { useState, useEffect } from 'react'
import Gallery from './components/Gallery'
import './index.css'

function App() {
  const [photos, setPhotos] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')

  useEffect(() => {
    fetch('./data.json')
      .then(res => res.json())
      .then(data => setPhotos(data.photos))
      .catch(() => {
        setPhotos([
          { id: 1, url: 'photos/01.jpg', title: '旅行记忆', date: '2023-05-15', category: 'travel' },
          { id: 2, url: 'photos/02.jpg', title: '日常点滴', date: '2023-08-20', category: 'daily' },
          { id: 3, url: 'photos/03.jpg', title: '特别时刻', date: '2024-01-01', category: 'special' }
        ])
      })
  }, [])

  const categories = ['all', 'travel', 'daily', 'special']
  const filteredPhotos = activeCategory === 'all' 
    ? photos 
    : photos.filter(photo => photo.category === activeCategory)

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <header style={{
        padding: '30px 20px 20px',
        textAlign: 'center',
        background: 'white',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
      }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 300,
          margin: '0 0 20px 0',
          color: '#2c3e50'
        }}>
          Cosmo Fu 的相册长廊
        </h1>
        
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '10px'
        }}>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              style={{
                padding: '8px 20px',
                border: 'none',
                borderRadius: '20px',
                background: activeCategory === category ? '#3498db' : 'white',
                color: activeCategory === category ? 'white' : '#7f8c8d',
                cursor: 'pointer',
                fontSize: '0.9rem',
                transition: 'all 0.3s',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
              }}
            >
              {category === 'all' ? '全部' : 
               category === 'travel' ? '旅行' :
               category === 'daily' ? '日常' : '特别'}
            </button>
          ))}
        </div>
      </header>

      <main style={{
        padding: '30px 20px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <Gallery photos={filteredPhotos} />
      </main>

      <footer style={{
        padding: '30px 20px',
        textAlign: 'center',
        color: '#95a5a6',
        fontSize: '0.9rem'
      }}>
        Powered by _061837@bupt • {new Date().getFullYear()} • <a href="https://github.com/yourusername/yourrepo" target="_blank" rel="noopener noreferrer" style="color: inherit; text-decoration: none; margin-left: 8px;">
        <svg style="width: 16px; height: 16px; vertical-align: middle; margin-right: 4px;" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
        </svg>
        Github源码
        </a>
      </footer>
    </div>
  )
}

export default App