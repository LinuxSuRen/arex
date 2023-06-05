import { Form, Input } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';

const AuthBearerTokenForm = (props: any, ref: any) => {
  useImperativeHandle(ref, () => ({
    getFormData: () => {
      return { token: token };
    }, // 暴露组件内部数据teams给父组件
  }));
  const [token, setToken] = useState<string>(props.token);
  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        labelAlign="left"
      >
        <Form.Item label="Token">
          <Input
            value={token}
            onChange={(val) => {
              setToken(val.target.value);
            }}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default forwardRef(AuthBearerTokenForm);
