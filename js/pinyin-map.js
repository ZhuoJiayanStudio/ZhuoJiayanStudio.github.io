// 压缩版拼音映射（仅保留常用汉字）
const PINYIN_MAP = {
    '阿':'a','啊':'a','安':'an','按':'an','案':'an','昂':'ang',
    '八':'ba','巴':'ba','把':'ba','爸':'ba','白':'bai','百':'bai','拜':'bai','半':'ban','班':'ban','板':'ban','办':'ban','帮':'bang','邦':'bang','棒':'bang','保':'bao','包':'bao','报':'bao','宝':'bao','北':'bei','被':'bei','贝':'bei','背':'bei','本':'ben','奔':'ben','崩':'beng','泵':'beng','比':'bi','必':'bi','笔':'bi','毕':'bi','边':'bian','变':'bian','便':'bian','编':'bian','标':'biao','表':'biao','别':'bie','宾':'bin','滨':'bin','兵':'bing','冰':'bing','并':'bing','病':'bing','波':'bo','博':'bo','伯':'bo','不':'bu','布':'bu','步':'bu','部':'bu',
    '擦':'ca','才':'cai','采':'cai','财':'cai','彩':'cai','参':'can','残':'can','餐':'can','苍':'cang','舱':'cang','藏':'cang','草':'cao','操':'cao','册':'ce','测':'ce','策':'ce','层':'ceng','曾':'ceng','查':'cha','差':'cha','茶':'cha','插':'cha','拆':'chai','柴':'chai','产':'chan','缠':'chan','禅':'chan','长':'chang','常':'chang','厂':'chang','场':'chang','超':'chao','朝':'chao','潮':'chao','车':'che','彻':'che','陈':'chen','沉':'chen','晨':'chen','成':'cheng','城':'cheng','程':'cheng','承':'cheng','吃':'chi','持':'chi','池':'chi','赤':'chi','充':'chong','冲':'chong','虫':'chong','抽':'chou','仇':'chou','愁':'chou','出':'chu','初':'chu','除':'chu','处':'chu','川':'chuan','穿':'chuan','传':'chuan','船':'chuan','床':'chuang','创':'chuang','窗':'chuang','吹':'chui','垂':'chui','春':'chun','纯':'chun','戳':'chuo','此':'ci','次':'ci','词':'ci','刺':'ci','从':'cong','聪':'cong','凑':'cou','粗':'cu','促':'cu','窜':'cuan','催':'cui','脆':'cui','存':'cun','村':'cun','寸':'cun','错':'cuo','挫':'cuo',
    '大':'da','打':'da','达':'da','代':'dai','带':'dai','待':'dai','单':'dan','但':'dan','担':'dan','丹':'dan','当':'dang','党':'dang','到':'dao','道':'dao','导':'dao','倒':'dao','的':'de','得':'de','德':'de','等':'deng','灯':'deng','登':'deng','地':'di','第':'di','低':'di','底':'di','电':'dian','点':'dian','店':'dian','典':'dian','调':'diao','掉':'diao','跌':'die','叠':'die','定':'ding','顶':'ding','订':'ding','丢':'diu','动':'dong','东':'dong','冬':'dong','都':'dou','斗':'dou','豆':'dou','都':'du','读':'du','度':'du','独':'du','短':'duan','段':'duan','断':'duan','对':'dui','队':'dui','吨':'dun','顿':'dun','盾':'dun','多':'duo','夺':'duo','朵':'duo',
    // ... 继续其他拼音（为节省空间，这里省略其他部分）
    // 实际项目中应包含全部常用汉字
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
