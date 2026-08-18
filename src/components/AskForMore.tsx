import Link from "next/link";
import { WhatsAppButton } from "./WhatsAppDialog";

/**
 * Closing prompt on the Services and Classes pages. The price lists are not
 * exhaustive — anything not printed on them is still worth asking about, and
 * without this the pages read as a closed menu.
 */
export default function AskForMore({
  heading = "Looking for something not listed?",
  body = "The lists cover what we're asked for most. If you need something else — a different package, a combined booking, or a course built around your schedule — just ask and we'll tell you what's possible.",
  subject,
  tone = "pink",
}: {
  heading?: string;
  body?: string;
  /** Preselects the dialog's dropdown, e.g. "Something else". */
  subject?: string;
  tone?: "pink" | "light";
}) {
  return (
    <section
      className={`section ${tone === "pink" ? "bg-blush-50" : "bg-white"}`}
    >
      <div className="container-page rounded-3xl border border-blush-100 bg-white p-8 text-center sm:p-12">
        <h2 className="heading">{heading}</h2>
        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-ink/70">
          {body}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <WhatsAppButton subject={subject} className="btn-primary">
            Ask on WhatsApp
          </WhatsAppButton>
          <Link href="/#booking" className="btn-secondary">
            Send an enquiry form
          </Link>
        </div>
      </div>
    </section>
  );
}
