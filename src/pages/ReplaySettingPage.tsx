import { css } from '@emotion/react';
import { Tabs } from 'antd';

import {
  NodesIgnore,
  NodesSort,
  SettingImportYaml,
  SettingRecord,
  SettingReplay,
} from '../components/replay/Setting';
import { ApplicationDataType } from '../services/Replay.type';
import { PageFC } from './index';

const ReplaySettingPage: PageFC<ApplicationDataType> = (props) => {
  const data = props.page.data;

  return (
    <Tabs
      size='small'
      tabPosition='left'
      items={[
        {
          key: 'record',
          label: 'Record',
          children: <SettingRecord appId={data.appId} agentVersion={data.agentVersion} />,
        },
        {
          key: 'replay',
          label: 'Replay',
          children: <SettingReplay appId={data.appId} agentVersion={data.agentVersion} />,
        },
        {
          key: 'importYaml',
          label: 'ImportYaml',
          children: <SettingImportYaml appId={data.appId} agentVersion={data.agentVersion} />,
        },
        {
          key: 'nodesIgnore',
          label: 'NodesIgnore',
          children: <NodesIgnore appId={data.appId} />,
        },
        {
          key: 'nodesSort',
          label: 'NodesSort',
          children: <NodesSort appId={data.appId} />,
        },
      ]}
      css={css`
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

export default ReplaySettingPage;