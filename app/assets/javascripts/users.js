$(function(){
  function readURL(input) {
    if (input.files && input.files[0]) {
      $(".avatar_box_inner").css('height','60px');
      var reader = new FileReader();
      reader.onload = function (e) {
        var html =`<img class="avatar_image" src="${e.target.result}"></img>`;
        console.log(html);
        $(".avatar_box_inner").append(html);
      }
      reader.readAsDataURL(input.files[0]);
    }
  }
  $(".new-avatar").on("change",function(e){
    e.preventDefault();
    console.log(this);
    $('.avatar_image').remove();
    readURL(this);
    console.log(this);

  
  })


})