import { PageTitle, SectionTitle, FactCard, EventCard } from "@/components";

export default function Home() {
  return (
    <section className="py-6 bg-gray-100">
      <PageTitle
        title="Bringing the Sound of Kolintang to San Francisco"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      />

      <SectionTitle title="About the Kolintang" onLeft={false} />

      <FactCard
        title="What Is the Kolintang?"
        description="The Kolintang is a traditional Minahasan percussion instrument from North Sulawesi, Indonesia. It consists of wooden bars arranged in a row and mounted on a wooden resonator box, and it is typically performed in an ensemble."
        imageUrl="/media/general/kolintang.jpg"
        onLeft={true}
      />

      <FactCard
        title="History of the Kolintang"
        description="Historically, Kolintang music was closely tied to animist beliefs and played in sacred contexts, particularly during rituals intended to communicate with ancestral spirits. With the spread of Christianity in the 19th century, the instrument gradually fell out of use. However, in 1940, Nelwan Katuuk revitalized the Kolintang by adapting it to the Western diatonic scale, allowing it to be incorporated into new musical contexts."
        imageUrl="/media/general/kolintang.jpg"
        onLeft={false}
      />

      <FactCard
        title="Kolintang Today"
        description="Today, the Kolintang has found renewed life in secular and interfaith settings. It is commonly performed alongside dance and folk songs at weddings, community celebrations, and cultural events, demonstrating its adaptability while remaining deeply rooted in Minahasan heritage."
        imageUrl="/media/general/kolintang.jpg"
        onLeft={true}
      />

      <SectionTitle title="Kolintang in Action" onLeft={true} />

      <EventCard
        title="Kolintang Performance"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        videoUrl="https://www.youtube.com/embed/c3FVbpa-jTc?si=p6Gx9tF26Ycp3wB3"
      />
    </section>
  );
}
