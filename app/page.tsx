import css from './Home.module.css';

export default function HomePage() {
  return (
    <main className={css.container}>
      <h1 className={css.title}>Welcome to NoteHub</h1>
      <p className={css.description}>
        Simple note management app
      </p>
    </main>
  );
}