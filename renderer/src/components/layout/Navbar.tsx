import React, { useState, useEffect } from 'react';
import { AppstoreOutlined, SettingOutlined, PlusOutlined, CalendarOutlined, ClockCircleOutlined, BellOutlined, QuestionOutlined, DownloadOutlined } from '@ant-design/icons';
import { styled } from '../../../../renderer/stitches.config';
import logo from '../../../public/images/logomono.png';
import { useRouter } from 'next/router';
import { Layout, Menu, Avatar } from 'antd';
import ModalComponent from './ModalComponent';
import Alarms from './Alarms';
import { getCurrentUser } from '../utils/utils';

const { Header, Sider, Content } = Layout;

const UserContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  backgroundColor: '#001529',
  color: 'white',
});

const UserName = styled('div', {
  marginLeft: '10px',
  fontSize: '16px',
});

export default function LayoutComponent({ ...props }) {
  const [current, setCurrent] = useState('/home');
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      const userData = await getCurrentUser();
      setUser(userData);
    }

    fetchUser();
  }, []);

  const onClick = (e) => {
    setCurrent(e.key);
    router.push(e.key);
  };

  return (
    <Layout>
      <Sider>
        <UserContainer>
          {user ? (
            <>
              <Avatar>{user.nome.charAt(0).toUpperCase()}</Avatar>
              <UserName>{user.nome}</UserName>
            </>
          ) : (
            'Loading...'
          )}
        </UserContainer>
        <Menu
          mode="inline"
          selectedKeys={[current]}
          onClick={onClick}
          style={{ height: '100vh', borderRight: 0 }}
        >
          <Menu.Item key="/home" icon={<AppstoreOutlined />}>
            Home
          </Menu.Item>
          <Menu.Item key="/alarms" icon={<BellOutlined />}>
            Alarms
          </Menu.Item>
          <Menu.Item key="/calendar" icon={<CalendarOutlined />}>
            Calendar
          </Menu.Item>
          <Menu.Item key="/clock" icon={<ClockCircleOutlined />}>
            Clock
          </Menu.Item>
          <Menu.Item key="/preferences" icon={<SettingOutlined />}>
            Preferences
          </Menu.Item>
          <Menu.Item key="/help" icon={<QuestionOutlined />}>
            Help
          </Menu.Item>
          <Menu.Item key="/export" icon={<DownloadOutlined />}>
            Export
          </Menu.Item>
        </Menu>
      </Sider>
    </Layout>
  );
};
