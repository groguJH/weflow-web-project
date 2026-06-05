import { REVIEWS } from '@/data/commonText';

function StarRating({ count }) {
  return (
    <span className="text-yellow-400 text-sm" aria-label={`${count}점 만점 후기`}>
      {'★'.repeat(count)}
    </span>
  );
}

function ReviewCard({ review, size, direction }) {
  const isLarge = size === 'large';
  const isVertical = direction === 'vertical';
  const textClass = isVertical
    ? 'mt-3 text-sm sm:mt-4 sm:text-base'
    : isLarge
    ? 'mt-4 text-base sm:mt-5 sm:text-lg'
    : 'mt-2 text-sm';

  return (
    <article
      className={`flex-shrink-0 rounded-2xl border border-white/[0.07] bg-slate-900/60 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/25 ${
        isVertical
          ? 'mx-auto flex min-h-[8.75rem] w-full max-w-2xl flex-col justify-between p-4 sm:min-h-[9.5rem] sm:p-5 lg:max-w-3xl'
          : isLarge
          ? 'mx-2 flex min-h-[12.5rem] w-[min(18rem,calc(100vw-2.5rem))] flex-col justify-between p-5 sm:mx-4 sm:min-h-[15rem] sm:w-[28rem] sm:p-8 lg:min-h-[17rem]'
          : 'mx-3 w-72 rounded-xl p-5'
      }`}
    >
      <StarRating count={review.stars} />
      <p className={`text-pretty text-keep ${textClass} leading-relaxed text-slate-300`}>
        &ldquo;{review.text}&rdquo;
      </p>
    </article>
  );
}

function ReviewList({ reviews, size, direction, hidden = false }) {
  return (
    <ul
      className={direction === 'vertical' ? 'flex flex-col gap-3 pb-3 sm:gap-4 sm:pb-4' : 'flex'}
      aria-label={hidden ? undefined : '고객 후기 목록'}
      aria-hidden={hidden}
    >
      {reviews.map((review, i) => (
        <li key={`${hidden ? 'copy' : 'main'}-${i}`}>
          <ReviewCard review={review} size={size} direction={direction} />
        </li>
      ))}
    </ul>
  );
}

export default function ReviewSlider({ size = 'default', direction = 'horizontal', duration = 78 }) {
  const isVertical = direction === 'vertical';
  const doubled = [...REVIEWS, ...REVIEWS];

  if (isVertical) {
    return (
      <div className="relative mx-auto h-[22rem] w-full max-w-4xl overflow-hidden px-4 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] sm:h-[24rem] sm:px-6 lg:h-[27rem] lg:px-8">
        <div
          className="animate-marquee-y-down"
          style={{ '--review-marquee-duration': `${duration}s` }}
        >
          <ReviewList reviews={REVIEWS} size={size} direction={direction} hidden />
          <ReviewList reviews={REVIEWS} size={size} direction={direction} />
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden w-full">
      <ul className="flex animate-marquee" aria-label="고객 후기 목록">
        {doubled.map((review, i) => (
          <li key={i} aria-hidden={i >= REVIEWS.length}>
            <ReviewCard review={review} size={size} direction={direction} />
          </li>
        ))}
      </ul>
    </div>
  );
}
