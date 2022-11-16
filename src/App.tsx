import './style/index.less';

import { LoadingOutlined } from '@ant-design/icons';
import { Theme as EmotionTheme, ThemeProvider } from '@emotion/react';
import { Button, ConfigProvider, Spin, theme } from 'antd';
import { HttpProvider } from 'arex-request';
import React, { useMemo } from 'react';
import { useRoutes } from 'react-router-dom';

import DefaultConfig from './defaultConfig';
import { useAuth, useCheckChromeExtension, useInterfaceInit } from './hooks';
import routerConfig from './routers';
import { useStore } from './store';
import { Theme, themeMap } from './style/theme';

// global Spin config
Spin.setDefaultIndicator(<LoadingOutlined style={{ fontSize: 24 }} spin />);

const { darkAlgorithm, compactAlgorithm } = theme;

function App() {
  const routesContent = useRoutes(routerConfig);
  useAuth();
  useCheckChromeExtension();
  useInterfaceInit(); // init theme, fontSize, etc.

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
        token: { colorPrimary: '#603be3' },
        algorithm: [darkAlgorithm, compactAlgorithm],
      }}
    >
      <Button type='primary'>ok</Button>
      <ThemeProvider theme={themeMap[Theme.lightGreen]}>
        <HttpProvider
          theme={themeClassify}
          locale={{ 'zh-CN': 'cn', 'en-US': 'en' }[language]}
          collectionTreeData={collectionTreeData}
          environment={currentEnvironment}
        >
          {routesContent}
        </HttpProvider>
      </ThemeProvider>
    </ConfigProvider>
  );
}

export default App;
