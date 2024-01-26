import Link from "next/link";

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <div className="space-y-3">
      <Link className="my-2 border p-3" href="/">
        ← go back
      </Link>
      {children}
    </div>
  );
}
