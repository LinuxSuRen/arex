import {
  DeleteOutlined,
  QuestionCircleOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/react';
import {
  Button,
  Card,
  Input,
  Modal,
  Select,
  Space,
  Tag,
  theme,
  Typography,
} from 'antd';
import { FC } from 'react';
const { useToken } = theme;
import { useTranslation } from 'react-i18next';

import { TeamsInviteTy } from '../../styled.tsx';
const { Text } = Typography;
interface TeamsInviteProps {
  show: boolean;
  editingTeamID: string;
  onHideModal: () => void;
}
const TeamsInvite: FC<TeamsInviteProps> = ({
  show,
  editingTeamID,
  onHideModal,
}) => {
  const { token, theme } = useToken();
  const { t } = useTranslation();
  return (
    <Modal
      open={show}
      title={t('team.invite')}
      okText={t('team.invite')}
      onOk={() => {
        onHideModal();
      }}
    >
      <Space
        direction={'vertical'}
        css={css`
          width: 100%;
        `}
      >
        <Text
          css={css`
            padding-left: 10px;
          `}
          type={'secondary'}
        >
          {t('team.pending_invites')}
        </Text>

        <Card
          size={'small'}
          css={css`
            text-align: center;
            margin-bottom: 20px;
          `}
        >
          <Text type={'secondary'}>{t('empty.pending_invites')}</Text>
        </Card>

        <div
          css={css`
            display: flex;
            justify-content: space-between;
            padding-left: 10px;
          `}
        >
          <Text type={'secondary'}>{t('team.invite_tooltip')}</Text>
          <Button icon={<UsergroupAddOutlined />}>{t('team.invite')}</Button>
        </div>

        <div>
          <div
            css={css`
              display: flex;
              border: 0.5px solid ${token.colorBorderSecondary};
              margin-bottom: 10px;
              border-radius: ${token.borderRadius}px;
              overflow: hidden;
            `}
          >
            <TeamsInviteTy
              css={css`
                flex: 3;
              `}
            >
              <Input bordered={false} placeholder={t('team.email') || ''} />
            </TeamsInviteTy>

            <TeamsInviteTy
              css={css`
                flex: 2;
              `}
            >
              <Select
                css={css`
                  width: 100%;
                `}
                bordered={false}
                value={'Editor'}
                options={[{ label: 'Editor', value: 'Editor' }]}
              />
            </TeamsInviteTy>

            <TeamsInviteTy
              css={css`
                flex: 0;
                display: flex;
                align-items: center;
                padding: 0 10px;
              `}
            >
              <DeleteOutlined
                css={css`
                  color: red;
                `}
              />
            </TeamsInviteTy>
          </div>
        </div>
      </Space>

      <Card size={'small'}>
        <Tag
          bordered={false}
          css={css`
            font-size: 14px;
            padding: 3px 8px;
            margin-bottom: 10px;
          `}
        >
          <Text type={'secondary'}>
            <QuestionCircleOutlined
              css={css`
                margin-right: 5px;
              `}
            />
            Roles
          </Text>
        </Tag>

        <Text
          css={css`
            display: inline-block;
            margin-bottom: 10px;
          `}
          type={'secondary'}
        >
          Roles are used to control access to the shared collections.
        </Text>

        <div
          css={css`
            margin-bottom: 10px;
          `}
        >
          <Space
            align="start"
            css={css`
              margin-bottom: 10px;
            `}
          >
            <span>OWNER</span>
            <Text type={'secondary'}>
              Owners can add, edit, and delete requests, collections and team
              members.
            </Text>
          </Space>

          <Space align="start">
            <span>OWNER</span>
            <Text type={'secondary'}>
              Editors can add, edit, and delete requests.
            </Text>
          </Space>
        </div>
      </Card>
    </Modal>
  );
};

export default TeamsInvite;
