import { ThemeButtonStyleTypeProps } from "../types"
import THEME from "./theme"

type PreviewButtonThemesType = {
  [key: string]: {
    buttonTextColor: string
    buttonBackgroundColor: string
    buttonBorderColor: string
  }
}

type ButtonOptionType = {
  button: {
    fill: {
      label: "None" | "Small" | "Large"
      name: ThemeButtonStyleTypeProps
    }[]
    outline: {
      label: "None" | "Small" | "Large"
      name: ThemeButtonStyleTypeProps
    }[]
    softShadow: {
      label: "None" | "Small" | "Large"
      name: ThemeButtonStyleTypeProps
    }[]
    hardShadow: {
      label: "None" | "Small" | "Large"
      name: ThemeButtonStyleTypeProps
    }[]
    buttonColour: string
    buttonFontColour: string
  }
}

export const PreviewButtonThemes: PreviewButtonThemesType = {
  FILL: {
    buttonTextColor: "#eeeeee",
    buttonBackgroundColor: "#000000",
    buttonBorderColor: "#000000",
  },
  FILL_ROUNDED: {
    buttonTextColor: "#eeeeee",
    buttonBackgroundColor: "#000000",
    buttonBorderColor: "#000000",
  },
  FILL_CIRCULAR: {
    buttonTextColor: "#eeeeee",
    buttonBackgroundColor: "#000000",
    buttonBorderColor: "#000000",
  },
  OUTLINE: {
    buttonTextColor: "#333333",
    buttonBackgroundColor: "#000000",
    buttonBorderColor: "#000000",
  },
  OUTLINE_ROUNDED: {
    buttonTextColor: "#333333",
    buttonBackgroundColor: "#000000",
    buttonBorderColor: "#000000",
  },
  OUTLINE_CIRCULAR: {
    buttonTextColor: "#333333",
    buttonBackgroundColor: "#000000",
    buttonBorderColor: "#000000",
  },
  SOFTSHADOW: {
    buttonTextColor: "#888888",
    buttonBackgroundColor: "#ffffff",
    buttonBorderColor: "#ffffff",
  },
  SOFTSHADOW_ROUNDED: {
    buttonTextColor: "#888888",
    buttonBackgroundColor: "#ffffff",
    buttonBorderColor: "#ffffff",
  },
  SOFTSHADOW_CIRCULAR: {
    buttonTextColor: "#888888",
    buttonBackgroundColor: "#ffffff",
    buttonBorderColor: "#ffffff",
  },
  HARDSHADOW: {
    buttonTextColor: "#888888",
    buttonBackgroundColor: "#ffffff",
    buttonBorderColor: "#333333",
  },
  HARDSHADOW_ROUNDED: {
    buttonTextColor: "#888888",
    buttonBackgroundColor: "#ffffff",
    buttonBorderColor: "#333333",
  },
  HARDSHADOW_CIRCULAR: {
    buttonTextColor: "#888888",
    buttonBackgroundColor: "#ffffff",
    buttonBorderColor: "#333333",
  },
}

export const buttonOptions: ButtonOptionType = {
  button: {
    fill: [
      { label: "None", name: "FILL" },
      { label: "Small", name: "FILL_ROUNDED" },
      { label: "Large", name: "FILL_CIRCULAR" },
    ],
    outline: [
      { label: "None", name: "OUTLINE" },
      { label: "Small", name: "OUTLINE_ROUNDED" },
      { label: "Large", name: "OUTLINE_CIRCULAR" },
    ],
    softShadow: [
      { label: "None", name: "SOFTSHADOW" },
      { label: "Small", name: "SOFTSHADOW_ROUNDED" },
      { label: "Large", name: "SOFTSHADOW_CIRCULAR" },
    ],
    hardShadow: [
      { label: "None", name: "HARDSHADOW" },
      { label: "Small", name: "HARDSHADOW_ROUNDED" },
      { label: "Large", name: "HARDSHADOW_CIRCULAR" },
    ],
    buttonColour: THEME.buttonBackgroundColor,
    buttonFontColour: THEME.buttonTextColor,
  },
}
