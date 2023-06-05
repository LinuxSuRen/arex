import { css } from '@emotion/react';

import ChooseRunType from './ChooseRunType';
import FolderTreeSelect from './FolderTreeSelect';

const RunCreatePane = () => {
  function onClickRunChooseRunType(runType: string) {
    console.log(runType);
    // bat({}).then(r=>)
  }
  return (
    <div
      css={css`
        height: calc(100vh - 140px);
      `}
    >
      <div style={{ display: 'flex', height: '100%' }}>
        <FolderTreeSelect name={''} />
        <ChooseRunType onClickRun={onClickRunChooseRunType} name={''} />
      </div>
    </div>
  );
};

export default RunCreatePane;
