import SectionHeader from '@/components/ui/SectionHeader';
import { MANAGEMENT_SYSTEM } from '@/data/servicesText';

const THEME = {
  orange: {
    topBorder: 'before:from-orange-500/60 before:via-red-500/40 before:to-transparent',
    dot: 'bg-orange-400',
    badge: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
  },
  blue: {
    topBorder: 'before:from-blue-500/60 before:via-cyan-500/40 before:to-transparent',
    dot: 'bg-blue-400',
    badge: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  },
  green: {
    topBorder: 'before:from-emerald-500/60 before:via-teal-500/40 before:to-transparent',
    dot: 'bg-emerald-400',
    badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  },
};

export default function ManagementSystemSection() {
  const { sectionTitle, sub, groups } = MANAGEMENT_SYSTEM;

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden" aria-labelledby="management-system-title">
      <div className="absolute top-0 right-0 w-[31.25rem] h-[31.25rem] bg-cyan-400/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <SectionHeader
          titleId="management-system-title"
          eyebrow="DETAIL"
          title={sectionTitle}
          description={sub}
          className="mb-14"
          eyebrowClassName="border-orange-500/30 bg-orange-500/5 text-orange-400 tracking-[0.25em]"
          titleClassName="text-3xl sm:text-4xl"
        />

        <ul className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {groups.map((group) => {
            const theme = THEME[group.theme];
            return (
              <li
                key={group.title}
                className={`relative bg-slate-900/50 backdrop-blur-sm border border-white/[0.07] rounded-2xl p-6 overflow-hidden
                  before:absolute before:inset-x-0 before:top-0 before:h-[0.125rem] before:bg-gradient-to-r ${theme.topBorder}`}
              >
                {/* Card header */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-2xl" aria-hidden="true">{group.icon}</span>
                  <div>
                    <h3 className="text-base font-bold text-white leading-tight">{group.title}</h3>
                    <span className={`inline-block mt-1 px-2 py-0.5 rounded-full border text-[0.625rem] font-bold ${theme.badge}`}>
                      {group.badge}
                    </span>
                  </div>
                </div>

                {/* Item list */}
                <ul className="space-y-4">
                  {group.items.map((item) => (
                    <li key={item.title} className="flex items-start gap-3">
                      <span className="flex-shrink-0 text-base leading-tight mt-0.5">{item.icon}</span>
                      <div>
                        <p className="text-sm font-bold text-white leading-tight">{item.title}</p>
                        {item.desc && (
                          <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{item.desc}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
