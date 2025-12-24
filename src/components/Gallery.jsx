import { useState, useEffect } from 'react'

const Gallery = ({ photos }) => {
  const [selectedIndex, setSelectedIndex] = useState(-1)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!photos.length) return
      
      if (e.key === 'Escape') {
        setSelectedIndex(-1)
      } else if (e.key === 'ArrowRight' && selectedIndex > -1) {
        setSelectedIndex((prev) => (prev + 1) % photos.length)
      } else if (e.key === 'ArrowLeft' && selectedIndex > -1) {
        setSelectedIndex((prev) => (prev - 1 + photos.length) % photos.length)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [photos.length, selectedIndex])

  if (photos.length === 0) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px',
        color: '#95a5a6',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '20px', opacity: 0.3 }}>
          📷
        </div>
        <h3 style={{ margin: '0 0 10px 0', color: '#7f8c8d' }}>
          还没有照片
        </h3>
        <p style={{ margin: 0, fontSize: '0.95rem' }}>
          将照片放入 public/photos/ 目录，然后更新 data.json
        </p>
      </div>
    )
  }

  if (selectedIndex > -1) {
    const photo = photos[selectedIndex]
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.95)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <img
          src={photo.url}
          alt={photo.title}
          style={{
            maxWidth: '90vw',
            maxHeight: '80vh',
            objectFit: 'contain',
            animation: 'fadeIn 0.3s ease-in',
            borderRadius: '8px'
          }}
        />
        
        <button
          onClick={() => setSelectedIndex(-1)}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255,255,255,0.1)',
            border: 'none',
            color: '#fff',
            fontSize: '1.5rem',
            cursor: 'pointer',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          ✕
        </button>

        <div style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: '#fff',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '1.3rem', fontWeight: '500', marginBottom: '8px' }}>
            {photo.title}
          </div>
          {photo.date && <div style={{ opacity: 0.8 }}>{photo.date}</div>}
          <div style={{ marginTop: '15px', opacity: 0.7 }}>
            {selectedIndex + 1} / {photos.length}
          </div>
        </div>

        {photos.length > 1 && (
          <>
            <button
              onClick={() => setSelectedIndex((prev) => (prev - 1 + photos.length) % photos.length)}
              style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#fff',
                fontSize: '1.5rem',
                cursor: 'pointer',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ‹
            </button>
            
            <button
              onClick={() => setSelectedIndex((prev) => (prev + 1) % photos.length)}
              style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#fff',
                fontSize: '1.5rem',
                cursor: 'pointer',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ›
            </button>
          </>
        )}
      </div>
    )
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '25px',
        padding: '10px 0'
      }}
    >
      {photos.map((photo, index) => (
        <div
          key={photo.id || index}
          style={{
            background: 'white',
            borderRadius: '12px',
            overflow: 'hidden',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 3px 15px rgba(0,0,0,0.08)',
            animation: 'fadeIn 0.5s ease-out'
          }}
          onClick={() => setSelectedIndex(index)}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)'
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.12)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 3px 15px rgba(0,0,0,0.08)'
          }}
        >
          <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
            <img
              src={photo.url}
              alt={photo.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
          
          <div style={{ padding: '20px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '10px'
            }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600', color: '#2c3e50' }}>
                {photo.title}
              </h3>
              
              {photo.date && (
                <div style={{ fontSize: '0.85rem', color: '#95a5a6' }}>
                  {photo.date}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Gallery