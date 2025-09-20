/** @odoo-module **/

import { Dialog } from "@web/core/dialog/dialog";
import { Component, useState, useRef } from "@odoo/owl";
import { registry } from "@web/core/registry";

// Define PALETTES in the global scope of the module
const PALETTES = {
  light: [
    {
      name: "Default",
      brandColor: "#00294C",
      secondBrandColor: "#e8a807",
      white: "#ffffff",
      blueBlack: "#12151B",
      lightBrandColor: "#989CA0",
      sidebarBg: "#f8f9fa", // لون خلفية الشريط الجانبي في الوضع الفاتح
    },
    {
      name: "Vibrant",
      brandColor: "#0c3741",
      secondBrandColor: "#F4B400",
      white: "#ffffff",
      blueBlack: "#212121",
      lightBrandColor: "#BDBDBD",
      sidebarBg: "#0b3f4b", // لون مختلف للسايد بار في وضع فاتح آخر
    },
    {
      name: "Blue Ocean",
      brandColor: "#41396f",
      secondBrandColor: "#60a5fa",
      white: "#ffffff",
      blueBlack: "#1e293b",
      lightBrandColor: "#93c5fd",
      sidebarBg: "#f0f9ff",
    },
    {
      name: "Purple Dream",
      brandColor: "#44620b",
      secondBrandColor: "#a855f7",
      white: "#ffffff",
      blueBlack: "#1e1b4b",
      lightBrandColor: "#c084fc",
      sidebarBg: "#faf5ff",
    },
  ],
  dark: [
    {
      name: "Default",
      brandColor: "#00294C",
      secondBrandColor: "#e8a807",
      white: "#fff",
      blueBlack: "#1D2025",
      lightBrandColor: "#989CA0",
      sidebarBg: "#12151B", // لون خلفية الشريط الجانبي في الوضع الداكن
    },
    {
      name: "Night Sky",
      brandColor: "#28726a",
      secondBrandColor: "#44ffeb",
      white: "#fff",
      blueBlack: "#0d0f17",
      lightBrandColor: "#262626",
      sidebarBg: "#161c22", // لون مختلف للسايد بار في وضع داكن آخر
    },
    {
      name: "Dark Blue",
      brandColor: "#1e40af",
      secondBrandColor: "#41396f",
      white: "#ffffff",
      blueBlack: "#0f172a",
      lightBrandColor: "#64748b",
      sidebarBg: "#0f172a",
    },
    {
      name: "Deep Purple",
      brandColor: "#581c87",
      secondBrandColor: "#44620b",
      white: "#ffffff",
      blueBlack: "#1e1b4b",
      lightBrandColor: "#6b7280",
      sidebarBg: "#1e1b4b",
    },
  ],
};

