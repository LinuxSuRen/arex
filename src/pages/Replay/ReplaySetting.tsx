import { css } from '@emotion/react';
import { Tabs } from 'antd';
import { FC } from 'react';

import { SettingRecord } from '../../components/replay/Setting';
import { ApplicationDataType } from '../../services/Replay.type';

export type ReplaySettingProps = {
  data: ApplicationDataType;
};
const { TabPane } = Tabs;
const ReplaySetting: FC<ReplaySettingProps> = (props) => {
  return (
    <>
      <Tabs
        tabPosition='left'
        size='small'
        css={css`
          .ant-tabs-nav-list > .ant-tabs-tab {
            margin: 4px 0 0 0 !important;
          }
        `}
      >
        <TabPane tab='Record' key='record'>
          {/* SettingRecord component */}
          <SettingRecord id={props.data.appId} agentVersion={props.data.agentVersion} />
        </TabPane>
        <TabPane tab='Replay' key='replay'>
          {/* SettingReplay component */}
          Replay
        </TabPane>
        <TabPane tab='Import yaml' key='importYaml'>
          {/* SettingImportYaml component */}
          Import yaml
        </TabPane>
      </Tabs>
    </>
  );
};

export default ReplaySetting;