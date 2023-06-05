import { Form, Input } from 'antd';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

interface BasicAuthForm {
  username: string;
  password: string;
}
const AuthBasicAuthForm = (props: any, ref: any) => {
  useImperativeHandle(ref, () => ({
    getFormData: () => {
      return basicAuthForm;
    }, // 暴露组件内部数据teams给父组件
  }));

  const [basicAuthForm, setBasicAuthForm] = useState<BasicAuthForm>({
    username: '',
    password: '',
  });
  useEffect(() => {
    setBasicAuthForm({ username: props.username, password: props.password });
  }, []);
  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        autoComplete="off"
        labelAlign="left"
      >
        <Form.Item label="Username">
          <Input
            value={basicAuthForm.username}
            onChange={(val) => {
              setBasicAuthForm({
                ...basicAuthForm,
                username: val.target.value,
              });
            }}
          />
        </Form.Item>

        <Form.Item label="Password">
          <Input.Password
            value={basicAuthForm.password}
            onChange={(val) => {
              setBasicAuthForm({
                ...basicAuthForm,
                password: val.target.value,
              });
            }}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default forwardRef(AuthBasicAuthForm);
