import React from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import LayoutComponent from '../src/components/layout/Navbar';
import ComponentLayout from '../src/components/layout/Layout';
import "antd/dist/antd.dark.css";
import { AlarmProvider } from '../src/components/Context/AlarmContext';
import { ConfigProvider } from 'antd';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  const noLayoutRoutes = ['/login'];

  const showLayout = !noLayoutRoutes.includes(router.pathname);

  return (
    <ConfigProvider>
        <AlarmProvider>
          {showLayout ? (
            <ComponentLayout>
              <Component {...pageProps} />
            </ComponentLayout>
          ) : (
            <Component {...pageProps} />
          )}
        </AlarmProvider>
    </ConfigProvider>
  );
};

export default MyApp;
