$(document).ready(function () {
    function initialize() {
          var myLatlng = new google.maps.LatLng(39, -99);
          var mapOptions = {
            center: { lat: 39.8282, lng: -98.5795},
            zoom: 4,
          };
          var map = new google.maps.Map(document.getElementById('map-canva5s'),
              mapOptions);
          var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: 'Hello World!'
          });
        }
        google.maps.event.addDomListener(window, 'load', initialize);
    
    function getImages(){
    console.log("Get Images");
  //complete the click handler
  //$( '#submit' ).click(function(){
    //create a variable that takes in the value of the input field 
    var input = $('#search').val();
    //create a variable called API that replaces the "__TAGS__" in the api variable with the user's input
    var API = api.replace("__TAGS__",input);
    //Use JQuery's $.getJSON that takes in the api and calls processResponse ex. $.getJSON(url, function)
    $.getJSON(API, processResponse);
    function processResponse(resp){
      $.each(resp.photos.photo, function(i, item){
        //complete this url and put it in a variable called imageUrl
       
      var imgURL =   "https://farm"+item.farm+".staticflickr.com/"+item.server+"/"+item.id+"_"+item.secret+".jpg";
        
          console.log(item);
          $('.image').append("<img src='"+imgURL+"'></img>");
      });
    }
}
$("#search").on("click", getImages());
});
