import React from 'react';
import { Badge } from '../ui/badge';

const TagBadge = ({ tag }: { tag: string | undefined }) => {
  const label = tag === undefined ? '#all' : `#${tag}`;
  return (
    <Badge variant="secondary" className="hover:bg-secondary">
      {label}
    </Badge>
  );
};

export default TagBadge;
