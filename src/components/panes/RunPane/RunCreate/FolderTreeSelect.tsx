import { css, useTheme } from '@emotion/react';
import { Button, Space, Tree } from 'antd';
import { Divider } from 'antd/lib';
import { FC, Key, useState } from 'react';

import { treeFindAllKeys } from '../../../../helpers/collection/util';
import { testData } from './helper';

interface FolderTreeSelectProps {
  name: string;
}

const FolderTreeSelect: FC<FolderTreeSelectProps> = () => {
  const theme = useTheme();
  const [checkedKeys, setCheckedKeys] = useState<Key[]>([]);
  return (
    <div
      style={{ flex: '1' }}
      css={css`
        padding: 12px;
        padding-right: 0;
        display: flex;
        flex-direction: column;
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        `}
      >
        <span
          css={css`
            font-weight: 600;
          `}
        >
          RUN ORDER
        </span>
        <Space size={0}>
          <Button
            type={'link'}
            onClick={() => {
              setCheckedKeys([]);
            }}
          >
            Deselect All
          </Button>
          <Divider type={'vertical'} />
          <Button
            type={'link'}
            onClick={() => {
              setCheckedKeys(treeFindAllKeys(testData));
            }}
          >
            Select All
          </Button>
          <Divider type={'vertical'} />
          <Button type={'link'}>Reset</Button>
        </Space>
      </div>

      <div
        css={css`
          padding-top: 10px;
          flex: 1;
          border: 1px solid ${theme.colorBorder};
          border-radius: ${theme.borderRadius}px;
          overflow-y: auto;
          .ant-checkbox-wrapper.ant-checkbox-group-item {
            padding: 5px 10px;
            &:hover {
              background-color: rgba(0, 0, 0, 0.1);
            }
          }
          .ant-checkbox-wrapper.ant-checkbox-group-item:nth-of-type(1) {
            margin-inline-start: 8px;
          }
        `}
      >
        {JSON.stringify(checkedKeys)}
        {JSON.stringify(treeFindAllKeys(testData))}
        <Tree
          defaultExpandedKeys={['__ROOT__']}
          checkedKeys={checkedKeys}
          onCheck={(cKeys: any) => {
            setCheckedKeys(cKeys);
          }}
          css={css`
            display: grid;
          `}
          checkable={true}
          treeData={testData}
        />
      </div>
    </div>
  );
};

export default FolderTreeSelect;
