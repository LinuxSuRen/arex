import { css } from '@emotion/react';
import { useRequest, useSize } from 'ahooks';
import { Collapse, Space, Tag, Typography } from 'antd';
import React, { ReactNode, useMemo, useRef, useState } from 'react';

import ReplayService from '../../../services/Replay.service';
import { PlanItemStatistics, SubScene } from '../../../services/Replay.type';
import { Label } from '../../styledComponents';
import { PageFC } from '../index';
import DiffCard from './DIffDrawer';
import FlowTree, { FlowTreeData } from './FlowTree';
import SubScenesMenu from './SubScenesMenu';

export const SceneCodeMap: {
  [key: string]: {
    color: string;
    message: string;
  };
} = {
  '-1': {
    color: 'red',
    message: 'exception',
  },
  '0': {
    color: 'green',
    message: 'success',
  },
  '1': { color: 'magenta', message: 'value diff' },
  '2': { color: 'orange', message: 'new call' },
  '4': { color: 'blue', message: 'call missing' },
};

export const SummaryCodeMap: { [key: string]: { color: string; message: string } } = {
  '0': {
    color: 'success',
    message: 'SUCCESS', // 'COMPARED_WITHOUT_DIFFERENCE'
  },
  '1': {
    color: 'magenta',
    message: 'COMPARED_WITH_DIFFERENCE',
  },
  '2': {
    color: 'error',
    message: 'EXCEPTION', // 'COMPARED_INTERNAL_EXCEPTION'
  },
  '3': {
    color: 'orange',
    message: 'SEND_FAILED_NOT_COMPARE',
  },
};

const ReplayDiffPage: PageFC<PlanItemStatistics> = (props) => {
  const {
    page: {
      data: { planId, planItemId },
    },
  } = props;

  const wrapperRef = useRef(null);
  const size = useSize(wrapperRef);

  const [modalOpen, setModalOpen] = useState(0); // 0-close 1-open-diffMsg 2-open-diffMsgAll
  const [subSceneList, setSubSceneList] = useState<SubScene[]>([]);
  const [modalTitle, setModalTitle] = useState<ReactNode[]>();

  const { data: sceneInfo = [] } = useRequest(() =>
    ReplayService.querySceneInfo({
      // planId: '6406f9fe78b64d7f552679c9',
      // planItemId: '6406f9fe78b64d7f552679f7',
      planId,
      planItemId,
    }),
  );

  const {
    data: fullLinkInfo,
    mutate: setFullLinkInfo,
    run: getQueryFullLinkInfo,
  } = useRequest(ReplayService.queryFullLinkInfo, {
    manual: true,
  });

  const treeData = useMemo<FlowTreeData | undefined>(
    () =>
      fullLinkInfo && {
        name: 'Arex',
        operationName: 'Arex',
        level: 0,
        children: [
          {
            ...fullLinkInfo.entrance,
            name: fullLinkInfo.entrance?.categoryName,
            level: 1,
            children: fullLinkInfo.infoItemList?.map((item) => ({
              ...item,
              name: fullLinkInfo.entrance?.categoryName,
              level: 2,
            })),
          },
        ],
      },
    [fullLinkInfo],
  );

  const {
    data: diffMsg,
    mutate: setDiffMsg,
    loading: loadingDiffMsg,
    run: queryDiffMsgById,
  } = useRequest(ReplayService.queryDiffMsgById, {
    manual: true,
    onBefore() {
      setDiffMsg();
    },
  });

  const {
    data: diffMsgAll,
    mutate: setDiffMsgAll,
    loading: loadingDiffMsgAll,
    run: queryAllDiffMsg,
  } = useRequest(ReplayService.queryAllDiffMsg, {
    manual: true,
    onBefore() {
      setDiffMsgAll();
    },
  });

  return (
    <div ref={wrapperRef}>
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
          destroyInactivePanel
          onChange={([index]) => {
            if (index !== undefined) setSubSceneList(sceneInfo[parseInt(index)].subScenes);
            else setFullLinkInfo(undefined);
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
                <SubScenesMenu
                  data={subSceneList || []}
                  onClick={getQueryFullLinkInfo}
                  onClickAllDiff={(params, title) => {
                    queryAllDiffMsg(params);
                    setModalTitle(title);
                    setModalOpen(2);
                  }}
                />
              </Collapse.Panel>
            );
          })}
        </Collapse>

        {treeData && (
          <FlowTree
            bordered
            width={size?.width && size.width - 32}
            data={treeData}
            onClick={(id) => {
              queryDiffMsgById({ id });
              setModalOpen(1);
            }}
          />
        )}

        <DiffCard
          open={!!modalOpen}
          title={modalTitle}
          appId={props.page.data.appId}
          operationId={props.page.data.operationId}
          loading={loadingDiffMsg || loadingDiffMsgAll}
          data={[undefined, diffMsg, diffMsgAll?.compareResultDetailList][modalOpen]}
          onClose={(open) => setModalOpen(Number(open))}
        />
      </Space>
    </div>
  );
};

export default ReplayDiffPage;
