/** @odoo-module **/

import { registry } from "@web/core/registry";
import { openAppearanceDialog } from './appearance_changer';

registry.category("user_menuitems").add("theme_appearance", (env) => {
    return {
        type: "item",
        id: "theme_appearance",
        description: "Appearance",
        callback: () => {
            openAppearanceDialog(env);
        },
        sequence: 5,
    };
});