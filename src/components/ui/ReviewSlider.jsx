import { REVIEWS } from '@/data/commonText';

function StarRating({ count }) {
  return (
    <span className="text-sm text-yellow-400" aria-label={`${count}점 만점 후기`}>
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
    ? 'mt-3 text-[clamp(0.78rem,1.4vw,0.92rem)]'
    : 'mt-2 text-sm';

  return (
    <article
      className={`flex-shrink-0 rounded-2xl border border-white/[0.07] bg-slate-900/60 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/25 hover:bg-slate-900/80 ${
        isVertical
          ? 'mx-auto flex min-h-[8.75rem] w-full max-w-2xl flex-col justify-between p-4 sm:min-h-[9.5rem] sm:p-5 lg:max-w-3xl'
          : isLarge
          ? 'mx-2 flex min-h-[clamp(7rem,12vw,8.25rem)] w-[min(17rem,calc(100vw-2.5rem))] flex-col justify-between p-[clamp(1rem,2vw,1.25rem)] sm:mx-3 sm:w-[18.5rem]'
          : 'mx-3 w-72 rounded-xl p-5'
      }`}
    >
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <StarRating count={review.stars} />
        {review.author && (
          <span className="text-keep text-[clamp(0.68rem,1.15vw,0.78rem)] font-bold text-slate-300">
            - {review.author}
          </span>
        )}
      </div>
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

function splitReviewsIntoRows(reviews, rowCount) {
  const perRow = Math.ceil(reviews.length / rowCount);

  return Array.from({ length: rowCount }, (_, idx) =>
    reviews.slice(idx * perRow, (idx + 1) * perRow)
  ).filter((row) => row.length > 0);
}

function MarqueeRow({ reviews, size, duration, reverse = false, label }) {
  const doubled = [...reviews, ...reviews];

  return (
    <ul
      className="flex animate-marquee"
      aria-label={label}
      style={{
        animationDuration: `${duration}s`,
        animationDirection: reverse ? 'reverse' : 'normal',
      }}
    >
      {doubled.map((review, i) => (
        <li key={`${review.author || 'review'}-${i}`} aria-hidden={i >= reviews.length}>
          <ReviewCard review={review} size={size} direction="horizontal" />
        </li>
      ))}
    </ul>
  );
}

export default function ReviewSlider({
  size = 'default',
  direction = 'horizontal',
  duration = 78,
  rows = 1,
}) {
  const isVertical = direction === 'vertical';

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

  if (rows > 1) {
    const reviewRows = splitReviewsIntoRows(REVIEWS, rows);

    return (
      <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]">
        <div className="flex flex-col gap-[clamp(1.5rem,3.4vw,2.35rem)]">
          {reviewRows.map((reviews, idx) => (
            <MarqueeRow
              key={`review-row-${idx + 1}`}
              reviews={reviews}
              size={size}
              duration={duration + idx * 8}
              reverse={idx % 2 === 1}
              label={idx === 0 ? '고객 후기 목록' : undefined}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden w-full">
      <MarqueeRow reviews={REVIEWS} size={size} duration={duration} label="고객 후기 목록" />
    </div>
  );
}
