import { useMutation } from '@apollo/client';
import { Form, Input, Modal } from 'antd';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { RenameTeamDocument } from '../../helpers/backend/gen/graphql.ts';
interface TeamsEditProps {
  show: boolean;
  editingTeam: { name: string };
  editingTeamID: string;
  onHideModal: () => void;
  onInviteTeam: () => void;
}
const TeamsEdit: FC<TeamsEditProps> = ({ show,onHideModal }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const pam = useParams();
  const [rename, { data }] = useMutation(RenameTeamDocument);
  function saveTeam() {
    console.log(form.getFieldsValue());
    rename({
      variables: {
        newName: form.getFieldsValue().name,
        teamID: pam.workspaceId,
      },
    });
    onHideModal()
  }
  return (
    <Modal
      open={show}
      title={t('team.edit')}
      onOk={() => {
        saveTeam();
      }}
    >
      <Form form={form} layout={'vertical'}>
        <Form.Item name="name" label="标签">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TeamsEdit;
