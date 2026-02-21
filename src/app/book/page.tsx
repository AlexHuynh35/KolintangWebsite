import { PageTitle, SectionTitle, EventCard, Calendar } from "@/components";

export default function BookPage() {
  return (
    <section className="py-6 bg-gray-100">
      <PageTitle
        title="Book a Performance"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      />

      <Calendar />

      <SectionTitle title="Check Out These Performances" onLeft={false} />

      <EventCard
        title="Kolintang Performance 1"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        videoUrl="https://www.youtube.com/embed/c3FVbpa-jTc?si=p6Gx9tF26Ycp3wB3"
      />

      <EventCard
        title="Kolintang Performance 2"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        videoUrl="https://www.youtube.com/embed/c3FVbpa-jTc?si=p6Gx9tF26Ycp3wB3"
      />
    </section>
  );
}
