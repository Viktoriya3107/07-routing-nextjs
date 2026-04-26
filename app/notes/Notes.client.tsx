'use client';

import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';

export default function NotesClient() {
  const [page, setPage] = useState(1);

  const { data } = useQuery({
    queryKey: ['notes', page],
    queryFn: () => fetchNotes(page, ''),
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