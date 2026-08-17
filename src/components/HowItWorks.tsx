import { bookingSteps } from "@/config/site";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section bg-white">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="eyebrow">Booking</p>
          <h2 className="heading mt-3">How it works</h2>
          <p className="mt-4 leading-relaxed text-ink/70">
            Four steps from first message to the day itself.
          </p>
        </div>

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {bookingSteps.map((step, index) => (
            <li key={step.title} className="relative">
              <span
                aria-hidden
                className="font-serif text-4xl font-semibold text-blush-200"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-serif text-xl text-blush-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
