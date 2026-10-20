"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

export default function Home() {
  const [submitted, setSubmitted] = useState(false);

  const [approvedReviews, setApprovedReviews] = useState<
  { id: number; name: string; rating: number; comment: string }[]
>([]);

useEffect(() => {
  async function loadApprovedReviews() {
    if (!supabase) return;
    const { data, error } = await supabase
      .from("reviews")
      .select("id, name, rating, comment")
      .eq("status", "approved")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setApprovedReviews(data);
    }
  }

  loadApprovedReviews();
}, []);

  const [commentSubmitted, setCommentSubmitted] = useState(false);

const flightPhotos = [
  "/flight-training/flight-1.png",
  "/flight-training/flight-2.png",
  "/flight-training/flight-3.png",
  "/flight-training/flight-4.png",
"/gregory-flying.png",
"/sunset-airport.jpeg",
"/wing-mountains.png",
];

const [currentPhoto, setCurrentPhoto] = useState(0);

useEffect(() => {
  const timer = setInterval(() => {
    setCurrentPhoto((current) => (current + 1) % flightPhotos.length);
  }, 5000);

  return () => clearInterval(timer);
}, []);

async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);

  const response = await fetch("https://formspree.io/f/myeybbkp", {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
    },
  });

  if (response.ok) {
    setSubmitted(true);
    form.reset();
  }
}

async function handleCommentSubmit(
  event: React.FormEvent<HTMLFormElement>
) {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);

  const name = String(formData.get("reviewer_name") || "");
  const rating = parseInt(String(formData.get("rating") || "0"), 10);
  const comment = String(formData.get("comment") || "");

  const response = await fetch("/api/reviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      rating,
      comment,
    }),
  });

  if (response.ok) {
    setCommentSubmitted(true);
    form.reset();
  } else {
    alert("There was a problem submitting your review. Please try again.");
  }
}



 



  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="absolute left-0 top-0 z-10 w-full px-6 py-6">
  <div className="mx-auto flex max-w-6xl items-center justify-between">
    <div>
      <p className="text-lg font-bold">Gregory Smith</p>
      <p className="text-xs uppercase tracking-widest text-sky-400">
        Certified Flight Instructor
      </p>
    </div>

    <div className="hidden gap-8 text-sm font-medium md:flex">
      <a href="#about" className="hover:text-sky-400">
        About
      </a>
      <a href="#services" className="hover:text-sky-400">
        Flight Training
      </a>
      <a href="#pricing" className="hover:text-sky-400">
        Rates
      </a>
      <a href="#start" className="hover:text-sky-400">
        Get Started
      </a>
      <a href="#contact" className="hover:text-sky-400">
        Contact
      </a>
    </div>
    <a href="tel:+17608870222" className="rounded-lg border border-sky-400/60 bg-slate-950/70 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-600">
      Call Gregory
    </a>
  </div>
</nav>
      <section
  className="relative flex min-h-screen items-center justify-center bg-cover bg-center px-6"
  style={{ backgroundImage: "url('/hero-airplane.png')" }}
>
  <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 max-w-4xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">
            Certified Flight Instructor
          </p>

          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            Gregory Smith
            <span className="block text-sky-400">Flight Instruction in Long Beach, CA</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
