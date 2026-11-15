import Image from "next/image";

type Props = {
  name: string;
  bio: string;
  image?: string;
};

// 사진 아래로 은은하게 퍼지는 그림자 + 흰 테두리로 살짝 떠 있는 느낌을 줍니다.
const avatarClass =
  "size-28 rounded-full ring-4 ring-white/80 shadow-[0_12px_32px_-8px_rgb(180_100_60/0.35),0_2px_6px_rgb(120_70_40/0.12)] sm:size-32 dark:ring-white/10 dark:shadow-[0_12px_32px_-8px_rgb(0_0_0/0.6)]";

export function ProfileHeader({ name, bio, image }: Props) {
  return (
    <header className="flex flex-col items-center text-center">
      {image ? (
        <Image
          src={image}
          alt={`${name} 프로필 사진`}
          width={128}
          height={128}
          priority
          className={`${avatarClass} object-cover`}
        />
      ) : (
        <div
          aria-hidden
          className={`${avatarClass} flex items-center justify-center bg-gradient-to-br from-orange-300 to-rose-300 text-5xl font-bold text-white`}
        >
          {name.charAt(0)}
        </div>
      )}
      <h1 className="mt-6 text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
        {name}
      </h1>
      <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-stone-500 dark:text-stone-400">
        {bio}
      </p>
    </header>
  );
}
