import { ClusterOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { Badge, Divider, Menu, Space, Tag, theme } from 'antd';
import React, { FC, ReactNode, useEffect, useState } from 'react';

import { QueryFullLinkInfoReq, SubScene } from '../../../services/Replay.type';
import { EllipsisTooltip, TooltipButton } from '../../index';
import { SpaceBetweenWrapper } from '../../styledComponents';
import { SceneCodeMap } from './index';

export interface SubSceneMenuProps {
  data: SubScene[];
  onClick?: (params: QueryFullLinkInfoReq) => void;
  onClickAllDiff?: (recordId: string, label: React.ReactNode[]) => void;
}

const Connector = '%_%';
const SubScenesMenu: FC<SubSceneMenuProps> = (props) => {
  const { token } = theme.useToken();
  const [selectedKeys, setSelectedKeys] = useState('');

  useEffect(() => {
    if (props.data.length) {
      const params = {
        recordId: props.data[0].recordId,
        replayId: props.data[0].replayId,
      };
      setSelectedKeys(params.recordId + Connector + params.replayId);
      props.onClick?.(params);
    }
  }, [props.data]);

  const handleClick = ({ key }: { key: string }) => {
    setSelectedKeys(key);
    const split = key.split(Connector);
    if (split.length !== 2) return;

    const [recordId, replayId] = split;
    const params = {
      recordId,
      replayId,
    };

    props.onClick?.(params);
  };

  return (
    <Menu
      selectedKeys={[selectedKeys]}
      items={props.data.map((subScene) => {
        const fullPath = subScene.details.reduce<ReactNode[]>(
          (path, item, index) => {
            const detail = (
              <Space key={`${item.operationName}-${item.categoryName}`}>
                <EllipsisTooltip title={item.operationName} />
                {`- ${item.categoryName}`}
                <Tag color={SceneCodeMap[item.code.toString()].color}>
                  {SceneCodeMap[item.code.toString()].message}
                </Tag>
              </Space>
            );
            index && path.push('+ ');
            path.push(detail);
            return path;
          },
          [
            <Badge
              key='count'
              size='small'
              count={subScene.count}
              color={token.colorPrimary}
              offset={[0, -2]}
              style={{ marginRight: '8px' }}
            />,
          ],
        );

        return {
          label: (
            <SpaceBetweenWrapper>
              <div style={{ overflow: 'hidden' }}>{fullPath}</div>
              <div>
                <Divider type='vertical' />
                <TooltipButton
                  type='link'
                  size='small'
                  icon={<ClusterOutlined />}
                  title={'view all'}
                  onClick={() => props.onClickAllDiff?.(subScene.recordId, fullPath)}
                />
              </div>
            </SpaceBetweenWrapper>
          ),
          key: subScene.recordId + Connector + subScene.replayId,
        };
      })}
      onClick={handleClick}
      css={css`
        border-inline-end: none !important;
      `}
    />
  );
};

export default SubScenesMenu;