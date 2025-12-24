import { useState, useEffect } from 'react'
import Gallery from './components/Gallery'
import './index.css'

function App() {
  const [photos, setPhotos] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [loading, setLoading] = useState(true)
  const [showStats, setShowStats] = useState(false)
  const [showCategories, setShowCategories] = useState(false)

  useEffect(() => {
    fetch('./data.json')
      .then(res => res.json())
      .then(data => {
        setPhotos(data.photos)
        setLoading(false)
      })
      .catch(() => {
        setPhotos([
          { id: 1, url: 'photos/01.jpg', title: '数字黎明', date: '2023-05-15', category: 'future' },
          { id: 2, url: 'photos/02.jpg', title: '矩阵光影', date: '2023-08-20', category: 'tech' },
          { id: 3, url: 'photos/03.jpg', title: '量子之夜', date: '2024-01-01', category: 'cyber' },
          { id: 4, url: 'photos/04.jpg', title: '灿烂篝火', date: '2024-02-20', category: 'future' },
          { id: 5, url: 'photos/05.jpg', title: '快乐老家', date: '2024-11-08', category: 'tech' },
          { id: 6, url: 'photos/06.jpg', title: '你好未来', date: '2025-12-24', category: 'cyber' }
        ])
        setLoading(false)
      })
  }, [])

  const categories = [
    { id: 'all', name: '全部维度', icon: '🌌' },
    { id: 'future', name: '未来视界', icon: '🚀' },
    { id: 'tech', name: '科技矩阵', icon: '💻' },
    { id: 'cyber', name: '赛博空间', icon: '🔮' },
    { id: 'neon', name: '霓虹记忆', icon: '✨' }
  ]

  const filteredPhotos = activeCategory === 'all' 
    ? photos 
    : photos.filter(photo => photo.category === activeCategory)

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(180deg, #0a0a0f 0%, #101020 100%)',
      position: 'relative'
    }}>
      {/* 背景装饰元素 */}
      <div style={{
        position: 'fixed',
        top: '10%',
        right: '5%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(0, 100, 255, 0.1) 0%, transparent 70%)',
        filter: 'blur(40px)',
        zIndex: 0
      }} />
      
      <div style={{
        position: 'fixed',
        bottom: '20%',
        left: '5%',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(150, 0, 255, 0.1) 0%, transparent 70%)',
        filter: 'blur(40px)',
        zIndex: 0
      }} />

      <header className="glass-card" style={{
        padding: '20px 20px 0 20px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        marginBottom: '40px',
        borderRadius: '0 0 20px 20px'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '15px'
        }}>
          {/* 标题部分 */}
          <div style={{
            textAlign: 'center',
            paddingBottom: '10px',
            borderBottom: '1px solid rgba(100, 150, 255, 0.2)',
            width: '100%'
          }}>
            <h1 style={{
              fontSize: '2.0rem',
              fontWeight: 300,
              margin: '0 0 10px 0',
              letterSpacing: '0.2em'
            }}>
              <span className="gradient-text" style={{
                fontFamily: "'Courier New', monospace",
                fontWeight: 600
              }}>
                DIGITAL ARCHIVE
              </span>
            </h1>
          </div>
          
          {/* 分类导航 - 悬停显示 */}
          <div 
            className="nav-section"
            style={{
              width: '100%',
              position: 'relative',
              height: '45px',
              overflow: 'hidden'
            }}
            onMouseEnter={() => setShowCategories(true)}
            onMouseLeave={() => setShowCategories(false)}
          >
            {/* 悬停提示 */}
            <div style={{
              textAlign: 'center',
              color: '#a0a0ff',
              fontSize: '0.9rem',
              opacity: showCategories ? 0 : 0.6,
              padding: '12px',
              transition: 'opacity 0.3s'
            }}>
              {showCategories ? '选择维度分类' : '📁 展开分类导航'}
            </div>
            
            {/* 分类导航卡片 */}
            <div 
              className="nav-dropdown"
              style={{
                position: 'absolute',
                top: showCategories ? '0' : '-100%',
                left: '0',
                right: '0',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '12px',
                padding: '15px 20px',
                background: 'rgba(20, 25, 50, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: '0 0 15px 15px',
                border: '1px solid rgba(100, 150, 255, 0.2)',
                borderTop: 'none',
                transition: 'top 0.3s ease',
                zIndex: 10
              }}
            >
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className="hover-glow"
                  style={{
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '10px',
                    background: activeCategory === category.id 
                      ? 'linear-gradient(135deg, rgba(0, 242, 255, 0.2), rgba(0, 85, 255, 0.2))' 
                      : 'rgba(20, 25, 50, 0.4)',
                    backdropFilter: 'blur(10px)',
                    color: activeCategory === category.id ? '#00f2ff' : '#a0a0ff',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: 400,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.3s',
                    border: activeCategory === category.id 
                      ? '1px solid rgba(0, 242, 255, 0.3)' 
                      : '1px solid rgba(100, 150, 255, 0.1)'
                  }}
                >
                  <span style={{ fontSize: '1rem' }}>{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* 数据统计 - 悬停显示 */}
          <div 
            className="stats-section"
            style={{
              width: '100%',
              position: 'relative',
              height: '45px',
              overflow: 'hidden'
            }}
            onMouseEnter={() => setShowStats(true)}
            onMouseLeave={() => setShowStats(false)}
          >
            {/* 悬停提示 */}
            <div style={{
              textAlign: 'center',
              color: '#a0a0ff',
              fontSize: '0.9rem',
              opacity: showStats ? 0 : 0.6,
              padding: '12px',
              transition: 'opacity 0.3s'
            }}>
              {showStats ? '系统统计数据' : '📊 查看统计信息'}
            </div>
            
            {/* 统计卡片 */}
            <div 
              className="stats-dropdown"
              style={{
                position: 'absolute',
                top: showStats ? '0' : '-100%',
                left: '0',
                right: '0',
                display: 'flex',
                justifyContent: 'center',
                gap: '30px',
                padding: '15px 20px',
                background: 'rgba(20, 25, 50, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: '0 0 15px 15px',
                border: '1px solid rgba(100, 150, 255, 0.2)',
                borderTop: 'none',
                transition: 'top 0.3s ease',
                zIndex: 10
              }}
            >
              {[
                { label: '数据节点', value: photos.length },
                { label: '当前显示', value: filteredPhotos.length },
                { label: '维度分类', value: categories.length }
              ].map((stat) => (
                <div key={stat.label} style={{ textAlign: 'center' }}>
                  <div className="digital-font" style={{ 
                    fontSize: '1.2rem', 
                    color: '#00f2ff',
                    marginBottom: '4px'
                  }}>
                    {stat.value}
                  </div>
                  <div style={{ 
                    fontSize: '0.85rem',
                    color: '#a0a0ff'
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main style={{
        padding: '0 20px 40px',
        maxWidth: '1600px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        {loading ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '60vh',
            color: '#a0a0ff'
          }}>
            <div className="loading-dots">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div style={{ marginTop: '30px', fontSize: '1.1rem' }}>
              正在加载数字档案...
            </div>
          </div>
        ) : (
          <>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '30px',
              padding: '0 10px'
            }}>
              <h2 style={{
                fontSize: '1.3rem',
                color: '#e0e0ff',
                margin: 0,
                fontWeight: 400
              }}>
                <span className="gradient-text">档案浏览</span>
                <span style={{
                  fontSize: '0.9rem',
                  color: '#a0a0ff',
                  marginLeft: '15px',
                  fontWeight: 300,
                  opacity: 0.7
                }}>
                  {categories.find(c => c.id === activeCategory)?.name}
                </span>
              </h2>
              
              <div style={{
                color: '#a0a0ff',
                fontSize: '0.9rem',
                opacity: 0.7,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  background: '#00ff88',
                  borderRadius: '50%',
                  animation: 'pulse 2s infinite'
                }} />
                <span className="digital-font">LIVE</span>
              </div>
            </div>

            <Gallery photos={filteredPhotos} />
          </>
        )}
      </main>

      {/* 底部 */}
      <footer className="glass-card" style={{
        marginTop: '60px',
        padding: '30px 20px',
        textAlign: 'center',
        color: '#a0a0ff',
        fontSize: '0.9rem',
        opacity: 0.8,
        borderRadius: '20px 20px 0 0'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '15px'
        }}>          
          <p style={{ margin: 0, maxWidth: '600px', lineHeight: 1.6 }}>
            Powered By _061837@bupt • ©2025 • All Rights Reserved 
            <Footer />
          </p>
          
          <div style={{
            display: 'flex',
            gap: '15px',
            marginTop: '10px'
          }}>
            {['量子存储', '全息投影', 'AI分析', '云端同步'].map((tech, index) => (
              <div key={index} style={{
                padding: '4px 12px',
                background: 'rgba(0, 242, 255, 0.1)',
                borderRadius: '12px',
                fontSize: '0.8rem',
                color: '#00f2ff',
                border: '1px solid rgba(0, 242, 255, 0.2)'
              }}>
                {tech}
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}

// 在 App 组件的 return 语句之前（export default App 之前）添加 Footer 组件：
const Footer = () => {
  return (
    <div style={{ marginTop: '10px' }}>
      <a 
        href="https://github.com/sapchen/personal-album" 
        target="_blank" 
        rel="noopener noreferrer"
        className="github-link"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          color: '#a0a0ff',
          textDecoration: 'none',
          fontSize: '0.85rem',
          padding: '6px 15px',
          borderRadius: '20px',
          background: 'rgba(0, 242, 255, 0.1)',
          border: '1px solid rgba(0, 242, 255, 0.2)',
          transition: 'all 0.3s ease',
          marginTop: '10px'
        }}
        onMouseEnter={(e) => {
          e.target.style.background = 'rgba(0, 242, 255, 0.2)';
          e.target.style.boxShadow = '0 0 15px rgba(0, 242, 255, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'rgba(0, 242, 255, 0.1)';
          e.target.style.boxShadow = 'none';
        }}
      >
        <svg 
          height="16" 
          width="16" 
          viewBox="0 0 16 16" 
          fill="currentColor"
          style={{ verticalAlign: 'middle' }}
        >
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
        </svg>
        Github 源码
      </a>
    </div>
  )
}

export default App