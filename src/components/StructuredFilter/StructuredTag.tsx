import { CloseCircleOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { useHover } from 'ahooks';
import { Button, Space, Typography } from 'antd';
import { DefaultOptionType } from 'rc-select/lib/Select';
import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

export type StructuredTagProps = {
  onDelete?: (key?: string) => void;
} & DefaultOptionType;

const StructuredTagWrapper = styled.div`
  .structure-tag-hidden {
    opacity: 0;
  }
  .my-node-enter {
    opacity: 0;
  }
  .my-node-enter-active {
    opacity: 1;
    transition: opacity 200ms;
  }
  .my-node-exit {
    opacity: 1;
  }
  .my-node-exit-active {
    opacity: 0;
    transition: opacity 200ms;
  }
`;

const StructuredTag = (props: StructuredTagProps) => {
  const categoryButtonRef = useRef<HTMLDivElement>(null);
  const closeIconRef = useRef<HTMLDivElement>(null);
  const categoryNodeRef = useRef(null);

  const hoverCategoryButton = useHover(categoryButtonRef);

  return (
    <StructuredTagWrapper>
      <Space.Compact block size='small' style={{ margin: '4px' }}>
        <Button
          size='small'
          ref={categoryButtonRef}
          onClick={() => props.onDelete?.(props.value?.toString())}
        >
          <CSSTransition
            nodeRef={categoryNodeRef}
            in={!hoverCategoryButton}
            timeout={2000}
            classNames='my-node'
          >
            <Typography ref={categoryNodeRef}>
              {JSON.parse(props.value as string)?.category}
            </Typography>
          </CSSTransition>

          <CSSTransition
            nodeRef={closeIconRef}
            in={hoverCategoryButton}
            timeout={2000}
            classNames='my-node'
          >
            <CloseCircleOutlined
              ref={closeIconRef}
              className='structure-tag-hidden'
              style={{
                position: 'absolute',
                left: '50%',
                top: ' 50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          </CSSTransition>
        </Button>
        <Button size='small'>{JSON.parse(props.value as string)?.operator}</Button>
        <Button size='small'>{JSON.parse(props.value as string)?.value}</Button>
      </Space.Compact>
    </StructuredTagWrapper>
  );
};

export default StructuredTag;
