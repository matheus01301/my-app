import { createStitches } from '@stitches/react';

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      bg: '#09090A',
      bgCard: '#141414',
      borderColor: 'red',
      bgGraphic: '#353535',
      bgTrack: '#373737',
      bgNav: '#1F1F1F',
      hmenu: '#2B2B2B;',
      vmenu: '#323232',

      secondaryBtn: '#383838',
      secondaryHoverBtn: '#383636',

      link: '#108FBE',
      button: '#21ABDE',
      hoverBtn: '#056E94',

      text: '#F2F2F2',
      errorMessage: '#B00020',

      success: '#24FF4D',
      error: '#ED1C24',
      disabled: '#C4C4C4'
    },
    fontSizes: {
      1: '36px',
      2: '24px',
      3: '16px',
      4: '14px',
      5: '12px',
    },
  },
  media: {
    sm: '(min-width: 480px)',
    md: '(min-width: 640px)',
    lg: '(min-width: 920px)',
    xlg: '(min-width: 1080px)'

  },
  utils: {
    mx: (value) => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (value) => ({
      marginTop: value,
      marginBottom: value,
    }),
    px: (value) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (value) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
  },
});