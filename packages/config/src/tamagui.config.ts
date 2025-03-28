import { defaultConfig, media, shorthands, themes, tokens, settings } from '@tamagui/config/v4'
import { createTamagui } from 'tamagui'
import { animations } from './animations'
import { bodyFont, headingFont } from './fonts'

export const config = createTamagui({
  animations,
  shorthands,
  tokens,
  media,
  themes,
  settings,
  fonts: {
    body: bodyFont,
    heading: headingFont,
  },
})
