import { Post } from '@/types/post';
import PostsPaginationHandle from './PostsPagination';
import PostCard from './PostCard';
import { Separator } from '../ui/separator';
import TagSelect from './TagSelect';

const PostsView = (props: {
  posts: Post[];
  currentPageIdx: number;
  pagesLength: number;
  selectedTag: string | undefined;
  tags: string[];
}) => {
  const { posts, pagesLength, currentPageIdx, selectedTag, tags } = props;

  return (
    <main className="flex flex-col gap-2 sm:gap-6">
      <div className="flex items-center justify-between">
        <h2 className="mr-auto text-xl font-bold sm:text-2xl">Posts</h2>
        <TagSelect tags={tags} selectedTag={selectedTag} />
      </div>
      <div className="grid gap-6">
        <div className="grid gap-4">
          {posts.map((post, idx) => {
            return (
              <>
                {idx !== 0 && <Separator />}
                <PostCard post={post} />
              </>
            );
          })}
        </div>
      </div>
      <PostsPaginationHandle
        currentPageIdx={currentPageIdx}
        numPages={pagesLength}
        selectedTag={selectedTag}
      />
    </main>
  );
};

export default PostsView;
