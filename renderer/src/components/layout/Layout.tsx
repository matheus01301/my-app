import { Layout } from 'antd';
import React, { useState } from 'react';
import { styled } from '../../../stitches.config';
import Navbar from './Navbar';
import TitleBar from './TitleBar';

const { Sider, Content } = Layout;

interface LayoutComponentProps {
  children: React.ReactNode;
  showNavbar?: boolean;
  backgroundColor?: string;
}

const NavWrapper = styled('div', {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    alignItems: 'center',
  },
  background: '#09090A',
});

export default function ComponentLayout({ children, showNavbar = true, backgroundColor = "#09090A" }: LayoutComponentProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ height: '100%', background: backgroundColor }}>
      <TitleBar collapsed={collapsed} setCollapsed={setCollapsed}>
        1-GWL-1-RN
      </TitleBar>
      <Layout style={{ display: 'flex', flexDirection: 'row', height:'100vh' }}>
        <Sider
          style={{ background: '#09090A' }}
        >
          <Navbar />
        </Sider>
        <Content
          className="site-layout-background"
          style={{
            margin: 0,
            padding: 0,
            paddingBottom: 0,
            overflow: 'hidden',
            background: backgroundColor,
            width: '100%',
            height: '100%',
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
