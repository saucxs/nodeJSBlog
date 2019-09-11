    $(function() {
        var newData = {
            code: $("#code").val(),
            __CSRF__:$("#csrf").val()
        }
        $.ajax({
            url: '/home/register/updateactivateemail',
            data: newData,
            type: 'POST',
            success: function(json) {
                if (json.errno === 0) {
                    alert(json.errmsg);
                    window.location.href = "/personal/@" + json.username + ".html"
                } else {
                    alert(json.errmsg);
                }
            }
        });
    });
