{
    'name': 'University Backend Theme',
    "version": "18.0.1.0.0",
    'category': 'Theme/Backend',
    'summary': 'Custom modifications to existing backend theme',

    'depends': [
        'base',
        "web", "mail",
        'muk_web_appsbar',
        'dark_mode_knk'
    ],

    'data': [
        'security/ir.model.access.csv',
        'wizard/theme_wizard.xml'
    ],

    'assets': {
        'web.assets_backend': [
            'university_theme/static/src/scss/style.scss',
            'university_theme/static/src/xml/templates.xml',
            'university_theme/static/src/js/user_menu.js',
            'university_theme/static/src/js/apps_menu_patch.js',
            'university_theme/static/src/xml/apps_menu_patch.xml',
            'university_theme/static/src/js/appearance_changer.js',
            'university_theme/static/src/xml/appearance_template.xml'

        ],
    },
    'installable': True,
    'application': False,
    "license": "LGPL-3",
    'auto_install': False,
}