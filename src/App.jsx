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
          Cosmo Fu 的相册，powered by _061837@bupt
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
        个人相册 • {new Date().getFullYear()}
      </footer>
    </div>
  )
}

export default App