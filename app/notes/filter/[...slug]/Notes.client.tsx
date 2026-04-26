'use client';

import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';

export default function NotesWithTagClient({ tag }: { tag?: string }) {
  const [page, setPage] = useState(1);

  const activeTag = tag === 'all' ? undefined : tag;

  const { data } = useQuery({
    queryKey: ['notes', activeTag, page],
    queryFn: () => fetchNotes(page, '', activeTag),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 1;

  return (
    <>
      <NoteList notes={data?.notes ?? []} />

      {totalPages > 1 && (
        <Pagination
          pageCount={totalPages}
          currentPage={page}
          onPageChange={({ selected }) => setPage(selected + 1)}
        />
      )}
    </>
  );
}