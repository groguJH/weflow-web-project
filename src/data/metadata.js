export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://weflowlab.kr';
export const SITE_NAME = 'WEFLOW';
export const SITE_TITLE = 'WEFLOW — 문의로 이어지는 홈페이지를 만듭니다';
export const SITE_DESCRIPTION =
  '홈페이지 제작부터 광고 연동·운영 관리까지, 단순 제작이 아닌 문의 구조까지 설계합니다.';
export const OG_IMAGE = '/main_icon.png';

export function createPageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = '/',
  images = [OG_IMAGE],
  noIndex = false,
}) {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      images,
      locale: 'ko_KR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
          index: true,
          follow: true,
        },
  };
}
