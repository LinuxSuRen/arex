import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Button, Empty, Space, Tag } from "antd";
import React, { FC } from "react";

import { ApplicationDataType } from "../../api/FileSystem.type";
import Results from "./Results";

const SubTitle = styled.div`
  height: 22px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .app-name {
    margin: 0 auto 0 0;
  }
  & > *:not(.app-name) {
    margin-left: 16px;
  }
`;

const Replay: FC<{ curApp?: ApplicationDataType }> = ({ curApp }) => {
  return (
    <>
      {curApp ? (
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
          <SubTitle>
            <h1 className="app-name">{`${curApp.appId}_${curApp.appName}`}</h1>
            <span>
              <label>Access CI: </label>
              <Tag
                css={css`
                  height: 18px;
                  line-height: 18px;
                  border-radius: 8px;
                `}
              >
                {(curApp.features & 1) === 1 ? "ON" : "OFF"}
              </Tag>
            </span>
            <span>
              <label>Case Count: </label>
              <span>{curApp.recordedCaseCount}</span>
            </span>
            <Button size="small">Start replay</Button>
            <Button size="small">Latest report</Button>
          </SubTitle>
          <Results appId={curApp.appId} />
        </Space>
      ) : (
        <div
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Empty description={"Please select an application"} />
        </div>
      )}
    </>
  );
};

export default Replay;
