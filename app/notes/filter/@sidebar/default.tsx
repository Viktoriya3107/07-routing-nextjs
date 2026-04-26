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
      {tags.map((tag) => {
        const label =
          tag === 'all'
            ? 'All'
            : tag;

        const href =
          tag === 'all'
            ? '/notes/filter/all'
            : `/notes/filter/${tag}`;

        return (
          <li key={tag}>
            <Link href={href}>
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}