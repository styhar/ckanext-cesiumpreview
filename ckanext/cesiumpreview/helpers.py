import ckan.logic as logic
import ckan.plugins.toolkit as tk

_default_server = 'https://nationalmap.gov.au/'


def get_helpers():
    return dict(
        get_package_data=get_package_data,
        cesiumpreview_server_url=cesiumpreview_server_url,
        cesiumpreview_extent=cesiumpreview_extent,
    )


def get_package_data(id):
    return logic.get_action('package_show')({}, {"id": id})


def cesiumpreview_server_url(server='default'):
    key = 'cesiumpreview.server.{}.url'.format(server)
    return tk.config.get(key, _default_server)


def cesiumpreview_extent(zone='default'):
    key = 'cesiumpreview.zone.{}'.format(zone)
    return tk.config.get(key)
