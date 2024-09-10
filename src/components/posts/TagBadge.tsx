'use client';

import React from 'react';
import { Badge } from '../ui/badge';
import { useRouter } from '@/navigation';
import { generatePostsPageUrl } from '@/utils/misc';

const TagBadge = ({
  tag,
  inActive,
}: {
  tag: string | undefined;
  inActive?: boolean;
}) => {
  const router = useRouter();
  const label = tag === undefined ? '#all' : `#${tag}`;
  return (
    <Badge
      variant="secondary"
      className={`cursor-pointer ${!inActive && 'hover:brightness-90'} `}
      onClick={(e: React.MouseEvent) => {
        if (inActive) {
          return;
        }
        e.preventDefault();
        router.push(generatePostsPageUrl(undefined, tag));
      }}
    >
      {label}
    </Badge>
  );
};

export default TagBadge;