Personalized flight instruction in Long Beach, California, serving student pilots and aircraft owners at Long Beach Airport (KLGB) and throughout Southern California.          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
            <a
              href="#contact"
              className="w-full rounded-xl bg-sky-500 px-8 py-4 text-center text-lg font-bold text-white shadow-lg transition hover:bg-sky-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
            >
              Schedule a Lesson
            </a>
            <a
              href="tel:+17608870222"
              className="w-full rounded-xl border-2 border-white bg-white px-8 py-4 text-center text-lg font-bold text-slate-950 shadow-lg transition hover:bg-sky-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
            >
              Call Gregory
            </a>
            <a
              href="sms:+17608870222"
              className="w-full rounded-xl border-2 border-white bg-slate-950/70 px-8 py-4 text-center text-lg font-bold text-white shadow-lg transition hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
            >
              Text Gregory
            </a>
          </div>
          <a
            href="#services"
            className="mt-6 inline-block text-base font-semibold text-white underline underline-offset-4 transition hover:text-sky-200"
          >
            Explore flight training options ↓
          </a>
        </div>
      </section>
      <section id="services" className="bg-white px-6 py-24 text-slate-900">
  <div className="mx-auto max-w-6xl">
    <div className="text-center">
      <p className="text-sm font-bold uppercase tracking-[0.3em] text-sky-600">
        Flight Training
      </p>

      <h2 className="mt-3 text-4xl font-bold">
        Personalized Instruction for Your Aviation Goals
      </h2>

      <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
        One-on-one flight instruction focused on building safe, confident,
        knowledgeable pilots.
      </p>
    </div>

 <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-6">

  <div className="rounded-2xl border border-slate-200 p-8 shadow-sm lg:col-span-2">
    <h3 className="text-xl font-bold">Private Pilot Training</h3>
    <p className="mt-4 leading-7 text-slate-600">
      Personalized flight and ground instruction for student pilots working
      toward their Private Pilot Certificate.
    </p>
  </div>

  <div className="rounded-2xl border border-slate-200 p-8 shadow-sm lg:col-span-2">
    <h3 className="text-xl font-bold">Flight Reviews</h3>
    <p className="mt-4 leading-7 text-slate-600">
      Ground and flight instruction tailored to complete your FAA Flight
      Review while strengthening knowledge, confidence, and proficiency.
    </p>
  </div>

  <div className="rounded-2xl border border-slate-200 p-8 shadow-sm lg:col-span-2">
    <h3 className="text-xl font-bold">Proficiency & Rusty Pilot Training</h3>
    <p className="mt-4 leading-7 text-slate-600">
      Regain confidence, sharpen your flying skills, and get comfortable
      in the cockpit through focused, scenario-based training.
    </p>
  </div>

  <div className="rounded-2xl border border-slate-200 p-8 shadow-sm lg:col-span-2 lg:col-start-2">
    <h3 className="text-xl font-bold">Discovery Flight</h3>
    <p className="mt-4 leading-7 text-slate-600">
      Experience flying firsthand with an introductory flight designed
      for prospective students and anyone curious about becoming a pilot.
    </p>
  </div>

  <div className="rounded-2xl border border-slate-200 p-8 shadow-sm lg:col-span-2">
    <h3 className="text-xl font-bold">Ground Instruction</h3>
    <p className="mt-4 leading-7 text-slate-600">
      One-on-one instruction covering aeronautical knowledge, regulations,
      flight planning, weather, and checkride preparation.
    </p>
  </div>
</div>
</div>
</section>

<section id="pricing" className="bg-slate-900 px-6 py-20 text-white">
  <div className="mx-auto max-w-5xl">
    <div className="text-center">
      <p className="text-sm font-bold uppercase tracking-[0.3em] text-sky-400">Straightforward Pricing</p>
      <h2 className="mt-3 text-4xl font-bold">Flight Instruction Rates</h2>
      <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
        Personalized instruction designed around your experience and aviation goals.
      </p>
    </div>
    <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-sky-400/30 bg-slate-950 p-8 text-center shadow-xl sm:p-10">
      <p className="text-lg font-semibold text-sky-300">Flight Instruction</p>
      <p className="mt-4 text-5xl font-bold">$50<span className="text-xl font-medium text-slate-300"> / hour</span></p>
      <p className="mt-6 leading-7 text-slate-300">
        Aircraft rental is billed separately. Rental rates depend on the aircraft and rental provider,
        and aircraft availability must be confirmed before scheduling.
      </p>
      <p className="mt-3 text-sm leading-6 text-slate-400">
        Contact me about discovery flights, ground lessons, and a training plan tailored to you.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <a href="#contact" className="rounded-lg bg-sky-500 px-5 py-3 font-semibold text-white hover:bg-sky-400">
          Ask About Lessons
        </a>
        <a href="tel:+17608870222" className="rounded-lg border border-slate-500 px-5 py-3 font-semibold hover:border-sky-400">
          Call Gregory
        </a>
        <a href="sms:+17608870222" className="rounded-lg border border-slate-500 px-5 py-3 font-semibold hover:border-sky-400">
          Text Gregory
        </a>
      </div>
    </div>
  </div>
</section>

