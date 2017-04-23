chrome.downloads.onDeterminingFilename.addListener(add);
var size = localStorage["size"] * 1024;
var path = localStorage["path"];

function add(down) {
    console.debug(down);
    if (!path || !size) {
        alert("插件尚未配置");
        chrome.tabs.create({
            "url": "options.html"
        },
        function(s) {});
        return 0;
    }
    if (Math.abs(down.fileSize) > size) {
        this.aria2_obj = combination(down);
        var ifpostback = postaria2obj(this.aria2_obj);

        var options = {
            body: '添加任务至 aria2',
            icon: './9212234.jpg'
        }
        if (ifpostback == "base64_error") {
            options.body = '添加任务至 aria2 出错';
            var notification = new Notification("失败！", options);
            setTimeout(notification.close.bind(n), 5000);
        } else {
            chrome.downloads.cancel(down.id, function(s) {});
            options.body = '任务已经添加至 aria2';
            var notification = new Notification("成功！", options);
            setTimeout(notification.close.bind(n), 2000);
        }
    }
    //alert(down.fileSize);
}
function postaria2obj(addobj) {
    var httppost = new XMLHttpRequest();
    this.aria2jsonrpcpath = path;
    httppost.open("POST", this.aria2jsonrpcpath + "?tm=" + (new Date()).getTime().toString(), true);
    var ifregurl = aria2url_reg(this.aria2jsonrpcpath);
    if (ifregurl) {
        if (!window.btoa) {
            return "base64_error";
        } else {
            httppost.setRequestHeader("Authorization", "Basic " + btoa(ifregurl));
        }
    }
    httppost.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    httppost.send(JSON.stringify(addobj));
    return "ok";

}
function aria2url_reg(url) {
    if (url.split("@")[0] == url) {
        return null;
    }
    return url.split("@")[0].match("/^(http:\\/\\/\|https:\\/\\/)?(.*)\/")[2];
}
function combination(down) {
    var post_obj = [{
        "jsonrpc": "2.0",
        "method": "aria2.addUri",
        "id": (new Date()).getTime().toString(),
        "params": [[down.finalUrl], {
            "out": decodeURIComponent(down.filename),
            "header": "Referer: " + down.referrer
        }]
    }];
    return post_obj;
}
