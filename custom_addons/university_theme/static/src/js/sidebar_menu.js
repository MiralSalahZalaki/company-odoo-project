/** @odoo-module **/

import { registry } from "@web/core/registry";
import { whenReady } from "@odoo/owl";

whenReady(async () => {
    try {
        // نجيب service app_menu
        const appMenuService = registry.category("services").get("app_menu");

        if (!appMenuService) {
            console.warn("⚠️ AppMenu service not found!");
            return;
        }

        // نجيب كل الأبلكيشنز
        const apps = appMenuService.getAppsMenuItems();
        console.log("📌 Apps:", apps);

        // نجمعهم حسب الـ category
        const groupedApps = {};
        for (const app of apps) {
            let cat = app.category_id ? app.category_id[1] : "Other";
            if (!groupedApps[cat]) {
                groupedApps[cat] = [];
            }
            groupedApps[cat].push(app);
        }

        console.log("📂 Grouped Apps:", groupedApps);

        // لو عايز تعرضهم في HTML بنفسك
        const container = document.createElement("div");
        container.classList.add("custom-apps-container");

        for (const [cat, catApps] of Object.entries(groupedApps)) {
            const catDiv = document.createElement("div");
            catDiv.classList.add("app-category");
            catDiv.innerHTML = `<h4>${cat}</h4>`;

            const ul = document.createElement("ul");
            for (const app of catApps) {
                const li = document.createElement("li");
                li.innerHTML = `
                    <a href="${app.href}">
                        <img src="${app.webIconData || "/base/static/description/icon.png"}"
                             class="mk_apps_sidebar_icon"/>
                        <span>${app.label}</span>
                    </a>
                `;
                ul.appendChild(li);
            }
            catDiv.appendChild(ul);
            container.appendChild(catDiv);
        }

        document.body.appendChild(container); // مؤقتًا نحطه في body
    } catch (err) {
        console.error("❌ Error while grouping apps:", err);
    }
});
