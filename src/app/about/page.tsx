import { people } from "@/data/people";
import { PersonCard, SectionTitle } from "@/components";

export default function AboutPage() {
  return (
    <section className="py-6 bg-gray-100">
      <SectionTitle title="Meet Our Team" onLeft={true} />
      <div className="max-w-6xl mx-auto p-6 grid gap-6 items-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {people.map((person) => (
          <PersonCard key={person.id} {...person} />
        ))}
      </div>
    </section>
  );
}
