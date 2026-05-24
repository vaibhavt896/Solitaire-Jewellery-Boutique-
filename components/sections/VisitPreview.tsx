import { SITE } from '@/lib/site';
import { Reveal } from '@/components/Reveal';
import { IconPin } from '@/components/icons/Icon';

export function VisitPreview() {
  return (
    <section className="section-pad bg-bone">
      <div className="container-wide">
        <Reveal className="mb-12">
          <p className="eyebrow">Visit Us</p>
          <h2 className="display-page mt-3">Swaroop Nagar, Kanpur.</h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-stretch">
          <Reveal>
            <a
              href={SITE.mapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block aspect-[4/3] md:aspect-auto md:h-full bg-bone-deep border border-line relative overflow-hidden group"
            >
              {/* Static map-like illustration as a placeholder until Mapbox tile is wired */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,#F2EAD0_0%,#FBF7EE_50%,#E8DCC0_100%)]" />
              <svg
                aria-hidden
                className="absolute inset-0 w-full h-full opacity-60"
                viewBox="0 0 600 400"
                preserveAspectRatio="none"
              >
                <g stroke="var(--line)" strokeWidth="1" fill="none">
                  <path d="M0 80 Q200 60 400 100 T600 90" />
                  <path d="M0 160 Q150 140 300 180 T600 170" />
                  <path d="M0 240 Q200 220 380 260 T600 250" />
                  <path d="M0 320 Q200 300 400 340 T600 330" />
                  <path d="M120 0 Q140 120 100 240 T80 400" />
                  <path d="M280 0 Q300 120 260 240 T240 400" />
                  <path d="M440 0 Q460 120 420 240 T400 400" />
                </g>
              </svg>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="bg-ink rounded-full p-3 text-bone shadow-lg">
                  <IconPin size={22} />
                </div>
                <p className="mt-3 bg-paper px-3 py-1 text-micro uppercase tracking-eyebrow border border-line">
                  Solitaire — Swaroop Nagar
                </p>
              </div>
              <span className="absolute bottom-4 right-4 bg-paper border border-line px-3 py-2 text-small group-hover:bg-gold-veil transition-colors">
                Open in Maps →
              </span>
            </a>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="md:py-8">
              <p className="font-display text-h1 leading-tight">
                Solitaire Jewellery Boutique
              </p>
              <p className="text-body text-ink-soft mt-4">
                {SITE.address.full}
              </p>

              <dl className="mt-10 space-y-5 text-body">
                <div>
                  <dt className="eyebrow text-ink-muted">Hours</dt>
                  <dd className="mt-1">{SITE.hours.weekdays}</dd>
                  <dd>{SITE.hours.sunday}</dd>
                </div>
                <div>
                  <dt className="eyebrow text-ink-muted">Phone</dt>
                  <dd className="mt-1">
                    <a href={`tel:${SITE.phoneRaw}`} className="link-underline text-ink">
                      {SITE.phoneDisplay}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-ink-muted">WhatsApp</dt>
                  <dd className="mt-1">
                    <a
                      href={SITE.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline text-ink"
                    >
                      Tap to message us
                    </a>
                  </dd>
                </div>
              </dl>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href={SITE.mapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Get Directions
                </a>
                <a href="/visit" className="btn-secondary">
                  Plan Your Visit
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
