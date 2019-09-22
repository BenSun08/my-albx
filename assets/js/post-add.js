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

    /* function to post the new post or edited post */
    function postAjax(url){
        $.ajax({
            url,
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
    }
    CKEDITOR.replace("content");
    /* submit the post (edit the existing one or add new one) */
    $("#submit").on("click",function(){
        CKEDITOR.instances.content.updateElement();
        if(anatomizeSearch().id){
            postAjax('/editPost');
        }else{
            postAjax('/addNewPost');
        }
    });

    /* get the search from url to judge the user action
        "add new post" or "edit exsisting post" */
    function anatomizeSearch(){
        let queryStr = location.search.substring(1);
        let queryAttrArr = queryStr.split('&');
        let queryObj = {};
        queryAttrArr.forEach(element=>{
            let keyValComb = element.split('=');
            queryObj[keyValComb[0]] = keyValComb[1];
        })
        return queryObj;
    };
    /* if the current user action is "edit  the post"
     get the original post from database */
     if(anatomizeSearch().id){
         $.ajax({
             url: '/getPostById',
             method: 'get',
             dataType: 'json',
             data: anatomizeSearch(),
             success: function(rspRes){
                if(rspRes.code == 200){
                    $("#post-id").val(rspRes.data.id);
                    $("#title").val(rspRes.data.title);
                    $("#content").val(rspRes.data.content);
                    $("#slug").val(rspRes.data.slug);
                    $("input[name=feature]").val(rspRes.data.feature);
                    $(".thumbnail").attr("src",rspRes.data.feature).show();
                    $("#category").val(rspRes.data.category_id);
                    $("#created").val(rspRes.data.created);
                    $("#status").val(rspRes.data.status);
                }else{
                    console.log(rspRes.msg+": "+rspRes.err);
                    alert(rspRes.msg+": "+rspRes.err);
                }
             }
         })
     }
})