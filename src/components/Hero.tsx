import Image from "next/image";
import { site } from "@/config/site";
import { WhatsAppButton } from "./WhatsAppDialog";

/**
 * The panel deliberately shows the logo on a pink card rather than a gallery
 * photo — it reads as the studio's identity, which is what the top of the page
 * is for. The work itself is one scroll down in the gallery teaser.
 */
export default function Hero({ logo }: { logo?: string | null }) {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-blush-100 via-cream to-cream" />
      <div className="pointer-events-none absolute -left-24 top-10 -z-10 h-72 w-72 rounded-full bg-blush-200/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-40 -z-10 h-80 w-80 rounded-full bg-blush-300/30 blur-3xl" />

      <div className="container-page grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-2">
        <div className="animate-fade-up">
          <p className="eyebrow">Kalimati Chowk, Kathmandu</p>
          <h1 className="heading mt-4 text-balance text-4xl sm:text-5xl lg:text-[3.25rem]">
            Makeup that looks like
            <span className="block text-blush-500">the best version of you</span>
          </h1>
          <p className="mt-5 font-serif text-lg italic text-blush-600">
            {site.tagline}
          </p>
          <p className="mt-4 max-w-md text-base leading-relaxed text-ink/70">
            Bridal, engagement and party makeup — in the studio or at your venue.
            We also run hands-on classes in makeup, nails and lash extension.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/#booking" className="btn-primary">
              Book an appointment
            </a>
            <WhatsAppButton className="btn-secondary">
              Chat on WhatsApp
            </WhatsAppButton>
          </div>

          <dl className="mt-12 grid max-w-sm grid-cols-3 gap-4 border-t border-blush-200 pt-6 sm:gap-6">
            <div>
              <dt className="text-[0.65rem] uppercase tracking-wider text-ink/50 sm:text-xs">
                Studio
              </dt>
              <dd className="mt-1 font-serif text-lg text-blush-800 sm:text-xl">
                Kalimati
              </dd>
            </div>
            <div>
              <dt className="text-[0.65rem] uppercase tracking-wider text-ink/50 sm:text-xs">
                Outdoor
              </dt>
              <dd className="mt-1 font-serif text-lg text-blush-800 sm:text-xl">
                On booking
              </dd>
            </div>
            <div>
              <dt className="text-[0.65rem] uppercase tracking-wider text-ink/50 sm:text-xs">
                Classes
              </dt>
              <dd className="mt-1 font-serif text-lg text-blush-800 sm:text-xl">
                Available
              </dd>
            </div>
          </dl>
        </div>

        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-blush-200 bg-blush-100 shadow-xl shadow-blush-200/40">
          <div className="flex h-full w-full flex-col items-center justify-center gap-6 bg-gradient-to-br from-blush-200 via-blush-100 to-blush-300/60 p-10 text-center">
            {logo && (
              <Image
                src={logo}
                alt=""
                width={320}
                height={415}
                priority
                className="h-auto w-44 max-w-[70%] mix-blend-multiply sm:w-56"
              />
            )}
            <div>
              <p className="font-serif text-2xl text-blush-800">{site.name}</p>
              <p className="mt-1 text-sm italic text-blush-700/80">
                {site.tagline}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
