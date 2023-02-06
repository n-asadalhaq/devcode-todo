import { UnstyledButton } from '@mantine/core';
import Image from 'next/image';

const RemoveButton: React.FC<{
  onClick: VoidFunction;
  cyId?: string;
  alt: string;
}> = ({ cyId, onClick, alt }) => {
  return (
    <UnstyledButton onClick={onClick} data-cy={cyId}>
      <Image src="/assets/icons/trash.svg" width={24} height={24} alt={alt} />
    </UnstyledButton>
  );
};

export { RemoveButton };
