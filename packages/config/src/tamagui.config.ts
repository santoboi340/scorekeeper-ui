import { defaultConfig, media, shorthands, themes, tokens } from '@tamagui/config/v4'
import { createTamagui } from 'tamagui'
import { animations } from './animations'
import { bodyFont, headingFont } from './fonts'

export const config = createTamagui({
  ...defaultConfig,
  animations,
  shorthands,
  tokens,
  media,
  themes,
  fonts: {
    body: bodyFont,
    heading: headingFont,
  },
})
