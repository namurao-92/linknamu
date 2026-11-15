import Image from "next/image";

type Props = {
  name: string;
  bio: string;
  image?: string;
};

export function ProfileHeader({ name, bio, image }: Props) {
  return (
    <header className="flex flex-col items-center text-center">
      {image ? (
        <Image
          src={image}
          alt={`${name} 프로필 사진`}
          width={176}
          height={176}
          priority
          className="size-44 rounded-full object-cover ring-4 ring-white dark:ring-stone-800"
        />
      ) : (
        <div
          aria-hidden
          className="flex size-44 items-center justify-center rounded-full bg-emerald-600 text-6xl font-bold text-white ring-4 ring-white dark:ring-stone-800"
        >
          {name.charAt(0)}
        </div>
      )}
      <h1 className="mt-5 text-xl font-bold">{name}</h1>
      <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">{bio}</p>
    </header>
  );
}
