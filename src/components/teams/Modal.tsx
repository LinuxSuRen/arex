import { Button, Modal } from 'antd';
import { FC } from 'react';

interface TeamsModalProps {
  show: boolean;
  onHideModal: () => void;
}
const TeamsModal: FC<TeamsModalProps> = ({ show, onHideModal }) => {
  return (
    <Modal title={'nihao'} open={show}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <Button onClick={onHideModal}>关闭</Button>
    </Modal>
  );
};

export default TeamsModal;
