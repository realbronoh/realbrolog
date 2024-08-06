'use client';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from '@/components/ui/pagination';
import React from 'react';

const NUM_VISIBLE_PAGES = 5;

const ArticlesPaginationHandle = (props: {
  currentPageIdx: number;
  setCurrentPageIdx: (idx: number) => void;
  numPages: number;
}) => {
  const { currentPageIdx, setCurrentPageIdx, numPages } = props;
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
                href="#"
                onClick={() =>
                  setCurrentPageIdx(beforeGroupIdx * NUM_VISIBLE_PAGES)
                }
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        )}
        {visibleIndices.map((idx) => {
          return (
            <PaginationItem
              onClick={() => setCurrentPageIdx(idx)}
              key={`article-pagination-${idx}`}
            >
              <PaginationLink href="#" isActive={idx === currentPageIdx}>
                {idx}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        {afterGroupExists && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() =>
                  setCurrentPageIdx(afterGroupIdx * NUM_VISIBLE_PAGES)
                }
              />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default ArticlesPaginationHandle;
