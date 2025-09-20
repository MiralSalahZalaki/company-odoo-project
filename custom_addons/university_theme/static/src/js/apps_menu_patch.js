/** @odoo-module **/
import { whenReady } from "@odoo/owl";
import { registry } from "@web/core/registry";

whenReady(() => {
    document.addEventListener("click", (ev) => {
        // زر الإغلاق
        const btn = ev.target.closest(".mk-apps-close-btn");
        if (btn) {
            const overlay = document.querySelector(".o-overlay-item");
            if (overlay) {
                overlay.style.display = "none";
            }
        }

        // زر تغيير الثيم
        const themeBtn = ev.target.closest(".mk-apps-theme-btn");
        if (themeBtn) {
            // هات الكومبوننت من الـ registry
            const systray = registry.category("systray").get("DarkModeSystrayItem");
            if (systray?.Component) {
                // نعمل dummy instance علشان نستفيد من ميثوداته
                const DarkModeSystray = systray.Component;
                const handler = Object.create(DarkModeSystray.prototype);

                // جهز state زي ما الكومبوننت الأصلي بيعمل
                handler.state = {
                    color_scheme: document.body.classList.contains("knk_night_mode")
                        ? "dark"
                        : "light",
                };

                // نفذ نفس لوجيك تغيير الثيم
                handler._onClick();
            }
        }
    });
});
