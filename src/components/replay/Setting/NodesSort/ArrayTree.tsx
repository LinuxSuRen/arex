import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Badge, Card, Tree } from 'antd';
import { TreeProps } from 'antd/es';
import { DataNode } from 'antd/lib/tree';
import { FC } from 'react';

import { useStore } from '../../../../store';

type ResponseTreeProps = Omit<TreeProps, 'treeData'> & {
  treeData: object;
  title?: string;
};

const ArrayTree: FC<ResponseTreeProps> = (props) => {
  const {
    userInfo: {
      profile: { theme },
    },
  } = useStore();

  function getNodes(object: object, basePath = ''): DataNode[] {
    const entries = Object.entries(object).filter(([, value]) => Array.isArray(value));
    return entries.map(([key, value]) => {
      const path = basePath + key + '/';
      return value && typeof value === 'object'
        ? {
            title: key,
            key: path,
            children: getNodes(value, path),
            icon: <Badge color={theme.split('-')[1]} />,
          }
        : { title: key, key: path, value };
    });
  }

  return (
    <Card
      title={`${props.title} (click node to ignore)`}
      bodyStyle={{ padding: '8px 16px' }}
      headStyle={{ padding: '0 16px', margin: '-8px 0' }}
    >
      <Tree
        showIcon
        defaultExpandAll
        {...props}
        treeData={getNodes(props.treeData, '')}
        css={css`
          .ant-tree-icon__customize {
            float: right;
            margin-left: 2px;
          }
        `}
      />
    </Card>
  );
};

export default ArrayTree;
