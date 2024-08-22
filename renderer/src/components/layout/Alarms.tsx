import React, { useEffect, useRef, useState } from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined, AppstoreOutlined, SettingOutlined, PlusOutlined } from '@ant-design/icons';
import { Layout, Menu, Form, Typography, Select, Button } from 'antd';
import { useRouter } from 'next/router';
import { styled } from '../../../stitches.config';
import TableAlarm from './TableAlarm';
import { useAlarmContext } from '../Context/AlarmContext';


const { Header, Sider, Content } = Layout;
const { Option } = Select;

const SiderTitle = styled('div', {
    fontSize: '0.8rem',
    fontWeight: 'bold',
    padding: '10px 20px',
    background: '#09090A',
    color: '#fff',
});

const imageVariants = {
    initial: {
        scale: 0.95,
        opacity: 0
    },
    animate: {
        scale: 1,
        opacity: 1,
        transition: { type: 'spring', stiffness: 260, damping: 20 }
    },
    exit: {
        scale: 0.95,
        opacity: 0,
        transition: { duration: 0.3 }
    }
};

const HeaderTitle = styled('div', {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    padding: '10px 20px',
    background: '#09090A',
    color: '#fff',
});

const PreferencesModalContent = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    padding: '1rem',
});

const PreferencesSection = styled('section', {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
});

const PreferencesLabel = styled('label', {
    fontWeight: 'bold',
});

const ButtonGroup = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    gap: '1rem',
    justifyContent: 'center',
    '@media (max-width: 768px)': {
        flexDirection: 'row',
    }
});

const StyledSider = styled(Sider, {
    '&.ant-layout-sider': {
        position: 'relative',
        borderRight: '1px solid #262626',
        '& .ant-menu': {
            background: '#09090A',
            '&:focus': {
                boxShadow: 'none',
            },
            '&.ant-menu-dark.ant-menu-dark:not(.ant-menu-horizontal) .ant-menu-item': {
                background: '#09090A',
                '&:hover > span > svg': {
                    transform: 'scale(1.1)',
                },
                '&:hover #logout-label': {
                    color: '$error',
                },
                '&:hover #logout > svg': {
                    transition: 'font-size 0.15s cubic-bezier(0.215, 0.61, 0.355, 1), margin 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), color 0.3s',
                    filter: 'brightness(0) saturate(100%) invert(22%) sepia(55%) saturate(4834%) hue-rotate(345deg) brightness(91%) contrast(105%)',
                },
            },
            '&.ant-menu-dark.ant-menu-dark:not(.ant-menu-horizontal) .ant-menu-item-selected': {
                background: '#09090A',
                '& > span ': {
                    transition: 'opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), margin 0.3s, color 0.3s',
                    filter: 'invert(39%) sepia(83%) saturate(468%) hue-rotate(150deg) brightness(102%) contrast(101%)',
                },
            },
        },
    },
});

const ResponsiveContent = styled(Content, {
    padding: '1rem',
    overflowY: 'auto',
    background: '#09090A',
    width: '100%',
});

const TopContainer = styled('div', {
    height: '100%',
    width: '30vw',
});

const IndicContainer = styled('div', {
    display: 'grid',
    flex: 1,
    height: '100%',
    gap: '30px'
});

const TableWrapper = styled('div', {
    width: '100%',
    overflowX: 'auto',
});

const items = [
    { key: 'alarms', icon: React.createElement(AppstoreOutlined), label: 'Alarms' },
    { key: 'settings', icon: React.createElement(SettingOutlined), label: 'Settings' },
].map((item, index) => ({
    ...item,
    label: `Alarms ${index + 1}`,
}));

const Alarms = () => {
    const [current, setCurrent] = useState('home');
    const router = useRouter();
    {/* @ts-ignore */ }
    const [selectedContent, setSelectedContent] = useState('alarms');
    const [alarmProperty, setAlarmProperty] = useState<string | null>(null);
    const [alarmValue, setAlarmValue] = useState<number | null>(null);
    const fileInputRef = useRef(null);
    const [alarms, setAlarms] = useState([]);
    const [properties, setProperties] = useState([]);
    const [isAlarmLogModalVisible, setIsAlarmLogModalVisible] = useState(false);
    {/* @ts-ignore */ }
    const { alarmLogs } = useAlarmContext();
    const [collapsed, setCollapsed] = useState(false);
    const [date, setDate] = useState(new Date());

    const menuItems = [
        { key: 'alarms', icon: <AppstoreOutlined />, label: 'Alarms' },
        { key: 'settings', icon: <SettingOutlined />, label: 'Settings' },
        { key: 'alarmlog', icon: <SettingOutlined />, label: 'Alarm Logs' }
    ];

    useEffect(() => {
        setInterval(() => setDate(new Date()), 30000);
    }, []);

    const fetchSalas = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/salas/');
            if (!response.ok) {
                throw new Error('Failed to fetch salas');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching salas:', error);
            return [];
        }
    };

    useEffect(() => {
        const loadAlarms = async () => {
            try {
                const alarmData = await fetchSalas();
                setAlarms(alarmData);
            } catch (error) {
                console.error('Erro ao buscar os alarmes:', error);
            }
        };
        loadAlarms();
    }, []);


    return (
        <Layout style={{ position: "relative", width: "100%" }}>
            <StyledSider trigger={null} collapsible collapsed={collapsed}>
                <SiderTitle>Preferences</SiderTitle>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['alarms']}
                    items={menuItems}
                    style={{ height: '100%' }}
                    onClick={(e) => setSelectedContent(e.key)}
                />
            </StyledSider>
            <ResponsiveContent>
                {selectedContent === 'alarms' && (
                        <PreferencesModalContent>
                            <HeaderTitle>Agendamento</HeaderTitle>
                            <TableWrapper>
                                <TableAlarm data={alarms} properties={properties} />
                            </TableWrapper>
                        </PreferencesModalContent>
                )}
            </ResponsiveContent>
        </Layout>
    );
};

export default Alarms;
