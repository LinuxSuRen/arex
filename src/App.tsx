// import 'antd/dist/antd.less';
// import './style/index.less';

import { LoadingOutlined } from '@ant-design/icons';
import { Theme as EmotionTheme, ThemeProvider } from '@emotion/react';
import {ConfigProvider, Spin,theme } from 'antd';
import { HttpProvider } from './components/arex-request';
import React, { useMemo } from 'react';
import { useRoutes } from 'react-router-dom';
const { darkAlgorithm } = theme;

import DefaultConfig from './defaultConfig';
import { useAuthentication, useCheckChrome, useInit } from './hooks';
import routerConfig from './router';
import { useStore } from './store';
import { themeMap } from './style/theme';

// global Spin config
Spin.setDefaultIndicator(<LoadingOutlined style={{ fontSize: 24 }} spin />);

function App() {
  useCheckChrome();
  useAuthentication();
  useInit();

  const routesContent = useRoutes(routerConfig);

  const {
    userInfo: {
      profile: { theme: themeName, language },
    },
    collectionTreeData,
    themeClassify,
    currentEnvironment,
  } = useStore();
  const theme = useMemo<EmotionTheme>(
    () => (themeName in themeMap ? themeMap[themeName] : themeMap[DefaultConfig.theme]),
    [themeName],
  );

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00b96b',
        },
        // 黑暗主题
        algorithm: true ? [darkAlgorithm] : [],
      }}
    >
      <HttpProvider
        theme={themeClassify}
        locale={{ 'zh-CN': 'cn', 'en-US': 'en' }[language]}
        collectionTreeData={collectionTreeData}
        environment={currentEnvironment}
      >
        <ThemeProvider theme={theme}>{routesContent}</ThemeProvider>
      </HttpProvider>
    </ConfigProvider>

  );
}

export default App;
