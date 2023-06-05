import { App, ConfigProvider, theme } from 'antd';

import useDarkMode from '../hooks/use-dark-mode';
import useSettings from '../store/useSettings.ts';

const { darkAlgorithm } = theme;
const ConfigMiddlewareProvider = ({ children }: any) => {
  const darkMode = useDarkMode();
  const { properties } = useSettings();
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: properties.THEME_COLOR,
        },
        algorithm: darkMode.value ? [darkAlgorithm] : [],
      }}
    >
      <App>{children}</App>
    </ConfigProvider>
  );
};
export default ConfigMiddlewareProvider;
