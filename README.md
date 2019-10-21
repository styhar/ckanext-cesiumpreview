National Map CKAN Preview plugin
================================

A plugin to CKAN to use National Map as a previewer for data.gov.au.

The goal of this project is to be open source when it releases, so all work
 should be carried out with that in mind.

Uses https://github.com/mapbox/geojson-extent


Configuration
-------------

Behavior of cesiumpreview can be changes via adding next values into
CKAN config file(default values provided as example):

    # Resource formats that are supporting cesiumpreview
    cesiumpreview.cesium.formats = wms wfs kml kmz gjson geojson czml

    # NationalMap service
    cesiumpreview.server.default.url = https://nationalmap.gov.au/
