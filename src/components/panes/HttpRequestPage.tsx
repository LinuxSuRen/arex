import 'allotment/dist/style.css';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useRequest } from 'ahooks';
import { App } from 'antd';
import { ConfigProvider as RequestConfigProvider, Http } from 'arex-request-core';
import React, { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { treeFind, treeFindPath } from '../../helpers/collection/util';
import { parsePaneId } from '../../helpers/functional/url';
import { runRESTPreRequest, runRESTRequest } from '../../helpers/http/RequestRunner';
import { convertSaveRequestData, convertShowRequestData } from '../../helpers/http/util';
import { sendRequest } from '../../helpers/postman';
import { useCustomNavigate } from '../../router/useCustomNavigate';
import { FileSystemService } from '../../services/FileSystem.service';
import { useStore } from '../../store';
import useUserProfile from '../../store/useUserProfile';
// import Http, { HttpRef } from '../http';
// import { Environment } from '../http/data/environment';
// import { HoppRESTRequest } from '../http/data/rest';
// import { ExtraTabs } from '../http/extra';
// import { HoppRESTResponse } from '../http/helpers/types/HoppRESTResponse';
import { nodeType } from '../menus/CollectionMenu';
import SaveRequestButton from '../menus/CollectionMenu/SaveRequestButton';
import { sendQuickCompare } from './BatchComparePage/util';
import { PageFC, PagesType } from './index';

const HttpRequestPageWrapper = styled.div`
  overflow: hidden;
  height: calc(100vh - 128px);
  min-height: 650px;
  overflow-y: auto;
  border: 0 solid salmon;

  .ant-tabs-content {
    .ant-tabs-tabpane {
      padding: 0;
    }
  }
  .allotment-module_splitView__L-yRc
    > .allotment-module_splitViewContainer__rQnVa
    > .allotment-module_splitViewView__MGZ6O:not(.allotment-module_visible__AHq-h) {
    display: block !important;
  }
`;
const defaultReq = {
  preRequestScript: '',
  v: '',
  headers: [],
  name: '',
  body: { contentType: 'application/json', body: '' },
  auth: { authActive: false, authType: 'none' },
  testScript: '',
  endpoint: '',
  method: 'GET',
  params: [],
};
const HttpRequestPage: PageFC<nodeType> = (props) => {
  const { t } = useTranslation(['components']);
  const { message } = App.useApp();
  const { workspaceId } = useParams();

  const { theme } = useUserProfile();
  const { collectionTreeData, setPages, pages, activeEnvironment } = useStore();

  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [reqParams, setReqParams] = useState<any>();
  const params = useParams();
  const customNavigate = useCustomNavigate();
  const environment = useMemo<any>(
    () =>
      activeEnvironment
        ? {
            name: activeEnvironment.envName,
            variables: activeEnvironment.keyValues || [],
          }
        : {
            name: '',
            variables: [],
          },
    [activeEnvironment],
  );
  const id = useMemo(() => parsePaneId(props.page.paneId)['rawId'], [props.page.paneId]);
  // TODO 删除nodeType兜底逻辑
  const nodeType = useMemo(() => {
    return (
      treeFind(collectionTreeData, (node) => node.key === parsePaneId(props.page.paneId)['rawId'])
        ?.nodeType || 1
    );
  }, [props.page.paneId, collectionTreeData]);

  const nodePath = useMemo(() => {
    const path = treeFindPath(
      collectionTreeData,
      (node: nodeType) => node.key === parsePaneId(props.page.paneId)['rawId'],
    );

    return path;
  }, [props.page.paneId, collectionTreeData]);

  const { data, run: queryInterfaceOrCase } = useRequest(
    () =>
      nodeType === 2
        ? FileSystemService.queryCase({ id, parentId: nodePath.at(-2)?.key })
        : FileSystemService.queryInterface({ id }),
    {
      refreshDeps: [id, nodeType],
    },
  );

  const { run: runPinMock } = useRequest(
    (recordId) =>
      FileSystemService.pinMock({
        workspaceId: workspaceId as string,
        infoId: id,
        recordId,
        nodeType,
      }),
    {
      manual: true,
      ready: !!workspaceId,
      onSuccess: (success) => {
        if (success) {
          message.success('pin success');
          queryInterfaceOrCase();
          httpRef.current?.forceReRendering();
        }
      },
    },
  );

  const handleSaveAs = (node: nodeType) => {
    const filteredPanes = pages.filter((i) => i.paneId !== props.page.paneId);
    setPages(filteredPanes);

    const nodeType = node.nodeType === 3 ? PagesType.Folder : PagesType.Request;
    customNavigate(
      `/${params.workspaceId}/${nodeType}/${node.key}?data=${encodeURIComponent(
        JSON.stringify(node),
      )}`,
    );
    window.globalFetchTreeData();
  };
  const httpRef = useRef<any>(null);

  const handleSave = (request: any, response?: any) => {
    if (
      !request.headers.find((i) => i.key === 'arex-record-id') &&
      (response?.type === 'success' ? response.headers : []).find(
        (i) => i.key === 'arex-record-id',
      ) &&
      request.headers.find((i) => i.key === 'arex-force-record')?.active
    ) {
      const recordId =
        response?.type === 'success'
          ? response.headers.find((i) => i.key === 'arex-record-id')?.value
          : '';

      runPinMock(recordId);
    }
    if (nodeType === 1 && id.length === 36) {
      setReqParams(request);
      setSaveModalOpen(true);
    } else {
      FileSystemService[nodeType === 2 ? 'saveCase' : 'saveInterface'](
        convertSaveRequestData(workspaceId as string, id, request),
      ).then((success) =>
        success ? message.success('update success') : message.error('update failed'),
      );
    }
  };
  function onSend(request: any, environment: any) {
    return sendRequest(request, environment).then((res: any) => {
      return {
        response: res.response,
        testResult: res.testResult,
      };
    });
  }
  return (
    <HttpRequestPageWrapper>
      <RequestConfigProvider locale={'zh'} theme={'light'}>
        {data ? (
          <Http
            onSend={(request) => {
              return onSend(request, {
                name: 'dev',
                variables: [{ key: 'url', value: 'https://m.weibo.cn' }],
              });
            }}
            onSave={(req) => {
              handleSave(req, { headers: [], type: 'success' });
            }}
            value={convertShowRequestData(data)}
            breadcrumb={<div></div>}
            environment={{
              name: 'dev',
              variables: [{ key: 'url', value: 'https://m.weibo.cn' }],
            }}
            config={{}}
          />
        ) : null}
      </RequestConfigProvider>

      <SaveRequestButton
        open={saveModalOpen}
        reqParams={reqParams}
        collectionTreeData={collectionTreeData}
        onSaveAs={handleSaveAs}
        onClose={() => setSaveModalOpen(false)}
      />
    </HttpRequestPageWrapper>
  );
};

export default HttpRequestPage;
