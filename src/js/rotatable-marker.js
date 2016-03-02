const geolib = require('geolib/dist/geolib');

export default class RotatableMarker {
  constructor(map, position, options) {
    console.log('create marker', map, position, options);
    this.position = position;
    this.marker = new google.maps.Marker({
      map: map,
      position: position,
      draggable: true,
      icon: {
        path: 'M -1.1500216e-4,0 C 0.281648,0 0.547084,-0.13447 0.718801,-0.36481 l 17.093151,-22.89064 c 0.125766,-0.16746 0.188044,-0.36854 0.188044,-0.56899 0,-0.19797 -0.06107,-0.39532 -0.182601,-0.56215 -0.245484,-0.33555 -0.678404,-0.46068 -1.057513,-0.30629 l -11.318243,4.60303 0,-26.97635 C 5.441639,-47.58228 5.035926,-48 4.534681,-48 l -9.06959,0 c -0.501246,0 -0.906959,0.41772 -0.906959,0.9338 l 0,26.97635 -11.317637,-4.60303 c -0.379109,-0.15439 -0.812031,-0.0286 -1.057515,0.30629 -0.245483,0.33492 -0.244275,0.79809 0.0055,1.13114 L -0.718973,-0.36481 C -0.547255,-0.13509 -0.281818,0 -5.7002158e-5,0 Z',
        rotation: 0,
        scale: 1,
        fillColor: 'red',
        fillOpacity: 0.8,
        strokeWeight: 1
      }
    });

    this.grip = new google.maps.Marker({
      map: map,
      position: position,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        strokeWeight: 10,
        fillColor: '#009900',
        strokeColor: 'green',
        anchor: new google.maps.Point(0, 64)
      }
    });

    this.handle = new google.maps.Marker({
      map: map,
      position: position,
      draggable: true,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8,
        strokeOpacity: 0.2,
        anchor: new google.maps.Point(0, 8)
      }
    });

    google.maps.event.addListener(this.marker, 'drag', (e) => {
      this.onMarkerDrag(e.latLng.lat(), e.latLng.lng());
    });
    google.maps.event.addListener(this.marker, 'dragend', (e) => {
      this.onMarkerDragEnd(e.latLng.lat(), e.latLng.lng());
    });
    google.maps.event.addListener(this.handle, 'drag', (e) => {
      this.onHandleDrag(e.latLng.lat(), e.latLng.lng());
    });
    google.maps.event.addListener(this.handle, 'dragend', (e) => {
      this.onHandleDragEnd(e.latLng.lat(), e.latLng.lng());
    });
  }

  onMarkerDrag(lat, lng) {
    this.handle.setPosition(this.marker.getPosition());
    this.grip.setPosition(this.marker.getPosition());
  }

  onMarkerDragEnd(lat, lng) {
    this.onMarkerDrag(lat, lng);
  }

  onHandleDrag(lat, lng) {
    const rotation = Math.ceil(geolib.getRhumbLineBearing(
      { latitude: this.marker.position.lat(), longitude: this.marker.position.lng() },
      { latitude: lat, longitude: lng }
    ));

    const handleIcon = this.handle.icon;
    handleIcon.strokeOpacity = 0.0;
    handleIcon.anchor = new google.maps.Point(0, 0);
    this.handle.setIcon(handleIcon);

    const gripIcon = this.grip.icon;
    gripIcon.rotation = rotation;
    this.grip.setIcon(gripIcon);

    const markerIcon = this.marker.icon;
    markerIcon.rotation = rotation;
    this.marker.setIcon(markerIcon);
  }

  onHandleDragEnd(lat, lng) {
    console.log('drag end', lat, lng);

    const handleIcon = this.handle.icon;
    handleIcon.strokeOpacity = 0.2;
    handleIcon.anchor = new google.maps.Point(0, 8);
    handleIcon.rotation = this.grip.icon.rotation;
    this.handle.setIcon(handleIcon);
    this.handle.setPosition(this.grip.getPosition());
  }
}