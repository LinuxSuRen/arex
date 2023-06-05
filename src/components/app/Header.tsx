import { DownOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import { Avatar, Button, Divider, Dropdown, Space, theme } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  GetMyTeamsDocument,
  GetUserSettingsDocument,
} from '../../helpers/backend/gen/graphql.ts';
import { tryJSONparse } from '../../helpers/utils.ts';
import useDarkMode from '../../hooks/use-dark-mode';
import useSettings from '../../store/useSettings.ts';
import { HeaderWrapper } from '../../styled.tsx';
import TeamsEdit from '../teams/Edit.tsx';
import TeamsInvite from '../teams/Invite.tsx';
import GitHubStarButton from './GitHubStarButton';
import Settings from './settings';

const { useToken } = theme;

const AppHeader = () => {
  const nav = useNavigate();
  const pam = useParams();
  const darkMode = useDarkMode();
  const { data } = useQuery(GetMyTeamsDocument);
  const { data: iData } = useQuery(GetUserSettingsDocument);
  const { applySetting } = useSettings();
  useEffect(() => {
    const obj = tryJSONparse(iData?.me.settings.properties);
    if (Object.keys(obj).length === 0) {
      console.log('obj是空对象');
    } else {
      console.log(obj);
      applySetting(obj);
    }
  }, [iData]);

  // app设置数据加载

  // app设置数据加载

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/welcome';
  };
  const { token } = useToken();
  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  const menuStyle = {
    boxShadow: 'none',
  };

  // hop状态
  const [showTeamsModal, setShowTeamsModal] = useState(false);
  const [showModalInvite, setShowModalInvite] = useState(false);
  const [editingTeamID, setEditingTeamID] = useState('');
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [editingTeamName, setEditingTeamName] = useState({ name: '' });
  // 函数
  function displayModalInvite(show: boolean) {
    setShowModalInvite(show);
  }
  function displayModalEdit(show: boolean) {
    setShowModalEdit(show);
  }
  const inviteTeam = (team: { name: string }, teamID: string) => {
    // editingTeamName.value = team
    // editingTeamID.value = teamID
    setEditingTeamName(team);
    setEditingTeamID(teamID);
    displayModalInvite(true);
  };
  // 这边要从状态里取
  const workspace = {
    teamID: 'asfsaf',
  };
  const handleTeamEdit = () => {
    // editingTeamID.value = workspace.value.teamID
    setEditingTeamID(workspace.teamID);
    setEditingTeamName({ name: '??' });
    // editingTeamName.value = { name: selectedTeam.value.name }
    displayModalEdit(true);
  };

  return (
    <div>
      <HeaderWrapper>
        <div className={'app-header'}>
          <div className={'left'}>
            <span className={'app-name'}>AREX</span>
            <GitHubStarButton theme={darkMode.value ? 'dark' : 'light'} />
          </div>
          <Space className={'right'}>
            <Button
              onClick={() => {
                inviteTeam({ name: 'sss' }, '123');
              }}
            >
              邀请
            </Button>

            <Button
              onClick={() => {
                handleTeamEdit();
              }}
            >
              编辑
            </Button>
            <Settings />
            <Dropdown
              trigger={['click']}
              menu={{
                defaultSelectedKeys: [pam.workspaceId],
                onClick({ key }) {
                  window.location.href = `/${key}/workspace/nihao/request/reqid`;
                },
                items: (data?.myTeams || []).map((i) => {
                  return {
                    label: i.name,
                    key: i.id,
                  };
                }),
              }}
              dropdownRender={(menu) => (
                <div style={contentStyle}>
                  {React.cloneElement(menu as React.ReactElement, {
                    style: menuStyle,
                  })}
                  <Divider style={{ margin: 0 }} />
                  <Space style={{ padding: 8 }}>
                    <Button type="primary">Create</Button>
                  </Space>
                </div>
              )}
            >
              <Button
                icon={<UsergroupAddOutlined />}
                onClick={(e) => e.preventDefault()}
              >
                <Space>
                  {(data?.myTeams || []).map((i) => {
                    return {
                      label: i.name,
                      key: i.id,
                    };
                  }).find(i=>i.key === pam.workspaceId)?.label}
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>

            <Dropdown
              menu={{
                items: [
                  {
                    key: 'signOut',
                    label: 'Sign Out',
                  },
                ],
                onClick: (e) => {
                  if (e.key === 'signOut') {
                    handleLogout();
                  }
                },
              }}
            >
              <Avatar
                size={20}
                style={{ marginLeft: '8px', cursor: 'pointer' }}
              ></Avatar>
            </Dropdown>
          </Space>
        </div>

        <Divider style={{ margin: '0' }} />
      </HeaderWrapper>

      {/*仿照hop的结构*/}
      {/*这个在个人模式才生效，不需要*/}
      {/*<TeamsModal*/}
      {/*  show={showTeamsModal}*/}
      {/*  onHideModal={() => {*/}
      {/*    setShowTeamsModal(false);*/}
      {/*  }}*/}
      {/*/>*/}
      <TeamsInvite
        show={showModalInvite}
        editingTeamID={editingTeamID}
        onHideModal={() => {
          displayModalInvite(false);
        }}
      />
      <TeamsEdit
        show={showModalEdit}
        editingTeam={editingTeamName}
        editingTeamID={editingTeamID}
        onHideModal={() => {
          displayModalEdit(false);
        }}
        onInviteTeam={() => {
          inviteTeam(editingTeamName, editingTeamID);
        }}
      />
    </div>
  );
};

export default AppHeader;
