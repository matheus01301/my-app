import { Layout } from 'antd';
import { styled, css } from '../../../stitches.config'

const Header = Layout

export const Container = styled(Header, {
  width: '100%',
  height: '45px',
  position: 'sticky',

  '-webkit-user-select': 'none',
  '-webkit-app-region': 'drag',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderBottom: '1px solid #1c1c1c',
  strong: {
    fontSize: '13px',
    fontWeight: '400',
    color: '$text',
  },
})

export const WindowActions = styled('div', {
  position: 'absolute',
  top: 0,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  variants: {
    position: {
      left: {
        left: '16px'
      },
      right: {
        right: 0,
      }
    },
    showIcons: {
      show: {
        '&:hover svg': {
          display: 'block',
        }
      }
    }
  }
}
)

const colors = {
  close: '#FF4747',
  minimize: '#FFD809',
  maximize: '#02AE22'
}

export const MacActionButton = styled('button', {
  '-webkit-app-region': 'no-drag',
  border: 0,
  width: '12px',
  height: '12px',
  borderRadius: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& + button': {
    marginLeft: '8px',
  },
  svg: {
    width: '10px',
    height: '10px',
    opacity: 0.9,
    display: 'none',
  },
  '&:hover svg': {
    display: 'block',
  },
  '&:active': {
    opacity: 0.6,
  },
  '&:focus': {
    outline: 0,
  },
  variants: {
    color: {
      close: {
        backgroundColor: '#FF4747',
      },
      maximize: {
        backgroundColor: '#02AE22',
      },
      minimize: {
        backgroundColor: '#FFD809',
      },
    }
  }
}
)

export const DefaultActionButton = styled('button', {
  background: 'transparent',
  '-webkit-app-region': 'no-drag',
  border: 0,
  display: 'flex',
  height: '100%',
  padding: '12px',
  alignItems: 'center',
  justifyContent: 'center',
  color: '$bgTrack',

  '&:hover svg': {
    color: '$text',
  },
  '&:active': {
    opacity: 0.6,
  },
  '&:focus': {
    outline: 0,
  },
  '&:hover': {
    backgroundColor: '$bgCard',
  },

  variants: {
    color: {
      close: {
        '&:hover': {
          backgroundColor: '#FF4747',
        },
      }
    }
  }
})