$(function() {
  let pageIndex = 1;
  let pageSize = 3;
  let commentsNum = 0;

  /* load all the comments from database */
  function loadComments() {
    $.ajax({
      url: "/getAllComments",
      method: "get",
      dataType: "json",
      data: {
        pageIndex,
        pageSize
      },
      success: function(rspRes) {
        if (rspRes.code == 200) {
          console.log(rspRes.msg);
          let htmlStr = template("tbody-template", {
            comments: rspRes.result.data
          });
          $("tbody").html(htmlStr);
          $(".check-all").prop("checked", false);
          $('.btn-batch').hide();
          commentsNum = rspRes.result.count;
          setPagination(pageIndex, Math.ceil(commentsNum / pageSize));
        } else {
          console.log(rspRes.msg + ": " + rspRes.err);
          alert(rspRes.msg + ": " + rspRes.err);
        }
      }
    });
  }
  loadComments();

  /* set the pagenator for the loaded list of comments */
  function setPagination(currentPage, totalPages) {
    $(".pagination").bootstrapPaginator({
      bootstrapMajorVersion: 3,
      alignment: "right",
      currentPage,
      totalPages,
      onPageChanged: function(event, oldPage, newPage) {
        $(".check-all").prop("checked", false);
        $(".btn-batch").hide();
        pageIndex = newPage;
        loadComments();
      }
    });
  }

  /* delete the selected comment */
  $("tbody").on("click", ".comment-del", function() {
    if (!confirm("Are you sure to delete this comment?")) return;
    let comment2Del = $(this).parents("tr");
    $.ajax({
      url: "/deleteComment",
      method: "get",
      data: { id: comment2Del.data("id") },
      dataType: "json",
      success: function(rspRes) {
        if (rspRes.code == 200) {
          console.log(rspRes.msg);
          if (Math.ceil((commentsNum - 1) / pageSize) < pageIndex) {
            pageIndex--;
          }
          loadComments();
        } else {
          console.log(rspRes.msg + ": " + rspRes.err);
          alert(rspRes.msg + ": " + rspRes.err);
        }
      }
    });
  });

  /* change the status */
  $("tbody").on("click", ".status-change", function() {
    $(this)
      .toggleClass("btn-warning")
      .toggleClass("btn-info");
    let commet2ChangeStatus = $(this).parents("tr");
    let changedStatus = "approved";
    if ($(this).text() == "驳回") {
      changedStatus = "rejected";
    }
    $.ajax({
      url: "/changeStatus",
      method: "post",
      data: { id: commet2ChangeStatus.data("id"), status: changedStatus },
      dataType: "json",
      success: function(rspRes) {
        if (rspRes.code == 200) {
          console.log(rspRes.msg);
          loadComments();
        } else {
          console.log(rspRes.msg + ": " + rspRes.err);
          alert(rspRes.msg + ": " + rspRes.err);
        }
      }
    });
  });

  /* select the all the comments or not */
  $(".check-all").on("click", function() {
    let isAllChecked = $(this).prop("checked");
    $(".check-single").prop("checked", isAllChecked);
    if (isAllChecked) {
      $(".btn-batch").show();
    } else {
      $(".btn-batch").hide();
    }
  });

  /* select single or more comments to deal with */
  $("tbody").on("click", ".check-single", function() {
    let checkedLength = $(".check-single:checked").length;
    let totalLength = $(".check-single").length;
    if (checkedLength < totalLength && checkedLength > 1) {
      $(".btn-batch").show();
      $(".check-all").prop("checked", false);
    } else if (checkedLength == totalLength) {
      $(".btn-batch").show();
      $(".check-all").prop("checked", true);
    } else {
      $(".btn-batch").hide();
      $(".check-all").prop("checked", false);
    }
  });

  /* delete comments in batch */
  $(".del-batch").on("click", function() {
    if (!confirm("Are sure to delete these comments?")) return;
    let delArr = [];
    $(".check-single:checked").each((index, element) => {
      delArr.push(
        $(element)
          .parents("tr")
          .data("id")
      );
    });
    let delNum = delArr.length;
    $.ajax({
      url: "/deleteComment",
      method: "get",
      data: { id: delArr.join(",") },
      dataType: "json",
      success: function(rspRes) {
        if (rspRes.code == 200) {
          console.log(rspRes.msg);
          if (Math.ceil((commentsNum - delNum) / pageSize) < pageIndex) {
            pageIndex--;
          }
          loadComments();
        } else {
          console.log(rspRes.msg + ": " + rspRes.err);
          alert(rspRes.msg + ": " + rspRes.err);
        }
      }
    });
  });

  /* the function to change status of comments in batch */
  function changeStatus(data) {
    $.ajax({
      url: "/changeStatus",
      method: "post",
      data,
      dataType: "json",
      success: function(rspRes) {
        if (rspRes.code == 200) {
          console.log(rspRes.msg);
          loadComments();
        } else {
          console.log(rspRes.msg + ": " + rspRes.err);
          alert(rspRes.msg + ": " + rspRes.err);
        }
      }
    });
  }
  /* approve comments in batch */
  $(".appr-batch").on("click", function() {
    let approveArr = [];
    $(".check-single:checked").each((index, element) => {
      approveArr.push(
        $(element)
          .parents("tr")
          .data("id")
      );
    });
    changeStatus({ id: approveArr.join(","), status: "approved" });
  });

  /* reject comments in atch */
  $(".rej-batch").on("click", function() {
    let rejArr = [];
    $(".check-single:checked").each((index, element) => {
      rejArr.push(
        $(element)
          .parents("tr")
          .data("id")
      );
    });
    changeStatus({ id: rejArr.join(","), status: "rejected" });
  });
});
