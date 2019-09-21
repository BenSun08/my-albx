$(function() {
  const pageSize = 2;
  let pageIndex = 1;
  let category = $("#categ-menu").val();
  let status = $("#status-menu").val();
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
          let htmlStr = template("tbody-template", {
            data: rspRes.data.results
          });
          $("tbody").html(htmlStr);
          let postsNum = rspRes.data.count;
          setPagination(pageIndex, Math.ceil(postsNum / pageSize));
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
  $("#filter").on('click',function(){
      category = $("#categ-menu").val();
      status = $("#status-menu").val();
      console.log(category,status);
      pageIndex = 1;
      loadPosts();
  })
});
