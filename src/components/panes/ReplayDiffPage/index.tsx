import { css } from '@emotion/react';
import { useRequest } from 'ahooks';
import { Card, Collapse, Space, Tag, Typography } from 'antd';
import React, { ReactNode, useState } from 'react';

import ReplayService from '../../../services/Replay.service';
import { PlanItemStatistics, SubScene } from '../../../services/Replay.type';
import { EmptyWrapper, Label } from '../../styledComponents';
import { PageFC } from '../index';
import DiffCard from './DIffCard';
import FlowTree from './FlowTree';
import SubSceneMenu from './SubSceneMenu';
import SummaryTabs from './SummaryTabs';

export const SceneCodeMap: {
  [key: string]: {
    color: string;
    message: string;
  };
} = {
  '-1': {
    color: 'error',
    message: 'exception',
  },
  '0': {
    color: 'success',
    message: 'success',
  },
  '1': { color: 'magenta', message: 'value diff' },
  '2': { color: 'orange', message: 'left call missing' },
  '4': { color: 'blue', message: 'right call missing' },
};

export const SummaryCodeMap: { [key: string]: { color: string; message: string } } = {
  '0': {
    color: 'success',
    message: 'COMPARED_WITHOUT_DIFFERENCE',
  },
  '1': {
    color: 'magenta',
    message: 'COMPARED_WITH_DIFFERENCE',
  },
  '2': {
    color: 'error',
    message: 'COMPARED_INTERNAL_EXCEPTION',
  },
  '3': {
    color: 'orange',
    message: 'SEND_FAILED_NOT_COMPARE',
  },
};

const treeData = {
  name: 'Arex',
  level: 0,
  children: [
    {
      name: 'Servlet',
      level: 1,
      children: [
        {
          name: 'HttpClient-/posts/2',
          level: 2,
        },
        {
          name: 'HttpClient-/posts',
          level: 2,
        },
        {
          name: 'HttpClient-/posts/2',
          level: 2,
        },
        {
          name: 'HttpClient-/posts',
          level: 2,
        },
        {
          name: 'HttpClient-/posts/2',
          level: 2,
        },
        {
          name: 'HttpClient-/posts',
          level: 2,
        },
        {
          name: 'HttpClient-/posts/2',
          level: 2,
        },
        {
          name: 'HttpClient-/posts',
          level: 2,
        },
        {
          name: 'HttpClient-/posts/2',
          level: 2,
        },
        {
          name: 'HttpClient-/posts',
          level: 2,
        },
      ],
    },
  ],
};

const ReplayDiffPage: PageFC<PlanItemStatistics> = (props) => {
  const {
    page: {
      data: { planId, planItemId },
    },
  } = props;

  const [subSceneList, setSubSceneList] = useState<SubScene[]>([]);
  const [activeIds, setActiveIds] = useState<{ recordId: string; replayId: string }>({
    recordId: '',
    replayId: '',
  });

  const { data: sceneInfo = [] } = useRequest(
    () =>
      ReplayService.querySceneInfo({
        // planId: '6406f9fe78b64d7f552679c9',
        // planItemId: '6406f9fe78b64d7f552679f7',
        planId,
        planItemId,
      }),
    {
      onSuccess(res) {
        console.log(res);
      },
    },
  );

  const {
    data: fullLinkSummary = [],
    loading: loadingFullLinkSummary,
    run: getFullLinkSummary,
  } = useRequest(ReplayService.queryFullLinkSummary, {
    manual: true,
    onSuccess(res, [params]) {
      console.log(res);
      res.length && getFullLinkMsgWithCategory({ ...params, categoryName: res[0].categoryName });
    },
  });

  const {
    data: detailList = [],
    loading: loadingDetailList,
    run: getFullLinkMsgWithCategory,
  } = useRequest(ReplayService.queryFullLinkMsgWithCategory, {
    manual: true,
    onSuccess(res) {
      console.log(res);
    },
  });

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <Space style={{ marginBottom: '4px' }}>
        <Typography.Text type='secondary'>
          <Label>planId</Label>
          {planId}
        </Typography.Text>
        <Typography.Text type='secondary'>
          <Label>planItemId</Label>
          {planItemId}
        </Typography.Text>
      </Space>

      {/* 一级: 第一个subScenes details.map(item => item.categoryName + decode(item.code)) */}
      {/* 二级: details.categoryName + decode(item.code) + item.operationName */}

      <Collapse
        accordion
        onChange={([index]) => {
          index !== undefined && setSubSceneList(sceneInfo[parseInt(index)].subScenes);
        }}
      >
        {sceneInfo.map((scene, index) => {
          const firstSubScene = scene.subScenes[0];
          const { fullPath } = firstSubScene.details.reduce<{
            fullPath: ReactNode[];
            pathKeyList: string[];
          }>(
            (path, item, i) => {
              // 去重: code 和 categoryName 组成唯一标识
              const pathKey = `${item.code}-${item.categoryName}`;
              if (path.pathKeyList.includes(pathKey)) return path;

              path.pathKeyList.push(pathKey);
              const title = (
                <Space>
                  {item.categoryName}
                  <Tag color={SceneCodeMap[item.code.toString()].color}>
                    {SceneCodeMap[item.code.toString()].message}
                  </Tag>
                </Space>
              );

              i && path.fullPath.push('+ ');
              path.fullPath.push(title);
              return path;
            },
            { fullPath: [], pathKeyList: [] },
          );

          return (
            <Collapse.Panel
              header={fullPath}
              key={index}
              css={css`
                .ant-collapse-content-box {
                  padding: 8px !important;
                }
              `}
            >
              <SubSceneMenu
                data={subSceneList || []}
                onClick={(params) => {
                  setActiveIds(params);
                  getFullLinkSummary(params);
                }}
              />
            </Collapse.Panel>
          );
        })}
      </Collapse>

      <FlowTree data={treeData} />

      <Card size='small' bodyStyle={{ paddingTop: 0 }}>
        <EmptyWrapper
          loading={loadingDetailList || loadingFullLinkSummary}
          empty={!fullLinkSummary.length}
        >
          <SummaryTabs
            data={fullLinkSummary}
            onChange={(key) => {
              getFullLinkMsgWithCategory({ ...activeIds, categoryName: key });
            }}
          />

          <Space direction='vertical' style={{ width: '100%' }}>
            {detailList.map((detail) => (
              <DiffCard key={detail.id} data={detail} />
            ))}
          </Space>
        </EmptyWrapper>
      </Card>
    </Space>
  );
};

export default ReplayDiffPage;
