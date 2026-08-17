import { faqs } from "@/config/site";
import { WhatsAppButton } from "./WhatsAppDialog";

export default function Faq() {
  return (
    <section id="faq" className="section bg-blush-50">
      <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="eyebrow">Questions</p>
          <h2 className="heading mt-3">Good to know</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            Anything not covered here, just ask — we reply on WhatsApp.
          </p>
          <WhatsAppButton className="btn-primary mt-6">
            Ask a question
          </WhatsAppButton>
        </div>

        <ul className="divide-y divide-blush-200">
          {faqs.map((item) => (
            <li key={item.q}>
              {/* <details> keeps this working without JavaScript. */}
              <details className="group py-4">
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-serif text-lg text-blush-900 marker:content-none">
                  {item.q}
                  <svg
                    aria-hidden
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="shrink-0 text-blush-500 transition group-open:rotate-45"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </summary>
                <p className="mt-3 pr-8 text-sm leading-relaxed text-ink/70">
                  {item.a}
                </p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
