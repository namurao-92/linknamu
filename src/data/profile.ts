export type LinkItem = {
  id: string;
  title: string;
  url: string;
};

export type Profile = {
  name: string;
  bio: string;
  /** public/ 폴더 기준 경로 또는 next.config.ts에 허용된 외부 URL. 비워두면 이름 첫 글자를 표시합니다. */
  image?: string;
  links: LinkItem[];
};

export const profile: Profile = {
  name: "이승진",
  bio: "풀스택 개발자|요즘에는 AI 개발에 관심이 많아요",
  image: "/고양이.png",
  links: [
    { id: "github", title: "🐙 깃허브", url: "https://github.com/namurao-92" },
    { id: "blog", title: "✍️ 블로그", url: "https://blog.naver.com/leepromotion" },
    { id: "email", title: "📬 이메일", url: "mailto:leesjin92@gmail.com" },
  ],
};
