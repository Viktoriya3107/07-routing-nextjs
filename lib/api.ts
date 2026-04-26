import axios from 'axios';
import type { Note, NoteTag } from '@/types/note';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number,
  search: string,
  tag?: string
): Promise<NotesResponse> => {
  const { data } = await api.get('/notes', {
    params: { page, search, tag },
  });

  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get(`/notes/${id}`);
  return data;
};

export const createNote = async (payload: {
  title: string;
  content: string;
  tag: NoteTag;
}) => {
  const { data } = await api.post('/notes', payload);
  return data;
};

export const deleteNote = async (id: string) => {
  const { data } = await api.delete(`/notes/${id}`);
  return data;
};