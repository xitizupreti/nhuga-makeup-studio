"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { enquiryOptions, site, whatsappLink } from "@/config/site";

type OpenState = { subject?: string } | null;

const DialogContext = createContext<{ open: (subject?: string) => void } | null>(
  null,
);

/** Opens the enquiry dialog. Pass a subject to preselect what it's about. */
export function useWhatsAppDialog() {
  const ctx = useContext(DialogContext);
  if (!ctx) {
    throw new Error("useWhatsAppDialog must be used inside WhatsAppProvider");
  }
  return ctx;
}

const OTHER = "Something else";

/**
 * Every WhatsApp call-to-action opens this first, so the studio receives a
 * message that already says what the enquiry is about and for when — instead of
 * a bare "hi" that takes several replies to pin down.
 */
export function WhatsAppProvider({ children }: { children: React.ReactNode }) {
  const [openState, setOpenState] = useState<OpenState>(null);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState(OTHER);
  const [location, setLocation] = useState("In studio");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  const open = useCallback((preset?: string) => {
    setSubject(preset && enquiryOptions.includes(preset) ? preset : preset || OTHER);
    setOpenState({ subject: preset });
  }, []);

  const close = useCallback(() => setOpenState(null), []);

  useEffect(() => {
    if (!openState) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [openState, close]);

  function send(event: React.FormEvent) {
    event.preventDefault();

    const details = [
      name && `Name: ${name}`,
      subject && `Enquiry about: ${subject}`,
      location && `Location: ${location}`,
      date && `Preferred date: ${date}`,
      notes && `Notes: ${notes}`,
    ].filter(Boolean);

    const message = [`Hi ${site.name},`, "", ...details].join("\n");

    // Opened from inside the submit handler so it counts as a user gesture and
    // isn't treated as a popup.
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
    close();
  }

  // If the preset isn't one of the known options, offer it as an extra choice
  // rather than silently dropping it.
  const options =
    openState?.subject && !enquiryOptions.includes(openState.subject)
      ? [openState.subject, ...enquiryOptions]
      : enquiryOptions;

  return (
    <DialogContext.Provider value={{ open }}>
      {children}

      {openState && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="whatsapp-dialog-title"
          onClick={close}
          className="fixed inset-0 z-[80] flex items-end justify-center bg-blush-900/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
        >
          <form
            onSubmit={send}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">Enquiry</p>
                <h2
                  id="whatsapp-dialog-title"
                  className="mt-2 font-serif text-2xl text-blush-900"
                >
                  A few details first
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">
                  We&apos;ll put these straight into your WhatsApp message so we
                  can reply properly the first time.
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="shrink-0 rounded-full border border-blush-200 p-2 text-blush-700 transition hover:bg-blush-50"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="label" htmlFor="wa-subject">
                  What is it about?
                </label>
                <select
                  id="wa-subject"
                  className="field"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                >
                  {options.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                  <option>{OTHER}</option>
                </select>
              </div>

              <div>
                <label className="label" htmlFor="wa-name">
                  Your name
                </label>
                <input
                  id="wa-name"
                  className="field"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Optional"
                />
              </div>

              <div>
                <label className="label" htmlFor="wa-date">
                  Preferred date
                </label>
                <input
                  id="wa-date"
                  type="date"
                  className="field"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="label" htmlFor="wa-location">
                  Where?
                </label>
                <select
                  id="wa-location"
                  className="field"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option>In studio</option>
                  <option>Outdoor / my venue</option>
                  <option>Not sure yet</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="label" htmlFor="wa-notes">
                  Anything else
                </label>
                <textarea
                  id="wa-notes"
                  rows={3}
                  className="field resize-y"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Venue, timing, number of people…"
                />
              </div>
            </div>

            <button type="submit" className="btn-primary mt-6 w-full">
              Continue on WhatsApp
            </button>
            <p className="mt-3 text-center text-xs text-ink/50">
              Opens WhatsApp with your details already typed. Nothing is sent
              until you press send there.
            </p>
          </form>
        </div>
      )}
    </DialogContext.Provider>
  );
}

/** Styled like whatever you pass in className, but opens the dialog. */
export function WhatsAppButton({
  subject,
  className,
  children,
}: {
  subject?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const { open } = useWhatsAppDialog();

  return (
    <button type="button" onClick={() => open(subject)} className={className}>
      {children}
    </button>
  );
}
