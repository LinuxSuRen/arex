import { Button, Card, Spin, Tree, Typography } from 'antd';
import { TreeProps } from 'antd/es';
import { DataNode } from 'antd/lib/tree';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { SpaceBetweenWrapper } from '../../styledComponents';
import EmptyResponse from './EmptyResponse';

type IgnoreTreeProps = Omit<TreeProps, 'treeData'> & {
  loading?: boolean;
  treeData: object;
  title?: string;
  onSave?: () => void;
  onEditResponse?: () => void;
};
// const IgnoreTreeWrapper = styled.div`
//   .ant-tree-node-selected {
//     text-decoration: line-through;
//   }
// `;

type ParsedJson = {
  title: string;
  key: string;
  value?: string;
  children?: ParsedJson[];
};

export function parseIgnoreObject(value: unknown, basePath = ''): ParsedJson[] {
  if (!value || (Array.isArray(value) && !value?.length)) return [];

  const sample = Array.isArray(value) ? value[0] : value;

  if (['number', 'string'].includes(typeof sample))
    return [{ title: sample, key: basePath + sample, value: sample }];

  const entries = Object.entries(sample);
  return entries.map<ParsedJson>(([key, sample]) => {
    const path = basePath + key + '/';
    return ['number', 'string'].includes(typeof sample) ||
      (Array.isArray(sample) && ['number', 'string'].includes(typeof sample[0]))
      ? { title: key, key: path, value: sample as string }
      : {
          title: key,
          key: path,
          children: parseIgnoreObject(sample, path),
        };
  });
}
const IgnoreTree: FC<IgnoreTreeProps> = (props) => {
  const { t } = useTranslation(['components', 'common']);

  // 过滤出 object 类型的节点

  return (
    // <IgnoreTreeWrapper>
    <>
      <SpaceBetweenWrapper style={{ paddingBottom: '8px' }}>
        <Typography.Title level={5}>{t('appSetting.dataStructure')}</Typography.Title>
        <Button size='small' type='primary' onClick={() => props.onSave?.()}>
          {t('save', { ns: 'common' })}
        </Button>
      </SpaceBetweenWrapper>

      <Card size='small' title={`${props.title} (${t('appSetting.clickToIgnore')})`}>
        <Spin spinning={props.loading}>
          {Object.keys(props.treeData).length ? (
            <Tree
              multiple
              defaultExpandAll
              {...props}
              treeData={parseIgnoreObject(props.treeData, '')}
            />
          ) : (
            <EmptyResponse onClick={props.onEditResponse} />
          )}
        </Spin>
      </Card>
    </>
    // </IgnoreTreeWrapper>
  );
};

export default IgnoreTree;
