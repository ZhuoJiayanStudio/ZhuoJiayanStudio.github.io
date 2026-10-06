// js/pinyin-map.js - 拼音匹配工具

// 书籍标题拼音映射（完整标题映射到拼音）
const PINYIN_MAP = {
    "Ubuntu Linux命令行简明教程": "ubuntu linux ming ling xing jian ming jiao cheng",
    "动手学深度学习": "dong shou xue shen du xue xi",
    "C++ 并发编程实战（中文版）": "c++ bing fa bian cheng shi zhan zhong wen ban",
    "数理逻辑（Open Logic Project）": "shu li luo ji open logic project",
    "The Linux Command Line": "the linux command line",
    "Dive into Deep Learning": "dive into deep learning",
    "C++ Concurrency in Action": "c++ concurrency in action",
    "鳥哥的 Linux 私房菜": "niao ge de linux si fang cai",
    "李宏毅深度學習課程": "li hong yi shen du xue xi ke cheng",
    "Git教程": "git jiao cheng",
    "开发者边车(dev-sidecar)": "kai fa zhe bian che dev sidecar",
    "Pro Git": "pro git",
    "Hello Claw": "hello claw",
    "Hello 算法": "hello suan fa",
    "Hello Algo": "hello algo"
};

// 简单的单字拼音映射（用于首字母匹配）
const CHAR_PINYIN = {
    '动': 'dong', '手': 'shou', '学': 'xue', '深': 'shen', '度': 'du', '习': 'xi',
    '并': 'bing', '发': 'fa', '编': 'bian', '程': 'cheng', '实': 'shi', '战': 'zhan',
    '中': 'zhong', '文': 'wen', '版': 'ban',
    '数': 'shu', '理': 'li', '逻': 'luo', '辑': 'ji',
    '鸟': 'niao', '哥': 'ge', '的': 'de', '私': 'si', '房': 'fang', '菜': 'cai',
    '李': 'li', '宏': 'hong', '毅': 'yi', '课': 'ke',
    '教': 'jiao', '开': 'kai', '发': 'fa', '者': 'zhe', '边': 'bian', '车': 'che',
    '算': 'suan', '法': 'fa',
    '命': 'ming', '令': 'ling', '行': 'xing', '简': 'jian', '明': 'ming',
    '教': 'jiao', '程': 'cheng',
    '并': 'bing', '发': 'fa', '编': 'bian', '程': 'cheng', '实': 'shi', '战': 'zhan',
    '原': 'yuan', '理': 'li',
    '机': 'ji', '器': 'qi', '入': 'ru', '门': 'men',
    '神': 'shen', '经': 'jing', '网': 'wang', '络': 'luo', '想': 'xiang', '象': 'xiang',
    '前': 'qian', '端': 'duan', '指': 'zhi', '南': 'nan',
    '全': 'quan', '栈': 'zhan', '剑': 'jian', '桥': 'qiao', '大': 'da', '物': 'wu',
    '操': 'cao', '作': 'zuo', '系': 'xi', '统': 'tong',
    '数': 'shu', '据': 'ju', '库': 'ku', '人': 'ren', '工': 'gong', '智': 'zhi', '能': 'neng',
    '基': 'ji', '础': 'chu', '与': 'yu', '实': 'shi', '践': 'jian',
    '现': 'xian', '代': 'dai', '译': 'yi', '技': 'ji', '术': 'shu',
    '应': 'ying', '用': 'yong',
    '鸟': 'niao', '哥': 'ge', '私': 'si', '房': 'fang', '菜': 'cai',
    '宏': 'hong', '毅': 'yi', '课': 'ke',
    '边': 'bian', '车': 'che',
    '爬': 'pa', '虫': 'chong',
    '数': 'shu', '据': 'ju', '结': 'jie', '构': 'gou', '动': 'dong', '画': 'hua', '图': 'tu', '解': 'jie',
    '一': 'yi', '键': 'jian', '运': 'yun', '行': 'xing', '支': 'zhi', '持': 'chi', '日': 'ri', '本': 'ben',
    '繁': 'fan', '英': 'ying', '语': 'yu', '日': 'ri', '本': 'ben', '韩': 'han', '提': 'ti', '供': 'gong',
    '代': 'dai', '实': 'shi', '现': 'xian', '等': 'deng'
};

// 获取字符串的拼音形式（完整匹配优先，否则单字拼音）
function getPinyin(text) {
    // 优先完整匹配
    if (PINYIN_MAP[text]) {
        return PINYIN_MAP[text];
    }
    // 单字拼音拼接
    let result = '';
    for (let char of text) {
        result += CHAR_PINYIN[char] || char.toLowerCase() + ' ';
    }
    return result.trim();
}

// 获取拼音首字母
function getPinyinInitials(text) {
    const pinyin = getPinyin(text);
    return pinyin.split(/\s+/).map(s => s[0]).join('');
}

// 检查拼音匹配
function matchesPinyin(text, query) {
    if (!query || query.length === 0) return true;
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    
    // 直接匹配
    if (lowerText.includes(lowerQuery)) return true;
    
    // 拼音全拼匹配
    const pinyinText = getPinyin(text).toLowerCase().replace(/\s+/g, '');
    if (pinyinText.includes(lowerQuery.replace(/\s+/g, ''))) return true;
    
    // 拼音首字母匹配
    const initials = getPinyinInitials(text).toLowerCase();
    if (initials.includes(lowerQuery.replace(/\s+/g, ''))) return true;
    
    return false;
}