<section id="start" className="bg-white px-6 py-20 text-slate-900">
  <div className="mx-auto max-w-6xl text-center">
    <p className="text-sm font-bold uppercase tracking-[0.3em] text-sky-600">Your First Step</p>
    <h2 className="mt-3 text-4xl font-bold">How to Get Started</h2>
    <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
      New to flying or returning to the cockpit? Here is how we can get started.
    </p>
    <div className="mt-10 grid gap-6 text-left md:grid-cols-3">
      {[
        { number: "01", title: "Get in Touch", detail: "Tell me about your experience, goals, and preferred training area." },
        { number: "02", title: "Make a Plan", detail: "We will discuss your next steps, lesson options, and aircraft availability." },
        { number: "03", title: "Schedule a Lesson", detail: "Once we confirm the aircraft and a suitable time, we can get your training underway." },
      ].map((step) => (
        <div key={step.number} className="rounded-2xl border border-slate-200 p-7 shadow-sm">
          <p className="text-sm font-bold text-sky-600">{step.number}</p>
          <h3 className="mt-3 text-xl font-bold">{step.title}</h3>
          <p className="mt-3 leading-7 text-slate-600">{step.detail}</p>
        </div>
      ))}
    </div>
    <a href="#contact" className="mt-9 inline-block rounded-lg bg-sky-600 px-7 py-3 font-semibold text-white hover:bg-sky-500">
      Get in Touch
    </a>
  </div>
</section>

<section className="bg-sky-50 px-6 py-20 text-slate-900">
  <div className="mx-auto max-w-4xl text-center">
    <p className="text-sm font-bold uppercase tracking-[0.3em] text-sky-600">
      Long Beach Flight Training
    </p>

    <h2 className="mt-3 text-4xl font-bold">
      Flight Instruction at Long Beach Airport (KLGB)
    </h2>

    <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
      Looking for a flight instructor in Long Beach, California? I provide
      personalized one-on-one flight and ground instruction for student pilots,
      private pilots, aircraft owners, and pilots working toward greater
      proficiency. Training is available at Long Beach Airport (KLGB) and
      throughout Southern California.
    </p>
  </div>
</section>

<section id="locations" className="bg-slate-100 px-6 py-20 text-slate-900">
  <div className="mx-auto max-w-6xl">
    <div className="text-center">
      <p className="text-sm font-bold uppercase tracking-[0.3em] text-sky-600">Training Areas</p>
      <h2 className="mt-3 text-4xl font-bold">Where You Can Train</h2>
      <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
        Explore flight instruction in Long Beach and Apple Valley. Lesson location and aircraft
        availability are confirmed before booking.
      </p>
    </div>
    <div className="mt-10 grid gap-6 md:grid-cols-3">
      <a href="/flight-lessons-long-beach" className="rounded-2xl bg-white p-7 shadow-sm transition hover:shadow-lg">
        <h3 className="text-xl font-bold">Long Beach (KLGB)</h3>
        <p className="mt-3 leading-7 text-slate-600">Personalized flight instruction at Long Beach Airport.</p>
        <p className="mt-5 font-semibold text-sky-700">Explore Long Beach lessons →</p>
      </a>
      <a href="/flight-training-apple-valley" className="rounded-2xl bg-white p-7 shadow-sm transition hover:shadow-lg">
        <h3 className="text-xl font-bold">Apple Valley (KAPV)</h3>
        <p className="mt-3 leading-7 text-slate-600">Flight training options in the High Desert.</p>
        <p className="mt-5 font-semibold text-sky-700">Explore Apple Valley training →</p>
      </a>
      <a href="/private-pilot-training" className="rounded-2xl bg-white p-7 shadow-sm transition hover:shadow-lg">
        <h3 className="text-xl font-bold">Private Pilot Training</h3>
        <p className="mt-3 leading-7 text-slate-600">Learn about the steps toward your Private Pilot Certificate.</p>
        <p className="mt-5 font-semibold text-sky-700">Explore private pilot training →</p>
      </a>
    </div>
  </div>
</section>

<section className="bg-white px-6 py-24 text-slate-900">
  <div className="mx-auto max-w-5xl text-center">
    <p className="text-sm font-bold uppercase tracking-[0.3em] text-sky-600">
      Flight Training in Action
    </p>

    <h2 className="mt-3 text-4xl font-bold">
      Experience Flight Training
    </h2>

    <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
      A look inside real-world flight training and the experiences that
      help build safe, confident pilots.
    </p>


<div className="mx-auto mt-10 max-w-sm">
  <video
    src="/cfi-promo.mp4"
    controls
    playsInline
    className="w-full rounded-2xl shadow-2xl"
  />
</div>

<p className="mt-4 text-sm text-slate-400">
  See what flight training looks like in the cockpit and in the air.
</p>

