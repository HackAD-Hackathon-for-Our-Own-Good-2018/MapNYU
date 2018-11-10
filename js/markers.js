// var points = [
//     {latlng: [51.5074, 0.1278]},
//     {latlng: [40.7128, 74.0060]},
//     {latlng: [43.7696, 11.2558]},
//     {latlng: [33.8688, 151.2093]},
//     {latlng: [34.6037, 58.3816]},
//     {latlng: [38.9072, 77.0369]},
//     {latlng: [5.6037, 0.1870]},
//     {latlng: [50.0755, 14.4378]},
//     {latlng: [52.5200, 13.4050]},
//     {latlng: [31.2304, 121.4737]},
//     {latlng: [32.0853, 34.7818]},
//     {latlng: [40.4168, 3.7038]}
// ];

// var nyuIcon = L.icon({
// 	iconUrl: 'images/nyu.png',
// 	iconSize: [ 25, 35 ] // size of the icon
// });


// var pointsGroup = L.layerGroup();
// points.forEach(function(d){
  
//     // binding data to marker object's option
//     L.marker(d.latlng, {icon :nyuIcon}).addTo(pointsGroup);
// });


// var baseLayers = {},
//     subLayers = {"Points": pointsGroup };

// var mymap = L.map("map-holder", {
//     center: [40.7128, 74.0060],
//     zoom: 10,
//     layers: [pointsGroup]
// });

// L.control.layers(baseLayers, subLayers, {position: "topright"}).addTo(map);

var points = [
    {latlng: [30.94110220488552, -238.14239501953122],  achieve: 0.34},
    {latlng: [31.12819929911196, -238.24676513671875],  achieve: 0.67},
    {latlng: [30.987027960280326, -238.46649169921875], achieve: 0.59},
    {latlng: [31.230417393130743, -238.47747802734375], achieve: 0.32},
    {latlng: [31.235114421248575, -238.63128662109375], achieve: 0.97},
    {latlng: [31.340735782189476, -238.41979980468747], achieve: 0.82}
];
var pointsGroup = L.layerGroup();
points.forEach(function(d){
  
    // binding data to marker object's option
    L.marker(d.latlng, { achieve: d.achieve })
        .on("mouseover", onMouseOver)
        .on("mouseout", onMouseOut)
        .addTo(pointsGroup);
});

var baseLayers = {},
    subLayers = { "Points": pointsGroup };

var map = L.map("map-holder", {
    center: [31.240985378021307, -238.50466489791867],
    zoom: 10,
    layers: [pointsGroup]
});

L.control.layers(baseLayers, subLayers, {position: "topright"}).addTo(map);




function onMouseOver(e){
    var point = map.latLngToContainerPoint(e.latlng);
    var tooltip = d3.select(map.getContainer())
        .append("div")
        .attr("class", "tooltip")
        // Calculating according to marker and tooltip size
        .style({ left: point.x - 40 + "px", top: point.y - 80 - 41 + "px" })
        .node();
    getPie(tooltip, e.target.options.achieve);
}
function onMouseOut(e){
    d3.select(map.getContainer()).select(".tooltip").remove();
}
function getPie(node, value){
    var size = 70;
    var arc = d3.svg.arc().outerRadius(size / 2).innerRadius(size / 3),
        pie = d3.layout.pie().sort(null);
    d3.select(node).append("svg")
        .attr({ width: size, height: size })
        .append("g")
        .attr("transform", "translate(" + [size / 2, size / 2] + ")")
        .call(function(s){
            s.append("text")
             .text(d3.format(".2p")(value))
             .style("font", "12px")
             .attr({ "text-anchor": "middle", "alignment-baseline": "central" });
        })
        .selectAll("path")
        .data(pie([value, 1 - value]))
        .enter()
        .append("path")
        .attr({
            d: arc,
            fill: function(d,i){ return i ? "gray" : "red"; }
        });
}







