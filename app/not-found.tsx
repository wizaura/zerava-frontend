import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-eco-black text-white flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <h1 className="text-6xl sm:text-7xl font-semibold text-electric-teal mb-4">
          404
        </h1>

        <h2 className="text-2xl sm:text-3xl font-medium mb-4">
          This page has driven off…
        </h2>

        <p className="text-gray-300 mb-8">
          Looks like the page you're looking for doesn't exist or has been
          moved. But don’t worry — we can still get your vehicle looking
          spotless.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-electric-teal text-eco-black px-6 py-3 rounded-full font-semibold hover:brightness-110 transition"
          >
            Go Home
          </Link>

          <Link
            href="/booking"
            className="border border-white/70 px-6 py-3 rounded-full font-semibold hover:border-electric-teal hover:text-electric-teal transition"
          >
            Book a Clean
          </Link>
        </div>

        <p className="text-gray-500 text-sm mt-10">
          Zerava Mobility — Premium Eco Vehicle Care in Southampton
        </p>
      </div>
    </div>
  );
}