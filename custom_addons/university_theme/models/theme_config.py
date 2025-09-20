from odoo import fields, models

class ThemeConfig(models.Model):
    _name = 'theme.config'
    _description = 'Theme Configuration'

    primary_color = fields.Char(string='Primary Color', default='#00294C')
    secondary_color = fields.Char(string='Secondary Color', default='#e8a807')

    @classmethod
    def get_colors(cls):
        # Fetch the colors from the first record (or a singletons model).
        config = cls.search([], limit=1)
        print(config)

        if not config:
            # Create a default record if one doesn't exist.
            config = cls.create({})
            print(config)
        return {
            'primary_color': config.primary_color,
            'secondary_color': config.secondary_color,
        }