$(function() {
  /* load all users from database */
  function loadUsers() {
    $.ajax({
      url: "/getAllUsers",
      method: "get",
      dataType: "json",
      success: function(rspRes) {
        if ((rspRes.code = 200)) {
          console.log(rspRes.msg);
          let htmlStr = template("tbody-template", { users: rspRes.data });
          $("tbody").html(htmlStr);
        } else {
          console.log(rspRes.msg + ": " + rspRes.err);
          alert(rspRes.msg + ": " + rspRes.err);
        }
      }
    });
  }
  loadUsers();

  /* add new user to database */
  $(".btn-add").on("click", function() {
    $.ajax({
      url: "/addNewUser",
      method: "post",
      data: $("form").serialize(),
      dataType: "json",
      success: function(rspRes) {
        if (rspRes.code == 200) {
          console.log(rspRes.msg);
          $("#email").val("");
          $("#slug").val("");
          $("#nickname").val("");
          $("#password").val("");
          loadUsers();
        } else {
          console.log(rspRes.msg + ": " + rspRes.err);
          alert(rspRes.msg + ": " + rspRes.err);
        }
      }
    });
  });

  /* function to delete user in single or in batch */
  function deleteUser(data){
    $.ajax({
      url: "/deleteUser",
      method: "get",
      data,
      dataType: "json",
      success: function(rspRes) {
        if (rspRes.code == 200) {
          console.log(rspRes.msg);
          $('.batch-del').hide();
          $('.check-all').prop('checked', false);
          loadUsers();
        } else {
          console.log(rspRes.msg + ": " + rspRes.err);
          alert(rspRes.msg + ": " + rspRes.err);
        }
      }
    });
  };

  /* delete the user selected */
  $("tbody").on("click", ".user-del", function() {
    let user2Del = $(this).parents("tr");
    deleteUser({ id: user2Del.data("id") });
  });

  /* select all or not */
  $(".check-all").on("click", function() {
    let isAllChecked = $(this).prop("checked");
    $(".check-single").prop("checked", isAllChecked);
    if (isAllChecked) {
      $(".batch-del").show();
    } else {
      $(".batch-del").hide();
    }
  });

  /* select single user or more */
  $('tbody').on('click', '.check-single', function(){
      let checkedNum = $('.check-single:checked').length;
      let totalChkNum = $('.check-single').length;
      if(checkedNum == totalChkNum){
          $('.check-all').prop('checked', true);
          $('.batch-del').show();
      }else if(checkedNum<totalChkNum && checkedNum>1){
          $('.check-all').prop('checked', false);
          $('.batch-del').show();
      }else{
          $('.check-all').prop('checked', false);
          $('.batch-del').hide();
      }
  });

  /* delete users in batch */
  $('.batch-del').on('click', function(){
    let delArr = [];
    $('.check-single:checked').each((index,element)=>{
        delArr.push($(element).parents('tr').data('id'));
    });
    deleteUser({id: delArr.join(',')});
  })
});
