'use client';

import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';

import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';

type Props = {
  tag?: string;
};

export default function NotesWithTagClient({ tag }: Props) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const activeTag = tag === 'all' ? undefined : tag;

  const { data } = useQuery({
    queryKey: ['notes', activeTag, page, search],
    queryFn: () => fetchNotes(page, search, activeTag),
    placeholderData: keepPreviousData,
  });

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Create note
      </button>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
      />

      <NoteList notes={data?.notes ?? []} />

      {data?.totalPages && data.totalPages > 1 && (
        <Pagination
          pageCount={data.totalPages}
          currentPage={page}
          onPageChange={({ selected }) =>
            setPage(selected + 1)
          }
        />
      )}

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <NoteForm onClose={() => setIsOpen(false)} />
        </Modal>
      )}
    </>
  );
}