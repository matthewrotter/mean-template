// Angular Controllers
//
(function() {

  angular.module('trip-planner').controller('InputController', ['$scope', 'SherpaConfig', '$http', function InputController($scope, SherpaConfig, $http) {
  }]);

  angular.module('trip-planner').controller('MapController', ['$scope', '$http', 'SherpaConfig', 'GeoService', 'MappingService', function($scope, $http, SherpaConfig, GeoService, MappingService) {

    // set up map
    var startingLocation = SherpaConfig.map.location;

    L.Icon.Default.imagePath = 'assets/img/leaflet';

    var map = L.map('map').setView(startingLocation, SherpaConfig.map.zoom);

    L.tileLayer(SherpaConfig.map.tileUrl, {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
      maxZoom: 18
    }).addTo(map);

    var markers = [];

    // first, just place our starting point for s&g's
    // getNearbyStops(startingLocation);

    var marker = L.marker(startingLocation).addTo(map);
    markers.push(marker);


    map.on('click', function(e) {
      $scope.$apply(function() {
        getNearbyStops([e.latlng.lat, e.latlng.lng]);
      });

      var marker = L.marker(e.latlng).addTo(map);
      markers.push(marker);
    });


    function onCoords(pos) {
      var crd = pos.latlng,
        coords = [crd.latitude, crd.longitude],
        radius = pos.accuracy / 2;

      map.setView(coords, 15);

      var marker = L.marker(coords).addTo(map);
      marker.bindPopup("<b>Accuracy:</b><br>" + radius + " meters").openPopup();
      markers.push(marker);
    }


    // save this for when they hit the 'my location' button
    // GeoService.locate(onCoords);


    // now find nearby stops
    function getNearbyStops(latlon) {
      clearMarkers();

      var stops = [];
      $http.get(SherpaConfig.servers.api + SherpaConfig.servers.prefix + '/stopsNearby/' + latlon[0] + '/' + latlon[1] + '/1')
        .success(function(result) {

          // now add stops
          result.forEach(function(stop) {
            var marker = L.marker([stop.loc[1], stop.loc[0]]).addTo(map);
            markers.push(marker);
            marker.on('click', function(e) {
              console.log('P', e.target.getLatLng());

              var markerContent = "<b>" + stop.stop_name + "</b>";
              getTimesByStop(stop.stop_id, function(times) {
                _.forEach(times, function(val, key) {
                  markerContent += '<br><b>' + val.route.routeName + ' to ' + val.route.headsign + '</b>';
                  val.times.forEach(function(item) {
                    markerContent += '<br>' + item;
                  });
                });
                marker.bindPopup(markerContent).openPopup();
              });


            });

            marker.on('dblclick', function(e) {
              $scope.$apply(function() {
                $http.post('http://localhost:3000/v1/sms', {
                  to: '+15039573222',
                  from: '+19712051088',
                  body: stop.stop_name
                })
                  .success(function(result) {
                    console.log('SMS sent!');
                  });
              });
            });
          });
        })
        .error(function(err) {
          console.log('ERROR: ' + err);
        });
    }


    function getTimesByStop(stop, cb) {
      $scope.$apply(function() {
        $http.get(SherpaConfig.servers.api + SherpaConfig.servers.prefix + '/times/' + SherpaConfig.agency + '/43/' + stop)
          .success(function(result) {
            cb(result);
          });
      });
    }

    function clearMarkers() {
      markers.forEach(function(m) {
        map.removeLayer(m);
      });
    }

  }]);

}());

