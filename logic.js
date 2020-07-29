var queryUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';


d3.json(queryUrl, function(data) {
    console.log(data)

    createFeatures(data);
});

function createFeatures(earthquakeData) {
    
    function onEachLayer(feature) {
        return new L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
            radius: circleSize(feature.properties.mag),
            fillOpacity: .6,
            color: getColor(feature.properties.mag),
            fillColor: getColor(feature.properties.mag)
        });
    }


    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place + "</h3>" + "<hr><p>" + feature.properties.mag + "</p>")
    }

    var earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature,
        pointToLayer: onEachLayer
    });

    createMap(earthquakes);

    function createMap(earthquakes) {
        var satellitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
            attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
            maxZoom: 18,
            id: "mapbox.satellite",
            accessToken: 'pk.eyJ1IjoiZ2hvbGxhbmQyMyIsImEiOiJjazg4dmUzOXIwMGg3M2Vwa3FxaWdvejE4In0.QPFNAZ9p1UnMqakVBVi3DA'
        });
        

        var baseMaps = {
            "Satellite": satellitemap,
        };

        var overlayMaps = {
            Earthquakes: earthquakes
        };

        var myMap = L.map("map", {
            center: [
              35.00, -97.00
            ],
            zoom: 4,
            layers: [satellitemap, earthquakes]
          });
        
        
        //COMEBACK AND CREATE LEGEND!!!!!
          var info = L.control({
            position: "topright"
        });

    }

    function getColor(magnitude) {
        // Conditionals for magnitude
        if (magnitude >= 5) {
          return "red";
        }
        else if (magnitude >= 4) {
          return "peru";
        }
        else if (magnitude >= 3) {
         return "darkorange";
        }
        else if (magnitude >= 2) {
          return "yellow";
        }
        else if (magnitude >= 1) {
          return "yellowgreen";
        }
        else {
          return "green";
        }
    };
    
    // Define a circleSize function that will give each city a different radius based on its population
    function circleSize(magnitude) {
      return magnitude ** 2;
    }























}
