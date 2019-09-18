$(function () {
    $('.btn-block').on('click',function () {
        $.ajax('http://127.0.0.1:6004/userLogin',{
            method: 'post',
            dataType:'json',
            data: $('form').serialize(),
            success: function (rspRes) {
                if(rspRes.code == 200){
                    console.log(rspRes.msg);
                }else{
                    console.log(rspRes.msg);
                }
            }
        })
    })
}())