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

// county polygon as geojson
var county_url = "http://ngarindungu.pythonanywhere.com/search/county/"

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
    iconUrl: 'placeholder.png',
    iconSize: [35, 45] 
    });

// function to fetch county bounds
var onClick = function(e) {
    console.log(e.target.feature.properties); // to access feature properties
    // ajax
    var xhttp = new XMLHttpRequest(); // create object     
    xhttp.open("POST", county_url, true);
    //xhttp.timeout = 300;
    var formData = new FormData();    
    formData.append("name", e.target.feature.properties.name);    
    xhttp.send(formData);
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 & this.status == 200) {
            console.log(typeof(this.responseText));
            var county = L.geoJson(JSON.parse(this.responseText)).addTo(map);
        }        
    }
}
   
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
        // bind events to each point
        layer.on('mouseover', function(e) {layer.openPopup();});
        layer.on('mouseout', function(e) {layer.closePopup();});
        // override onclick event
        layer.on('click', onClick);
    }
    // filter:
};

var points =  L.geoJson.ajax('villages.geojson', geojsonOptions);
points.addTo(map);
console.log(points.getBounds());
/* TODO 
show county name on hover: openpopup
draw county on click:
make ajax call to django view with the county name
create new geojson layer with response and add to map

// count layers on map

var count = 0
map.eachLayer(function(layer) {
    count += 1;
    console.log(layer);
});
console.log(count);
*/
 

