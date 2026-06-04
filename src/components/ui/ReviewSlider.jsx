import { REVIEWS } from '@/data/commonText';

function StarRating({ count }) {
  return (
    <span className="text-yellow-400 text-sm" aria-label={`${count}점 만점 후기`}>
      {'★'.repeat(count)}
    </span>
  );
}

function ReviewCard({ review, size }) {
  const isLarge = size === 'large';

  return (
    <article
      className={`flex-shrink-0 rounded-2xl border border-white/[0.07] bg-slate-900/60 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/25 ${
        isLarge
          ? 'mx-2 flex min-h-[12.5rem] w-[min(18rem,calc(100vw-2.5rem))] flex-col justify-between p-5 sm:mx-4 sm:min-h-[15rem] sm:w-[28rem] sm:p-8 lg:min-h-[17rem]'
          : 'mx-3 w-72 rounded-xl p-5'
      }`}
    >
      <StarRating count={review.stars} />
      <p className={`text-pretty text-keep ${isLarge ? 'mt-4 text-base sm:mt-5 sm:text-lg' : 'mt-2 text-sm'} leading-relaxed text-slate-300`}>
        &ldquo;{review.text}&rdquo;
      </p>
    </article>
  );
}

export default function ReviewSlider({ size = 'default' }) {
  const doubled = [...REVIEWS, ...REVIEWS];

  return (
    <div className="overflow-hidden w-full">
      <ul className="flex animate-marquee" aria-label="고객 후기 목록">
        {doubled.map((review, i) => (
          <li key={i} aria-hidden={i >= REVIEWS.length}>
            <ReviewCard review={review} size={size} />
          </li>
        ))}
      </ul>
    </div>
  );
}
