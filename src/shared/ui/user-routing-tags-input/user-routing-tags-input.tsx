import { TagsInput } from '@mantine/core'
import { PiTagDuotone } from 'react-icons/pi'
import { useEffect, useState } from 'react'

import type { IProps } from './interfaces/props.interface'

const MAX_TAGS = 32
const MAX_TAG_LENGTH = 16

const normalizeTags = (rawTags: string[]): string[] => {
    const normalized = rawTags
        .map((tag) => tag.toUpperCase().replace(/[^A-Z0-9_]/g, '').slice(0, MAX_TAG_LENGTH))
        .filter(Boolean)

    return Array.from(new Set(normalized)).slice(0, MAX_TAGS)
}

export function UserRoutingTagsInputShared(props: IProps) {
    const { value, onChange, defaultValue, ...restProps } = props

    const [tags, setTags] = useState<string[]>(value ?? defaultValue ?? [])

    useEffect(() => {
        setTags(value ?? [])
    }, [value])

    const handleChange = (nextTags: string[]) => {
        const normalized = normalizeTags(nextTags)

        setTags(normalized)
        onChange?.(normalized)
    }

    return (
        <TagsInput
            clearable
            description="Attach the user to tagged routing rules (forTags) and tag-named subscription templates. Uppercase letters, numbers and underscores, max 16 characters."
            label="Routing tags"
            leftSection={<PiTagDuotone size="16px" />}
            maxTags={MAX_TAGS}
            placeholder="YTAB, RU_DIRECT"
            splitChars={[',', ' ', ';']}
            {...restProps}
            onChange={handleChange}
            value={tags}
        />
    )
}
