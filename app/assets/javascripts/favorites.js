$(function(){
  if($(".favorite-state").data("favorite")){
    $(".favorite-notyet" ).hide();
    $(".favorite-already").show();
  }else{
    $(".favorite-already").hide();
    $(".favorite-notyet" ).show();
  }
});