// 全局配置
const CONFIG = {
    // 多语言配置
    I18N: {
        zh: {
            pageTitle: '卓嘉彦的图书馆',
            mainTitle: '卓嘉彦的图书馆',
            subTitle: '该图书馆旨在保存一些开源的编程书籍',
            searchPlaceholder: '搜索书籍标题...',
            searchAria: '搜索书籍',
            bookListAria: '书籍列表',
            emptyText: '未找到相关书籍',
            emptyHint: '试试其他关键词？',
            maintainer: '维护人：卓嘉彦',
            moodTitle: '点击切换心情',
            moodAria: '切换心情图标',
            footerCredit: '服务器由 GitHub Pages 提供',
            shareText: '分享',
            shareAria: '分享惊喜页面',
            shareCopied: '已复制',
            loaderAria: '页面加载中',
            langSwitchAria: '语言切换',
            linkZh: '中文',
            linkYue: '粵語',
            linkEn: 'English',
            categoryIcons: {
                'Linux': 'fab fa-linux',
                '人工智能': 'fas fa-brain',
                '编程语言': 'fas fa-code',
                '数理逻辑': 'fas fa-brain'
            },
            langBadge: '英文版',
            langBadgeIcon: 'fas fa-globe-americas',
            loadError: '加载书籍失败，请刷新页面重试',
            currentPage: 'index.html',
            htmlLang: 'zh-CN'
        },
        yue: {
            pageTitle: '卓嘉彥嘅圖書館',
            mainTitle: '卓嘉彥嘅圖書館',
            subTitle: '呢個圖書館係用嚟保存一啲開源嘅編程書籍',
            searchPlaceholder: '搜尋書籍...',
            searchAria: '搜尋書籍',
            bookListAria: '書籍列表',
            emptyText: '搵唔到相關書籍',
            emptyHint: '試下其他關鍵詞？',
            maintainer: '維護人：卓嘉彥',
            moodTitle: '撳切換心情',
            moodAria: '切換心情圖標',
            footerCredit: '伺服器由 GitHub Pages 提供',
            shareText: '分享',
            shareAria: '分享驚喜頁面',
            shareCopied: '已複製',
            loaderAria: '頁面加載中',
            langSwitchAria: '語言切換',
            linkZh: '中文',
            linkYue: '粵語',
            linkEn: 'English',
            categoryIcons: {
                'Linux': 'fab fa-linux',
                '人工智能': 'fas fa-brain',
                '编程语言': 'fas fa-code',
                '数理逻辑': 'fas fa-brain'
            },
            langBadge: '英文版',
            langBadgeIcon: 'fas fa-globe-americas',
            loadError: '加載書籍失敗，請刷新頁面重試',
            currentPage: 'index-yue.html',
            htmlLang: 'zh-HK'
        },
        en: {
            pageTitle: "Zhuo Jiayan's Library",
            mainTitle: "Zhuo Jiayan's Library",
            subTitle: 'This library aims to save some open-source programming books',
            searchPlaceholder: 'Search books...',
            searchAria: 'Search books',
            bookListAria: 'Book list',
            emptyText: 'No books found',
            emptyHint: 'Try different keywords?',
            maintainer: 'Maintained by: Zhuo Jiayan',
            moodTitle: 'Click to change mood',
            moodAria: 'Toggle mood icon',
            footerCredit: 'Hosted by GitHub Pages',
            shareText: 'Share',
            shareAria: 'Share surprise page',
            shareCopied: 'Copied',
            loaderAria: 'Loading page',
            langSwitchAria: 'Language switch',
            linkZh: '中文',
            linkYue: '粵語',
            linkEn: 'English',
            categoryIcons: {
                'Linux': 'fab fa-linux',
                'AI': 'fas fa-brain',
                'Programming': 'fas fa-code',
                'Logic': 'fas fa-brain'
            },
            langBadge: 'Chinese',
            langBadgeIcon: 'fas fa-globe-asia',
            loadError: 'Failed to load books. Please refresh.',
            currentPage: 'index-en.html',
            htmlLang: 'en'
        }
    },
    
    // UI 配置
    UI: {
        moods: ['💻', '📚', '☕', '🚀', '🎯'],
        animationDelay: 0.1,
        debounceDelay: 100
    },
    
    // 数据配置
    DATA: {
        jsonPath: 'library-data.json',
        cacheDuration: 86400000 // 24小时
    },
    
    // 缓存键
    CACHE_KEYS: {
        books: 'library-books-cache',
        cacheTime: 'library-cache-time',
        moodIndex: 'mood-index'
    }
};

// 检测当前语言
function detectLang() {
    const path = window.location.pathname;
    if (path.includes('index-yue')) return 'yue';
    if (path.includes('index-en')) return 'en';
    return 'zh';
}

// 获取翻译文本
function getTranslation(key, defaultValue = '') {
    const LANG = detectLang();
    const config = CONFIG.I18N[LANG];
    return config[key] || defaultValue;
}

// 获取分类图标
function getCategoryIcon(category) {
    const LANG = detectLang();
    const categoryIcons = CONFIG.I18N[LANG].categoryIcons;
    return categoryIcons[category] || 'fas fa-book';
}
