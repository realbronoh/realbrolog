'use client';

import { useRouter } from '@/navigation';
import { generatePostsPageUrl } from '@/utils/misc';
import React, { useCallback, useMemo } from 'react';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import TagBadge from './TagBadge';

interface TagOption {
  label: string;
  tag: string | undefined;
}

const generateTagOptions = (tags: string[]): TagOption[] => {
  const defaultTagOption = {
    label: 'all',
    tag: undefined,
  };
  return [defaultTagOption, ...tags.map((tag) => ({ label: tag, tag }))];
};

interface TagFilterProps {
  selectedTag: string | undefined;
  tags: string[];
}

const TagSelect = (props: TagFilterProps) => {
  const { selectedTag, tags } = props;
  const [open, setOpen] = useState(false);
  const tagOptions = useMemo(() => generateTagOptions(tags), [tags]);
  const router = useRouter();

  const handleTagSelect = useCallback(
    (tag: string | undefined) => {
      if (tag === selectedTag) {
        return;
      }
      router.push(generatePostsPageUrl(undefined, tag));
    },
    [selectedTag],
  );

  return (
    <div className="flex flex-col items-start space-y-4">
      <div className="flex items-center space-x-2">
        <DropdownMenu onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild className="focus:outline-none">
            <Button variant="ghost" className="h-auto p-1 ">
              <span className="flex items-center gap-0.5">
                {<TagBadge tag={selectedTag} />}
                {open ? (
                  <ChevronUpIcon className="h-4 w-4" />
                ) : (
                  <ChevronDownIcon className="w-4 h-4" />
                )}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="rounded-lg p-1">
            {tagOptions.map(({ label, tag }) => (
              <DropdownMenuItem
                key={label}
                onSelect={() => handleTagSelect(tag)}
                className="rounded-md px-2 py-1.5 focus:bg-accent focus:text-accent-foreground cursor-pointer"
              >
                {<TagBadge tag={tag} />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TagSelect;
