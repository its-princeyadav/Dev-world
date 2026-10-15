import PageHero from "@/components/layout/PageHero";
import Section from "@/components/common/Section";
import RowList from "@/components/common/RowList";
import TagList from "@/components/common/TagList";
import { technologyGroups } from "@/data/technologies";

export const metadata = {
  title: "Technologies",
  description:
    "The frameworks, languages, and platforms Dev World uses to build fast, reliable, and scalable software.",
};

export default function TechnologiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Technologies"
        title="A Modern Stack, Chosen for the Problem"
        description="We're framework-agnostic by principle — every project starts with the right tool for the job, not our favorite hammer."
      />

      <Section className="pt-[3vw]">
        <RowList
          titleAs="h2"
          rows={technologyGroups.map((group, index) => ({
            label: String(index + 1).padStart(2, "0"),
            title: group.category,
            aside: <TagList items={group.items} />,
          }))}
        />
      </Section>
    </>
  );
}
