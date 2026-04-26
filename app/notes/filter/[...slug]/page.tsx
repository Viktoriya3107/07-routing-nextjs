import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesWithTagClient from './Notes.client';

export default async function Page({
  params,
}: {
  params: {
    slug?: string[];
  };
}) {
  const rawTag = params.slug?.[0];

  // 🔥 нормалізація
  const normalizedTag =
    rawTag === 'all' || !rawTag ? undefined : rawTag;

  const qc = new QueryClient();

  await qc.prefetchQuery({
    queryKey: ['notes', 1, '', normalizedTag ?? ''],
    queryFn: () => fetchNotes(1, '', normalizedTag),
  });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <NotesWithTagClient tag={normalizedTag ?? ''} />
    </HydrationBoundary>
  );
}