"use client";

import { useState } from "react";
import { enquiryOptions, site, whatsappLink } from "@/config/site";

const serviceOptions = enquiryOptions;

type Status = "idle" | "sending" | "sent" | "error";

const emptyForm = {
  name: "",
  phone: "",
  email: "",
  service: serviceOptions[0] ?? "",
  location: "In studio",
  date: "",
  message: "",
};

export default function Booking() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const update = (field: keyof typeof form) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const summary = [
    `Hi ${site.name}, I'd like to book an appointment.`,
    form.name && `Name: ${form.name}`,
    form.phone && `Phone: ${form.phone}`,
    form.service && `Service: ${form.service}`,
    form.location && `Location: ${form.location}`,
    form.date && `Preferred date: ${form.date}`,
    form.message && `Note: ${form.message}`,
  ]
    .filter(Boolean)
    .join("\n");

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error ?? "Could not send the enquiry.");

      setStatus("sent");
      setForm(emptyForm);
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error ? err.message : "Could not send the enquiry.",
      );
    }
  }

  return (
    <section id="booking" className="section bg-blush-50">
      <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="eyebrow">Booking</p>
          <h2 className="heading mt-3">Reserve your date</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            Send the form and we&apos;ll reply to confirm availability. In a
            hurry? WhatsApp is the fastest way to reach the studio.
          </p>

          <a
            href={whatsappLink(summary)}
            target="_blank"
            rel="noreferrer"
            className="btn-primary mt-8"
          >
            Send this on WhatsApp
          </a>
          <p className="mt-3 text-xs text-ink/50">
            Opens WhatsApp with whatever you&apos;ve filled in already.
          </p>

          <dl className="mt-10 space-y-4 border-t border-blush-200 pt-6 text-sm">
            <div>
              <dt className="text-xs uppercase tracking-wider text-ink/50">Phone</dt>
              <dd className="mt-1 flex flex-col gap-0.5">
                <a href={`tel:+${site.phone}`} className="text-blush-700">
                  {site.phoneDisplay}
                </a>
                <a href={`tel:+${site.phoneAlt}`} className="text-blush-700">
                  {site.phoneAltDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-ink/50">Email</dt>
              <dd className="mt-1">
                <a href={`mailto:${site.email}`} className="text-blush-700">
                  {site.email}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-3xl border border-blush-100 bg-white p-6 shadow-sm sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                required
                className="field"
                value={form.name}
                onChange={(e) => update("name")(e.target.value)}
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="label" htmlFor="phone">
                Phone
              </label>
              <input
                id="phone"
                required
                type="tel"
                className="field"
                value={form.phone}
                onChange={(e) => update("phone")(e.target.value)}
                placeholder="98xxxxxxxx"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="label" htmlFor="email">
                Email <span className="normal-case text-ink/40">(optional)</span>
              </label>
              <input
                id="email"
                type="email"
                className="field"
                value={form.email}
                onChange={(e) => update("email")(e.target.value)}
                placeholder="you@example.com"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="label" htmlFor="service">
                Service or class
              </label>
              <select
                id="service"
                className="field"
                value={form.service}
                onChange={(e) => update("service")(e.target.value)}
              >
                {serviceOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
                <option>Something else</option>
              </select>
            </div>

            <div>
              <label className="label" htmlFor="location">
                Location
              </label>
              <select
                id="location"
                className="field"
                value={form.location}
                onChange={(e) => update("location")(e.target.value)}
              >
                <option>In studio</option>
                <option>Outdoor / my venue</option>
              </select>
            </div>

            <div>
              <label className="label" htmlFor="date">
                Preferred date
              </label>
              <input
                id="date"
                type="date"
                className="field"
                value={form.date}
                onChange={(e) => update("date")(e.target.value)}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="label" htmlFor="message">
                Anything else
              </label>
              <textarea
                id="message"
                rows={4}
                className="field resize-y"
                value={form.message}
                onChange={(e) => update("message")(e.target.value)}
                placeholder="Venue, timing, number of people…"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="btn-primary mt-6 w-full disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Send enquiry"}
          </button>

          {status === "sent" && (
            <p className="mt-4 rounded-xl bg-blush-100 px-4 py-3 text-sm text-blush-800">
              Thank you — your enquiry is in. We&apos;ll get back to you shortly.
            </p>
          )}
          {status === "error" && (
            <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {error} You can also reach us on WhatsApp.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
