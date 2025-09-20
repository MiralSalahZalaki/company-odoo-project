from odoo import fields, models

class TestModel(models.Model):
    _name = 'test.model'
    _description = 'This is test model for push'

    name = fields.Char(string="Name") # model push from VS 
    status = fields.Selection([
        ('pending','Pending'),
        ('done','Done'),
    ])    # And this comment added from repo
