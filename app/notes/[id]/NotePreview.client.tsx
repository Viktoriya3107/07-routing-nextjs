'use client';

import Modal from '@/components/Modal/Modal';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';

export default function NotePreview({ id }: { id: string }) {
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <Modal onClose={() => router.back()}>
      <h2>{data?.title}</h2>
      <p>{data?.content}</p>
    </Modal>
  );
}