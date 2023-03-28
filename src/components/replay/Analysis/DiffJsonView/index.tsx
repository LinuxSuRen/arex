import './../DiffJsonView.css';

import { css, useTheme } from '@emotion/react';
import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { QueryMsgWithDiffRes } from '../../../../services/Replay.type';
import useUserProfile from '../../../../store/useUserProfile';
import DiffJsonViewTooltip from './DiffJsonViewTooltip';
import { genAllDiffByType } from './helper';
import VanillaJSONEditor from './VanillaJSONEditor';

export type DiffJsonViewProps = {
  height?: string | number;
  hiddenTooltip?: boolean;
  data?: Pick<QueryMsgWithDiffRes, 'baseMsg' | 'testMsg' | 'logs'>;
};

const DiffJsonView: FC<DiffJsonViewProps> = ({ data, hiddenTooltip, height }) => {
  const { theme } = useUserProfile();

  const baseMsg = useMemo(() => {
    const msg = {
      json: data?.baseMsg,
      text: undefined,
    };
    try {
      msg.json = JSON.parse(data?.baseMsg as string);
    } catch (e) {
      console.error(e);
    }
    return msg;
  }, [data]);

  const testMsg = useMemo(() => {
    const msg = {
      json: data?.testMsg,
      text: undefined,
    };
    try {
      msg.json = JSON.parse(data?.testMsg as string);
    } catch (e) {
      console.error(e);
    }
    return msg;
  }, [data]);

  const allDiffByType = genAllDiffByType(data?.logs);

  const onClassName = (path: string[]) => {
    const pathStr = path.map((p) => (isNaN(Number(p)) ? p : Number(p)));
    if (
      allDiffByType.diff012
        .map((item: any) => JSON.stringify(item))
        .includes(JSON.stringify(pathStr))
    ) {
      return 'different_element_012';
    }
    if (
      allDiffByType.diff3.map((item: any) => JSON.stringify(item)).includes(JSON.stringify(pathStr))
    ) {
      return 'different_element';
    }
  };
  const emotionTheme = useTheme();
  if (!data) {
    return <div></div>;
  }

  return (
    <>
      {!hiddenTooltip && <DiffJsonViewTooltip />}
      <div
        css={css`
          display: flex;
          height: ${height};
          width: 100%;
          #containerRight .different_element {
            background-color: ${emotionTheme.colorInfoBgHover};
          }
          #containerLeft .different_element {
            background-color: ${emotionTheme.colorInfoBgHover};
          }
          #containerRight .different_element_012 {
            background-color: ${emotionTheme.colorWarningBgHover};
          }
          #containerLeft .different_element_012 {
            background-color: ${emotionTheme.colorWarningBgHover};
          }
        `}
        id={'MsgWithDiffJsonEditorWrapper'}
        className={`${theme === 'dark' ? 'jse-theme-dark' : ''}`}
      >
        <div
          css={css`
            flex: 1;
          `}
          id={'containerLeft'}
        >
          <VanillaJSONEditor
            css={css`
              flex: 1;
            `}
            height={height}
            content={baseMsg}
            readOnly
            mainMenuBar={false}
            onClassName={onClassName}
            allDiffByType={allDiffByType}
          />
        </div>

        <div
          css={css`
            flex: 1;
          `}
          id={'containerRight'}
        >
          <VanillaJSONEditor
            css={css`
              flex: 1;
            `}
            height={height}
            content={testMsg}
            readOnly
            mainMenuBar={false}
            onClassName={onClassName}
            allDiffByType={allDiffByType}
          />
        </div>
      </div>
    </>
  );
};

export default DiffJsonView;