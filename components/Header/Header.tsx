import Link from 'next/link';
import css from './Header.module.css';

export default function Header() {
  return (
    <header className={css.header}>
      <nav className={css.nav}>
        <Link href="/" className={css.logo}>
          NoteHub
        </Link>

        <div className={css.links}>
          <Link href="/notes/filter/all">Notes</Link>
        </div>
      </nav>
    </header>
  );
}