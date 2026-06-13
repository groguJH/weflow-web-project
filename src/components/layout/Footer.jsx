import Link from 'next/link';
import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaPhoneAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { SiKakaotalk, SiNaver } from 'react-icons/si';
import { FOOTER } from '@/data/commonText';

const CONTACT_ICONS = {
  phone: FaPhoneAlt,
  email: MdEmail,
  kakao: SiKakaotalk,
  instagram: FaInstagram,
  naver: SiNaver,
  facebook: FaFacebookF,
};

const CONTACT_ICON_STYLES = {
  phone: 'bg-blue-500/12 text-blue-300',
  email: 'bg-cyan-500/12 text-cyan-300',
  kakao: 'bg-[#FEE500] text-[#371D1E]',
  instagram: 'bg-pink-500/14 text-pink-300',
  naver: 'bg-[#03C75A] text-white',
  facebook: 'bg-blue-600/18 text-blue-300',
};

function getLinkProps(href) {
  if (!href?.startsWith('http')) return {};

  return {
    target: '_blank',
    rel: 'noopener noreferrer',
  };
}

function FooterColumn({ title, items, className = '' }) {
  return (
    <nav aria-label={title} className={className}>
      <h2 className="mb-[clamp(0.85rem,1.8vw,1.15rem)] whitespace-nowrap text-[clamp(0.76rem,1vw,0.92rem)] font-black text-white">
        {title}
      </h2>
      <ul className="space-y-[clamp(0.58rem,1.2vw,0.9rem)]">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="text-keep text-[clamp(0.7rem,0.95vw,0.86rem)] font-medium leading-relaxed text-slate-400 transition-colors duration-200 hover:text-white"
              {...getLinkProps(item.href)}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function ContactColumn({ className = '' }) {
  const { title, items } = FOOTER.links.contact;

  return (
    <nav aria-label={title} className={className}>
      <h2 className="mb-[clamp(0.85rem,1.8vw,1.15rem)] whitespace-nowrap text-[clamp(0.76rem,1vw,0.92rem)] font-black text-white">
        {title}
      </h2>
      <ul className="space-y-[clamp(0.55rem,1.1vw,0.85rem)]">
        {items.map((item) => {
          const Icon = CONTACT_ICONS[item.icon] ?? MdEmail;

          return (
            <li key={item.label}>
              <Link
                href={item.href}
                className="group inline-flex items-center gap-[clamp(0.35rem,0.8vw,0.6rem)] text-[clamp(0.7rem,0.95vw,0.86rem)] font-medium leading-relaxed text-slate-400 transition-colors duration-200 hover:text-white"
                {...getLinkProps(item.href)}
              >
                <span
                  className={`flex size-[clamp(1.15rem,1.8vw,1.65rem)] shrink-0 items-center justify-center rounded-full text-[clamp(0.58rem,0.9vw,0.8rem)] transition-transform duration-200 group-hover:scale-105 ${
                    CONTACT_ICON_STYLES[item.icon] ?? CONTACT_ICON_STYLES.email
                  }`}
                  aria-hidden="true"
                >
                  <Icon />
                </span>
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden border-t border-slate-800 bg-[#0a0f1e] py-[clamp(2.75rem,6vw,4.75rem)]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[0.0625rem] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-[clamp(2.5rem,6vw,4.5rem)] md:flex-row md:flex-nowrap md:items-start md:justify-between md:gap-[clamp(1.5rem,3.5vw,4rem)]">
          <section className="flex flex-col md:w-[14.5rem] md:flex-none lg:w-[18rem] xl:w-[20rem]" aria-labelledby="footer-brand">
            <Link href="/" aria-label="WEFLOW 홈으로 이동" className="inline-flex w-fit items-center gap-2">
              <Image src="/logo_icon.png" alt="" width={34} height={34} className="size-[clamp(1.75rem,3vw,2.125rem)] object-contain" />
              <span id="footer-brand" className="text-[clamp(1rem,1.8vw,1.2rem)] font-black text-white">
                WEFLOW
              </span>
            </Link>
            <p className="mt-[clamp(1.1rem,2.5vw,1.8rem)] whitespace-pre-line text-[clamp(0.72rem,1vw,0.92rem)] font-medium leading-relaxed text-slate-400">
              {FOOTER.tagline}
            </p>
            <address className="mt-[clamp(1.1rem,2.5vw,1.8rem)] space-y-1.5 text-[clamp(0.66rem,0.9vw,0.8rem)] leading-relaxed text-slate-500 not-italic">
              <p>{FOOTER.info.ceo}</p>
              <p>{FOOTER.info.bizNo}</p>
              <p>{FOOTER.info.email}</p>
              <p>{FOOTER.info.hours}</p>
            </address>
            <div className="mt-[clamp(1.1rem,2.5vw,1.8rem)] border-t border-white/[0.06] pt-[clamp(0.85rem,1.6vw,1.15rem)]">
              <nav className="mb-2 flex flex-wrap items-center gap-3" aria-label="약관 메뉴">
                {FOOTER.legal.map((item, i) => (
                  <span key={item.href} className="flex items-center gap-3">
                    <Link href={item.href} className="text-[clamp(0.72rem,1vw,0.8rem)] text-slate-500 transition-colors hover:text-slate-300">{item.label}</Link>
                    {i < FOOTER.legal.length - 1 && <span className="text-slate-700" aria-hidden="true">|</span>}
                  </span>
                ))}
              </nav>
              <p className="text-[clamp(0.7rem,0.95vw,0.78rem)] text-slate-600">{FOOTER.copyright}</p>
            </div>
          </section>

          <FooterColumn
            title={FOOTER.links.service.title}
            items={FOOTER.links.service.items}
            className="md:w-[8.5rem] md:flex-none lg:w-[11rem] xl:w-[12rem]"
          />
          <FooterColumn
            title={FOOTER.links.carePlan.title}
            items={FOOTER.links.carePlan.items}
            className="md:w-[8.5rem] md:flex-none lg:w-[11rem] xl:w-[12rem]"
          />
          <ContactColumn className="md:w-[10rem] md:flex-none lg:w-[13rem] xl:w-[14rem]" />
        </div>
      </div>
    </footer>
  );
}
