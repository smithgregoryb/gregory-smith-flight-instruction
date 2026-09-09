export default function ThankYou() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <div className="max-w-2xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-sky-400">
          Inquiry Received
        </p>

        <h1 className="mt-4 text-5xl font-bold">
          Thank You!
        </h1>

        <p className="mt-6 text-xl leading-8 text-slate-300">
          Your flight training inquiry has been received. I&apos;ll get back to
          you as soon as possible to discuss your training goals and next steps.
        </p>

        <p className="mt-8 text-lg font-semibold">
          Gregory Smith, CFI
        </p>

        <a
          href="/"
          className="mt-10 inline-block rounded-lg bg-sky-500 px-8 py-4 font-bold text-white transition hover:bg-sky-400"
        >
          Return to Home
        </a>
      </div>
    </main>
  );
}