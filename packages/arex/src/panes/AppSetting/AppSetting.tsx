import { Tabs } from 'antd';
import { ArexPaneFC, css, useTranslation } from 'arex-core';
import React, { useMemo } from 'react';

import CompareConfig from '@/panes/AppSetting/CompareConfig';
import { ApplicationDataType } from '@/services/ApplicationService';

import SettingImportYaml from './ImportYaml';
import SettingNodesIgnore from './NodesIgnore';
import SettingNodesSort from './NodesSort';
import SettingRecord from './Record';
import SettingReplay from './Replay';

const AppSetting: ArexPaneFC<ApplicationDataType> = (props) => {
  const { data } = props;
  const { t } = useTranslation(['components']);

  const TabsItems = useMemo(
    () => [
      {
        key: 'record',
        label: t('appSetting.record'),
        children: <SettingRecord appId={data.appId} />,
      },
      {
        key: 'replay',
        label: t('appSetting.replay'),
        children: <SettingReplay appId={data.appId} />,
      },
      {
        key: 'importYaml',
        label: t('appSetting.importYaml'),
        children: <SettingImportYaml appId={data.appId} agentVersion={data.agentVersion} />,
      },
      {
        key: 'compareConfig',
        label: t('appSetting.compareConfig'),
        children: <CompareConfig appId={data.appId} />,
      },
      {
        key: 'nodesIgnore',
        label: t('appSetting.nodesIgnore'),
        children: <SettingNodesIgnore appId={data.appId} />,
      },
      {
        key: 'nodesSort',
        label: t('appSetting.nodesSort'),
        children: <SettingNodesSort appId={data.appId} />,
      },
    ],
    [data, t],
  );

  return (
    <Tabs
      size='small'
      tabPosition='left'
      items={TabsItems}
      css={css`
        height: 100%;
        .ant-tabs-nav-list > .ant-tabs-tab {
          margin: 4px 0 0 0 !important;
        }
        .ant-tabs-tabpane {
          padding: 0 12px;
        }
      `}
    />
  );
};

export default AppSetting;
