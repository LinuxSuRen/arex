import { useMount } from 'ahooks';
import { useParams } from 'react-router-dom';

import AppFooter from '../components/app/Footer';
import AppHeader from '../components/app/Header';
import AppPaneLayout from '../components/app/PaneLayout';
import AppSidenav from '../components/app/Sidenav';
import MainTabs from '../components/panes/MainTabs';
import { PageTypeEnum } from '../constant';
import { useCustomNavigate } from '../router/useCustomRouter';

const MainBox = () => {
  const params = useParams();
  const customNavigate = useCustomNavigate();
  useMount(() => {
    if (params.paneType === PageTypeEnum.Run) {
      customNavigate(
        `/${params.workspaceId}/workspace/${params.workspaceName}/${PageTypeEnum.Run}/${params.paneId}`
      );
    }
  });
  return (
    <div>
      <AppHeader />
      <AppPaneLayout
        height={'calc(100vh - 88px)'}
        layoutId={'http'}
        vertical={false}
        layout-id="http"
        primary={<AppSidenav />}
        secondary={<MainTabs />}
      />
      <AppFooter />
    </div>
  );
};

export default MainBox;
