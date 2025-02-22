/*
Loon插件：Bilibili Auto Quality Unlock
功能：自动解锁Bilibili最高画质（4K/1080P+），支持无损音频和杜比全景声
使用方法：将此代码保存为bilibili_quality.js文件，并在Loon中导入为脚本插件
*/

module.exports = {
    name: 'Bilibili Auto Quality Unlock',
    desc: '自动解锁Bilibili视频最高画质，支持无损音频和杜比全景声',
    request: function(req) {
        // 匹配Bilibili播放API的URL
        if (req.url.includes('/pgc/player/web/playurl') || req.url.includes('/x/player/playurl')) {
            // 检查是否存在请求体
            if (req.body) {
                // 将画质参数qn设置为120（最高画质，通常对应4K）
                req.body = req.body.replace(/qn=\d+/, 'qn=120');
                // 添加杜比全景声和无损音频支持（fnval=4048）
                if (!req.body.includes('fnval=')) {
                    req.body += '&fnval=4048';
                } else {
                    req.body = req.body.replace(/fnval=\d+/, 'fnval=4048');
                }
            }
        }
        return req;
    },
    response: function(res) {
        // 匹配相同的API路径
        if (res.url.includes('/pgc/player/web/playurl') || res.url.includes('/x/player/playurl')) {
            // 解析响应体为JSON
            let body = JSON.parse(res.body);
            // 检查响应数据是否存在
            if (body.data || body.result) {
                let data = body.data || body.result;
                // 设置最高画质（qn=120）
                data.quality = 120;
                // 如果支持杜比或无损音频，确保相关字段存在
                if (data.dash) {
                    data.dash.dolby = data.dash.dolby || { type: 'DOLBY' };
                    data.dash.flac = data.dash.flac || { audio: true };
                }
            }
            // 更新响应体
            res.body = JSON.stringify(body);
        }
        return res;
    }
};
​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​
