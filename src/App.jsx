import { useState, useEffect } from 'react'
import Gallery from './components/Gallery'
import './index.css'
import Particles from 'react-tsparticles'
import { loadSlim } from 'tsparticles-slim'


function App() {
  const [photos, setPhotos] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [loading, setLoading] = useState(true)
  const [sidebarExpanded, setSidebarExpanded] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  // 粒子初始化
  const particlesInit = async (engine) => {
    await loadSlim(engine)
  }

  const particlesLoaded = async (container) => {
    console.log('粒子加载完成', container)
  }


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
      if (window.innerWidth <= 768) {
        setSidebarExpanded(false)
      }
    }
    
    window.addEventListener('resize', handleResize)
    handleResize()
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

const categories = [
    { id: 'all', name: '全部维度', icon: '●', color: '#00f2ff' },         // 圆点
    { id: '未来视界', name: '未来视界', icon: '▲', color: '#00ff88' },    // 三角形
    { id: '科技矩阵', name: '科技矩阵', icon: '■', color: '#9d00ff' },    // 方块
    { id: '赛博空间', name: '赛博空间', icon: '◆', color: '#ff0088' },   // 菱形
  ]

  const filteredPhotos = activeCategory === 'all' 
    ? photos 
    : photos.filter(photo => photo.category === activeCategory)

const stats = [
    { label: '数据节点', value: photos.length, icon: '○', color: '#66ccff' },
    { label: '当前显示', value: filteredPhotos.length, icon: '◎', color: '#88bbff' },
    { label: '维度分类', value: categories.length - 1, icon: '▣', color: '#99aaff' }  // 带点的方块
  ]

  const isMobile = windowWidth <= 768

  return (
    <div className="app-container">
      {/* 添加粒子背景 */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        className="particles-background"
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fullScreen: {
            enable: false,
            zIndex: -1
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "grab",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              grab: {
                distance: 200,
                links: {
                  opacity: 0.5
                }
              },
              bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 0.8,
              },
            },
          },
          particles: {
            color: {
              value: ["#e8e8e8", "#f0f0f0", "#f8f8f8", "#ffffff", "#f5f5f5"]
            },
            links: {
              color: "#d0d0d0",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
              blink: true,
              consent: true,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: true,
              speed: 0.5,
              straight: false,
              attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200
              }
            },
            number: {
              density: {
                enable: true,
                area: 1000,
              },
              value: 60,
            },
            opacity: {
              value: 0.35,
              random: true,
              anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
              }
            },
            shape: {
              type: "circle",
              stroke: {
                width: 0,
                color: "#000000"
              },
            },
            size: {
              value: { min: 1, max: 4 },
              random: true,
              anim: {
                enable: true,
                speed: 4,
                size_min: 0.3,
                sync: false
              }
            },
          },
          detectRetina: true,
          themes: [
            {
              name: "light",
              default: {
                value: true,
                mode: "light"
              },
              options: {
                background: {
                  color: "transparent"
                },
                particles: {
                  color: {
                    value: ["#00f2ff", "#00ff88", "#9d00ff"]
                  }
                }
              }
            }
          ]
        }}
      />


      {/* 桌面端侧边栏 */}
      <div 
        className={`floating-sidebar glass-card ${sidebarExpanded ? 'expanded' : 'collapsed'}`}
        onMouseEnter={() => setSidebarExpanded(true)}
        onMouseLeave={() => setSidebarExpanded(false)}
      >
        <div className="sidebar-indicator">
          <div className={`indicator-text ${sidebarExpanded ? 'expanded' : ''}`}>
            {sidebarExpanded ? '◀ 控制面板' : '▶'}
          </div>
        </div>

        {/* 统计数据 */}
        <div className="stat-cards">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className="stat-card"
              style={{ '--stat-color': stat.color }}
            >
              <div className="stat-card-content">
                <div className="stat-icon" style={{ color: stat.color }}>
                  {stat.icon}
                </div>
                
                {sidebarExpanded && (
                  <div className="stat-details">
                    <div className="stat-value digital-font" style={{ color: stat.color }}>
                      {stat.value}
                    </div>
                    <div className="stat-label">
                      {stat.label}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 分类导航 */}
        {sidebarExpanded && (
          <div className="category-section">
            <div className="category-title">
              <span>维度分类</span>
            </div>
            
            <div className="category-list">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category.id)}
                  style={{ 
                    '--category-color': category.color,
                    '--category-color-20': `${category.color}20`,
                    '--category-color-40': `${category.color}40`
                  }}
                >
                  <div className="category-icon">
                    {category.icon}
                  </div>
                  <span>{category.name}</span>
                  
                  {activeCategory === category.id && (
                    <div className="active-indicator" style={{ '--category-color': category.color }} />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 移动端导航栏 */}
      <div className="mobile-nav">
        {/* 显示全部4个分类按钮 */}
        {categories.map(category => (
          <button
            key={category.id}
            className={`mobile-nav-button ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
            style={{ '--button-color': '#f0f0f0' }} 
          >
            <span className="mobile-nav-icon">{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      {/* 主内容区域 */}
      <div className={`main-content ${
        isMobile ? 'mobile' : 
        sidebarExpanded ? 'desktop-expanded' : 'desktop-collapsed'
      }`}>
        <header className={`app-header ${isMobile ? 'mobile' : ''}`}>
          <div className={`header-row ${isMobile ? 'mobile' : ''}`}>
            <div>
              <h1 className={`app-title ${isMobile ? 'mobile' : ''}`}>
                <span className="gradient-text digital-font">
                  CosmoFu的相册长廊
                </span>
              </h1>
              <p className={`category-info ${isMobile ? 'mobile' : ''}`}>
                <span> 当前分类: </span>
                <span>
                  {categories.find(c => c.id === activeCategory)?.name || '全部维度'}
                </span>
              </p>
            </div>
          </div>
        </header>

        <main className="app-main">
          {loading ? (
            <div className="loading-container">
              <div className="loading-dots">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className="loading-text">
                正在加载数字档案...
              </div>
            </div>
          ) : (
            <>
              <div className="section-header">
                <h2 className="section-title">
                  <span className="gradient-text">档案浏览</span>
                  <span className="photo-count">
                    发现 {filteredPhotos.length} 个数据节点
                  </span>
                </h2>
              </div>

              <Gallery photos={filteredPhotos} />
            </>
          )}
        </main>

        {/* 底部 */}
        <footer className="app-footer">
          <div className="footer-content">          
            <p>Powered By 宸良手纪 • ©2026 • All Rights Reserved</p>
            
            <div className="icp-container">
              <a 
                href="https://beian.miit.gov.cn/" 
                target="_blank"
                rel="noopener noreferrer"
                className="icp-link"
              >
                闽ICP备2026000687号-1
              </a>              
              <a 
                href="https://beian.mps.gov.cn/#/query/webSearch?code=35010202002051" 
                target="_blank"
                rel="noreferrer"
                className="icp-link icp-with-icon"
              >
                <img 
                  src="备案图标.png" 
                  alt="公安备案图标" 
                  className="icp-icon"
                />
                闽公网安备35010202002051号
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App