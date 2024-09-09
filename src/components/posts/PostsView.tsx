import { Post } from '@/types/post';
import PostsPaginationHandle from './PostsPagination';
import PostCard from './PostCard';
import { Separator } from '../ui/separator';

const PostsView = (props: {
  posts: Post[];
  currentPageIdx: number;
  pagesLength: number;
}) => {
  const { posts, pagesLength, currentPageIdx } = props;

  return (
    <main className="flex flex-col gap-2 sm:gap-6">
      <h2 className="text-xl font-bold text-center sm:text-2xl md:text-start">
        Posts
      </h2>
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
      />
    </main>
  );
};

export default PostsView;
