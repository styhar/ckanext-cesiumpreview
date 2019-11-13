// json preview module
ckan.module("cesiumpreview", function(jQuery, _) {
  return {
    options: {
      server: "https://nationalmap.gov.au/",
      homeCamera: null
    },
    _getInitialConfig: function() {
      return {
        version: "0.0.03",
        initSources: [
          {
            catalog: [
              {
                type: "group",
                name: "User-Added Data",
                description:
                  "The group for data that was added by the user via the Add Data panel.",
                isUserSupplied: true,
                isOpen: true,
                items: [
                  {
                    type: "kml",
                    name: "User Data",
                    isUserSupplied: true,
                    isOpen: true,
                    isEnabled: true,
                    url: "http://"
                  }
                ]
              }
            ],
            catalogIsUserSupplied: true,
            homeCamera: {
              west: 105,
              south: -45,
              east: 155,
              north: -5
            }
          }
        ]
      };
    },
    initialize: function() {
      var self = this;

      var config = this._getInitialConfig();

      if (this.options.homeCamera) {
        var extent = window.geojsonExtent(this.options.homeCamera); //[WSEN]
        var home = config["initSources"][0]["homeCamera"];
        if (extent[0] != extent[2]) {
          home["west"] = extent[0];
          home["south"] = extent[1];
          home["east"] = extent[2];
          home["north"] = extent[3];
        }
      }
      var preload_resource = window.preload_resource;
      var item = config["initSources"][0]["catalog"][0]["items"][0];
      item["url"] = preload_resource["url"];
      if (preload_resource["url"].indexOf("http") !== 0) {
        item["url"] = "http:" + preload_resource["url"];
      }
      item["type"] = preload_resource["format"].toLowerCase();

      if (item["type"] == "wms" || item["type"] == "wfs") {
        // if wms_layer specified in resource, display that layer/layers by default
        if (preload_resource["wms_layer"]) {
          item["layers"] = preload_resource["wms_layer"];
        } else {
          item["type"] = item["type"] + "-getCapabilities";
        }
      }
      if (item["type"] == "aus-geo-csv" || item["type"] == "csv-geo-au") {
        item["type"] = "csv";
      }
      var encoded_config = encodeURIComponent(JSON.stringify(config));
      var style = "height: 600px; width: 100%; border: none;";
      var display = "allowFullScreen mozAllowFullScreen webkitAllowFullScreen";

      var html =
        '<iframe src="' +
        this.options.server +
        "#clean&hideExplorerPanel=1&start=" +
        encoded_config +
        '" style="' +
        style +
        '" ' +
        display +
        "></iframe>";

      self.el.html(html);
    }
  };
});
