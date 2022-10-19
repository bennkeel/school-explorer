function initializeSchoolMap() {
    let schoolMap = L.map('school-map').setView([39.995, -75.13], 12);

    L.tileLayer('https://api.mapbox.com/styles/v1/keelbn/cl8w1pun9001514odcvwo00gb/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoia2VlbGJuIiwiYSI6ImNqaWVseGZjZzA3emMzdnAxM296OTFjNG8ifQ.W2j9Y2mz4t6vGRyKJk_Nyw', {
        maxZoom: 19,
        minZoom: 10,
        attribution: '© OpenStreetMap',
    }).addTo(schoolMap);

    return schoolMap;
}

function makeSchoolFeature(school) {
    return {
        "type": "Feature",
        "id": school['sdp_id'],
        "properties": {
          "school_name": school['name'],
          "abbr_name": school['abbr_name'],
          "address": school['Street Address'],
          "grades": school['Current Grade Span Served'],
        },
        "geometry": school['geom'],
      };
}

/*
function changeColor(marker) {
    if (marker.classed("selected") = true) {
        
    } else {

    }
}*/

function showSchoolsOnMap(schoolsToShow, schoolsMap) {
    if (schoolsMap.schoolLayer !== undefined){
        schoolsMap.removeLayer(schoolsMap.schoolLayer);
    }

    const schoolFeatureCollection = {
        "type": "FeatureCollection",
        "features": schoolsToShow.map(makeSchoolFeature),
    };

    schoolsMap.schoolLayer = L.geoJSON(schoolFeatureCollection, {
        pointToLayer: (geoJsonPoint, latlng) => 
            L.circleMarker(latlng),
        style: feature => ({
            stroke: null,
            fillOpacity: 0.9,
            fill: true,
            fillColor: 'red', 
            radius: (schoolsMap.getZoom() >= 17) ? 20 :
            (schoolsMap.getZoom() <= 10) ? 2 :
                schoolsMap.getZoom() - 8,
        }),
    })
    .bindTooltip(layer => layer.feature.properties['school_name'])
    .addTo(schoolsMap);

    schoolsMap.addEventListener('zoomend', () => {
        schoolsMap.schoolLayer.resetStyle();
    });

    //Adding click event for map layers
    schoolsMap.addEventListener('click', () => {
        
    });
    //schoolsMap.selectedLayer = L.geoJSON

}


//function for updating color of marker:

//When layer is drawn...
//if the layer's name is .selected

//when the layer is clicked...
//  Check if the id of the 
//    if the layer is not selected
//        change the color of the circle fill to green
//        find the li with the same name
//        add selected to its class
//        draw its catchment area on the map
//    if the layer is selected
//        find the li with the same name
//        remove selected from its class list
//        remove its catchment area from the map



export {
    initializeSchoolMap,
    showSchoolsOnMap,
};
