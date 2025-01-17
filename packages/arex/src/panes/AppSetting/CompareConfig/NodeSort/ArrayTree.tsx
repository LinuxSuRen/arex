import { css } from '@emotion/react';
import { Badge, Card, Tree, Typography } from 'antd';
import { TreeProps } from 'antd/es';
import { DataNode } from 'antd/lib/tree';
import { useTranslation } from 'arex-core';
import React, { FC, useMemo } from 'react';

import { useColorPrimary } from '@/hooks';
import { SortNode } from '@/services/ComparisonService';

type ResponseTreeProps = Omit<TreeProps, 'treeData'> & {
  sortNodeList?: SortNode[];
  treeData: object;
  onEditResponse?: () => void;
};

const ArrayTree: FC<ResponseTreeProps> = (props) => {
  const { t } = useTranslation('components');

  const color = useColorPrimary();
  function getNodes(object: object, basePath = ''): DataNode[] {
    const entries = Object.entries(object);
    return (
      entries
        .map(([key, value]) => {
          const path = basePath + key + '/';
          return value && typeof value === 'object'
            ? {
                title: key,
                key: path,
                children: getNodes(Array.isArray(value) ? value[0] || {} : value, path),
                disabled: !Array.isArray(value),
                icon: props.sortNodeList?.find((node) => node.path === path)?.pathKeyList
                  ?.length && <Badge color={color.name} />, // 已配置过的节点使用圆点进行提示
              }
            : { title: key, key: path, value, disabled: !Array.isArray(value) };
        })
        // 过滤非数组子节点
        .filter((item) => item.children || Array.isArray(item.value))
    );
  }

  const nodesData = useMemo(() => getNodes(props.treeData, ''), [props.treeData]);

  return (
    <Card
      size='small'
      title={<Typography.Text ellipsis>{t('appSetting.chooseOneNode')}</Typography.Text>}
    >
      <Tree
        showIcon
        defaultExpandAll
        {...props}
        selectedKeys={[]}
        treeData={nodesData}
        css={css`
          max-height: calc(100vh - 300px);
          overflow-y: auto;
          .ant-tree-icon__customize {
            float: right;
          }
        `}
      />
    </Card>
  );
};

export default ArrayTree;
