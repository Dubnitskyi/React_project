import type { Meta, StoryObj } from '@storybook/react';
import {FileCard} from "@/components/FileCard";

const meta: Meta<typeof FileCard> = {
  component: FileCard,
};

export default meta;
type Story = StoryObj<typeof FileCard>;

export const Primary: Story = {
  args: {
    tags: [
      {
        id: 0,
        name: 'Name 1',
        color: 'red',
      },
      {
        id: 1,
        name: 'Name 2',
        color: 'blue',
      }
    ],
    category: {
      id: 1,
      name: 'Category'
    },
    user: {
      id: 0,
      email: 'test@example.com',
      name: 'Test',
      password: 'test',
      role: 'admin'
    },
    name: 'Test name',
    description: 'Test description',
  },
};

export const NoTags: Story = {
  args: {
    tags: [],
    category: {
      id: 1,
      name: 'Category'
    },
    user: {
      id: 0,
      email: 'test@example.com',
      name: 'Test',
      password: 'test',
      role: 'admin'
    },
    name: 'Test name',
    description: 'Test description',
  },
};
