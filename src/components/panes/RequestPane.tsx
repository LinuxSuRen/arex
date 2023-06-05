import { css } from '@emotion/react';
import { Breadcrumb, theme } from 'antd';
import { Http } from 'arex-request-core';
import React, { FC } from 'react';
// import { sendRequest } from '../../helpers/request/index';
const { useToken } = theme;
const HttpBreadcrumb: FC<{ nodePaths: { title: string }[] }> = ({
  nodePaths,
}) => {
  return (
    <div>
      <Breadcrumb>
        {nodePaths.map((nodePath, index) => (
          <Breadcrumb.Item key={index}>{nodePath.title}</Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  );
};
const RequestPane: FC<any> = ({ pane }) => {
  const testReqaData = {
    id: '0',
    title: 'POST',
    preRequestScript: '',
    v: '',
    headers: [],
    name: '',
    body: {
      contentType: 'application/json',
      body: JSON.stringify({ name: 'zt' }),
    } as any,
    auth: { authActive: false, authType: 'none' } as any,
    testScript: '',
    endpoint: '{{url}}/post',
    method: 'POST',
    params: [],
    inherited: undefined,
    inheritedEndpoint: '{{url}}/put',
    inheritedMethod: 'PUT',
  };
  return (
    <div
      css={css`
        width: 100%;
      `}
    >
      <Http
        height={'calc(100vh - 200px)'}
        locale={'en'}
        theme={'light'}
        // 以上是配置
        onSend={(request) => {
          console.log(request);
        }}
        onSave={() => {
          console.log('');
        }}
        value={testReqaData}
        environment={{
          name: 'dev',
          variables: [{ key: 'url', value: 'http://124.223.27.177:18080' }],
        }}
        config={{}}
        breadcrumbItems={[
          { title: 'Test' },
          { title: 'hoppscotch' },
          { title: 'echo' },
        ]}
        onChange={({ value, tags, description }) => {
          console.log(value, tags, description);
        }}
        tags={['sd']}
        tagOptions={[{ color: 'blue', value: 'sd', label: 'd' }]}
        description={'description'}
      />
    </div>
  );
};

export default RequestPane;
