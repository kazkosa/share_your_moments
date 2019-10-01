$(function(){
  function buildHTML(data){
    var html_avatar = data.user_avatar? 
    `<div class="avatar_box_inner"><img class="avatar_image" src=${data.user_avatar}></div>` 
    : `<div class="avatar_box_inner__non-avatar"><i class="fa fa-user-circle fa-2x non-avatar"></i></div>`;

    var html = `
      <div class="user_box">
        <div class="user_box_wrapper">
          <div class="avatar_box">
            ${html_avatar}
          </div>
          <div class="comment_box_main">
            <div class="comment_box_main__name">
              ${data.user_name}
            </div>
            <div class="comment_box_main__text">${data.text}</div>
            <div class="comment_box_main__timestamp">
              ${data.created_at}
            </div>
          </div>
        </div>
      </div>   
    `;
    $(".comment-list").append(html);
  }

  //Comment send by ajax
  $(".new__message").on("submit", function(e){
    e.preventDefault();
    var input = $(".message__content").val().replace(/\r|\n|\r\n/g, '<br>');
    var formData = new FormData(this);
    var url = $(this).attr("action");

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(data){
      //'if branch' is set to reject the case which the submit btn pressed unless user have nothing enter the comment
      if(data){
        //build html
        buildHTML(data);
        
        //auto scroll
        var target = $(".user_box").last();
        var position = target.offset().top + $(".article_and_comment_box").scrollTop();
        $(".article_and_comment_box").animate({scrollTop: position}, 300, 'swing');

        //comment icon checked
        $(".commnet-notyet").hide();
        $(".commnet-already").show();

      }
      else{
        alert("Reject by Irregular comment"); 
      }
      //form reset
      $("#new_comment")[0].reset();
      $("#comment_post").removeAttr("disabled");
    })
    .fail(function(){
      //500 
      alert("Error");
    })
  });
});
