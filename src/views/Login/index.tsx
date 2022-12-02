import { LockOutlined, UserOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { useRequest } from 'ahooks';
import { Button, Card, Input, message, Space, Typography } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FlexCenterWrapper, Label } from '../../components/styledComponents';
import { AccessTokenKey, EmailKey, RefreshTokenKey } from '../../constant';
import { setLocalStorage } from '../../helpers/utils';
import { AuthService } from '../../services/Auth.service';
import { UserService } from '../../services/User.service';
import WorkspaceService from '../../services/Workspace.service';

const Logo = styled(Typography.Text)`
  height: 64px;
  display: block;
  font-size: 36px;
  font-weight: 600;
  text-align: center;
`;

let timer: NodeJS.Timer;

const Login: FC = () => {
  const nav = useNavigate();

  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [verify, setVerify] = useState(false);
  const [emailChecked, setEmailChecked] = useState<boolean>(true);
  const [count, setCount] = useState<number>(0);

  const getEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerify(false);
    const { value } = e.target;
    if (value.match(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/)) {
      setEmailChecked(true);
    } else {
      setEmailChecked(false);
    }
    setEmail(value);
  };

  const getVerificationCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setVerificationCode(value);
  };

  const { run: sendVerifyCode } = useRequest(AuthService.sendVerifyCodeByEmail, {
    manual: true,
    onBefore() {
      setCount(60);
    },
    onSuccess(res) {
      res.data.body.success
        ? message.success('The verification code has been sent to the email.')
        : message.error('Authentication failed.');
    },
    onError() {
      message.error('Authentication failed.');
    },
  });

  const sendVerificationCode = () => {
    setVerify(true);

    if (!emailChecked || !email) {
      return message.error('email error');
    }

    timer = setInterval(() => {
      setCount((t: number) => --t);
    }, 1000);

    sendVerifyCode(email);
  };

  // 用户进入前初始化
  const { run: listWorkspace } = useRequest(WorkspaceService.listWorkspace, {
    manual: true,
    onBefore(params) {
      setLocalStorage(EmailKey, params[0].userName);
    },
    onSuccess(res, [{ userName }]) {
      res.length
        ? nav('/')
        : createWorkspace({
            userName,
            workspaceName: 'Default',
          });
    },
  });

  const { run: createWorkspace } = useRequest(WorkspaceService.createWorkspace, {
    manual: true,
    onFinally() {
      nav('/');
    },
  });

  const { run: loginAsGuest } = useRequest(UserService.loginAsGuest, {
    manual: true,
    onSuccess(res) {
      setLocalStorage(EmailKey, res.userName);
      setLocalStorage(AccessTokenKey, res.accessToken);
      setLocalStorage(RefreshTokenKey, res.refreshToken);
      listWorkspace({ userName: res.userName });
    },
  });

  const { run: loginVerify } = useRequest(AuthService.loginVerify, {
    manual: true,
    onSuccess(res) {
      if (res.data.body.success) {
        setLocalStorage(AccessTokenKey, res.data.body.accessToken);
        setLocalStorage(RefreshTokenKey, res.data.body.refreshToken);
        message.success('Login succeeded');
        listWorkspace({ userName: email });
      } else {
        message.error('Verification code error');
      }
    },
  });

  const handleLogin = () => {
    setVerify(true);
    if (!emailChecked || email == '') {
      message.error('Please check your email');
      return;
    } else if (verificationCode == '') {
      message.error('Please fill in the verification code');
      return;
    }

    loginVerify({
      userName: email,
      verificationCode,
    });
  };

  useEffect(() => {
    !count && clearInterval(timer);
  }, [count]);

  return (
    <FlexCenterWrapper>
      <Card style={{ marginBottom: '20%' }}>
        <Space size={26} direction='vertical'>
          <Logo>AREX</Logo>

          {/* TODO 使用 Form 组件做数据校验以及表单提交 */}
          <div style={{ position: 'relative' }}>
            <Input
              size='large'
              placeholder='Please enter your email！'
              prefix={<UserOutlined />}
              onChange={getEmail}
              status={!emailChecked && verify ? 'error' : undefined}
              allowClear
            />

            <Typography.Text
              type='danger'
              style={{ position: 'absolute', left: 0, bottom: '-24px' }}
            >
              {!emailChecked && verify && 'Please enter the correct email!'}
            </Typography.Text>
          </div>

          <Space>
            <Input
              size='large'
              placeholder='Please enter a verification code！'
              prefix={<LockOutlined />}
              onChange={getVerificationCode}
            />
            <Button
              size='large'
              disabled={!!count}
              onClick={sendVerificationCode}
              style={{ width: '120px' }}
            >
              {count ? count + 's' : 'Send code'}
            </Button>
          </Space>

          <Button block size='large' type='primary' onClick={handleLogin}>
            Login
          </Button>

          <span>
            <Label>Login with</Label>
            <Button type='link' onClick={loginAsGuest} style={{ paddingLeft: 0 }}>
              Guest
            </Button>
          </span>
        </Space>
      </Card>
    </FlexCenterWrapper>
  );
};

export default Login;
