# -*- coding: utf-8 -*-

import os
import logging

import ckan.plugins as p
from ckanext.cesiumpreview.helpers import get_helpers

log = logging.getLogger(__name__)
_cesium_formats = ["wms", "wfs", "kml", "kmz", "gjson", "geojson", "czml"]


class CesiumPreview(p.SingletonPlugin):
	p.implements(p.IConfigurer, inherit=True)
	p.implements(p.IConfigurable, inherit=True)
	p.implements(p.ITemplateHelpers)
	p.implements(p.IResourceView, inherit=True)

	proxy_is_enabled = False
	_national_map_title = None

	# IConfigurer

	def update_config(self, config):
		p.toolkit.add_template_directory(config, "templates")
		p.toolkit.add_resource("public", "ckanext-cesiumpreview")
		p.toolkit.add_public_directory(config, "public")

	# IConfigurable

	def configure(self, config):
		self.proxy_is_enabled = config.get(
			"ckan.resource_proxy_enabled", False)
		self.cesium_formats = p.toolkit.aslist(
			config.get("cesiumpreview.cesium.formats", _cesium_formats))
		self._national_map_title = config.get(
			"cesiumpreview.view.title", "National Map")

	# IResourceView

	def info(self):
		return {
			"name": "cesium_view",
			"title": self._national_map_title,
			"always_available": True,
			"default_title": self._national_map_title,
			"icon": "globe"
		}

	def can_view(self, data_dict):
		resource = data_dict["resource"]
		format_lower = resource.get("format", "").lower()
		if format_lower == "":
			format_lower = os.path.splitext(resource["url"])[1][1:].lower()
		if format_lower in self.cesium_formats:
			return True
		return False

	def view_template(self, context, data_dict):
		return "cesium.html"

	# ITemplateHelpers

	def get_helpers(self):
		return get_helpers()
