import { css, useTheme } from '@emotion/react';
import { Button, Tabs, TabsProps, Upload } from 'antd';
// import { Console, Hook, Unhook } from 'console-feed';
import { useContext, useRef } from 'react';

import { treeFind } from '../../../helpers/collection/util';
import { parsePaneId } from '../../../helpers/utils';
import request from '../../../services/request';
import { MainContext } from '../../../store/content/MainContent';
import SmartBreadcrumb from '../../smart/Breadcrumb';
import FolderAuth from './Auth';
import SocketTest from './SocketTest';

const Index = ({ pane }: any) => {
  const { store } = useContext(MainContext);
  const { collectionTreeData } = store.globalState;
  const { relationshipRequestId } = treeFind(
    collectionTreeData,
    (node: any) => node.key === parsePaneId(pane.key)['rawId']
  );

  const folderAuthRef = useRef(null);

  function zhuanhuan(authFormData: any) {
    if (authFormData.type === 'bearer') {
      return {
        authType: 'bearer',
        authActive: false,
        token: authFormData.bearer.token,
      };
    } else if (authFormData.type === 'basic') {
      return {
        authType: 'basic',
        authActive: false,
        username: authFormData.basic.username,
        password: authFormData.basic.password,
      };
    }
  }
  function handelSave() {
    // @ts-ignore
    const authFormData = folderAuthRef.current.getData();
    request({
      method: 'POST',
      url: '/api/updatefolder',
      data: { id: relationshipRequestId, auth: zhuanhuan(authFormData) },
    }).then((res) => {
      console.log(res);
    });
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Authorization`,
      children: (
        <FolderAuth
          ref={folderAuthRef}
          relationshipRequestId={relationshipRequestId}
        ></FolderAuth>
      ),
    },
    {
      key: '2',
      label: `Pre-request Script`,
      disabled: true,
      children: `Content of Tab Pane 2`,
    },
    {
      key: '3',
      label: `Test`,
      children: `Content of Tab Pane 3`,
      disabled: true,
    },
  ];
  const theme = useTheme();
  return (
    <div>
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          padding: 10px;
          border-bottom: 1px solid ${theme.colorBorder};
        `}
      >
        <SmartBreadcrumb></SmartBreadcrumb>
        <Button size={'small'} onClick={handelSave}>
          Save
        </Button>
        <Upload
          onChange={(e) => {
            const file: any = e.file.originFileObj;
            const reader = new FileReader();
            // 异步处理文件数据
            reader.readAsText(file, 'UTF-8');
            // 处理完成后立马触发 onload
            reader.onload = (fileReader) => {
              // const fileData = fileReader.target.result;
              // console.log(JSON.parse(fileData as string));
              // console.log(JSON.parse(reader.result as string));
              //
              // console.log(fileData, 'fileData');
              //
              // console.log(transfromPm(fileData));
              // 上面的两个输出相同
            };
          }}
        >
          上传
        </Upload>
      </div>

      <Tabs
        css={css`
          padding: 0;
          .ant-tabs-nav-list {
            margin-left: 12px;
          }
          .ant-tabs-content {
            padding: 12px !important;
          }
        `}
        defaultActiveKey="1"
        items={items}
      />
      <SocketTest />
    </div>
  );
};

export default Index;
