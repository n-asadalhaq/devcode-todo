import { Flex, Modal, ModalProps, Text } from '@mantine/core';
import Image from 'next/image';

import { cySelectors } from '@/constants/cy-selectors';
import { NewTodo, Todo } from '@/types/index';

// import { cySelectors } from '@/constants/cy-selectors';

interface NotificationModal extends ModalProps {
  initialTodo?: Todo | null;
  onConfirmClick: (newTodo: NewTodo) => void;
  isLoading?: boolean;
}

const NotificationModal: React.FC<NotificationModal> = ({
  opened,
  onClose,
}) => {
  return (
    <Modal
      opened={opened}
      size="md"
      radius="lg"
      onClose={onClose}
      withCloseButton={false}
      data-cy={cySelectors['modal-information']}
      centered={true}
      padding={0}
    >
      <Flex direction="row" align="center" px="lg" py="lg" columnGap={8}>
        <Image
          src="/assets/icons/success-notif.svg"
          width={24}
          height={24}
          alt="success icon"
          data-cy={cySelectors['modal-information-icon']}
        />
        <Text
          size="md"
          color="gray.3"
          data-cy={cySelectors['modal-information-title']}
        >
          Activity berhasil dihapus
        </Text>
      </Flex>
    </Modal>
  );
};

export { NotificationModal };
