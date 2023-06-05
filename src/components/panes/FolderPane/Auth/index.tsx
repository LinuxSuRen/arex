import { css } from '@emotion/react';
import { useRequest } from 'ahooks';
import { Divider, Form, Select } from 'antd';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

import request from '../../../../services/request';
import BasicAuthForm from './BasicAuthForm';
import BearerTokenForm from './BearerTokenForm';

const FolderAuth = ({ relationshipRequestId }: any, ref: any) => {
  const [initValue, setInitValue] = useState({
    username: '',
    password: '',
    token: '',
  });

  const [authType, setAuthType] = useState<string>('');
  const { data } = useRequest(
    () =>
      request<any>({
        method: 'POST',
        url: '/api/retrievefolder',
        data: { id: relationshipRequestId },
      }),
    {
      onSuccess(res) {
        setAuthType(res.auth.authType);
        if (res.auth.authType === 'basic') {
          setInitValue({
            username: res.auth.username,
            password: res.auth.password,
            token: '',
          });
        } else if (res.auth.authType === 'bearer') {
          setInitValue({
            username: '',
            password: '',
            token: res.auth.token,
          });
        }
      },
    }
  );

  useImperativeHandle(ref, () => ({
    getData: () => {
      return {
        type: authType,
        // @ts-ignore
        basic: basicAuthFormRef.current
          ? // @ts-ignore
            basicAuthFormRef.current.getFormData()
          : '',
        // @ts-ignore
        bearer: bearerTokenFormRef.current
          ? // @ts-ignore
            bearerTokenFormRef.current.getFormData()
          : '',
      };
    }, // 暴露组件内部数据teams给父组件
  }));

  const [form] = Form.useForm();
  const basicAuthFormRef = useRef(null);
  const bearerTokenFormRef = useRef(null);
  return (
    <div>
      <div>
        This authorization method will be used for every request in this
        collection. You can override this by specifying one in the request.
        {data ? (
          <Form
            labelAlign={'left'}
            css={css`
              padding-top: 60px;
            `}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            form={form}
            style={{ maxWidth: 600 }}
            onFinish={(values: any) => {
              console.log(values);
              request({
                method: 'POST',
                url: '/api/updatefolder',
                data: {
                  id: relationshipRequestId,
                  auth: {
                    type: 'bearer',
                    bearer: [
                      {
                        key: 'token',
                        value: values.value,
                        type: 'string',
                      },
                    ],
                  },
                },
              }).then((r) => {
                console.log(r);
              });
            }}
          >
            <Form.Item label="Type">
              <Select
                value={authType}
                options={[
                  {
                    value: 'none',
                    label: 'No Auth',
                  },
                  {
                    value: 'bearer',
                    label: 'Bearer Token',
                  },
                  {
                    value: 'basic',
                    label: 'Basic Auth',
                  },
                ]}
                onSelect={(val) => {
                  setAuthType(val);
                }}
                placeholder="input placeholder"
              />
            </Form.Item>
          </Form>
        ) : null}
        <Divider type={'horizontal'} />
        {authType === 'basic' && (
          <BasicAuthForm
            username={initValue.username}
            password={initValue.password}
            ref={basicAuthFormRef}
          />
        )}
        {authType === 'bearer' && (
          <BearerTokenForm token={initValue.token} ref={bearerTokenFormRef} />
        )}
      </div>
    </div>
  );
};

export default forwardRef(FolderAuth);
