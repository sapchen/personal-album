import { useState, useEffect } from 'react'

const Gallery = ({ photos }) => {
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!photos.length) return
      
      if (e.key === 'Escape') {
        setSelectedIndex(-1)
        setIsFullscreen(false)
      } else if (e.key === 'ArrowRight' && selectedIndex > -1) {
        setSelectedIndex((prev) => (prev + 1) % photos.length)
      } else if (e.key === 'ArrowLeft' && selectedIndex > -1) {
        setSelectedIndex((prev) => (prev - 1 + photos.length) % photos.length)
      } else if (e.key === 'f' || e.key === 'F') {
        setIsFullscreen(!isFullscreen)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [photos.length, selectedIndex, isFullscreen])

  if (photos.length === 0) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px 20px',
        color: '#a0a0ff',
        textAlign: 'center',
        background: 'rgba(20, 25, 50, 0.3)',
        borderRadius: '20px',
        border: '1px solid rgba(100, 150, 255, 0.1)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '20px', opacity: 0.3 }}>
          📡
        </div>
        <h3 style={{ 
          margin: '0 0 15px 0', 
          color: '#e0e0ff',
          fontSize: '1.3rem',
          fontWeight: 400
        }}>
          数据流中断
        </h3>
        <p style={{ 
          margin: 0, 
          fontSize: '0.95rem',
          maxWidth: '400px',
          lineHeight: 1.6,
          opacity: 0.7
        }}>
          未检测到数字记忆节点
          <br />
          请向档案库注入新的数据
        </p>
        <div style={{
          marginTop: '30px',
          padding: '10px 20px',
          background: 'rgba(0, 242, 255, 0.1)',
          border: '1px solid rgba(0, 242, 255, 0.3)',
          borderRadius: '8px',
          fontSize: '0.9rem',
          color: '#00f2ff',
          cursor: 'pointer',
          transition: 'all 0.3s'
        }}>
          初始化数据注入
        </div>
      </div>
    )
  }

  // 全屏查看模式
  if (selectedIndex > -1) {
    const photo = photos[selectedIndex]
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 10, 0.98)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(20px)'
      }}>
        {/* 背景光效 */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '1000px',
          height: '1000px',
          background: 'radial-gradient(circle, rgba(0, 100, 255, 0.15) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(80px)',
          animation: 'pulse 4s ease-in-out infinite'
        }} />
        
        <img
          src={photo.url}
          alt={photo.title}
          style={{
            maxWidth: isFullscreen ? '100vw' : '90vw',
            maxHeight: isFullscreen ? '100vh' : '80vh',
            objectFit: 'contain',
            borderRadius: isFullscreen ? '0' : '15px',
            boxShadow: '0 0 100px rgba(0, 100, 255, 0.3)',
            animation: 'fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            border: '1px solid rgba(100, 150, 255, 0.2)'
          }}
        />
        
        {/* 控制面板 */}
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          display: 'flex',
          gap: '10px'
        }}>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            style={{
              background: 'rgba(20, 25, 50, 0.6)',
              border: '1px solid rgba(100, 150, 255, 0.3)',
              color: '#a0a0ff',
              fontSize: '0.9rem',
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => e.target.background = 'rgba(0, 242, 255, 0.2)'}
            onMouseLeave={(e) => e.target.background = 'rgba(20, 25, 50, 0.6)'}
          >
            {isFullscreen ? '退出全屏' : '全屏模式'}
          </button>
          
          <button
            onClick={() => setSelectedIndex(-1)}
            style={{
              background: 'rgba(20, 25, 50, 0.6)',
              border: '1px solid rgba(255, 100, 100, 0.3)',
              color: '#ffa0a0',
              fontSize: '1.2rem',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s'
            }}
          >
            ✕
          </button>
        </div>

        {/* 照片信息 */}
        <div className="glass-card" style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '25px',
          borderRadius: '15px',
          maxWidth: '600px',
          width: '90%',
          textAlign: 'center',
          border: '1px solid rgba(100, 150, 255, 0.2)'
        }}>
          <div style={{
            fontSize: '1.4rem',
            fontWeight: 400,
            marginBottom: '12px',
            color: '#e0e0ff',
            letterSpacing: '0.05em'
          }}>
            {photo.title}
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '25px',
            fontSize: '0.9rem',
            color: '#a0a0ff',
            marginBottom: '15px',
            flexWrap: 'wrap'
          }}>
            {photo.date && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ opacity: 0.6 }}>📅</span>
                <span className="digital-font">{photo.date}</span>
              </div>
            )}
            {photo.category && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ opacity: 0.6 }}>🏷️</span>
                <span style={{
                  padding: '2px 10px',
                  background: 'rgba(0, 242, 255, 0.1)',
                  borderRadius: '12px',
                  border: '1px solid rgba(0, 242, 255, 0.3)'
                }}>
                  {photo.category}
                </span>
              </div>
            )}
          </div>
          
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            marginTop: '20px'
          }}>
            <div className="digital-font" style={{ 
              fontSize: '1rem',
              color: '#00f2ff',
              background: 'rgba(0, 242, 255, 0.1)',
              padding: '8px 20px',
              borderRadius: '20px',
              border: '1px solid rgba(0, 242, 255, 0.3)'
            }}>
              {selectedIndex + 1} / {photos.length}
            </div>
          </div>
        </div>

        {/* 导航按钮 */}
        {photos.length > 1 && (
          <>
            <button
              onClick={() => setSelectedIndex((prev) => (prev - 1 + photos.length) % photos.length)}
              className="hover-glow"
              style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(20, 25, 50, 0.6)',
                border: '1px solid rgba(100, 150, 255, 0.3)',
                color: '#a0a0ff',
                fontSize: '1.5rem',
                cursor: 'pointer',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s'
              }}
            >
              ‹
            </button>
            
            <button
              onClick={() => setSelectedIndex((prev) => (prev + 1) % photos.length)}
              className="hover-glow"
              style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(20, 25, 50, 0.6)',
                border: '1px solid rgba(100, 150, 255, 0.3)',
                color: '#a0a0ff',
                fontSize: '1.5rem',
                cursor: 'pointer',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s'
              }}
            >
              ›
            </button>
          </>
        )}
      </div>
    )
  }

  // 网格模式
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '30px',
        padding: '10px 0'
      }}
    >
      {photos.map((photo, index) => (
        <div
          key={photo.id || index}
          className="glass-card hover-glow border-animate"
          style={{
            borderRadius: '20px',
            overflow: 'hidden',
            cursor: 'pointer',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            animation: 'fadeIn 0.6s ease-out',
            animationDelay: `${index * 0.05}s`,
            animationFillMode: 'both',
            border: '1px solid rgba(100, 150, 255, 0.1)'
          }}
          onClick={() => setSelectedIndex(index)}
        >
          {/* 图片容器 */}
          <div style={{ 
            position: 'relative', 
            aspectRatio: '16/9', 
            overflow: 'hidden',
            background: 'linear-gradient(135deg, rgba(0, 50, 100, 0.2), rgba(100, 0, 150, 0.2))'
          }}>
            <img
              src={photo.url}
              alt={photo.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onLoad={(e) => {
                e.target.style.opacity = 1
              }}
            />
            
            {/* 悬停覆盖层 */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to top, rgba(0, 10, 30, 0.9), transparent 50%)',
              opacity: 0,
              transition: 'opacity 0.3s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{
                background: 'rgba(0, 242, 255, 0.1)',
                border: '1px solid rgba(0, 242, 255, 0.3)',
                color: '#00f2ff',
                padding: '10px 25px',
                borderRadius: '25px',
                fontSize: '0.9rem',
                backdropFilter: 'blur(10px)'
              }}>
                访问数据节点
              </div>
            </div>
          </div>
          
          {/* 照片信息 */}
          <div style={{
            padding: '25px',
            position: 'relative'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '15px'
            }}>
              <div>
                <h3 style={{
                  margin: '0 0 8px 0',
                  fontSize: '1.2rem',
                  fontWeight: 400,
                  color: '#e0e0ff',
                  letterSpacing: '0.05em'
                }}>
                  {photo.title}
                </h3>
                
                {photo.date && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.85rem',
                    color: '#a0a0ff',
                    opacity: 0.7
                  }}>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      background: '#00f2ff',
                      borderRadius: '50%',
                      boxShadow: '0 0 10px #00f2ff'
                    }} />
                    <span className="digital-font">{photo.date}</span>
                  </div>
                )}
              </div>
              
              {photo.category && (
                <div style={{
                  padding: '4px 12px',
                  background: 'rgba(0, 242, 255, 0.1)',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  color: '#00f2ff',
                  border: '1px solid rgba(0, 242, 255, 0.3)',
                  whiteSpace: 'nowrap'
                }}>
                  {photo.category}
                </div>
              )}
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '20px',
              paddingTop: '15px',
              borderTop: '1px solid rgba(100, 150, 255, 0.1)'
            }}>
              <div style={{
                fontSize: '0.85rem',
                color: '#a0a0ff',
                opacity: 0.6
              }}>
                节点ID: {photo.id.toString().padStart(3, '0')}
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.85rem',
                color: '#00f2ff'
              }}>
                <span>点击访问</span>
                <div style={{
                  width: '20px',
                  height: '1px',
                  background: 'linear-gradient(to right, transparent, #00f2ff)'
                }} />
                <span style={{ fontSize: '1rem' }}→</span>
              </div>
            </div>
          </div>
          
          {/* 角落装饰 */}
          <div style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            width: '30px',
            height: '30px',
            borderTop: '2px solid rgba(0, 242, 255, 0.5)',
            borderRight: '2px solid rgba(0, 242, 255, 0.5)',
            borderTopRightRadius: '8px'
          }} />
          
          <div style={{
            position: 'absolute',
            bottom: '15px',
            left: '15px',
            width: '30px',
            height: '30px',
            borderBottom: '2px solid rgba(0, 242, 255, 0.5)',
            borderLeft: '2px solid rgba(0, 242, 255, 0.5)',
            borderBottomLeftRadius: '8px'
          }} />
        </div>
      ))}
    </div>
  )
}

export default Gallery