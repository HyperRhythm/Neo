module.exports = {
    name: 'Bilibili Auto Quality Unlock',
    desc: '自动解锁Bilibili视频最高画质',
    response: function(res) {
        try {
            console.log('Response URL:', res.url);
            if (res.url && (res.url.indexOf('/pgc/player/web/playurl') !== -1 || res.url.indexOf('/x/player/playurl') !== -1)) {
                if (res.body && typeof res.body === 'string') {
                    var body = JSON.parse(res.body);
                    if (body.data || body.result) {
                        var data = body.data || body.result;
                        data.quality = 120; // 设置最高画质
                        if (data.dash) {
                            data.dash.dolby = data.dash.dolby || { type: 'DOLBY' }; // 支持杜比音效
                            data.dash.flac = data.dash.flac || { audio: true }; // 支持FLAC音频
                        }
                    }
                    res.body = JSON.stringify(body);
                    console.log('Modified response body:', res.body);
                }
            }
        } catch (e) {
            console.log('Response processing error:', e.message);
        }
        return res;
    }
};
​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​
