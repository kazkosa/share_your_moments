$(function(){
  if($(".like_btn").data("like")){
    $(".off-to-on").hide();
    $(".on-to-off").show();
  }else{
    $(".on-to-off").hide();
    $(".off-to-on").show();
  }
});