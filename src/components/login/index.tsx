import { Button, Input, message, Alert } from "antd";
import { UserOutlined, LockOutlined, DownOutlined } from "@ant-design/icons";
import React, {FC, useContext, useEffect, useMemo, useState} from "react";
import "./index.less";
import { LoginService } from "../../services/LoginService";
import {GlobalContext} from "../../App";
import {WorkspaceService} from "../../services/WorkspaceService";

let timeChange: any;
const Login = () => {
  const value = useContext(GlobalContext)
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [emailchecked, setEmailchecked] = useState<boolean>(true);
  const [loadings, setLoadings] = useState<boolean>(false);
  const [count, setCount] = useState<number>(60);
  const getEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (
      value.match(
        /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
      )
    ) {
      setEmailchecked(true);
    } else {
      setEmailchecked(false);
    }
    setEmail(value);
  };

  const getVerificationCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setVerificationCode(value);
  };

  const sendVerificationCode = () => {
    if (!emailchecked || email == "") {
      message.error("邮箱错误");
      return;
    }
    setLoadings(true);
    timeChange = setInterval(() => {
      setCount((t: number) => --t);
    }, 1000);
    LoginService.sendVerifyCodeByEmail(email).then((res) => {
      if (res.data.body.success == true) {
        message.success("验证码获取成功");
      } else {
        message.error("验证码获取失败");
      }
    });
  };
  // 用户进入前初始化
  const initBeforeUserEntry = (userName)=>{
    WorkspaceService.listWorkspace({
      userName:userName
    }).then(workspaces=>{
      if (workspaces.length ===0){
        const params = {
          userName: userName,
          workspaceName:"Default"
        }
        WorkspaceService.createWorkspace(params).then(res=>{
          localStorage.setItem("email", email);
          value.dispatch({ type: "login",payload:email })
        })
      } else {
        localStorage.setItem("email", email);
        value.dispatch({ type: "login",payload:email })
      }
    })
  }

  const login = () => {

    if (!emailchecked || email == "") {
      message.error("请检查邮箱");
      return;
    } else if (verificationCode == "") {
      message.error("请填写验证码");
      return;
    }

    LoginService.loginVerify({
      email: email,
      verificationCode: verificationCode,
    }).then((res) => {
      if (res.data.body.success == true) {
        message.success("登录成功");
        initBeforeUserEntry(email)
      } else {
        message.error("登录失败");
      }
    });
  };
  useEffect(() => {
    if (count >= 0 && count < 60) {
    } else {
      clearInterval(timeChange);
      setCount(60);
      setLoadings(false);
    }
  }, [count]);

  return (
    <div className={"login-layout"}>
      {
        window.__AREX_EXTENSION_INSTALLED__?null:<Alert message={
          <div>注意：Chrome插件可突破浏览器跨域限制，请先安装
            <a href="https://chrome.google.com/webstore/detail/arex-chrome-extension/jmmficadjneeekafmnheppeoehlgjdjj" target={'_blank'}>Chrome插件</a>
            后再运行。</div>
        }/>
      }
      <div className={"login"}>
        <div className={"login-title"}>AREX</div>
        <Input
          size="large"
          placeholder="请输入邮箱号！"
          prefix={<UserOutlined />}
          onChange={getEmail}
          status={emailchecked ? "" : "error"}
          allowClear
        />
        {emailchecked ? <div className={"login-email-tip"}></div> : (
          <div className={"login-email-tip"}>请输入正确的邮箱号!</div>
        )}
        <div className={"login-verificationCode"}>
          <Input
            size="large"
            placeholder="请输入验证码！"
            prefix={<LockOutlined />}
            onChange={getVerificationCode}
          />
          <Button
            size="large"
            onClick={sendVerificationCode}
            disabled={loadings}
          >
            {loadings ? count + "s" : ""}获取验证码
          </Button>
        </div>
        <Button type="primary" block size="large" onClick={login}>登录</Button>
      </div>
    </div>
  );
};

export default Login;
