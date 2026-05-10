// ============ 全局变量 ============
const LANG = detectLang();
const T = CONFIG.I18N[LANG];
let currentBooksData = [];
let allBooksData = [];
let searchRafId = null;
let lightRafId = null;
let moodIndex = 0;

// ============ 初始化 ============
document.addEventListener('DOMContentLoaded', function() {
    applyLanguage();
    initializeCache();
    loadBooksFromJSON();
    setupEventListeners();
    setupPerformanceMonitoring();
});

// ============ 性能监测 ============
function setupPerformanceMonitoring() {
    const startTime = performance.now();
    window.addEventListener('load', function() {
        const loadTime = performance.now() - startTime;
        console.log(`📊 页面加载时间: ${loadTime.toFixed(2)}ms`);
    });
}

// ============ 缓存管理 ============
function initializeCache() {
    // 恢复心情指数
    const savedMood = localStorage.getItem(CONFIG.CACHE_KEYS.moodIndex);
    if (savedMood) {
        moodIndex = parseInt(savedMood);
        document.getElementById('moodIcon').textContent = CONFIG.UI.moods[moodIndex];
    }
}

function saveToCache(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        localStorage.setItem(CONFIG.CACHE_KEYS.cacheTime, Date.now().toString());
    } catch(e) {
        console.warn('缓存保存失败:', e);
    }
}

function getFromCache(key) {
    try {
        const cacheTime = localStorage.getItem(CONFIG.CACHE_KEYS.cacheTime);
        if (cacheTime && Date.now() - parseInt(cacheTime) < CONFIG.DATA.cacheDuration) {
            return JSON.parse(localStorage.getItem(key));
        }
        localStorage.removeItem(key);
        return null;
    } catch(e) {
        console.warn('缓存读取失败:', e);
        return null;
    }
}

// ============ 语言切换 ============
function applyLanguage() {
    document.documentElement.lang = T.htmlLang;
    document.getElementById('pageTitle').textContent = T.pageTitle;
    document.getElementById('mainTitle').textContent = T.mainTitle;
    document.getElementById('subTitle').innerHTML = T.subTitle;
    document.getElementById('searchInput').placeholder = T.searchPlaceholder;
    document.getElementById('searchInput').setAttribute('aria-label', T.searchAria);
    document.getElementById('bookList').setAttribute('aria-label', T.bookListAria);
    document.getElementById('emptyText').textContent = T.emptyText;
    document.getElementById('emptyHint').textContent = T.emptyHint;
    document.getElementById('maintainerText').textContent = T.maintainer;
    document.getElementById('moodIcon').setAttribute('title', T.moodTitle);
    document.getElementById('moodIcon').setAttribute('aria-label', T.moodAria);
    document.getElementById('footerCredit').textContent = T.footerCredit;
    document.getElementById('shareText').textContent = T.shareText;
    document.getElementById('shareBtn').setAttribute('aria-label', T.shareAria);
    document.getElementById('loader').setAttribute('aria-label', T.loaderAria);
    
    // 高亮当前语言
    const langMap = { zh: 'linkZh', yue: 'linkYue', en: 'linkEn' };
    Object.keys(langMap).forEach(key => {
        const el = document.getElementById(langMap[key]);
        if (key === LANG) {
            const strong = document.createElement('strong');
            strong.textContent = el.textContent;
            el.parentNode.insertBefore(strong, el);
            el.remove();
        }
    });
}

// ============ 数据加载 ============
async function loadBooksFromJSON() {
    const bookList = document.getElementById('bookList');
    const skeletonContainer = document.getElementById('skeletonContainer');
    const loader = document.getElementById('loader');
    
    // 检查缓存
    const cachedBooks = getFromCache(CONFIG.CACHE_KEYS.books);
    if (cachedBooks) {
        currentBooksData = cachedBooks.filter(book => book.pages.includes(T.currentPage));
        renderBookList(currentBooksData);
        loader.classList.add('hidden');
        return;
    }
    
    skeletonContainer.classList.add('active');
    bookList.style.opacity = '0';
    
    try {
        const response = await fetch(CONFIG.DATA.jsonPath);
        const allBooks = await response.json();
        
        // 保存到缓存
        saveToCache(CONFIG.CACHE_KEYS.books, allBooks);
        
        // 过滤当前页面的书籍
        currentBooksData = allBooks.filter(book => book.pages && book.pages.includes(T.currentPage));
        allBooksData = allBooks;
        
        renderBookList(currentBooksData);
    } catch(error) {
        console.error('加载书籍失败:', error);
        bookList.innerHTML = `<li class="book-item" style="text-align:center"><i class="fas fa-exclamation-triangle"></i> ${T.loadError}</li>`;
    } finally {
        loader.classList.add('hidden');
        skeletonContainer.classList.remove('active');
        bookList.style.opacity = '1';
        bookList.style.transition = 'opacity 0.5s ease';
    }
}

