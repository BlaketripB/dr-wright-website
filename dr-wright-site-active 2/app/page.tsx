import Link from "next/link";

export default function HomePage() {
  return (
    <main className="p-6">
      <h1 className="text-4xl font-bold">Dr. Wright Chiropractic</h1>

      <p className="mt-3 max-w-xl">
        Welcome — this is the new website. We’ll add full content and scheduling next.
      </p>

      <div className="mt-6 flex gap-3">
        <Link
          href="/contact"
          className="rounded-xl bg-black px-4 py-2 text-white"
        >
          Schedule Now
        </Link>

        <Link
          href="/services"
          className="rounded-xl border px-4 py-2"
        >
          View Services
        </Link>
      </div>
    </main>
  );
}
