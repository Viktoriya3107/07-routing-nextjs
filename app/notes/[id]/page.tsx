import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NotePreview from './NotePreview.client';

export default async function Page({
  params,
}: {
  params: { id: string };
}) {
  const qc = new QueryClient();

  await qc.prefetchQuery({
    queryKey: ['note', params.id],
    queryFn: () => fetchNoteById(params.id),
  });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <NotePreview id={params.id} />
    </HydrationBoundary>
  );
}