$(function () {
    $("#user-logout").on("click",function(){
        $.ajax({
            url:'http://127.0.0.1:6004/userLogout',
            method:'get',
            success:function(){
                alert('Logout successfully!');
            }
        })
    })
})