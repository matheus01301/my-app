import { BellOutlined, CalendarOutlined, ClockCircleOutlined, DoubleLeftOutlined, DoubleRightOutlined, MenuOutlined, QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, Layout, Typography } from 'antd';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { styled } from '../../../stitches.config';
import { FiX, FiMinus, FiMaximize2, FiMinimize2 } from 'react-icons/fi';
import { VscChromeRestore, VscDebugStop } from 'react-icons/vsc';
import os from 'os';
import { useRouter } from 'next/router';
import { Container, WindowActions, MacActionButton, DefaultActionButton } from './actions';

const { Header } = Layout;

let ipcRenderer;
if (typeof window !== 'undefined') {
  ipcRenderer = window.require('electron').ipcRenderer;
}

const ActionButton = styled(Button, {
  '-webkit-app-region': 'no-drag',
  '&.ant-btn': {
    marginRight: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
    background: 'transparent',
    border: 'none',
    '&:hover, &:focus': {
      background: '#09090A',
      color: '$text',
    },
  },
});

const SwitchThemeMode = styled(ActionButton, {
  '&.ant-btn': {
    '&:hover, &:focus': {
      background: 'transparent',
      color: '$text',
    },
  },
});

const AvatarStyled = styled(Avatar, {
  '-webkit-app-region': 'no-drag',
  cursor: 'pointer',
});

const NotificationOptions = [
  { label: 'item 1', key: 'item-1' },
  { label: 'item 2', key: 'item-2' },
];

export default function TitleBar({ children, collapsed, setCollapsed }) {
  const [date, setDate] = useState(new Date());
  const [unmaximize, setUnmaximize] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setInterval(() => setDate(new Date()), 30000);
  }, []);

  const handleCloseWindow = useCallback(async () => {
    const shouldClose = await ipcRenderer.invoke('request-close');

    if (shouldClose) {
      await ipcRenderer.invoke('close');
    }
  }, []);

  const handleMaximize = useCallback(async () => {
    const isMacSystem = os.platform() === 'darwin';
    if (isMacSystem) {
      return ipcRenderer.send('setFullScreen');
    }

    const isMaximized = await ipcRenderer.invoke('isMaximized');
    setUnmaximize(isMaximized);

    if (!isMaximized) {
      ipcRenderer.send('maximize');
    } else {
      ipcRenderer.send('unmaximize');
    }
  }, []);

  const handleMinimize = useCallback(async () => {
    ipcRenderer.send('minimize');
  }, []);

  const useMacOSWindowActionButtons = false;

  const shouldUseMacOSWindowActions = useMemo(() => {
    return useMacOSWindowActionButtons || os.platform() === 'darwin';
  }, [useMacOSWindowActionButtons]);

  return (
    <Container>
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          padding: useMacOSWindowActionButtons ? '0 0 0 75px' : '0 120px 0 0 ',
        }}
      >
        <div>
        </div>
        {/* {router.pathname !== '/login' && isLoggedIn && (
          <span
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <strong>{`Logged in as: ${userName}`}</strong>
          </span>
        )} */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingRight: '10px',
            }}
          >
            <CalendarOutlined style={{ fontSize: '16px' }} />
            {/* @ts-ignore */}
            <Typography.Text style={{ marginLeft: '5px', fontSize: '12px' }}>
              {date.toLocaleString('pt-BR', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
              })}
            </Typography.Text>
            <ClockCircleOutlined style={{ marginLeft: '5px', fontSize: '16px' }} />
            {/* @ts-ignore */}
            <Typography.Text style={{ marginLeft: '5px', fontSize: '12px' }}>
              {date.toLocaleString('pt-BR', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: false,
              })}
            </Typography.Text>
            {/* @ts-ignore */}
            <Dropdown menu={{ items: NotificationOptions }}>
              <ActionButton style={{ marginLeft: '10px' }}>
                <BellOutlined style={{ fontSize: '20px' }} />
              </ActionButton>
            </Dropdown>
            <ActionButton>
              <QuestionCircleOutlined style={{ fontSize: '20px' }} />
            </ActionButton>
            {/* @ts-ignore */}
            <Dropdown menu={{ items: NotificationOptions }}>
              <AvatarStyled shape="square">WL</AvatarStyled>
            </Dropdown>
          </div>
        </div>
      </div>

      {shouldUseMacOSWindowActions ? (
        <WindowActions position="left">
          <MacActionButton color="close" onClick={handleCloseWindow}>
            <FiX color={'#000'} />
          </MacActionButton>
          <MacActionButton color="minimize" onClick={handleMinimize}>
            <FiMinus color={'#000'} />
          </MacActionButton>
          <MacActionButton color="maximize" onClick={handleMaximize}>
            {unmaximize ? <FiMaximize2 color={'#000'} /> : <FiMinimize2 color={'#000'} />}
          </MacActionButton>
        </WindowActions>
      ) : (
        <WindowActions position="right">
          <DefaultActionButton onClick={handleMinimize}>
            <FiMinus />
          </DefaultActionButton>
          <DefaultActionButton onClick={handleMaximize}>
            {unmaximize ? <VscDebugStop size={16} /> : <VscChromeRestore size={18} />}
          </DefaultActionButton>
          <DefaultActionButton color="close" onClick={handleCloseWindow}>
            <FiX />
          </DefaultActionButton>
        </WindowActions>
      )}
    </Container>
  );
}
