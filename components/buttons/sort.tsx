import { Flex, Text, Popover, UnstyledButton, Card } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import Image from 'next/image';
import { useState } from 'react';

import { cySelectors } from '@/constants/cy-selectors';
import { sortOptions } from '@/constants/sort-options';
import { SortOption } from '@/types/index';

interface SortButtonProps {
  onChange: (v: SortOption) => void;
  cyId?: string;
  alt: string;
  selectedOption: SortOption;
}

const SortButton: React.FC<SortButtonProps> = ({
  cyId,
  onChange,
  alt,
  selectedOption,
}) => {
  const [opened, setOpened] = useState(false);
  const ref = useClickOutside(() => setOpened(false));

  return (
    <Popover
      closeOnClickOutside={true}
      opened={opened}
      withArrow
      shadow="md"
      arrowPosition="side"
      arrowSize={0}
      position="bottom-start"
      styles={{
        dropdown: {
          padding: 0,
          width: 'auto',
          minWidth: 235,
        },
      }}
    >
      <Popover.Target>
        <UnstyledButton
          data-cy={cyId}
          style={{
            outline: 'none',
          }}
          onClick={() => setOpened(!opened)}
        >
          <Flex
            h={54}
            w={54}
            style={{
              borderRadius: '100%',
              border: '1px solid #88888888',
            }}
            align="center"
            justify="center"
          >
            <Image
              src="/assets/icons/sort.svg"
              width={24}
              height={24}
              alt={alt}
            />
          </Flex>
        </UnstyledButton>
      </Popover.Target>
      <Popover.Dropdown>
        <Flex direction="column" py="sm" ref={ref}>
          {sortOptions.map((opt, index) => (
            <Card
              onClick={() => {
                onChange(opt);
                setOpened(false);
              }}
              style={{
                borderBottom:
                  index === sortOptions.length - 1
                    ? 'none'
                    : 'solid 1px #88888888',
                borderRadius: 0,
                height: 52,
                padding: '14px 20px',
              }}
              key={opt}
            >
              <Flex columnGap="md" align="center" justify="flex-start" w="100%">
                <SortOptionIcon
                  data-cy={cySelectors['sort-selection-icon']}
                  option={opt}
                />
                <Text
                  size="xs"
                  weight="lighter"
                  data-cy={cySelectors['sort-selection-title']}
                  style={{ flex: 1 }}
                >
                  {getOptionLabel(opt)}
                </Text>
                {selectedOption === opt && (
                  <Image
                    src="/assets/icons/check-gray.svg"
                    width={12}
                    height={12}
                    alt="check icon"
                  />
                )}
              </Flex>
            </Card>
          ))}
        </Flex>
      </Popover.Dropdown>
    </Popover>
  );
};

const SortOptionIcon: React.FC<{ option: SortOption }> = ({ option }) => {
  const fileName = getIconFileName(option);
  const filePath = `/assets/icons/${fileName}.svg`;

  return <Image src={filePath} width={24} height={24} alt={option} />;
};

const getIconFileName = (option: SortOption): string => {
  switch (option) {
    case 'active-first':
      return 'uncomplete-first';
    case 'alpha-asc':
      return 'alphabet-asc';
    case 'alpha-desc':
      return 'alphabet-desc';
    case 'date-asc':
      return 'newest';
    case 'date-desc':
      return 'oldest';
  }
};

const getOptionLabel = (option: SortOption): string => {
  switch (option) {
    case 'active-first':
      return 'Belum Selesai';
    case 'alpha-asc':
      return 'A-Z';
    case 'alpha-desc':
      return 'Z-A';
    case 'date-asc':
      return 'Terbaru';
    case 'date-desc':
      return 'Terlama';
  }
};
export { SortButton };
