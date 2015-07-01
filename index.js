var markers =[];
var map;
$(document).ready(function () {
    function initialize() {
          var mapOptions = {
            center: { lat: 39.8282, lng: -98.5795},
            zoom: 5,
          };
          map = new google.maps.Map(document.getElementById('map-canvas'),
              mapOptions);
          
        }
        google.maps.event.addDomListener(window, 'load', initialize);
    
    function getImages(){
      clearMarkers();
      if ($("#input").val().trim().length === 0) {
        return;
      }
  //complete the click handler
    //create a variable that takes in the value of the input field 
    var input = $('#input').val();
    //create a variable called API that replaces the "__TAGS__" in the api variable with the user's input
    var api = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=104a07b4b683d9dd192e30080afdb74f&tags=__TAGS__&has_geo=1&extras=geo&format=json&jsoncallback=?";
    var API = api.replace("__TAGS__",input);
    $("#lickr").attr("src", api);
    //Use JQuery's $.getJSON that takes in the api and calls processResponse ex. $.getJSON(url, function)
    function processResponse(resp){
      if (input !== $("#input").val()) {
        return;
      }
      $.each(resp.photos.photo, function(i, item){
        //complete this url and put it in a variable called imageUrl
      var imgURL =   "https://farm"+item.farm+".staticflickr.com/"+item.server+"/"+item.id+"_"+item.secret+".jpg";
          
          var myLatlng = new google.maps.LatLng(item.latitude, item.longitude);
          var marker = new google.maps.Marker({
            position: myLatlng,
            map: map
          });
          
          var contentString = "<img src='"+imgURL+"'></img>";
          var infowindow = new google.maps.InfoWindow({
            content: contentString
          });
          google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map,marker);
          });
          markers.push(marker);
      });
    }
    $.getJSON(API, processResponse);
}
function clearMarkers () {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers= [];
}
$("#input").keyup(getImages);
$("#search").on("click", getImages);
$("#clear").on("click", clearMarkers);
});
