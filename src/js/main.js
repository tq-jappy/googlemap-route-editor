var $ = require('jquery/dist/jquery.min');

$(document).ready(() => {
  const $map = $('#map');
  const mapOptions = {
    center: new google.maps.LatLng(35.681382, 139.766084),
    zoom: 15,
    minZoom: 10,
    maxZoom: 18,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    streetViewControl: false,
    mapTypeControl: false
  };
  const map = new google.maps.Map($map[0], mapOptions);
  console.log('map created.', map);
});

