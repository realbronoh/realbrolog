import React from 'react';
import { Badge } from '../ui/badge';

const TagBadge = ({ tag }: { tag: string }) => {
  return (
    <Badge variant="secondary" className="hover:bg-secondary">
      {`#${tag}`}
    </Badge>
  );
};

export default TagBadge;
