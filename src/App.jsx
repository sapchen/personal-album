import { useState, useEffect } from 'react'
import Gallery from './components/Gallery'
import './index.css'

function App() {
  const [photos, setPhotos] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [loading, setLoading] = useState(true)
  const [sidebarExpanded, setSidebarExpanded] = useState(false)

  // 添加窗口宽度状态
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)


  useEffect(() => {
      fetch('./data.json')
      .then(res => res.json())
      .then(data => {
        setPhotos(data.photos)
        setLoading(false)
      })
      .catch(() => {
        setPhotos([
          { id: 1, url: 'photos/01.jpg', title: '数字黎明', date: '2023-05-15', category: '未来视界' },
          { id: 2, url: 'photos/02.jpg', title: '矩阵光影', date: '2023-08-20', category: '科技矩阵' },
          { id: 3, url: 'photos/03.jpg', title: '量子之夜', date: '2024-01-01', category: '赛博空间' },
          { id: 4, url: 'photos/04.jpg', title: '灿烂篝火', date: '2024-02-20', category: '未来视界' },
          { id: 5, url: 'photos/05.jpg', title: '快乐老家', date: '2024-11-08', category: '科技矩阵' },
          { id: 6, url: 'photos/06.jpg', title: '你好未来', date: '2025-12-24', category: '赛博空间' }
        ])
        setLoading(false)
      })
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
      // 在移动端自动收起侧边栏
      if (window.innerWidth <= 768) {
        setSidebarExpanded(false)
      }
    }
    
    window.addEventListener('resize', handleResize)
    // 初始调用一次
    handleResize()
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
    }, [])

  const categories = [
    { id: 'all', name: '全部维度', icon: '🌌', color: '#00f2ff' },
    { id: '未来视界', name: '未来视界', icon: '🚀', color: '#00ff88' },
    { id: '科技矩阵', name: '科技矩阵', icon: '💻', color: '#9d00ff' },
    { id: '赛博空间', name: '赛博空间', icon: '🔮', color: '#ff0088'  },
  ]

  const filteredPhotos = activeCategory === 'all' 
    ? photos 
    : photos.filter(photo => photo.category === activeCategory)

  // 统计数据
  const stats = [
    { label: '数据节点', value: photos.length, icon: '💾', color: '#00f2ff' },
    { label: '当前显示', value: filteredPhotos.length, icon: '👁️', color: '#00ff88' },
    { label: '维度分类', value: categories.length - 1, icon: '🧬', color: '#9d00ff' }
  ]

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(180deg, #0a0a0f 0%, #101020 100%)',
      position: 'relative',
      display: 'flex'
    }}>
      {/* 左侧悬浮侧边栏 */}
      <div 
        className="glass-card"
        style={{
          position: 'fixed',
          left: '15px',  // 改为15px
          top: '50%',
          transform: 'translateY(-50%)',
          width: sidebarExpanded ? '220px' : '60px',  // 缩小宽度
          height: 'auto',
          maxHeight: '100vh',  // 降低最大高度
          borderRadius: '15px',  // 缩小圆角
          padding: sidebarExpanded ? '20px' : '15px 10px',  // 缩小内边距
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',  // 缩小间距
          border: '1px solid rgba(100, 150, 255, 0.2)',
          boxShadow: '0 15px 40px rgba(0, 0, 30, 0.5)',  // 缩小阴影
          backdropFilter: 'blur(10px)',
          overflow: 'hidden',
          display: windowWidth > 768 ? 'flex' : 'none'  // 关键修改：移动端隐藏
        }}
        onMouseEnter={() => setSidebarExpanded(true)}
        onMouseLeave={() => setSidebarExpanded(false)}
      >
        {/* 展开/收缩指示器 */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '10px'
        }}>
          <div style={{
            fontSize: '0.8rem',
            color: '#00f2ff',
            opacity: sidebarExpanded ? 1 : 0.7
          }}>
            {sidebarExpanded ? '◀ 控制面板' : '▶'}
          </div>
        </div>

        {/* 统计数据 */}
        <div style={{
          display: 'flex',
          flexDirection: sidebarExpanded ? 'column' : 'column',
          gap: '12px'
        }}>
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: sidebarExpanded ? '12px' : '0',  // 缩小间距
                padding: sidebarExpanded ? '10px 12px' : '8px',  // 缩小内边距
                borderRadius: '10px',  // 缩小圆角
                background: 'rgba(20, 25, 50, 0.4)',
                border: `1px solid ${stat.color}30`,
                transition: 'all 0.3s',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `rgba(${parseInt(stat.color.slice(1,3), 16)}, ${parseInt(stat.color.slice(3,5), 16)}, ${parseInt(stat.color.slice(5,7), 16)}, 0.2)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(20, 25, 50, 0.4)';
              }}
            >
              {/* 装饰线 */}
              <div style={{
                position: 'absolute',
                left: '0',
                top: '0',
                bottom: '0',
                width: '3px',
                background: `linear-gradient(to bottom, ${stat.color}, transparent)`
              }} />
              
              <div style={{
                fontSize: '1rem',
                color: stat.color,
                minWidth: '20px',
                textAlign: 'center'
              }}>
                {stat.icon}
              </div>
              
              {sidebarExpanded && (
                <div style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px'
                }}>
                  <div className="digital-font" style={{
                    fontSize: '1rem',
                    color: stat.color,
                    fontWeight: 600
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontSize: '0.7rem',
                    color: '#a0a0ff',
                    opacity: 0.8
                  }}>
                    {stat.label}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 2. 移动端底部导航栏 - 只在宽度≤768px时显示 */}
        <div className="mobile-nav" style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'rgba(20, 25, 50, 0.95)',
          backdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(100, 150, 255, 0.2)',
          display: 'flex',
          justifyContent: 'space-around',
          padding: '12px 0',
          zIndex: 100,
          display: windowWidth <= 768 ? 'flex' : 'none'  // 关键修改：桌面端隐藏
        }}>
          {/* 移动端导航按钮 */}
          {categories.slice(0, 3).map(category => (  // 只显示前3个分类
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                background: 'transparent',
                border: 'none',
                color: activeCategory === category.id ? category.color : '#a0a0ff',
                fontSize: '0.7rem',
                cursor: 'pointer'
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
          
          {/* 统计按钮（替代侧边栏的统计信息） */}
          <button
            onClick={() => {
              // 可以在这里显示移动端的统计弹窗
              alert(`数据统计：\n照片总数：${photos.length}\n显示数量：${filteredPhotos.length}`);
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              background: 'transparent',
              border: 'none',
              color: '#a0a0ff',
              fontSize: '0.7rem',
              cursor: 'pointer'
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>📊</span>
            <span>统计</span>
          </button>
        </div>
        {/* 分类导航 */}
        {sidebarExpanded && (
          <div style={{
            borderTop: '1px solid rgba(100, 150, 255, 0.2)',
            paddingTop: '15px'
          }}>
            <div style={{
              fontSize: '0.85rem',  // 改为0.85rem
              color: '#a0a0ff',
              marginBottom: '12px',  // 改为12px
              opacity: 0.8,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'  // 改为6px
            }}>
              <span>📁</span>
              <span>维度分类</span>
            </div>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  style={{
                    padding: '10px 12px',  // 缩小内边距
                    border: 'none',
                    borderRadius: '8px',  // 缩小圆角
                    background: activeCategory === category.id 
                      ? `linear-gradient(135deg, ${category.color}20, ${category.color}10)` 
                      : 'rgba(20, 25, 50, 0.4)',
                    color: activeCategory === category.id ? category.color : '#a0a0ff',
                    cursor: 'pointer',
                    fontSize: '0.85rem',  // 改为0.85rem
                    fontWeight: 400,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',  // 改为10px
                    transition: 'all 0.3s',
                    border: activeCategory === category.id 
                      ? `1px solid ${category.color}40` 
                      : '1px solid rgba(100, 150, 255, 0.1)',
                    textAlign: 'left',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    if (activeCategory !== category.id) {
                      e.currentTarget.style.background = 'rgba(20, 25, 50, 0.6)';
                      e.currentTarget.style.transform = 'translateX(5px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeCategory !== category.id) {
                      e.currentTarget.style.background = 'rgba(20, 25, 50, 0.4)';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }
                  }}
                >
                  <div style={{
                    fontSize: '1rem',
                    opacity: 0.9
                  }}>
                    {category.icon}
                  </div>
                  <span>{category.name}</span>
                  
                  {/* 激活状态指示器 */}
                  {activeCategory === category.id && (
                    <div style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: category.color,
                      boxShadow: `0 0 10px ${category.color}`
                    }} />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 主内容区域 */}
      <div style={{ 
        flex: 1,
        marginLeft: windowWidth > 768 
          ? (sidebarExpanded ? '240px' : '80px')  // 桌面端：根据侧边栏状态
          : '0',  // 移动端：无左边距（侧边栏已隐藏）

        // 添加底部边距，为移动端导航栏留出空间
        marginBottom: windowWidth <= 768 ? '60px' : '0',

        transition: 'margin-left 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        minHeight: '100vh'
      }}>
        <header className="glass-card" style={{
          padding: windowWidth > 768 ? '25px 40px' : '15px 20px',
          margin: windowWidth > 768 ? '20px 40px 40px 40px' : '15px 15px 30px 15px',
          borderRadius: '20px',
          position: 'relative'
        }}>
          <div style={{
            // 改变布局方向：桌面端横向，移动端纵向
            flexDirection: windowWidth > 768 ? 'row' : 'column',
            // 对齐方式
            alignItems: windowWidth > 768 ? 'center' : 'flex-start',
            // 间距
            gap: windowWidth > 768 ? '0' : '15px'
          }}>
            <div>
              <h1 style={{
                fontSize: windowWidth > 768 ? '2.5rem' : '1.8rem',
                fontWeight: 300,
                margin: '0 0 10px 0',
                letterSpacing: '0.1em'
              }}>
                <span className="gradient-text" style={{
                  fontFamily: "'Courier New', monospace",
                  fontWeight: 600
                }}>
                  DIGITAL ARCHIVE
                </span>
              </h1>
              <p style={{
                margin: 0,
                color: '#a0a0ff',
                fontSize: windowWidth > 768 ? '1rem' : '0.9rem',  // 移动端字体小一点
                opacity: 0.7,
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                flexWrap: windowWidth > 768 ? 'nowrap' : 'wrap'  // 移动端允许换行
              }}>
                <span>📂 当前分类: </span>
                <span style={{
                  padding: windowWidth > 768 ? '4px 12px' : '3px 8px',  // 移动端内边距小一点
                  background: 'rgba(0, 242, 255, 0.1)',
                  borderRadius: '12px',
                  border: '1px solid rgba(0, 242, 255, 0.3)',
                  color: '#00f2ff',
                  fontSize: windowWidth > 768 ? '1rem' : '0.9rem'  // 移动端字体小一点
                }}>
                  {categories.find(c => c.id === activeCategory)?.name || '全部维度'}
                </span>
              </p>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px'
            }}>
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
              
              {/* 提示文字 */}
              <div style={{
                display: windowWidth > 768 ? 'flex' : 'none',  // 移动端隐藏
                fontSize: '0.85rem',  // 改为0.85rem
                color: '#a0a0ff',
                opacity: 0.6,
                padding: '6px 12px',  // 缩小内边距
                background: 'rgba(20, 25, 50, 0.4)',
                borderRadius: '8px',  // 缩小圆角
                border: '1px solid rgba(100, 150, 255, 0.1)'
              }}>
                悬停左侧展开控制面板
              </div>
            </div>
          </div>
        </header>

        <main style={{
          padding: '0 40px 40px',
          position: 'relative'
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
                  fontSize: '1.5rem',
                  color: '#e0e0ff',
                  margin: 0,
                  fontWeight: 400
                }}>
                  <span className="gradient-text">档案浏览</span>
                  <span style={{
                    fontSize: '1rem',
                    color: '#a0a0ff',
                    marginLeft: '15px',
                    fontWeight: 300,
                    opacity: 0.7
                  }}>
                    发现 {filteredPhotos.length} 个数据节点
                  </span>
                </h2>
              </div>

              <Gallery photos={filteredPhotos} />
            </>
          )}
        </main>

        {/* 底部 */}
        <footer className="glass-card" style={{
          margin: '60px 40px 0 40px',
          padding: '30px 40px',
          textAlign: 'center',
          color: '#a0a0ff',
          fontSize: '0.9rem',
          opacity: 0.8,
          borderRadius: '20px 20px 0 0'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px'
          }}>          
            <p style={{ margin: 0, maxWidth: '600px', lineHeight: 1.6 }}>
              Powered By _061837@bupt • ©2025 • All Rights Reserved 
            </p>
            
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
                fontSize: '0.9rem',
                padding: '8px 20px',
                borderRadius: '20px',
                background: 'rgba(20, 25, 50, 0.4)',
                border: '1px solid rgba(100, 150, 255, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(0, 242, 255, 0.2)';
                e.target.style.boxShadow = '0 0 15px rgba(0, 242, 255, 0.3)';
                e.target.style.color = '#00f2ff';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(20, 25, 50, 0.4)';
                e.target.style.boxShadow = 'none';
                e.target.style.color = '#a0a0ff';
              }}
            >
              <svg height="16" width="16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
              </svg>
              GitHub 仓库
            </a>
            
            <div style={{
              display: 'flex',
              gap: '15px',
              marginTop: '10px',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              {['量子存储', '全息投影', 'AI分析', '云端同步'].map((tech, index) => (
                <div key={index} style={{
                  padding: '6px 15px',
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
    </div>
  )
}

export default App