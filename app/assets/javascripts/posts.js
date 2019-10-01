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
  $(".new-image").on("change",function(e){
    e.preventDefault();
    $('#current_image_for_edit').remove();
    $('.dummy_post_box').remove();
    readURL(this);
  });


  //Select the image effect
  $(".image_option_box").on("change",function(e){
    e.preventDefault();
    $("#current_image_for_edit").removeClass();
    var sel ="filter-" + $(this).val();
    $("#current_image_for_edit").addClass(sel);
  });

  $(".to_step1").on("click",function(e){
    e.preventDefault();
    $(".step1").css("display","block");
    $(".step2").css("display","none");
    $(".step3").css("display","none");
    $(".confirm").css("display","none");
    $(".step1.select_step").css("display","flex");
  });

  $(".to_step2").on("click",function(e){
    e.preventDefault();
    var input = document.querySelector(".new-image");
    if (input.files && input.files[0]) {
      $(".step1").css("display","none");
      $(".step2").css("display","block");
      $(".step3").css("display","none");
      $(".confirm").css("display","none");
      $(".step2.select_step").css("display","flex");
    }
    else{
      alert("You havn't select an image file yet.Select one!");
    }
  });

  $(".to_step3").on("click",function(e){
    e.preventDefault();
    $(".step1").css("display","none");
    $(".step2").css("display","none");
    $(".step3").css("display","block");
    $(".confirm").css("display","none");
    $(".step3.select_step").css("display","flex");
  });
  $(".to_confirm").on("click",function(e){
    e.preventDefault();
    var title = $(".post_title").val();
    var content = $(".post_content").val().replace(/\r|\n|\r\n/g, '<br>');
    var location = $(".post_location").val();
    var html_location;
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
        <strong>Content</strong><br><div style="overflow:scroll;height:5em;">${content}<br></div>
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
});