import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { theme } from 'antd';
import { parse, stringify } from 'lossless-json';
import React, { useEffect, useRef } from 'react';
import { JSONEditor, ReadonlyValue } from 'vanilla-jsoneditor';

const LosslessJSONParser = { parse, stringify };

export type SvelteJSONEditorProps = {
  readOnly?: boolean;
  height?: string | number;
  remark?: string;
  allDiffByType?: any;
  content: { json?: object; text?: string };
  mainMenuBar?: boolean;
  onClassName?: (path: string[]) => string | undefined;
};

const EditorWaterMark = styled.div<{
  remark?: string;
}>`
  height: 100%;
  position: relative;
  :after {
    content: '${(props) => props.remark || ''}';
    position: absolute;
    bottom: 8px;
    right: 32px;
    font-size: 32px;
    font-weight: 600;
    font-style: italic;
    color: ${(props) => props.theme.colorTextQuaternary};
    z-index: 0;
  }
`;

export default function SvelteJSONEditor(props: SvelteJSONEditorProps) {
  const { allDiffByType } = props;
  const refContainer = useRef<any>(null);
  const refEditor = useRef<any>(null);
  const { token } = theme.useToken();

  useEffect(() => {
    refEditor.current = new JSONEditor({
      target: refContainer.current,
      props: {
        // @ts-ignore
        // disable build-in render component
        onRenderValue: (props) => [{ component: ReadonlyValue, props }],
        // parse bigInt
        // @ts-ignore
        parser: LosslessJSONParser,
        navigationBar: false,
      },
    });

    return () => {
      if (refEditor.current) {
        refEditor.current.destroy();
        refEditor.current = null;
      }
    };
  }, []);

  // update props
  useEffect(() => {
    if (refEditor.current) {
      refEditor.current.updateProps(props);
      setTimeout(() => {
        if (allDiffByType.more.length > 0) {
          refEditor.current.scrollTo(allDiffByType.more[0]);
        } else if (allDiffByType.diff.length > 0) {
          refEditor.current.scrollTo(allDiffByType.diff[0]);
        }
      }, 100);
    }
  }, [props]);

  return (
    <EditorWaterMark remark={props.remark}>
      <div
        css={css`
          height: ${props.height};
          .jse-value,
          .jse-key {
            color: ${token.colorText} !important;
          }
        `}
        ref={refContainer}
      />
    </EditorWaterMark>
  );
}
