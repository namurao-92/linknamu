export type LinkItem = {
  id: string;
  title: string;
  url: string;
};

export type Profile = {
  name: string;
  bio: string;
  /** public/ 폴더 기준 경로. 비워두면 이름 첫 글자를 표시합니다. */
  image?: string;
  links: LinkItem[];
};

export const profile: Profile = {
  name: "이승진",
  bio: "세계 최강 바이브코더",
  image: "",
  links: [
    { id: "github", title: "GitHub", url: "https://github.com" },
    { id: "blog", title: "블로그", url: "https://velog.io" },
    { id: "instagram", title: "Instagram", url: "https://instagram.com" },
  ],
};
