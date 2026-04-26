import Link from 'next/link';

const tags = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function SidebarNotes() {
  return (
    <ul>
      <li>
        <Link href="/notes/filter/all">All notes</Link>
      </li>

      {tags.map((t) => (
        <li key={t}>
          <Link href={`/notes/filter/${t}`}>{t}</Link>
        </li>
      ))}
    </ul>
  );
}