import Link from 'next/link';

export default function DefaultSidebar() {
  const tags = [
    'All',
    'Todo',
    'Work',
    'Personal',
    'Meeting',
    'Shopping',
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