import { Box, Button, Flex, Modal, ModalProps, Text } from '@mantine/core';
import Image from 'next/image';

import { cySelectors } from '@/constants/cy-selectors';

// import { cySelectors } from '@/constants/cy-selectors';

interface RemoveItemModal extends ModalProps {
  dialogMessage: string | React.ReactNode;
  // TODO: better typing
  // cyId: keyof typeof cySelectors;
  cyId: string;
  onConfirmClick: VoidFunction;
  isLoading?: boolean;
}

export const RemoveItemModal: React.FC<RemoveItemModal> = ({
  opened,
  dialogMessage,
  cyId,
  onClose,
  onConfirmClick,
  isLoading,
}) => {
  return (
    <Modal
      opened={opened}
      size="md"
      data-cy={cyId}
      onClose={onClose}
      withCloseButton={false}
    >
      <Box p={8}>
        <Flex direction="column" align="center" justify="center" rowGap={40}>
          <Image
            src="/assets/icons/warning.svg"
            alt="warning icon"
            height={56.1}
            width={62.98}
          />
          {typeof dialogMessage === 'string' ? (
            <Text>{dialogMessage}</Text>
          ) : (
            dialogMessage
          )}
          <Flex justify="center" align="center" columnGap={20}>
            <Button
              bg="gray.1"
              size="lg"
              onClick={onClose}
              data-cy={cySelectors['modal-delete-cancel-button']}
            >
              <Text color="gray.4" size="md" weight="600">
                Batal
              </Text>
            </Button>
            <Button
              bg="red.2"
              size="lg"
              loading={isLoading}
              onClick={onConfirmClick}
              data-cy={cySelectors['modal-delete-confirm-button']}
            >
              <Text color="white" size="md" weight="600">
                Hapus
              </Text>
            </Button>
          </Flex>
        </Flex>
      </Box>
    </Modal>
  );
};
