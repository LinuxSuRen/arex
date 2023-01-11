import { StopOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { App, Button, Card, Space, Tag, Tooltip, Typography } from 'antd';
import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import AppSettingService from '../../../services/AppSetting.service';
import ReplayService from '../../../services/Replay.service';
import { QueryMsgWithDiffLog, QueryMsgWithDiffRes, Scene } from '../../../services/Replay.type';
import { TooltipButton } from '../../index';

const PathTooltip: FC<{ path: string }> = (props) => {
  const path = useMemo(() => props.path.split('.'), [props.path]);

  return (
    <Tooltip title={props.path} open={path.length > 1 ? undefined : false}>
      <Typography.Text code>{path.at(-1)}</Typography.Text>
    </Tooltip>
  );
};

export type DiffListType = {
  appId: string;
  operationId: string;
  scene?: Scene;
  onTreeModeClick?: (diff?: QueryMsgWithDiffRes) => void;
};

const DiffList: FC<DiffListType> = (props) => {
  const { message } = App.useApp();
  const { t } = useTranslation(['components']);

  const DiffMap: {
    [unmatchedType: string]: {
      text: string;
      color: string;
      desc?: string;
    };
  } = useMemo(() => {
    return {
      '0': {
        text: t('replay.unknown'),
        color: 'default',
      },
      '1': {
        text: t('replay.leftMissing'),
        color: 'orange',
        desc: t('replay.leftMissingDesc'),
      },
      '2': {
        text: t('replay.rightMissing'),
        color: 'blue',
        desc: t('replay.rightMissingDesc'),
      },
      '3': {
        text: t('replay.differentValue'),
        color: 'magenta',
      },
    };
  }, []);
  const { data: diffData, loading } = useRequest(
    () =>
      ReplayService.queryMsgWithDiff({
        compareResultId: props.scene!.compareResultId,
        logIndexes: props.scene!.logIndexes,
      }),
    {
      ready: !!props.scene,
      refreshDeps: [props.scene],
    },
  );

  const { run: insertIgnoreNode } = useRequest(
    (path) =>
      AppSettingService.insertIgnoreNode({
        operationId: props.operationId,
        appId: props.appId,
        exclusions: path,
      }),
    {
      manual: true,
      onSuccess(success) {
        if (success) {
          message.success(t('replay.addIgnoreSuccess'));
        }
      },
    },
  );

  function handleIgnoreNode(pathPair: QueryMsgWithDiffLog['pathPair']) {
    const unmatchedType = pathPair.unmatchedType;
    const path = pathPair[unmatchedType === 2 ? 'rightUnmatchedPath' : 'leftUnmatchedPath']
      .map((p) => p.nodeName)
      .filter(Boolean);

    insertIgnoreNode(path);
  }

  return (
    <Card
      size='small'
      title={!loading && `${diffData?.logs.length} ${t('replay.issues')}`}
      extra={
        <Button
          size='small'
          disabled={loading}
          onClick={() => props.onTreeModeClick?.(diffData)}
          style={{ marginLeft: '8px' }}
        >
          {t('replay.treeMode')}
        </Button>
      }
      loading={loading}
      style={{ minHeight: '56px' }}
    >
      <Space direction='vertical' style={{ width: '100%' }}>
        {diffData?.logs.map((log, index) => (
          <div key={index} style={{ display: 'flex', flexFlow: 'row nowrap' }}>
            <Tag color={DiffMap[log.pathPair.unmatchedType]?.color}>
              {DiffMap[log.pathPair.unmatchedType]?.text}
            </Tag>

            {log.pathPair.unmatchedType === 3 ? (
              <Typography.Text type='secondary'>
                {`${t('replay.valueOf')} `}
                <PathTooltip path={log.path} />
                {` ${t('replay.isDifferenceExcepted')} `}
                <Typography.Text code ellipsis style={{ maxWidth: '200px' }}>
                  {log.baseValue}
                </Typography.Text>
                {`${t('replay.actual')} `}
                <Typography.Text code ellipsis style={{ maxWidth: '200px' }}>
                  {log.testValue}
                </Typography.Text>
                {'.'}
              </Typography.Text>
            ) : (
              <Typography.Text type='secondary'>
                <PathTooltip path={log.path} /> {DiffMap[log.pathPair.unmatchedType].desc}
              </Typography.Text>
            )}

            <TooltipButton
              size='small'
              type='default'
              breakpoint='xxl'
              title={t('replay.ignoreNode')}
              icon={<StopOutlined />}
              onClick={() => handleIgnoreNode(log.pathPair)}
              style={{ float: 'right', marginLeft: 'auto' }}
            />
          </div>
        ))}
      </Space>
    </Card>
  );
};

export default DiffList;
