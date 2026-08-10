import type { StaticColors } from './types'

/**
 * Static colors that remain constant regardless of light/dark theme mode.
 * Used for consistent brand elements and specific UI components that should
 * not change appearance when theme switches.
 */
const staticColors: StaticColors = {
  main: '#101010',
  light: '#636669',
  primary: '#FFFFFF',
  textSecondary: '#A1A3A7',
  textBrand: '#43F6AB',
}

export default staticColors
