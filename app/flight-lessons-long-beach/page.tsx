import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Flight Lessons in Long Beach, CA | Gregory Smith CFI",
  description: "Looking for a flight instructor in Long Beach? Gregory Smith provides personalized, safety-focused flight and ground instruction at Long Beach Airport (KLGB), subject to aircraft and scheduling availability.",
  alternates: { canonical: "https://gregorysmithcfi.com/flight-lessons-long-beach" },
};

export default function TrainingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <Link href="/" className="font-semibold text-sky-400 hover:text-sky-300">← Gregory Smith Flight Instruction</Link>
        <a href="tel:+17608870222" className="rounded-lg border border-sky-500 px-4 py-2 text-sm font-semibold hover:bg-slate-800">Call Gregory</a>
      </header>
      <section className="mx-auto max-w-5xl px-6 py-20">
        <p className="text-sm font-bold uppercase tracking-widest text-sky-400">Certified Flight Instructor</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-bold sm:text-5xl">Flight Lessons in Long Beach, CA</h1>
        <h2 className="mt-6 text-2xl font-semibold text-sky-300">Flight instruction at Long Beach Airport (KLGB)</h2>
        <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">Looking for a flight instructor in Long Beach? Gregory Smith provides personalized, safety-focused flight and ground instruction at Long Beach Airport (KLGB), subject to aircraft and scheduling availability.</p>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">Whether you are starting your private pilot training, returning to flying after time away, or preparing for a flight review, lessons focus on your individual experience and goals.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-700 bg-slate-900 p-7">
            <h3 className="text-xl font-semibold">Instruction Rate</h3>
            <p className="mt-4 text-4xl font-bold">$50<span className="text-lg font-normal text-slate-300"> / hour</span></p>
            <p className="mt-4 leading-7 text-slate-300">Aircraft rental is charged separately. Rates and availability depend on the aircraft and rental provider.</p>
          </div>
          <div className="rounded-2xl border border-slate-700 bg-slate-900 p-7">
            <h3 className="text-xl font-semibold">How to Begin</h3>
            <p className="mt-4 leading-7 text-slate-300">Get in touch, share your aviation goals, and discuss scheduling and aircraft availability before booking your first lesson.</p>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/#contact" className="rounded-lg bg-sky-500 px-6 py-3 font-semibold hover:bg-sky-400">Request Flight Instruction</Link>
          <a href="sms:+17608870222" className="rounded-lg border border-slate-500 px-6 py-3 font-semibold hover:border-sky-400">Text Gregory</a>
        </div>
      </section>
    </main>
  );
}