<div className="relative mx-auto mt-10 max-w-2xl overflow-hidden rounded-2xl bg-slate-900 shadow-xl">      <img
        src={flightPhotos[currentPhoto]}
        alt="Flight training with Gregory Smith, Certified Flight Instructor"
        className="h-[550px] w-full object-contain"
      />

      <button
        onClick={() =>
          setCurrentPhoto(
            (currentPhoto - 1 + flightPhotos.length) % flightPhotos.length
          )
        }
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-4 py-3 text-2xl text-white hover:bg-black/70"
        aria-label="Previous photo"
      >
        ‹
      </button>

      <button
        onClick={() =>
          setCurrentPhoto((currentPhoto + 1) % flightPhotos.length)
        }
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-4 py-3 text-2xl text-white hover:bg-black/70"
        aria-label="Next photo"
      >
        ›
      </button>
    </div>

    <div className="mt-5 flex justify-center gap-2">
      {flightPhotos.map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentPhoto(index)}
          className={`h-3 w-3 rounded-full ${
            currentPhoto === index ? "bg-sky-500" : "bg-slate-300"
          }`}
          aria-label={`View photo ${index + 1}`}
        />
      ))}
    </div>
  </div>
</section>

<section id="about" className="bg-slate-100 px-6 py-24 text-slate-900">
  <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
    <div className="space-y-8">
      <img
  src="/gregory-smith-cfi.png"
  alt="Gregory Smith with training aircraft"
  className="mb-8 w-full rounded-2xl object-cover shadow-lg"
/>
      <p className="text-sm font-bold uppercase tracking-[0.3em] text-sky-600">
        About Me
      </p>

      <h2 className="mt-3 text-4xl font-bold">
        Practical, Safety-Focused Flight Instruction
      </h2>

      <p className="mt-6 leading-8 text-slate-600">
        I am a Certified Flight Instructor with experience in Cessna, Piper,
        Tecnam, and multi-engine aircraft. My instruction is focused on helping
        pilots build strong fundamentals, sound aeronautical decision-making,
        and confidence in the cockpit.
      </p>

      <p className="mt-4 leading-8 text-slate-600">
        Whether you are beginning your Private Pilot training, preparing for a
        flight review, or simply looking to improve your proficiency, I tailor
        each lesson to your individual experience and goals.
      </p>
    </div>

    <div className="rounded-2xl bg-slate-950 p-8 text-white">
      <h3 className="text-2xl font-bold">Qualifications</h3>

      <div className="mt-6 space-y-4 text-slate-300">
        <p>✓ FAA Certified Flight Instructor</p>
        <p>✓ Commercial Pilot Certificate</p>
        <p>✓ Instrument Rated</p>
        <p>✓ Private Pilot Certificate</p>
        <p>✓ Experience in Cessna, Piper, Tecnam & Multi-Engine Aircraft</p>
        <p>✓ Safety and Scenario-Based Training Focus</p>
      </div>
    </div>
  </div>
</section>

<section className="bg-slate-900 px-6 py-20 text-white">
  <div className="mx-auto max-w-6xl">
    <div className="text-center">
      <p className="text-sm font-bold uppercase tracking-widest text-sky-400">
        CFI Endorsement Trainer
      </p>

      <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
        Preparing for Your CFI Checkride?
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
        Practice real-world endorsement scenarios and test your knowledge with
        the CFI Endorsement Trainer.
      </p>

      <a
        href="https://cfi-endorsement-trainer.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-block rounded-lg bg-sky-500 px-7 py-3 font-semibold text-white transition hover:bg-sky-400"
      >
        Try the CFI Endorsement Trainer
      </a>
    </div>
  </div>
</section>

