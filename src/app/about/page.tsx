import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import JsonLd from "@/components/JsonLd";
import { WhatsAppButton } from "@/components/WhatsAppDialog";
import { getLogo, getPortrait } from "@/lib/assets";
import { getAlbums } from "@/lib/gallery";
import { breadcrumbSchema, founderSchema } from "@/lib/schema";
import { founder, site } from "@/config/site";

const description = `${founder.name} is the ${founder.role.toLowerCase()} at Nhuga Makeup Studio, Kalimati Chowk, Kathmandu — bridal and party makeup, nails and lash work, plus hands-on courses.`;

export const metadata: Metadata = {
  title: `About ${founder.name}`,
  description,
  alternates: { canonical: "/about" },
  openGraph: { title: `About ${founder.name}`, description, url: "/about" },
};

export default function AboutPage() {
  const portrait = getPortrait();
  const logo = getLogo();
  // She keeps a "Certificates" album in the gallery; it belongs here too.
  const certificates = getAlbums().find(
    (album) => album.slug === "certificates" && album.photos.length > 0,
  );

  return (
    <>
      <JsonLd data={breadcrumbSchema(`About ${founder.name}`, "/about")} />
      <JsonLd data={founderSchema()} />

      <PageHeader
        eyebrow="Who we are"
        title={`About ${founder.name}`}
        intro={`${founder.role}, Nhuga Makeup Studio.`}
      />

      <section className="scroll-mt-20 bg-white pb-20 pt-10 sm:pb-28 sm:pt-12">
        <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-blush-200 bg-blush-100 shadow-xl shadow-blush-200/40">
            {portrait ? (
              <Image
                src={portrait}
                alt={`${founder.name}, ${founder.role}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-5 bg-gradient-to-br from-blush-200 via-blush-100 to-blush-300/60 p-10 text-center">
                {logo && (
                  <Image
                    src={logo}
                    alt=""
                    width={320}
                    height={415}
                    className="h-auto w-40 mix-blend-multiply sm:w-48"
                  />
                )}
                <p className="font-serif text-xl text-blush-800">
                  {founder.name}
                </p>
              </div>
            )}
          </div>

          <div>
            <p className="eyebrow">{founder.role}</p>
            <h2 className="heading mt-3">{founder.name}</h2>

            <div className="mt-6 space-y-4 leading-relaxed text-ink/70">
              {founder.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <dl className="mt-10 grid gap-5 border-t border-blush-200 pt-6 sm:grid-cols-2">
              {founder.highlights.map((item) => (
                <div key={item.label}>
                  <dt className="text-xs uppercase tracking-wider text-ink/50">
                    {item.label}
                  </dt>
                  <dd className="mt-1 font-serif text-lg text-blush-800">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex flex-wrap gap-3">
              <WhatsAppButton className="btn-primary">
                Message Oshika
              </WhatsAppButton>
              <Link href="/classes" className="btn-secondary">
                See the classes
              </Link>
            </div>
          </div>
        </div>
      </section>

      {certificates && (
        <section className="section bg-blush-50">
          <div className="container-page">
            <div className="max-w-2xl">
              <p className="eyebrow">Training</p>
              <h2 className="heading mt-3">Certificates</h2>
              <p className="mt-4 leading-relaxed text-ink/70">
                Qualifications and course certificates.
              </p>
            </div>

            <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {certificates.photos.map((photo, index) => (
                <li
                  key={photo}
                  className="relative aspect-[3/4] overflow-hidden rounded-xl border border-blush-200 bg-white"
                >
                  <Image
                    src={photo}
                    alt={`Certificate ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-contain p-2"
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="section bg-white">
        <div className="container-page rounded-3xl border border-blush-100 bg-blush-50 p-8 text-center sm:p-12">
          <h2 className="heading">Come and see us</h2>
          <p className="mx-auto mt-4 max-w-lg leading-relaxed text-ink/70">
            {site.address.line1}, {site.address.line2}. Opening{" "}
            {site.promo.date}.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/#booking" className="btn-primary">
              Book an appointment
            </Link>
            <Link href="/#contact" className="btn-secondary">
              Find the studio
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
