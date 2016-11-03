(function sentinel2map() {
    'use strict';
    // All image data: http://sentinel-s2-l1c.s3-website.eu-central-1.amazonaws.com/#tiles/37/Q/GA/2016/8/2/0/

    var coords = transformSent2Coords(getThumbCoords());
    var thumbFeatures = {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                properties: {
                    url: 'http://sentinel-s2-l1c.s3-website.eu-central-1.amazonaws.com/tiles/37/Q/GA/2016/8/2/0/preview.jpg'
                },
                geometry: {
                    type: 'Polygon',
                    coordinates: [coords]
                }
            }
        ]
    };
    var center = turf.center(thumbFeatures).geometry.coordinates;
    var centerCoords = L.latLng(center[1], center[0]);

    var mymap = L.map('sentinel2').setView(
        centerCoords, 9
    );

    var cartoPositron = L.tileLayer(
        'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">' +
                'OpenStreetMap</a> &copy;<a href="http://cartodb.com/attributions">CartoDB</a>',
            maxZoom: 19
        }
    );
    cartoPositron.addTo(mymap);

    _.forEach(thumbFeatures.features, function(feature) {
        var coordinates = feature.geometry.coordinates;
        var southWest = L.latLng(coordinates[0][3][1], coordinates[0][3][0]);
        var northEast = L.latLng(coordinates[0][1][1], coordinates[0][1][0]);
        var thumbnailBounds = L.latLngBounds(southWest, northEast);
        L.imageOverlay(feature.properties.url, thumbnailBounds).addTo(mymap);
    });

    function getThumbCoords() {
        // coordinate source: http://sentinel-s2-l1c.s3.amazonaws.com/tiles/37/Q/GA/2016/8/2/0/tileInfo.json
        var coords = [
            [
                699960,
                2100000
            ],
            [
                809760,
                2100000
            ],
            [
                809760,
                1990200
            ],
            [
                699960,
                1990200
            ],
            [
                699960,
                2100000
            ]
        ];
        return coords;
    }

    function transformSent2Coords(coords) {
        proj4.defs("EPSG:32637","+proj=utm +zone=37 +datum=WGS84 +units=m +no_defs");
        var source = "EPSG:32637";
        var dest = "WGS84";
        var newCoords = _.map(coords, function(pair) {
            return proj4(source, dest, pair);
        });
        return newCoords;
    }
})();

(function sentinel2transmap() {
    'use strict';
    // All image data: http://sentinel-s2-l1c.s3-website.eu-central-1.amazonaws.com/#tiles/37/Q/GA/2016/8/2/0/

    var coords = transformSent2Coords(getThumbCoords());
    var thumbFeatures = {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                properties: {
                    url: 'http://sentinel-s2-l1c.s3-website.eu-central-1.amazonaws.com/tiles/37/Q/GA/2016/8/2/0/preview.jpg'
                },
                geometry: {
                    type: 'Polygon',
                    coordinates: [coords]
                }
            }
        ]
    };
    var center = turf.center(thumbFeatures).geometry.coordinates;
    var centerCoords = L.latLng(center[1], center[0]);

    var mymap = L.map('sentinel2-trans').setView(
        centerCoords, 9
    );

    var cartoPositron = L.tileLayer(
        'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">' +
                'OpenStreetMap</a> &copy;<a href="http://cartodb.com/attributions">CartoDB</a>',
            maxZoom: 19
        }
    );
    cartoPositron.addTo(mymap);

    _.forEach(thumbFeatures.features, function(feature) {
        var coordinates = feature.geometry.coordinates;
        var southWest = L.latLng(coordinates[0][3][1], coordinates[0][3][0]);
        var northEast = L.latLng(coordinates[0][1][1], coordinates[0][1][0]);
        var thumbnailBounds = L.latLngBounds(southWest, northEast);
        L.imageOverlay(
            feature.properties.url,
            thumbnailBounds,
            {
                opacity: 0.5
            }
        ).addTo(mymap);
    });

    function getThumbCoords() {
        // coordinate source: http://sentinel-s2-l1c.s3.amazonaws.com/tiles/37/Q/GA/2016/8/2/0/tileInfo.json
        var coords = [
            [
                699960,
                2100000
            ],
            [
                809760,
                2100000
            ],
            [
                809760,
                1990200
            ],
            [
                699960,
                1990200
            ],
            [
                699960,
                2100000
            ]
        ];
        return coords;
    }

    function transformSent2Coords(coords) {
        proj4.defs("EPSG:32637","+proj=utm +zone=37 +datum=WGS84 +units=m +no_defs");
        var source = "EPSG:32637";
        var dest = "WGS84";
        var newCoords = _.map(coords, function(pair) {
            return proj4(source, dest, pair);
        });
        return newCoords;
    }
})();

