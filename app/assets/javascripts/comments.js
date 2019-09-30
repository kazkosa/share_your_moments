$(function(){
  function buildHTML(data){
    var html = `
      <div class="user_box">
        <div class="user_box_wrapper">
          <div class="avatar_box">
            <div class="avatar_box_inner">
              <img class="avatar_image" src=${data.user_avatar}>
            </div>
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
    console.log(html);
    console.log("Good Good Good")
    $(".comment-list").append(html);
  }

  //Comment send by ajax
  $(".new__message").on("submit", function(e){
    e.preventDefault();
    var input = $(".message__content").val().replace(/\r|\n|\r\n/g, '<br>');
    console.log(input);
    console.log(this);
    var formData = new FormData(this);
    var url = $(this).attr("action");
    console.log(url);
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(data){
      
      console.log("Communicate Good");
      console.log(data.text);
      console.log(data.created_at);
      console.log(data);
      console.log(data.user_avatar);
      
      if(data){
        buildHTML(data);

        
        var target = $(".user_box").last();
        var position = target.offset().top + $(".article_and_comment_box").scrollTop();
        $(".article_and_comment_box").animate({scrollTop: position}, 300, 'swing');
        
      }
      else{
        alert("Reject by Irregular comment");
      }

      $("#new_comment")[0].reset();
      $("#comment_post").removeAttr("disabled");
    })
    .fail(function(){
      alert("Error");
    })



  });


});
