import Link from 'next/link';

export default function DefaultSidebar() {
  const tags = [
    'all',
    'todo',
    'work',
    'personal',
    'meeting',
    'shopping',
  ];

  return (
    <ul>
      {tags.map((tag) => (
        <li key={tag}>
          <Link href={`/notes/filter/${tag}`}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}