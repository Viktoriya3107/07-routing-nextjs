'use client';

import { useEffect, useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';

import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';

type Props = {
  tag?: string;
};

export default function NotesWithTagClient({ tag }: Props) {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const activeTag = tag === 'all' ? undefined : tag;

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    setPage(1); 
  };

  const { data } = useQuery({
    queryKey: ['notes', activeTag, page, debouncedSearch],
    queryFn: () =>
      fetchNotes(page, debouncedSearch, activeTag),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Create note
      </button>

      
      <SearchBox onSearch={handleSearchChange} />

     
      {notes.length > 0 && (
        <NoteList notes={notes} />
      )}

      
      <Pagination
        pageCount={totalPages}
        currentPage={page}
        onPageChange={({ selected }) =>
          setPage(selected + 1)
        }
      />

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <NoteForm onClose={() => setIsOpen(false)} />
        </Modal>
      )}
    </>
  );
}