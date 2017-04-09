$(document).ready(function() {
    var favorite = localStorage["path"];
    if (favorite) {
        $('#path').val(favorite);
    }
    favorite = localStorage["size"];
    if (favorite) {
        $('#size').val(favorite);
    }

    $("#save").click(function() {
        save_options('size');
        save_options('path');

        window.console.log(localStorage["path"], localStorage["size"]);
    });
    function save_options(name) {
        this.tmp = $.trim($('#' + name).val());
        if (!this.tmp) {
            show(name, "不可为空");
            $('#' + name).focus();
            return false;
        } else {
            localStorage[name] = this.tmp;
            show(name, "已保存");
        }
    }
    function show(name, msg) {
        $('#' + name).next('span').html(msg);
        setTimeout(function() {
            $('#' + name).next('span').html('');
        },
        3000);
    }
});
