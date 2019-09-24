$(function() {
  /* load all categories */
  function loadCategories() {
    $.ajax({
      url: "/getAllCategories",
      method: "get",
      dataType: "json",
      success: function(rspRes) {
        if (rspRes.code == 200) {
          console.log(rspRes.msg);
          let htmlStr = template("tbody-template", { categories: rspRes.data });
          $("tbody").html(htmlStr);
        } else {
          console.log(rspRes.msg + ": " + rspRes.err);
          alert(rspRes.msg + ": " + rspRes.err);
        }
      }
    });
  }
  loadCategories();

  /* the function to post the new category or edited category */
  function postCategory(url){
    $.ajax({
      url,
      method: "post",
      data: $("form").serialize(),
      dataType: "json",
      success: function(rspRes) {
        if (rspRes.code == 200) {
          console.log(rspRes.msg);
          $("#name").val("");
          $("#slug").val("");
          $("#add-categ").show();
          $("#edit-categ").hide();
          loadCategories();
        } else {
          console.log(rspRes.msg + ": " + rspRes.err);
          alert(rspRes.msg + ": " + rspRes.err);
        }
      }
    });
  };

  /* add new category */
  $("#add-categ").on("click", function() {
      postCategory('/addNewCategory');
  });

  /* edit the category selected */
  $("#edit-categ").on("click", function(){
      postCategory('/editCategory');
  })

  /* select the category to edit */
  $("tbody").on("click", ".btn-edit", function() {
    let cate2Edit = $(this).parents("tr").data();
    $("input[name=id]").val(cate2Edit.id);
    $("#name").val(cate2Edit.name);
    $("#slug").val(cate2Edit.slug);
    $("#add-categ").hide();
    $("#edit-categ").show();
  });

  /* delete the category selected */
  $("tbody").on('click', ".btn-del", function(){
    if(!confirm("Are you sure to delete this category?")) return;
    let cate2Del = $(this).parents("tr");
    $.ajax({
        url: '/deleteCategory',
        method: 'get',
        dataType: 'json',
        data: {id: cate2Del.data('id')},
        success: function(rspRes){
            if(rspRes.code == 200){
                console.log(rspRes.msg);
                cate2Del.remove();
            }else{
                console.log(rspRes.msg+': '+rspRes.err);
                alert(rspRes.msg+': '+rspRes.err);
            }
        }
    })
  });

  /* select all categories or not */
  $(".check-all").on('click',function(){
      $(".check-single").prop("checked",$(this).prop("checked"));
      if($(this).prop("checked")){
          $("#batch-del").show();
      }else{
          $("#batch-del").hide();
      }
  });
  /* when enough number of categories seleceted, 'batch delete' appear */
  $('tbody').on('click', '.check-single', function(){
      let checkedLength = $('.check-single:checked').length;
      let checkLength =$('.check-single').length;
      if( checkedLength > 1 && checkedLength < checkLength){
          $("#batch-del").show();
          $(".check-all").prop("checked",false);
      }else if(checkedLength == checkLength){
          $("#batch-del").show();
          $(".check-all").prop("checked",true);
      }else{
          $("#batch-del").hide();
          $(".check-all").prop("checked",false);
      };
  });
  /* delete the selected categories in batch */
  $("#batch-del").on("click", function(){
      if(!confirm("Are you sure to delete all these categories?")) return;
      let categs2Del = [];
      $(".check-single:checked").each((index,element)=>{
        categs2Del.push($(element).parents("tr").data("id"));
      });
      $.ajax({
          url: '/deleteCategory',
          method: 'get',
          data: {id: categs2Del.join(',')},
          dataType: 'json',
          success: function(rspRes){
              if(rspRes.code == 200){
                console.log(rspRes.msg);
                loadCategories();
              }else{
                  console.log(rspRes.msg+": "+rspRes.err);
                  alert(rspRes.msg+": "+rspRes.err);
              }
          }
      })
  })
});