(function landsat8() {
    'use strict';
    // All image data can be found in http://landsat.usgs.gov/metadata_service/bulk_metadata_files/LANDSAT_8.csv (Warning - massive csv file)

    var coords = getThumbCoords();
    var thumbFeatures = {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                properties: {
                    url: 'http://landsat-pds.s3.amazonaws.com/L8/139/045/LC81390452014295LGN00/LC81390452014295LGN00_thumb_large.jpg'
                },
                geometry: {
                    type: 'Polygon',
                    coordinates: [coords]
                }
            }
        ]
    };
    var center = turf.center(thumbFeatures).geometry.coordinates;
    var centerCoords = L.latLng(center[0], center[1]);
    console.log(centerCoords);

    var mymap = L.map('landsat8').setView(
        centerCoords, 8
    );

    var cartoPositron = L.tileLayer(
        'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">' +
                'OpenStreetMap</a> &copy;<a href="http://cartodb.com/attributions">CartoDB</a>',
            maxZoom: 19
        }
    );
    cartoPositron.addTo(mymap);

    _.forEach(thumbFeatures.features, function(feature) {
        var coordinates = feature.geometry.coordinates;
        console.log(coordinates);
        var southWest = L.latLng(coordinates[0][3][0], coordinates[0][3][1]);
        var northEast = L.latLng(coordinates[0][1][0], coordinates[0][1][1]);
        var thumbnailBounds = L.latLngBounds(southWest, northEast);
        L.imageOverlay(feature.properties.url, thumbnailBounds).addTo(mymap);
    });

    function getThumbCoords() {
        var coords = [
            [
                22.71835,
                85.85002
            ],
            [
                22.71887,
                88.07598
            ],
            [
                20.60778,
                88.06044
            ],
            [
                20.60731,
                85.86664
            ],
            [
                22.71835,
                85.85002
            ]
        ];
        return coords;
    }
})();

(function landsat8trans() {
    'use strict';
    // All image data can be found in http://landsat.usgs.gov/metadata_service/bulk_metadata_files/LANDSAT_8.csv (Warning - massive csv file)

    var coords = getThumbCoords();
    var thumbFeatures = {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                properties: {
                    url: 'http://landsat-pds.s3.amazonaws.com/L8/139/045/LC81390452014295LGN00/LC81390452014295LGN00_thumb_large.jpg'
                },
                geometry: {
                    type: 'Polygon',
                    coordinates: [coords]
                }
            }
        ]
    };
    var center = turf.center(thumbFeatures).geometry.coordinates;
    var centerCoords = L.latLng(center[0], center[1]);
    console.log(centerCoords);

    var mymap = L.map('landsat8-trans').setView(
        centerCoords, 8
    );

    var cartoPositron = L.tileLayer(
        'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">' +
                'OpenStreetMap</a> &copy;<a href="http://cartodb.com/attributions">CartoDB</a>',
            maxZoom: 19
        }
    );
    cartoPositron.addTo(mymap);

    _.forEach(thumbFeatures.features, function(feature) {
        var coordinates = feature.geometry.coordinates;
        console.log(coordinates);
        var southWest = L.latLng(coordinates[0][3][0], coordinates[0][3][1]);
        var northEast = L.latLng(coordinates[0][1][0], coordinates[0][1][1]);
        var thumbnailBounds = L.latLngBounds(southWest, northEast);
        L.imageOverlay(
            feature.properties.url,
            thumbnailBounds,
            {
                opacity: 0.3
            }
        ).addTo(mymap);
    });

    function getThumbCoords() {
        var coords = [
            [
                22.71835,
                85.85002
            ],
            [
                22.71887,
                88.07598
            ],
            [
                20.60778,
                88.06044
            ],
            [
                20.60731,
                85.86664
            ],
            [
                22.71835,
                85.85002
            ]
        ];
        return coords;
    }
})();
