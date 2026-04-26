import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesWithTagClient from './NotesWithTag.client';

export default async function Page({
  params,
}: {
  params: {
    slug?: string[];
  };
}) {
  const tag = params.slug?.[0];

  const qc = new QueryClient();

  await qc.prefetchQuery({
    queryKey: ['notes', tag],
    queryFn: () =>
      fetchNotes(1, '', tag === 'all' ? undefined : tag),
  });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <NotesWithTagClient tag={tag} />
    </HydrationBoundary>
  );
}