// ============ 搜索过滤 ============
function filterBooks() {
    if (searchRafId) {
        cancelAnimationFrame(searchRafId);
    }
    
    searchRafId = requestAnimationFrame(() => {
        const query = document.getElementById('searchInput').value.toLowerCase().trim();
        const bookList = document.getElementById('bookList');
        const emptyState = document.getElementById('emptyState');
        
        if (!query) {
            renderBookList(currentBooksData);
            emptyState.classList.remove('visible');
            return;
        }
        
        const filtered = currentBooksData.filter(book => matchesPinyin(book.title, query));
        renderBookList(filtered, query);
        
        emptyState.classList.toggle('visible', filtered.length === 0);
    });
}

// ============ 渲染书籍列表 ============
function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function renderBookList(books, highlightQuery) {
    const bookList = document.getElementById('bookList');
    
    if (books.length === 0) {
        bookList.innerHTML = '';
        return;
    }
    
    bookList.innerHTML = books.map((book, index) => {
        let titleHtml = book.title;
        if (highlightQuery) {
            const regex = new RegExp('(' + escapeRegex(highlightQuery) + ')', 'gi');
            titleHtml = book.title.replace(regex, '<span class="highlight">$1</span>');
        }
        
        const pdfBadge = /\.pdf(?:\?|$)/i.test(book.url) ? 
            `<span class="pdf-badge"><i class="fas fa-file-pdf" aria-hidden="true"></i> PDF</span>` : '';
        
        const metaBadges = [
            book.author ? `<span class="badge"><i class="fas fa-user" aria-hidden="true"></i> ${book.author}</span>` : '',
            book.year ? `<span class="badge"><i class="fas fa-calendar" aria-hidden="true"></i> ${book.year}</span>` : '',
            book.license ? `<span class="badge"><i class="fas fa-balance-scale" aria-hidden="true"></i> ${book.license}</span>` : '',
            book.tags ? book.tags.split(',').map(tag => 
                `<span class="badge"><i class="fas fa-tag" aria-hidden="true"></i> ${tag.trim()}</span>`
            ).join('') : ''
        ].filter(Boolean).join('');
        
        return `<li class="book-item" onclick="openBook(this)" role="listitem" tabindex="0" aria-label="${book.title}" style="animation-delay: ${(index + 1) * CONFIG.UI.animationDelay}s">
            <div class="book-header">
                <i class="${getCategoryIcon(book.category)} book-icon" aria-hidden="true"></i>
                <a href="${book.url}" target="_blank" aria-label="阅读 ${book.title}">${titleHtml}</a>
                ${pdfBadge}
                <i class="fas fa-arrow-right book-arrow" aria-hidden="true"></i>
            </div>
            <div class="book-meta">
                ${metaBadges}
            </div>
        </li>`;
    }).join('');
    
    bindBookEvents();
}

// ============ 书籍交互 ============
function bindBookEvents() {
    document.querySelectorAll('.book-item').forEach(item => {
        item.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openBook(item);
            }
        });
        item.addEventListener('click', e => createRipple(e, item));
    });
}

function openBook(item) {
    const link = item.querySelector('a');
    if (link) {
        window.open(link.href, '_blank');
    }
}

function createRipple(e, element) {
    const rect = element.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    element.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
}

// ============ 心情切换 ============
function toggleMood() {
    moodIndex = (moodIndex + 1) % CONFIG.UI.moods.length;
    const icon = document.getElementById('moodIcon');
    icon.textContent = CONFIG.UI.moods[moodIndex];
    localStorage.setItem(CONFIG.CACHE_KEYS.moodIndex, moodIndex.toString());
    
    icon.style.transform = 'scale(1.3) rotate(15deg)';
    setTimeout(() => {
        icon.style.transform = '';
    }, 200);
}

// ============ 分享功能 ============
function shareSurprise(btn) {
    navigator.clipboard.writeText('https://zhuojiayanstudio.github.io/surprise.html').then(() => {
        btn.innerHTML = `<i class="fas fa-check" aria-hidden="true"></i> ${T.shareCopied}`;
        btn.classList.add('copied');
        setTimeout(() => {
            btn.innerHTML = `<i class="fas fa-share-alt" aria-hidden="true"></i> <span>${T.shareText}</span>`;
            btn.classList.remove('copied');
        }, 2000);
    });
}

// ============ 环境光效应 ============
function setupEventListeners() {
    const container = document.getElementById('mainContainer');
    document.addEventListener('mousemove', e => {
        if (lightRafId) return;
        lightRafId = requestAnimationFrame(() => {
            lightRafId = null;
            const rect = container.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            const offsetX = (x - 0.5) * 20;
            const offsetY = (y - 0.5) * 20;
            container.style.boxShadow = 
                `${8 + offsetX}px ${32 + offsetY}px 32px var(--glass-shadow), inset 0 1px 0 rgba(255, 255, 255, 0.4)`;
        });
    });
}
