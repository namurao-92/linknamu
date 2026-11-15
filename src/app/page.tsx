import { ProfileHeader } from "@/components/ProfileHeader";
import { LinkList } from "@/components/LinkList";
import { ThemeToggle } from "@/components/ThemeToggle";
import { profile } from "@/data/profile";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col items-center px-6 pb-12 pt-16 sm:pt-24">
      <div className="fixed right-5 top-5 z-10">
        <ThemeToggle />
      </div>

      <ProfileHeader name={profile.name} bio={profile.bio} image={profile.image} />

      <LinkList links={profile.links} />

      <footer className="mt-auto pt-16 text-xs tracking-wide text-stone-400 dark:text-stone-500">
        링크나무
      </footer>
    </main>
  );
}
