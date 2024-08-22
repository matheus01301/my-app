import React, { useState, useEffect } from 'react';
import { AppstoreOutlined, SettingOutlined, PlusOutlined, CalendarOutlined, ClockCircleOutlined, BellOutlined, QuestionOutlined, DownloadOutlined } from '@ant-design/icons';
import { styled } from '../../../../renderer/stitches.config';
import logo from '../../../public/images/logomono.png';
import { useRouter } from 'next/router';
import { Layout, Menu } from 'antd';
import ModalComponent from './ModalComponent';
import Alarms from './Alarms';

const { Header, Sider, Content } = Layout;

export default function LayoutComponent({ ...props }) {
  const [current, setCurrent] = useState('/home');
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [isAlarmsModalVisible, setIsAlarmsModalVisible] = useState(false);
  const [isPreferencesModalVisible, setIsPreferencesModalVisible] = useState(false);
  const [isExportModalVisible, setIsExportModalVisible] = useState(false);

  const showAlarmsModal = () => {
    setIsAlarmsModalVisible(true);
  };

  const closeAlarmsModal = () => {
    setIsAlarmsModalVisible(false);
  };

  const showPreferencesModal = () => {
    setIsPreferencesModalVisible(true);
  };

  const closePreferencesModal = () => {
    setIsPreferencesModalVisible(false);
  };

  const showExportModal = () => {
    setIsExportModalVisible(true);
  };

  const closeExportModal = () => {
    setIsExportModalVisible(false);
  };

  const handleOk = () => {
    setIsAlarmsModalVisible(false);
    setIsPreferencesModalVisible(false);
    setIsExportModalVisible(false);
  };

  useEffect(() => {
    setInterval(() => setDate(new Date()), 30000);
  }, []);

  const onClick = (e) => {
    setCurrent(e.key);
    router.push(e.key);
  };

  return (
    <Layout>
        <Sider>
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
            <ModalComponent
            button={{
              title: <>
                <BellOutlined style={{ marginRight: '10px' }} />
                Alarms
              </>
            }}
            visible={isAlarmsModalVisible}
            onCancel={closeAlarmsModal}
            onOk={handleOk}
            showModal={showAlarmsModal}
          >
            {/* @ts-ignore */}
            <Alarms />
          </ModalComponent>
          </Menu>
        </Sider>
      </Layout>
  );
};
