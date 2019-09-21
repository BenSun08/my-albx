$(function() {
    const pageSize = 2;
    let pageIndex = 1;
  /* load all the posts dynamically */
  function loadPosts() {
    $.ajax({
      method: "get",
      url: "/getAllPosts",
      dataType: "json",
      data: {
          pageIndex,
          pageSize
      },
      success: function(rspRes) {
        if (rspRes.code == 200) {
          console.log(rspRes.msg);
          let htmlStr = template("tbody-template", { data: rspRes.data.results });
          $("tbody").html(htmlStr);
          let postsNum = rspRes.data.count;
          setPagination(pageIndex,Math.ceil(postsNum/pageSize));
        } else {
          console.log(rspRes.msg);
          alert(rspRes.nsg);
        }
      }
    });
  }
  loadPosts();

  /* load all the pages with pagination */
  function setPagination(currentPage,totalPages) {
    $("#paginator").bootstrapPaginator({
      bootstrapMajorVersion: 3,
      alignment: "right",
      currentPage,
      numerOfPages: 5,
      totalPages,
      onPageChanged:function(event, oldPage, newPage){
          pageIndex = newPage;
          loadPosts();
      }
    });
  }


});
