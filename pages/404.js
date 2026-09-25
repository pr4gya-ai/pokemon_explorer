import Link from "next/link";

export default function NotFound() {
  return (
    <main className="px-4 py-24 text-center">
      <h1 className="text-4xl font-bold">Pokemon not found</h1>
      <p className="mt-2 text-gray-500">That page does not exist.</p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-full bg-red-600 px-6 py-3 font-bold text-white hover:bg-red-700"
      >
        Go to homepage
      </Link>
    </main>
  );
}
