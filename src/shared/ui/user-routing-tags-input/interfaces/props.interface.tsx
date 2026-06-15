import type { TagsInputProps } from '@mantine/core'

export interface IProps extends Omit<TagsInputProps, 'defaultValue' | 'onChange' | 'value'> {
    defaultValue?: string[]
    onChange?: (value: string[]) => void
    value?: string[]
}
