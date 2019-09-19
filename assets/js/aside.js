$(function(){
    let currentPage = location.pathname.substring(7);
    $('#'+currentPage).addClass('active');

    if(currentPage == 'posts' || currentPage == 'post-add' || currentPage == 'categories'){
        let downMenu = $('#menu-posts');
        downMenu.addClass('in');
        downMenu.attr('aria-expanded','true');
        let downIcon = downMenu.siblings('a');
        downIcon.removeClass('collapsed');
        downIcon.attr('aria-expanded', 'true');
    }else if(currentPage == 'nav-menus' || currentPage == 'slides' || currentPage == 'settings'){
        let downMenu = $('#menu-settings');
        downMenu.addClass('in');
        downMenu.attr('aria-expanded','true');
        let downIcon = downMenu.siblings('a');
        downIcon.removeClass('collapsed');
        downIcon.attr('aria-expanded', 'true');
    }
})