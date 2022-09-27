import { CloseOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { useMount } from 'ahooks';
import JSONEditor, { JSONEditorOptions } from 'jsoneditor';
import { FC, useEffect, useRef } from 'react';

import { QueryMsgWithDiffLog } from '../../services/Replay.type';
import { tryParseJsonString } from '../../utils';

export type DiffJsonViewProps = {
  data?: {
    baseMsg: string;
    testMsg: string;
    logs: QueryMsgWithDiffLog[];
  };
  visible: boolean;
  onClose: () => void;
};
const DiffJsonView: FC<DiffJsonViewProps> = ({ data, visible = false, onClose }) => {
  useMount(() => {
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        onClose();
      }
    });
  });

  const containerLeftRef = useRef<HTMLDivElement>(null);
  const containerRightRef = useRef<HTMLDivElement>(null);

  const msgWithDiff = data;

  useEffect(() => {
    const containerLeft = containerLeftRef.current;
    const containerRight = containerRightRef.current;
    if (msgWithDiff && containerLeft && containerRight) {
      setTimeout(() => {
        containerLeft.innerHTML = '';
        containerRight.innerHTML = '';
        function genAllDiffByType(logs: QueryMsgWithDiffLog[]) {
          const allDiff = {
            diff012: [],
            diff3: [],
            diff012Ig: [],
            diff3Ig: [],
          };
          for (let j = 0; j < logs.length; j++) {
            const leftArr = [];
            for (let i = 0; i < logs[j].pathPair.leftUnmatchedPath.length; i++) {
              leftArr.push(
                logs[j].pathPair.leftUnmatchedPath[i].nodeName
                  ? logs[j].pathPair.leftUnmatchedPath[i].nodeName
                  : logs[j].pathPair.leftUnmatchedPath[i].index,
              );
            }
            const rightArr = [];
            for (let i = 0; i < logs[j].pathPair.rightUnmatchedPath.length; i++) {
              rightArr.push(
                logs[j].pathPair.rightUnmatchedPath[i].nodeName
                  ? logs[j].pathPair.rightUnmatchedPath[i].nodeName
                  : logs[j].pathPair.rightUnmatchedPath[i].index,
              );
            }
            const unmatchedTypes = [0, 1, 2];
            if (logs[j].logTag.ig) {
              if (unmatchedTypes.includes(logs[j].pathPair.unmatchedType)) {
                allDiff.diff012Ig.push(leftArr.length > rightArr.length ? leftArr : rightArr);
              } else {
                allDiff.diff3Ig.push(leftArr);
                allDiff.diff3Ig.push(rightArr);
              }
            } else {
              if (unmatchedTypes.includes(logs[j].pathPair.unmatchedType)) {
                allDiff.diff012.push(leftArr.length > rightArr.length ? leftArr : rightArr);
              } else {
                allDiff.diff3.push(leftArr);
                allDiff.diff3.push(rightArr);
              }
            }
          }
          return allDiff;
        }
        const allDiffByType = genAllDiffByType(msgWithDiff.logs);
        function onClassName({ path }) {
          // 只能返回一种ClassName
          if (
            allDiffByType.diff012.map((item) => JSON.stringify(item)).includes(JSON.stringify(path))
          ) {
            return 'different_element_012';
          }
          if (
            allDiffByType.diff3.map((item) => JSON.stringify(item)).includes(JSON.stringify(path))
          ) {
            return 'different_element';
          }
        }
        const optionsLeft: JSONEditorOptions = {
          mode: 'view',
          theme: 'twitlighjt',
          onClassName: onClassName,
          onChangeJSON: function (j) {
            jsonLeft = j;
            window.editorRight.refresh();
          },
        };
        const optionsRight: JSONEditorOptions = {
          mode: 'view',
          onClassName: onClassName,
          onChangeJSON: function (j) {
            jsonRight = j;
            window.editorLeft.refresh();
          },
        };

        let jsonLeft = tryParseJsonString(msgWithDiff?.baseMsg);
        let jsonRight = tryParseJsonString(msgWithDiff?.testMsg);
        // TODO 将 JSONEditor 挂载到 window 上是否必要
        window.editorLeft = new JSONEditor(containerLeft, optionsLeft, jsonLeft);
        window.editorRight = new JSONEditor(containerRight, optionsRight, jsonRight);
        window.editorLeft.expandAll();
        window.editorRight.expandAll();
      }, 200);
    }
  }, [msgWithDiff]);

  return (
    <div
      className={'json-diff'}
      css={css`
        position: fixed;
        display: ${visible ? 'block' : 'none'};
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
      `}
    >
      <div
        css={css`
          margin: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        `}
      >
        <span>Press &quot;esc&quot; to exit</span>
        <CloseOutlined onClick={() => onClose()}>关闭</CloseOutlined>
      </div>

      <div
        css={css`
          display: flex;
          justify-content: space-between;
        `}
      >
        <div className='MsgWithDiffLegend'>
          <div>
            <div className='color-tag-green'></div>
            <span>One more node than</span>
          </div>
          <div>
            <div className='color-tag-pink'></div>
            <span>Difference node</span>
          </div>
          <div>
            <div className='color-tag-grey'></div>
            <span>Ignore node</span>
          </div>
        </div>
      </div>

      <div id='MsgWithDiffJsonEditorWrapper' style={{ height: '90vh' }}>
        <div ref={containerLeftRef} id='containerLeft'></div>
        <div ref={containerRightRef} id='containerRight'></div>
      </div>
    </div>
  );
};

export default DiffJsonView;