<section id="contact" className="bg-slate-950 px-6 py-24 text-white">
  <div className="mx-auto max-w-6xl">
    <div className="text-center">
      <p className="text-sm font-bold uppercase tracking-[0.3em] text-sky-400">
        Get Started
      </p>

      <h2 className="mt-3 text-4xl font-bold">
        Ready to Fly?
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
        Tell me a little about your flight-training goals and I’ll get back to
        you about availability and next steps.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <a href="tel:+17608870222" className="rounded-lg border border-sky-400 px-5 py-3 font-semibold text-white hover:bg-slate-800">Call Gregory</a>
        <a href="sms:+17608870222" className="rounded-lg border border-sky-400 px-5 py-3 font-semibold text-white hover:bg-slate-800">Text Gregory</a>
      </div>
    </div>

    <div className="mx-auto mt-12 max-w-3xl rounded-2xl bg-white p-8 text-slate-900 shadow-xl">
 
 {submitted ? (
  <div className="py-10 text-center">
    <h3 className="text-3xl font-bold text-slate-900">
      Thank You!
    </h3>
    <p className="mt-4 text-lg text-slate-600">
      Your flight training inquiry has been received. I&apos;ll get back to you
      as soon as possible.
    </p>
    
  </div>
) : (
 
 <form
  onSubmit={handleSubmit}
  className="space-y-6"
>

        <div>
          <label className="mb-2 block font-semibold">
            Name
          </label>
          <input
            type="text"
            name="name"
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
            placeholder="Your name"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-semibold">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
              placeholder="Phone number"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Training Interest
          </label>
          <select
            name="training"
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
            defaultValue=""
          >
            <option value="" disabled>
              Select an option
            </option>
            <option>Private Pilot Training</option>
            <option>Discovery Flight</option>
            <option>Flight Review</option>
            <option>Proficiency / Rusty Pilot Training</option>
            <option>Ground Instruction</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-semibold">
            Message
          </label>
          <textarea
            name="message"
            required
            rows={5}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-sky-500"
            placeholder="Tell me about your experience and what you’re looking for."
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-sky-500 px-6 py-4 font-bold text-white transition hover:bg-sky-400"
        >
          Send Flight Training Inquiry
        </button>
      </form>
)}
    </div>

    <div className="mt-10 text-center text-slate-300">
      <p>Gregory Smith, CFI</p>
      <p>Southern California</p>

      <a
        href="https://www.linkedin.com/in/gregorysmith-cfi"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block font-semibold text-sky-400 hover:text-sky-300"
      >
        View My LinkedIn →
      </a>
    </div>
  </div>
</section>

<section
  id="reviews"
  className="mx-auto w-full max-w-4xl px-6 py-16"
>
  <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-8">
    <div className="text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-sky-400">
        Student Feedback
      </p>

      <h2 className="mt-2 text-3xl font-bold text-white">
        Comments & Reviews
      </h2>

      <p className="mx-auto mt-4 max-w-2xl text-slate-300">
        Have you trained with Gregory Smith Flight Instruction? Share your
        experience below. Comments are reviewed before being published.
      </p>
    </div>

  {approvedReviews.length > 0 && (
    <div className="mt-10">
      <h3 className="text-center text-xl font-bold text-white">Approved Student Reviews</h3>
      <div className="mt-4 space-y-4">
        {approvedReviews.map((review) => (
          <div key={review.id} className="rounded-xl border border-slate-700 p-4">
            <div className="font-semibold text-white">{review.name}</div>
            <div className="text-yellow-400">{"★".repeat(review.rating)}</div>
            <p className="mt-2 text-slate-300">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )}



    <div className="mt-10">
      {commentSubmitted ? (
        <div className="rounded-xl border border-sky-500/30 bg-sky-500/10 p-6 text-center">
          <h3 className="text-xl font-bold text-white">
            Thank You!
          </h3>

          <p className="mt-2 text-slate-300">
            Your comment has been submitted for review.
          </p>
        </div>
      ) : (
        <form onSubmit={handleCommentSubmit} className="space-y-6">
          <input
            type="hidden"
            name="form_type"
            value="Student Comment / Review"
          />

          <div>
            <label className="mb-2 block font-semibold text-white">
              Name
            </label>

            <input
              type="text"
              name="reviewer_name"
              required
              placeholder="Your name"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold text-white">
              Rating
            </label>

            <select
              name="rating"
              required
              defaultValue=""
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white"
            >
              <option value="" disabled>
                Select a rating
              </option>
              <option value="5">★★★★★ — Excellent</option>
              <option value="4">★★★★☆ — Very Good</option>
              <option value="3">★★★☆☆ — Good</option>
              <option value="2">★★☆☆☆ — Fair</option>
              <option value="1">★☆☆☆☆ — Poor</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-semibold text-white">
              Comment
            </label>

            <textarea
              name="comment"
              required
              rows={5}
              placeholder="Tell me about your experience..."
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-sky-500 px-6 py-3 font-bold text-white hover:bg-sky-400"
          >
            Submit Comment
          </button>
        </form>
      )}
    </div>
  </div>
</section>

    </main>
  );
}