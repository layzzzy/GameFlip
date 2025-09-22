// 全局下载链接函数（备用方案）
function openDownloadLink() {
    console.log('全局函数被调用');
    try {
        const newWindow = window.open('https://pan.quark.cn/s/aea2c4b709e5?pwd=EJbp', '_blank');
        if (!newWindow) {
            // 如果弹窗被拦截，则直接跳转
            window.location.href = 'https://pan.quark.cn/s/aea2c4b709e5?pwd=EJbp';
        }
    } catch (error) {
        console.error('打开链接失败:', error);
        // 备用方案：直接跳转
        window.location.href = 'https://pan.quark.cn/s/aea2c4b709e5?pwd=EJbp';
    }
}

// 导航栏功能
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // 移动端菜单切换
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // 点击导航链接时关闭移动端菜单
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // 滚动时导航栏效果
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 14, 23, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 14, 23, 0.95)';
        }
    });
});

// 平滑滚动到锚点
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 数字动画计数器
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// 交叉观察器 - 用于触发动画
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // 触发统计数字动画
            if (entry.target.classList.contains('stats')) {
                animateCounters();
            }
            
            // 添加淡入动画
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// 观察需要动画的元素
document.addEventListener('DOMContentLoaded', function() {
    const elementsToObserve = document.querySelectorAll('.features, .games, .stats, .contact');
    elementsToObserve.forEach(el => observer.observe(el));
});

// 联系表单处理
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // 简单的表单验证
            if (!name || !email || !message) {
                showNotification('请填写所有必填字段', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('请输入有效的邮箱地址', 'error');
                return;
            }
            
            // 模拟发送成功
            showNotification('消息发送成功！我们会尽快回复您。', 'success');
            this.reset();
        });
    }
});

// 邮箱验证函数
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 通知系统
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // 添加样式
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        max-width: 300px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background: linear-gradient(45deg, #00d4ff, #00ff88);' : ''}
        ${type === 'error' ? 'background: linear-gradient(45deg, #ff4757, #ff6b7d);' : ''}
        ${type === 'info' ? 'background: linear-gradient(45deg, #3742fa, #5352ed);' : ''}
    `;
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 关闭按钮事件
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        removeNotification(notification);
    });
    
    // 自动关闭
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// 图片轮播功能
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slidesContainer = document.getElementById('carousel-slides');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoPlayInterval;
    
    // 更新轮播显示
    function updateCarousel() {
        // 移动滑块容器
        slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // 更新指示器
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
        
        // 更新幻灯片active状态
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
    }
    
    // 下一张
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }
    
    // 上一张
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }
    
    // 跳转到指定幻灯片
    function goToSlide(index) {
        currentSlide = index;
        updateCarousel();
    }
    
    // 自动播放
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 4000); // 每4秒切换
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // 事件监听器
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoPlay();
            startAutoPlay(); // 重新开始自动播放
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoPlay();
            startAutoPlay(); // 重新开始自动播放
        });
    }
    
    // 指示器点击事件
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
            stopAutoPlay();
            startAutoPlay(); // 重新开始自动播放
        });
    });
    
    // 鼠标悬停时暂停自动播放
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoPlay);
        carouselContainer.addEventListener('mouseleave', startAutoPlay);
    }
    
    // 键盘控制
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            stopAutoPlay();
            startAutoPlay();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            stopAutoPlay();
            startAutoPlay();
        }
    });
    
    // 触摸支持（移动端）
    let startX = 0;
    let endX = 0;
    
    if (carouselContainer) {
        carouselContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        carouselContainer.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) { // 最小滑动距离
                if (diff > 0) {
                    nextSlide(); // 向左滑，显示下一张
                } else {
                    prevSlide(); // 向右滑，显示上一张
                }
                stopAutoPlay();
                startAutoPlay();
            }
        });
    }
    
    // 初始化
    updateCarousel();
    startAutoPlay();
});

// 按钮点击事件
document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('download-btn');
    const secondaryBtn = document.querySelector('.btn-secondary');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('下载按钮被点击了'); // 调试信息
            showNotification('正在为您打开下载页面...', 'success');
            
            // 使用更可靠的方式打开链接
            try {
                const newWindow = window.open('https://pan.quark.cn/s/aea2c4b709e5?pwd=EJbp', '_blank');
                if (!newWindow) {
                    // 如果弹窗被拦截，则直接跳转
                    window.location.href = 'https://pan.quark.cn/s/aea2c4b709e5?pwd=EJbp';
                }
            } catch (error) {
                console.error('打开链接失败:', error);
                // 备用方案：直接跳转
                window.location.href = 'https://pan.quark.cn/s/aea2c4b709e5?pwd=EJbp';
            }
        });
    }
    
    if (secondaryBtn) {
        secondaryBtn.addEventListener('click', function() {
            // 平滑滚动到功能介绍部分
            const featuresSection = document.querySelector('#features');
            if (featuresSection) {
                featuresSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});

// 添加页面加载动画
window.addEventListener('load', function() {
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroContent) {
        heroContent.style.animation = 'fadeInUp 1s ease forwards';
    }
    
    if (heroImage) {
        heroImage.style.animation = 'fadeInUp 1s ease 0.3s forwards';
        heroImage.style.opacity = '0';
        setTimeout(() => {
            heroImage.style.opacity = '1';
        }, 300);
    }
});

// 特性卡片悬停效果增强
document.addEventListener('DOMContentLoaded', function() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // 添加随机的颜色变化效果
            const colors = ['#00d4ff', '#00ff88', '#ff4757', '#ffa502', '#3742fa'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            
            const icon = this.querySelector('.feature-icon');
            if (icon) {
                icon.style.background = `linear-gradient(45deg, ${randomColor}, #00d4ff)`;
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.feature-icon');
            if (icon) {
                icon.style.background = 'linear-gradient(45deg, #00d4ff, #00ff88)';
            }
        });
    });
});

// 搜索功能（可扩展）
function initSearch() {
    // 这里可以添加搜索功能的初始化代码
    console.log('搜索功能已初始化');
}

// 主题切换功能（预留）
function toggleTheme() {
    // 这里可以添加明暗主题切换功能
    console.log('主题切换功能');
}

// 语言切换功能（预留）
function switchLanguage(lang) {
    // 这里可以添加多语言支持
    console.log(`切换到${lang}语言`);
}

// 用户反馈收集
function collectFeedback() {
    // 收集用户使用反馈
    const userAgent = navigator.userAgent;
    const screenResolution = `${screen.width}x${screen.height}`;
    const timestamp = new Date().toISOString();
    
    const feedback = {
        userAgent,
        screenResolution,
        timestamp,
        url: window.location.href
    };
    
    console.log('用户反馈数据:', feedback);
    // 这里可以发送到服务器
}

// 初始化所有功能
document.addEventListener('DOMContentLoaded', function() {
    initSearch();
    collectFeedback();
    
    // 添加一些视觉效果
    setTimeout(() => {
        const elements = document.querySelectorAll('.feature-card, .game-card');
        elements.forEach((el, index) => {
            el.style.animationDelay = `${index * 0.1}s`;
            el.classList.add('fade-in-up');
        });
    }, 500);
});

// 性能监控
window.addEventListener('load', function() {
    setTimeout(() => {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log(`页面加载时间: ${loadTime}ms`);
        
        if (loadTime > 3000) {
            console.warn('页面加载时间较长，建议优化');
        }
    }, 0);
});
