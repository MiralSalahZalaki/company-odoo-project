from odoo import fields, models


class ThemeWizard(models.TransientModel):
    _name = 'theme.wizard'
    _description = 'Theme Appearance Wizard'

    primary_color = fields.Char(string='Primary Color', default='#00294C')
    secondary_color = fields.Char(string='Secondary Color', default='#e8a807')

    def apply_changes(self):
        # هنا بنخزن الألوان في إعدادات النظام
        self.env['ir.config_parameter'].sudo().set_param('university_theme.primary_color', self.primary_color)
        self.env['ir.config_parameter'].sudo().set_param('university_theme.secondary_color', self.secondary_color)

        # بنعمل reload عشان التغييرات تظهر
        return {
            'type': 'ir.actions.client',
            'tag': 'reload',
        }