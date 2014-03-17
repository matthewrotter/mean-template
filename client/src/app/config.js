(function() {
  "use strict";

  GlobeSherpa.service({
    name: 'SherpaConfig',
    dependencies: [],
    extension: GlobeSherpa.Manager,
    factory: function() {
      return {
        global: {
          env: 'dev'
        },
        servers: {
          api: 'http://localhost:4019',
          prefix: '/gtfs/v1'
        },
        // agency: 'valley-metro',
        agency: 'trimet',
        map: {
          // location: [33.345644, -111.925432],
          location: [45.524382, -122.675648],
          zoom: 15,
          tileUrl: 'http://{s}.tile.cloudmade.com/bb99aa8037bd43ffb2dab66ae5a9ad0a/113863/256/{z}/{x}/{y}.png'
          // tileUrl: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        },
        jsonp: {}
      };
    }
  });

}());
