// create map
// 

var map = L.map('map', {
    center: [-1.293031, 36.866733],
    zoom: 6
});

//var map = L.map('map').setView([-1.293031, 36.866733], 8);

// icon attribution
var iconAttribution = "Placeholder icon made by <a href='http://www.flaticon.com/authors/madebyoliver'> Madebyoliver </a> from www.flaticon.com";
document.getElementById('iconttribution').innerHTML = iconAttribution;
// base map options
var tileOptions = {
    minZoom: 6,
    attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors </br>",
    noWrap: true
    };
// url template {s} or one of subdomain    
var osmBase = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', tileOptions).addTo(map);

// GeoJson
// icon to use for visited places
var visitedIcon = L.icon({
    iconUrl: '../placeholder.png',
    iconSize: [35, 45] 
    });
   
var geojsonOptions = {
    /*pointToLayer: function(feature, latlng) {        
        return L.marker(latlng, {icon: visitedIcon});       
    }, */
    // Points will use the default icon style unless visited
    onEachFeature: function(feature, layer) {
        if(feature.properties && feature.properties.name) {
            layer.bindPopup(feature.properties.name + ' County');
        }
        if(feature.properties.visited === '1') {            
            layer.setIcon(visitedIcon);                        
        }
    }
    // filter:
};

var points = new L.GeoJSON.AJAX('../villages.geojson', geojsonOptions);
points.addTo(map);

// count layers on map
/*
var count = 0
map.eachLayer(function(layer) {
    count += 1;
    console.log(layer);
});
console.log(count);
*/
 

