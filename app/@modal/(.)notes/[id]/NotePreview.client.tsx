'use client';

import Modal from '@/components/Modal/Modal';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';

export default function NotePreview({ id }: { id: string }) {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading note</p>;

  return (
    <Modal onClose={() => router.back()}>
      <h2>{data?.title}</h2>
      <p>{data?.content}</p>
      <p>Tag: {data?.tag}</p>
      <p>Created: {data?.createdAt}</p>

      <button onClick={() => router.back()}>
        Close
      </button>
    </Modal>
  );
}