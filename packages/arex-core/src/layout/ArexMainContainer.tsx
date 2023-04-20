import { css } from '@emotion/react';
import { Allotment } from 'allotment';
import React, { FC, ReactNode } from 'react';

export interface ArexMainContainerProps {
  collapsed?: boolean;
  menus: ReactNode;
  panes: ReactNode;
}

const ArexMainContainer: FC<ArexMainContainerProps> = (props) => {
  return (
    <Allotment
      css={css`
        height: calc(100vh - 73px);
      `}
    >
      <Allotment.Pane
        preferredSize={400}
        minSize={props.collapsed ? 69 : 300}
        maxSize={props.collapsed ? 69 : 600}
      >
        {props.menus}
      </Allotment.Pane>

      <Allotment.Pane visible>{props.panes}</Allotment.Pane>
    </Allotment>
  );
};

export default ArexMainContainer;