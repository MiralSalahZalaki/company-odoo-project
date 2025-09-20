from odoo import http
from odoo.http import request


class UniversityTheme(http.Controller):
    @http.route('/web', type='http', auth="user")
    def web_client(self, **kw):
        response = super().web_client(**kw)

        # بنجيب الألوان من إعدادات النظام
        primary_color = request.env['ir.config_parameter'].sudo().get_param('university_theme.primary_color', '#00294C')
        secondary_color = request.env['ir.config_parameter'].sudo().get_param('university_theme.secondary_color',
                                                                              '#e8a807')

        # بنبعت الألوان لقالب الـ QWeb
        response.qweb_data.update({
            'primary_color': primary_color,
            'secondary_color': secondary_color,
        })
        return response