import React from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import LayoutComponent from '../src/components/layout/Navbar';
import ComponentLayout from '../src/components/layout/Layout';
import "antd/dist/antd.dark.css";
import { AlarmProvider } from '../src/components/Context/AlarmContext';
import { ConfigProvider } from 'antd';
import { IndicatorsProvider } from '../src/components/Context/IndicatorsContext';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  const noLayoutRoutes = ['/login'];

  const showLayout = !noLayoutRoutes.includes(router.pathname);

  return (
    <ConfigProvider>
      <IndicatorsProvider>
        {/* @ts-ignore */}
        <AlarmProvider>
          {showLayout ? (
            <ComponentLayout>
              <Component {...pageProps} />
            </ComponentLayout>
          ) : (
            <Component {...pageProps} />
          )}
        </AlarmProvider>
      </IndicatorsProvider>
    </ConfigProvider>
  );
};

export default MyApp;
