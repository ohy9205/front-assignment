import Link from "next/link";

export default function TodoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <h1 className="header">
        <Link href="/todo-list">Todo List🗒️</Link>
      </h1>

      {children}
    </section>
  );
}
