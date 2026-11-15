import { ProfileHeader } from "@/components/ProfileHeader";
import { LinkCard } from "@/components/LinkCard";
import { ThemeToggle } from "@/components/ThemeToggle";
import { profile } from "@/data/profile";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-col items-center px-4 pb-16 pt-12 sm:pt-20">
      <div className="fixed right-4 top-4">
        <ThemeToggle />
      </div>

      <ProfileHeader name={profile.name} bio={profile.bio} image={profile.image} />

      <ul className="mt-8 flex w-full flex-col gap-3">
        {profile.links.map((link) => (
          <li key={link.id}>
            <LinkCard id={link.id} title={link.title} url={link.url} />
          </li>
        ))}
      </ul>

      <footer className="mt-12 text-xs text-stone-400 dark:text-stone-600">링크나무</footer>
    </main>
  );
}
