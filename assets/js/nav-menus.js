$(function(){
    /* laod all the nav-menus from data base */
    function loadNavMenus(){
        $.ajax({
            url: '/getNavMenus',
            method: 'get',
            dataType: 'json',
            success: function(rspRes){
                if(rspRes.code == 200){
                    console.log(rspRes.msg);
                    let htmlStr = template('tbody-template', {navs: rspRes.data});
                    $('tbody').html(htmlStr);
                }else{
                    console.log(rspRes.msg+": "+rspRes.err);
                    alert(rspRes.msg+": "+rspRes.err);
                }
            }
        })
    };
    loadNavMenus();

    /* add new navigation to the menu */
    $('.nav-add').on('click', function(){
        $.ajax({
            url: '/addNewNav',
            method: 'post',
            data: $('form').serialize(),
            dataType: 'json',
            success: function(rspRes){
                if(rspRes.code ==200){
                    console.log(rspRes.msg);
                    loadNavMenus();
                }else{
                    console.log(rspRes.msg+": "+ rspRes.err);
                    alert(rspRes.msg+": "+ rspRes.err);
                }
            }
        })
    });

    /* function to delete navigations in single or in batch */
    function deleteNav(data){
        $.ajax({
            url: '/deleteNav',
            method: 'get',
            data,
            dataType: 'json',
            success: function(rspRes){
                if(rspRes.code == 200){
                    console.log(rspRes.msg);
                    $('.check-all').prop('checked', false);
                    $('.batch-del').hide();
                    loadNavMenus();
                }else{
                    console.log(rspRes.msg+": "+rspRes.err);
                    alert(rspRes.msg+": "+rspRes.err);
                }
            }
        })
    };

    /* delete the navigation selected */
    $('tbody').on('click', '.nav-del', function(){
        let nav2Del = $(this).parent().siblings('.nav-key');
        deleteNav({text: nav2Del.text()});
    });

    /* select all or not */
    $('.check-all').on('click', function(){
        let isAllChecked = $(this).prop('checked');
        $('.check-single').prop('checked', isAllChecked);
        if(isAllChecked){
            $('.batch-del').show();
        }else{
            $('.batch-del').hide();
        }
    });

    /* select single or more */
    $('tbody').on('click', '.check-single', function(){
        let checkedNum = $('.check-single:checked').length;
        let totalNavNum = $('.check-single').length;
        if(checkedNum == totalNavNum){
            $('.check-all').prop('checked', true);
            $('.batch-del').show();
        }else if(checkedNum > 1 && checkedNum < totalNavNum){
            $('.check-all').prop('checked', false);
            $('.batch-del').show();
        }else{
            $('.check-all').prop('checked', false);
            $('.batch-del').hide();
        }
    });

    /* delete navigations in batch */
    $('.batch-del').on('click', function(){
        let delTextArr = [];
        $('.check-single:checked').each((index, element)=>{
            delTextArr.push($(element).parent().siblings('.nav-key').text());
        });
        deleteNav({text: delTextArr.join(',')});
    })
})