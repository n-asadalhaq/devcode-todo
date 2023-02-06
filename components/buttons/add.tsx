import { Button } from '@mantine/core';
import Image from 'next/image';

const AddButton: React.FC<{
  onClick: VoidFunction;
  cyId?: string;
  alt: string;
}> = ({ cyId, onClick, alt }) => {
  return (
    <Button
      size="lg"
      aria-label="tambah"
      data-cy={cyId}
      onClick={onClick}
      leftIcon={
        <Image src="/assets/icons/add.svg" width={14} height={14} alt={alt} />
      }
    >
      Tambah
    </Button>
  );
};

export { AddButton };
