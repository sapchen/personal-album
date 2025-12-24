import { useState, useEffect } from 'react'
import Gallery from './components/Gallery'
import './index.css'

function App() {
  const [photos, setPhotos] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [loading, setLoading] = useState(true)

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
        padding: '20px',
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
          gap: '20px'
        }}>
          {/* 标题部分 */}
          <div style={{
            textAlign: 'center',
            paddingBottom: '10px',
            borderBottom: '1px solid rgba(100, 150, 255, 0.2)',
            width: '100%'
          }}>
            <h1 style={{
              fontSize: '2.5rem',
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
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              fontSize: '0.9rem',
              color: '#a0a0ff',
              opacity: 0.8
            }}>
              <div style={{
                width: '10px',
                height: '10px',
                background: '#00f2ff',
                borderRadius: '50%',
                boxShadow: '0 0 10px #00f2ff'
              }} />
              <span className="digital-font">SYSTEM ONLINE</span>
              <div style={{
                width: '10px',
                height: '10px',
                background: '#00f2ff',
                borderRadius: '50%',
                boxShadow: '0 0 10px #00f2ff'
              }} />
            </div>
          </div>

          {/* 分类导航 */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '12px',
            padding: '10px 0'
          }}>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className="hover-glow"
                style={{
                  padding: '12px 24px',
                  border: 'none',
                  borderRadius: '12px',
                  background: activeCategory === category.id 
                    ? 'linear-gradient(135deg, rgba(0, 242, 255, 0.2), rgba(0, 85, 255, 0.2))' 
                    : 'rgba(20, 25, 50, 0.4)',
                  backdropFilter: 'blur(10px)',
                  color: activeCategory === category.id ? '#00f2ff' : '#a0a0ff',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: 400,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.3s',
                  border: activeCategory === category.id 
                    ? '1px solid rgba(0, 242, 255, 0.3)' 
                    : '1px solid rgba(100, 150, 255, 0.1)',
                  boxShadow: activeCategory === category.id 
                    ? '0 0 20px rgba(0, 242, 255, 0.2)' 
                    : 'none'
                }}
              >
                <span style={{ fontSize: '1.1rem' }}>{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>

          {/* 数据统计 */}
          <div style={{
            display: 'flex',
            gap: '30px',
            color: '#a0a0ff',
            fontSize: '0.9rem',
            opacity: 0.8
          }}>
            <div style={{ textAlign: 'center' }}>
              <div className="digital-font" style={{ 
                fontSize: '1.2rem', 
                color: '#00f2ff',
                marginBottom: '4px'
              }}>
                {photos.length}
              </div>
              <div>数据节点</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div className="digital-font" style={{ 
                fontSize: '1.2rem', 
                color: '#00f2ff',
                marginBottom: '4px'
              }}>
                {filteredPhotos.length}
              </div>
              <div>当前显示</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div className="digital-font" style={{ 
                fontSize: '1.2rem', 
                color: '#00f2ff',
                marginBottom: '4px'
              }}>
                {categories.length}
              </div>
              <div>维度分类</div>
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
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '10px'
          }}>
            <div className="digital-font" style={{ fontSize: '0.8rem' }}>
              V 1.0.0
            </div>
            <div style={{
              width: '1px',
              height: '20px',
              background: 'linear-gradient(to bottom, transparent, #00f2ff, transparent)'
            }} />
            <div className="digital-font" style={{ fontSize: '0.8rem' }}>
              {new Date().getFullYear()}
            </div>
          </div>
          
          <p style={{ margin: 0, maxWidth: '600px', lineHeight: 1.6 }}>
            Powered By _061837@bupt • All Rights Reserved • <Footer />
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



const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <a 
          href="https://github.com/sapchen/personal-album" 
          target="_blank" 
          rel="noopener noreferrer"
          className="github-link"
        >
          <img 
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" 
            alt="GitHub" 
            width="20" 
            height="20"
          />
          Github 源码
        </a>
      </div>
    </footer>
  )
}

export default App