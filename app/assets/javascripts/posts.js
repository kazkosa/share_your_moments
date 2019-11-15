$(function(){
  // Get the geodata by using Google Map Api
  function initMap(){
    var myLatLng = {lat: 35.658581, lng: 139.745433};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: myLatLng,
      mapTypeControl: false ,
      streetViewControl: false,
      zoomControl: true,
      zoomControlOptions: {
        style: google.maps.NavigationControlStyle.SMALL
      }
    });
    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map
    });
    var geocoder = new google.maps.Geocoder();
    
    document.getElementById("map_confirm").addEventListener('click', function() {
      geocodeAddress(geocoder, map);
    });
  }
  if($("#map").length){
    initMap()
  }
  function geocodeAddress(geocoder, resultsMap){

    if (document.getElementById('address').value){
      var address = document.getElementById('address').value;
      geocoder.geocode({'address': address}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) { 
          resultsMap.setCenter(results[0].geometry.location);
          var marker = new google.maps.Marker({
            map: resultsMap,
            position: results[0].geometry.location
          });
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    }else{
      $("#map").css("display","none");
    }
  }

  //Display the image When a user select one
  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        var html =`<img id="current_image_for_edit" src="${e.target.result}"  ></img>`;
        $(".image_box_inner").append(html);
      }
      reader.readAsDataURL(input.files[0]);
    }
  }
  // This function is pending
  // $(".new-image").on("change",function(e){
  //   e.preventDefault();
  //   $('#current_image_for_edit').remove();
  //   $('.dummy_post_box').remove();
  //   readURL(this);
  // });

  var files_array = []
  var total_image_max = 5;
  $(".new-image.multiple").on("change",function(e){
    e.preventDefault();
    $(".image_box_inner").empty();
    files = $(this)[0].files;
    if (files.length == 0){
      var html =`
        <div class="dummy_post_box">
          No image
        </div>
      `;
      $(html).appendTo($(".image_box_inner")).trigger("create");
    }
    else if( files.length  <= total_image_max){
      for (var i=0; i<files.length; i++) {
        files_array.push(files[i]);
        var fileReader = new FileReader();
        (function(i){
          fileReader.onload = function( event ) {
            var loadedImageUri = event.target.result;
            var html =`<img id="current_image_for_edit" data-imgid=${i}  src="${loadedImageUri}"  ></img>`;
            $(html).appendTo($(".image_box_inner")).trigger("create");
          };
          fileReader.readAsDataURL(files[i]);
        })(i);
      }
      total_image = files.length;
      state_photo = 0
      if( total_image >= 2){
        var html_r=`
          <div class="right-arrow">></div>
        `;
        var html_l=`
          <div class="left-arrow"><</div>
        `;
        var html_b_children= ``;
        for (var i=0; i<total_image; i++) {
          html_b_children += `<li class="ball-box"></li>`;
        }
        var html_b=`
          <ul class="ball-boxes">
            ${html_b_children}
          </ul>
        `;
        $('.image_box_inner').append(html_r);
        $('.image_box_inner').append(html_l);
        $('.image_box_inner').append(html_b).trigger("create");
        state_trans(0);
      }
    }
    else{
      alert("You cannot upload because the maximum number that can be registered is exceeded");
    }
  });
  var state_photo = 0;
  var total_image = $("#current_image_for_edit").data("imgtotal") !=undefined ? $("#current_image_for_edit").data("imgtotal") : 0;
  
  // Initial setting in case of multiple images for show and edit action
  if (total_image >= 2){
    state_trans(0);
  }
  $(document).on("click",".right-arrow", function(e){
    state_trans(1);
  });
  $(document).on("click",".left-arrow", function(e){
    state_trans(-1);
  });

  // images state management
  function state_trans(step){
    if( (state_photo + step >= 0) && (state_photo + step <= total_image -1 ) ){
      state_photo += step;
    }
    if(state_photo == 0){
      $(".left-arrow").hide();
      $(".right-arrow").show();
    }else if(state_photo == total_image-1){
      $(".left-arrow").show();
      $(".right-arrow").hide();
    }else{
      $(".left-arrow").show();
      $(".right-arrow").show();
    }
    $("[id=current_image_for_edit]").hide();
    $("[data-imgid="+state_photo+"]").show();
    $(".ball-box").css("opacity","0.2");
    $(".ball-box:nth-of-type("+(state_photo+1) +")").css("opacity","0.6");
  }

  //Step1, Select the image effect
  $(".image_option_box").on("change",function(e){
    e.preventDefault();
    $("[id=current_image_for_edit]").removeClass();
    var sel ="filter-" + $(this).val();
    $("[id=current_image_for_edit]").addClass(sel);
    
  });
  //Back to Select the image effect from Step2
  $(".to_step1").on("click",function(e){
    e.preventDefault();
    $(".step1").css("display","block");
    $(".step2").css("display","none");
    $(".step3").css("display","none");
    $(".confirm").css("display","none");
    $(".step1.select_step").css("display","flex");
  });
  //Step2, Next to Step1 or Back from Step3
  $(".to_step2").on("click",function(e){
    e.preventDefault();
    var input = document.querySelector(".new-image");
    if (total_image > 0 && total_image <= total_image_max) {
      $(".step1").css("display","none");
      $(".step2").css("display","block");
      $(".step3").css("display","none");
      $(".confirm").css("display","none");
      $(".step2.select_step").css("display","flex");
    }
    else{
      alert("You havn't select the image correctly (do not exceed the maximum)");
    }
  });
  //Step2, Back from Step3 at edit mode
  $(".back_step2-edit").on("click",function(e){
    e.preventDefault();
    var input = document.querySelector(".new-image");
    $(".step1").css("display","none");
    $(".step2").css("display","block");
    $(".step3").css("display","none");
    $(".confirm").css("display","none");
    $(".step2.select_step").css("display","flex");
  });
  //Step3, Next to Step2 or Back from Confirm
  $(".to_step3").on("click",function(e){
    e.preventDefault();
    $(".step1").css("display","none");
    $(".step2").css("display","none");
    $(".step3").css("display","block");
    $(".confirm").css("display","none");
    $(".step3.select_step").css("display","flex");
  });
  //Confirm, Next to Step3
  $(".to_confirm").on("click",function(e){
    e.preventDefault();
    var title = $(".post_title").val();
    var content = $(".post_content").val().replace(/\r|\n|\r\n/g, '<br>');
    var location = $(".post_location").val();
    var html_location;

    //hashtag extraction
    const tags = content.match(/[#＃][Ａ-Ｚａ-ｚA-Za-z一-鿆0-9０-９ぁ-ヶｦ-ﾟー._-\u3005-\u3006]+/gm);
    //hashtag wrapping
    var content_repl= content.replace(/[#＃][Ａ-Ｚａ-ｚA-Za-z一-鿆0-9０-９ぁ-ヶｦ-ﾟー._-\u3005-\u3006]+/gm,'<span style="color:darkblue;">$&</span>');

    if(location){
      $("#map").css("display","block");
      html_location = `<strong>Photo Location</strong><br><div>  ${location}<br></div>`;
    }
    else{
      $("#map").css("display","none");
      html_location = ``;
    }

    if (title && content){
      $(".post.confirmation").remove();
      $(".step1").css("display","none");
      $(".step2").css("display","none");
      $(".step3").css("display","none");
      $(".confirm").css("display","block");
      $(".confirm.select_step").css("display","flex");
     
      var html =`
      <div class="post confirmation">
        <strong>Title</strong><br><div>${title}<br><br></div>
        <strong>Content</strong><br><div style="overflow:scroll;height:7em;">${content_repl}<br></div>
        ${html_location}
      </div>
      `;
      $(".input_box.confirm").prepend(html);
    }else if(!title){
      alert("Enter the title");
    }else{
      alert("Enter the Content");
    }
  });
  //Only use on edit an article process(almost equal to Create processe exclude nothing step1)
  if(document.URL.match(/.+\/posts\/.+\/edit/)){
    $(".step1").css("display","none");
    $(".step2").css("display","block");
    $(".step3").css("display","none");
    $(".confirm").css("display","none");
    $(".step2.select_step").css("display","flex");
  }

  //Map ON/OFF switch
  $(".swithmap").on("click",function(e){
    e.preventDefault();
    $('#map').toggle("slow");
  });
  
  // Initial set of commnet status when user visit show page
  if($(".comment-state" ).data("written")){
    $(".commnet-notyet" ).hide();
    $(".commnet-already").show();
  }else{
    $(".commnet-already").hide();
    $(".commnet-notyet" ).show();
  }
  if($(".article_box__content").length){
    var show_content= $(".article_box__content").html().replace(/[#＃][Ａ-Ｚａ-ｚA-Za-z一-鿆0-9０-９ぁ-ヶｦ-ﾟー._-\u3005-\u3006]+/gm,
    '<span>\
        <form class="searchform" action="/posts/search" accept-charset="UTF-8" method="get" style="display:inline;">\
        <input name="keyword" type="hidden" value = $& >\
        <input type="submit" name="commit" value=$& style="color:darkblue; background:white; border:none;marign:0;padding:0;" >\
      </form>\
    </span>'
    );
    $(".article_box__content").html(show_content);
  }

  // Display Search result function 
  function appendMsgToHTML(text){
    html = `
      <li class="searchbox__resultbox__inner__item">
        ${text}
      </li>
    `;
    $(".searchbox__resultbox__inner").append(html);
  }
  function show_search_result(e){
    e.preventDefault();
    var input = $(this).val();
    var url = $(".searchform").attr("action");
    if(input !=="" ){
      $.ajax({
        url: url,
        type: 'get',
        data:{keyword: input},
        dataType:'json'
      })
      .done(function(search_results){
        $(".searchbox__resultbox__inner").empty();
        if (search_results.length !== 0) {
          appendMsgToHTML(search_results.length+" posts");
          $(".searchbox__resultbox").show(500);
        }
        else {
          appendMsgToHTML("No results found");
          $(".searchbox__resultbox").show(500);
        }  
      })
      .fail(function(){
        alert("Search error");
      })
    }
  }
  if( $(".searchbox").length ){
    $(".search-box-input").on("keyup",show_search_result);
    $(".search-box-input").focusin(show_search_result);
    $(document).on('click',   function(e) {
      if (!$(e.target).closest(".searchbox").length) {
        $(".searchbox__resultbox").hide(500);
        $(".searchbox__resultbox__inner").empty();
      }
    });
  }
  $(".comment-state").on("click",function(e){
    e.preventDefault();
    $(".message__content").focus();
  });
  $(".mask").on("touchstart",function(){
    $(this).addClass('hover_mask');
  });
  $(".mask").on("touchend",function(){
    $(this).addClass('hover_mask');
  });
});