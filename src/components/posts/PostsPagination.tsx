'use client';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from '@/components/ui/pagination';
import { useRouter } from '@/navigation';
import { generatePostsPageUrl } from '@/utils/misc';
import React from 'react';

const NUM_VISIBLE_PAGES = 5;

const PostsPaginationHandle = (props: {
  currentPageIdx: number;
  numPages: number;
  selectedTag: string | undefined;
}) => {
  const { currentPageIdx, numPages, selectedTag } = props;
  const router = useRouter();

  const lastPageIdx = numPages - 1;
  const currentGroupIdx = Math.floor(currentPageIdx / NUM_VISIBLE_PAGES);
  const beforeGroupIdx = currentGroupIdx - 1;
  const afterGroupIdx = currentGroupIdx + 1;
  const lastGroupIdx = Math.floor(lastPageIdx / NUM_VISIBLE_PAGES);

  const beforeGroupExists = 0 <= beforeGroupIdx;
  const afterGroupExists = afterGroupIdx <= lastGroupIdx;
  const visibleIndices = Array.from(
    { length: NUM_VISIBLE_PAGES },
    (_, i) => currentGroupIdx * NUM_VISIBLE_PAGES + i,
  ).filter((idx) => 0 <= idx && idx <= lastPageIdx);

  return (
    <Pagination>
      <PaginationContent>
        {beforeGroupExists && (
          <>
            <PaginationItem>
              <PaginationPrevious
                onClick={() =>
                  router.push(
                    generatePostsPageUrl(
                      currentGroupIdx * NUM_VISIBLE_PAGES - 1,
                      selectedTag,
                    ),
                  )
                }
              />
            </PaginationItem>
          </>
        )}
        {visibleIndices.map((idx) => {
          return (
            <PaginationItem
              onClick={() =>
                router.push(generatePostsPageUrl(idx, selectedTag))
              }
              key={`post-pagination-${idx}`}
            >
              <PaginationLink isActive={idx === currentPageIdx}>
                {idx}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        {afterGroupExists && (
          <>
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  router.push(
                    generatePostsPageUrl(
                      afterGroupIdx * NUM_VISIBLE_PAGES,
                      selectedTag,
                    ),
                  )
                }
              />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PostsPaginationHandle;
