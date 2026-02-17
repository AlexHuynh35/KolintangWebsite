import { people } from "@/data/people";
import { PersonCard } from "@/components";

export default function AboutPage() {
  return (
    <section className="py-6 bg-gray-100">
      <div className="max-w-6xl mx-auto grid gap-6 items-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {people.map((person) => (
          <PersonCard key={person.id} {...person} />
        ))}
      </div>
    </section>
  );
}