// You can move hexToRgb here as well to be more organized
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(
        result[3],
        16
      )}`
    : null;
}

class AppearanceDialog extends Component {
  static template = "university_theme.AppearanceDialog";
  static components = { Dialog };
  static props = {
    close: { type: Function },
  };

  setup() {
    this.state = useState({
      // Set initial theme based on the body class
      currentTheme: document.body.classList.contains("knk_night_mode")
        ? "dark"
        : "light",
      // Set initial active tab
      activeTab: "general",
      // Custom colors toggles
      customColors: false,
      customDrawerColors: false,
      drawerBackgroundImage: false,
      // Selected palette index
      selectedPaletteIndex: 0,
      // Menu position (default is left)
      selectedMenuPosition: "left",
    });

    // Use useRef to get reference to the file input
    this.drawerImageUploadRef = useRef("drawerImageUpload");

    // This is now correct, as PALETTES is accessible
    this.palettes = PALETTES;
  }

  setActiveTab(tabName) {
    this.state.activeTab = tabName;
  }

  onThemeChange(theme) {
    this.state.currentTheme = theme;
    // Reset palette selection when changing theme
    this.state.selectedPaletteIndex = 0;

    // Apply default palette for the new theme
    const defaultPalette = this.palettes[theme][0];
    this.applyPalette(defaultPalette, theme);

    if (this.state.currentTheme === "dark") {
      document.body.classList.add("knk_night_mode");
    } else {
      document.body.classList.remove("knk_night_mode");
    }
  }

  // Method to handle menu position change
  onMenuPositionChange(position) {
    this.state.selectedMenuPosition = position;

    // Get the target element
    const webClient = document.querySelector(
      ".o_web_client.mk_sidebar_type_large"
    );

    if (webClient) {
      if (position === "left") {
        // Default layout - sidebar on left
        webClient.style.setProperty(
          "grid-template-areas",
          '"banner banner" "sidebar navbar" "content sidebar" "components components"',
          "important"
        );
        webClient.style.setProperty(
          "grid-template-columns",
          "minmax(140px, 145px) 1fr",
          "important"
        );
      } else if (position === "right") {
        // Sidebar on right
        webClient.style.setProperty(
          "grid-template-areas",
          '"banner banner" "navbar sidebar" "content sidebar" "components components"',
          "important"
        );
        webClient.style.setProperty(
          "grid-template-columns",
          "1fr minmax(140px, 145px)",
          "important"
        );
      }
    }
  }

  // Method to get palettes for current theme
  getPalettesForCurrentTheme() {
    return this.palettes[this.state.currentTheme];
  }

  applyPalette(palette, theme) {
    // Step 1: Change the body class to activate the theme's CSS rules
    if (theme === "dark") {
      document.body.classList.add("knk_night_mode");
    } else {
      document.body.classList.remove("knk_night_mode");
    }

    // Step 2: Apply the selected palette's colors
    document.documentElement.style.setProperty(
      "--brand-color",
      palette.brandColor,
      "important"
    );
    document.documentElement.style.setProperty(
      "--second-brand-color",
      palette.secondBrandColor,
      "important"
    );
    document.documentElement.style.setProperty(
      "--light-brand-color",
      palette.lightBrandColor,
      "important"
    );
    document.documentElement.style.setProperty(
      "--blue-black",
      palette.blueBlack,
      "important"
    );
    document.documentElement.style.setProperty(
      "--white",
      palette.white,
      "important"
    );
    document.documentElement.style.setProperty(
      "--sidebar_bg",
      palette.sidebarBg,
      "important"
    );

    const darkRgb = hexToRgb(palette.darkBrand);
    if (darkRgb) {
      document.documentElement.style.setProperty(
        "--dark-brand-color",
        darkRgb,
        "important"
      );
    } else if (palette.darkBrand) {
      document.documentElement.style.setProperty(
        "--dark-brand-color",
        palette.darkBrand,
        "important"
      );
    }
  }

  applySettings() {
    // Apply all current settings
    console.log("Applying settings:", {
      theme: this.state.currentTheme,
      selectedPaletteIndex: this.state.selectedPaletteIndex,
      selectedMenuPosition: this.state.selectedMenuPosition,
      customColors: this.state.customColors,
      customDrawerColors: this.state.customDrawerColors,
      drawerBackgroundImage: this.state.drawerBackgroundImage,
    });

    // Apply the selected palette
    const selectedPalette =
      this.palettes[this.state.currentTheme][this.state.selectedPaletteIndex];
    if (selectedPalette) {
      this.applyPalette(selectedPalette, this.state.currentTheme);
    }

    // Apply menu position
    this.onMenuPositionChange(this.state.selectedMenuPosition);

    // Here you can add logic to save settings to localStorage or backend
    // localStorage.setItem('themeSettings', JSON.stringify(this.state)); // if needed

    this.props.close();
  }

  // Method to handle color palette selection in Colors tab
  selectColorPalette(paletteIndex) {
    this.state.selectedPaletteIndex = paletteIndex;

    // Optionally apply immediately for preview
    const palette = this.palettes[this.state.currentTheme][paletteIndex];
    if (palette) {
      this.applyPalette(palette, this.state.currentTheme);
    }
  }

  // Method to handle custom color changes
  updateCustomColor(colorType, colorValue) {
    // Handle custom color updates
    document.documentElement.style.setProperty(
      `--${colorType}`,
      colorValue,
      "important"
    );
  }

  // Fixed chooseFile method using useRef
  chooseFile() {
    const input = this.drawerImageUploadRef.el;
    if (input) {
      input.click();
    }
  }

  // Method to handle image uploads
  handleImageUpload(event, imageType) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;

        // Check if the current theme is dark or light
        const isDarkMode = document.body.classList.contains("o_dark_mode");

        if (imageType === "drawer") {
          if (isDarkMode) {
            // Update the dark mode variable
            document.documentElement.style.setProperty(
              "--app-drawer-bg-image-dark",
              `url(${imageUrl})`,
              "important"
            );
          } else {
            // Update the light mode variable
            document.documentElement.style.setProperty(
              "--app-drawer-bg-image-light",
              `url(${imageUrl})`,
              "important"
            );
          }
        }
      };
      reader.readAsDataURL(file);
    }
  }
}

export function openAppearanceDialog(env) {
  const dialogService = env.services.dialog;
  dialogService.add(AppearanceDialog, {});
}
