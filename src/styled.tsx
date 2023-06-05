import styled from '@emotion/styled';

export const HeaderWrapper = styled.div`
  .app-header {
    height: 48px;
    padding: 7px;
    display: flex;
    justify-content: space-between;

    .left,
    .right {
      display: flex;
      align-items: center;
    }
    .app-name {
      width: 90px;
      text-align: center;
      font-weight: 600;
      display: inline-block;
      border-radius: 0.25rem;
      font-size: 14px;
      cursor: default;
    }
  }
`;

export const TeamsInviteTy = styled.div`
  border: 0.5px solid ${({ theme }) => theme.colorBorderSecondary};
  box-sizing: border-box;
  flex: 1;
`;
