// js/pinyin-map.js - 仅保留现有书名拼音映射

// 书籍拼音映射（减少字典大小，只保留当前书名的拼音）
const PINYIN_MAP = {
    "卓嘉彦的图书馆": "zhuo jia yan de tu shu guan",
    "丝绸之路历史书": "si guo lu zhi shi shu",
    "编程与算法原理解析": "cheng xue yu shu fa yuan li fen xi",
    "机器学习入门": "ji qi xue xi ru men",
    "深度学习：神经网络与想象": "shen du xue xi: shen jing wang lun yu xiang xiang",
    "前端开发指南": "qian duan kaifa zhuan jian",
    "Python全栈开发": "pinyin quan zhan kaifa",
    "剑桥大学普通物理讲义": "jian qiao da xue ping jing wu li jiang yi",
    "操作系统原理": "cheng xiang di shi li yuan li",
    "MySQL数据库编程": "my sql shu ju guan cheng xue",
    "GitHub Pages使用指南": "ge hui pages shu yi guan jian",
    "人工智能基础与实践": "ren gong zhi neng jichu yu shi jian",
    "现代编译技术": "xi dian bian yi jishu",
    "Web应用开发": "web ying yong kaifa"
};

// 获取字符串的拼音形式
function getPinyin(text) {
    let result = '';
    for (let char of text) {
        result += PINYIN_MAP[char] || char;
    }
    return result;
}

// 检查拼音匹配
function matchesPinyin(text, query) {
    if (!query || query.length === 0) return true;
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    
    // 直接匹配
    if (lowerText.includes(lowerQuery)) return true;
    
    // 拼音匹配
    const pinyinText = getPinyin(text).toLowerCase();
    if (pinyinText.includes(lowerQuery)) return true;
    
    // 拼音首字母匹配
    const pinyinChars = getPinyin(text).split('');
    let queryIndex = 0;
    for (let char of pinyinChars) {
        if (char.toLowerCase() === lowerQuery[queryIndex]) {
            queryIndex++;
            if (queryIndex === lowerQuery.length) return true;
        }
    }
    
    return false;
}
