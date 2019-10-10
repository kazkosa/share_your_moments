$(function(){
  function readURL(input) {
    if (input.files && input.files[0]) {
      $(".avatar_box_inner").css('height','60px');
      var reader = new FileReader();
      reader.onload = function (e) {
        var html =`<img class="avatar_image" src="${e.target.result}"></img>`;
        $(".avatar_box_inner").append(html);
      }
      reader.readAsDataURL(input.files[0]);
    }
  }
  $(".new-avatar").on("change",function(e){
    e.preventDefault();
    $('.avatar_image').remove();
    readURL(this);

  })


  $(".user-posts-btn").on("click",function(e){
    e.preventDefault();
    $(".user-posts-btn"     ).removeClass("btn-outline-secondary ");
    $(".user-posts-btn"     ).addClass("btn-secondary ");
    $(".user-favorites-btn" ).removeClass("btn-secondary ");
    $(".user-favorites-btn" ).addClass("btn-outline-secondary ");
    $(".user-followers-btn" ).removeClass("btn-secondary ");
    $(".user-followers-btn" ).addClass("btn-outline-secondary ");
    $(".user-followings-btn").removeClass("btn-secondary ");
    $(".user-followings-btn").addClass("btn-outline-secondary ");

    $(".user-post-main__inner__container__list__posts").show(200);
    $(".user-post-main__inner__container__list__favorites").hide(200);
    $(".user-post-main__inner__container__list__followers").hide(200);
    $(".user-post-main__inner__container__list__followings").hide(200);
  });


  $(".user-favorites-btn").on("click",function(e){
    e.preventDefault();
    $(".user-posts-btn"     ).removeClass("btn-secondary ");
    $(".user-posts-btn"     ).addClass("btn-outline-secondary ");
    $(".user-favorites-btn" ).removeClass("btn-outline-secondary ");
    $(".user-favorites-btn" ).addClass("btn-secondary ");
    $(".user-followers-btn" ).removeClass("btn-secondary ");
    $(".user-followers-btn" ).addClass("btn-outline-secondary ");
    $(".user-followings-btn").removeClass("btn-secondary ");
    $(".user-followings-btn").addClass("btn-outline-secondary ");

    $(".user-post-main__inner__container__list__posts").hide(200);
    $(".user-post-main__inner__container__list__favorites").show(200);
    $(".user-post-main__inner__container__list__followers").hide(200);
    $(".user-post-main__inner__container__list__followings").hide(200);


  });

  $(".user-followers-btn").on("click",function(e){
    e.preventDefault();
    $(".user-posts-btn"     ).removeClass("btn-secondary ");
    $(".user-posts-btn"     ).addClass("btn-outline-secondary ");
    $(".user-favorites-btn" ).removeClass("btn-secondary ");
    $(".user-favorites-btn" ).addClass("btn-outline-secondary ");
    $(".user-followers-btn" ).removeClass("btn-outline-secondary ");
    $(".user-followers-btn" ).addClass("btn-secondary ");
    $(".user-followings-btn").removeClass("btn-secondary ");
    $(".user-followings-btn").addClass("btn-outline-secondary ");

    $(".user-post-main__inner__container__list__posts").hide(200);
    $(".user-post-main__inner__container__list__favorites").hide(200);
    $(".user-post-main__inner__container__list__followers").show(200);
    $(".user-post-main__inner__container__list__followings").hide(200);


  });

  $(".user-followings-btn").on("click",function(e){
    e.preventDefault();
    $(".user-posts-btn"     ).removeClass("btn-secondary ");
    $(".user-posts-btn"     ).addClass("btn-outline-secondary ");
    $(".user-favorites-btn" ).removeClass("btn-secondary ");
    $(".user-favorites-btn" ).addClass("btn-outline-secondary ");
    $(".user-followers-btn" ).removeClass("btn-secondary ");
    $(".user-followers-btn" ).addClass("btn-outline-secondary ");
    $(".user-followings-btn").removeClass("btn-outline-secondary ");
    $(".user-followings-btn").addClass("btn-secondary ");

    $(".user-post-main__inner__container__list__posts").hide(200);
    $(".user-post-main__inner__container__list__favorites").hide(200);
    $(".user-post-main__inner__container__list__followers").hide(200);
    $(".user-post-main__inner__container__list__followings").show(200);

  });

})