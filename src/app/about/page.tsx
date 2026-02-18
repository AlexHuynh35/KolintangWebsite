import { people } from "@/data/people";
import { PageTitle, SectionTitle, PersonCard, FactCard } from "@/components";

export default function AboutPage() {
  return (
    <section className="py-6 bg-gray-100">
      <PageTitle
        title="About Us"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      />

      <SectionTitle title="About Our Group" onLeft={false} />

      <FactCard
        title="Our Vision"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        imageUrl="/media/general/kolintang.jpeg"
        onLeft={true}
      />

      <FactCard
        title="Our Mission"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        imageUrl="/media/general/kolintang.jpeg"
        onLeft={false}
      />

      <SectionTitle title="Meet Our Team" onLeft={true} />
      
      <div className="max-w-6xl mx-auto p-6 grid gap-6 items-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {people.map((person) => (
          <PersonCard key={person.id} {...person} />
        ))}
      </div>
    </section>
  );
}
