$(function(){
    /* get all categories to compose the <select> element */
    $.ajax({
        url: '/getAllCategories',
        method: 'get',
        data: 'json',
        success: function(rspRes){
            if(rspRes.code == 200){
                console.log(rspRes.msg);
                let htmlStr = '';
                rspRes.data.forEach(element=>{
                    htmlStr += `<option value=${element.id}>${element.name}</option>`;
                });
                $("#category").html(htmlStr);
            }else{
                console.log(rspRes);
                alert(rspRes.msg);
            }
        }
    })

    /* upload a figure for the new post */
    $("#feature").on("change",function(){
        let formData = new FormData();
        formData.append('figure',this.files[0]);
        // formData.append('user_id',);
        $.ajax({
            url: '/uploadFigure',
            method: 'post',
            data: formData,
            processData: false,
            contentType: false,
            success: function(rspRes){
                if(rspRes.code == 200){
                    console.log(rspRes.msg);
                    $('.thumbnail').attr('src', rspRes.src).show();
                    $("input[type=hidden]").val(rspRes.src);
                }else{
                    console.log(rspRes.msg);
                    alert(rspRes.msg);
                }
            }
        })
    });

    CKEDITOR.replace("content");
    /* submit the new post */
    $("#submit").on("click",function(){
        CKEDITOR.instances.content.updateElement();
        $.ajax({
            url: '/addNewPost',
            method: 'post',
            data: $("#post-form").serialize(),
            dataType: 'json',
            success: function(rspRes){
                if(rspRes.code == 200){
                    console.log(rspRes.msg);
                    alert(rspRes.msg);
                    location.href = 'posts';
                }else{
                    console.log(rspRes.msg+': '+rspRes.err);
                    alert(rspRes.msg+': '+rspRes.err);
                }
            }
        })
    })
})