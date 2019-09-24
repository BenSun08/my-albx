$(function() {
  let pageSize = 3;
  let pageIndex = 1;
  let totalPostsNum = 0;
  let category = $("#categ-menu").val();
  let status = $("#status-menu").val();
  /* set the default page size */
  $("#pagesize-menu").val(pageSize);

  /* load all the posts dynamically */
  function loadPosts() {
    $.ajax({
      method: "get",
      url: "/getAllPosts",
      dataType: "json",
      data: {
        pageIndex,
        pageSize,
        category,
        status
      },
      success: function(rspRes) {
        if (rspRes.code == 200) {
          console.log(rspRes.msg);
          totalPostsNum = rspRes.data.count;
          /* version 1: reload the posts when the page has no post after post dejete */
          // if (rspRes.data.results.length == 0 && pageIndex>1) {
          //   pageIndex--;
          //   loadPosts();
          // } else {
            let htmlStr = template("tbody-template", {
              posts: rspRes.data.results
            });
            $("tbody").html(htmlStr);
          // }
          // let totalPostsNum = rspRes.data.count;
          setPagination(pageIndex, Math.ceil(totalPostsNum / pageSize));
        } else {
          console.log(rspRes.msg);
          alert(rspRes.nsg);
        }
      }
    });
  }
  loadPosts();

  /* load all the pages with pagination */
  function setPagination(currentPage, totalPages) {
    $("#paginator").bootstrapPaginator({
      bootstrapMajorVersion: 3,
      alignment: "right",
      currentPage,
      numerOfPages: 5,
      totalPages,
      onPageChanged: function(event, oldPage, newPage) {
        pageIndex = newPage;
        loadPosts();
      }
    });
  }

  /* load all categories from database to browser */
  $.ajax({
    url: "/getAllCategories",
    method: "get",
    dataType: "json",
    success: function(rspRes) {
      if (rspRes.code == 200) {
        let htmlStr = '<option value="all">所有分类</option>';
        rspRes.data.forEach(element => {
          htmlStr += `<option value=${element.id}>${element.name}</option>`;
        });
        $("#categ-menu").html(htmlStr);
      } else {
        console.log(rspRes.msg);
        alert(rspRes.msg);
      }
    }
  });

  /* list all the filtered posts based on the category and status */
  $("#filter").on("click", function() {
    category = $("#categ-menu").val();
    status = $("#status-menu").val();
    pageIndex = 1;
    loadPosts();
  });

  /* selected the post to edit and skip to the post-edit page */
  $("tbody").on("click", ".post-edit", function() {
    let id2Edit = $(this)
      .parents("tr")
      .attr("data-id");
    location.href = `post-add?id=${id2Edit}`;
  });

  /* delete the selected post in the list */
  $("tbody").on("click", ".post-delete", function() {
    if (!confirm("Are you sure to delete this post")) return;
    let post2Del = $(this).parents("tr");
    let id2Del = post2Del.attr("data-id");
    $.ajax({
      url: "/deletePost",
      method: "get",
      data: { id: id2Del },
      dataType: "json",
      success: function(rspRes) {
        if (rspRes.code == 200) {
          console.log(rspRes.msg);
          post2Del.remove();
          /* version 2: judge the dom model and decide to reload the posts */
          // if($("tbody").children().length == 0){
          //   pageIndex--;
          // }
          /* version 3: use a global variable to judge ... */
          if(Math.ceil((totalPostsNum-1)/pageSize)<pageIndex && pageIndex>1){
            pageIndex--;
          }
          loadPosts();
        } else {
          console.log(rspRes.msg + ": " + rspRes.err);
          alert(rspRes.msg + ": " + rspRes.err);
        }
      }
    });
  });

  /* when the page size change, reload the posts based on the size */
  $("#pagesize-menu").on("change", function(){
    pageSize = $(this).val();
    pageIndex = 1;
    loadPosts();
  })
});
