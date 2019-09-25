$(function(){
   $.ajax({
       url: '/collectStatistic',
       method: 'get',
       dataType : 'json',
       success: function(rspRes){
           if(rspRes.code == 200){
               console.log(rspRes.msg);
               let htmlStr = template('ul-template', rspRes.data);
               $('#statistic-div').html(htmlStr);
           }else{
               console.log(rspRes.msg+": "+rspRes.err);
                alert(rspRes.msg+": "+rspRes.err);
           }
       }
   }) 
})