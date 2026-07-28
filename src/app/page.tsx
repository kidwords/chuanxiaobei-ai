import { ContactBlock } from "./components/ContactBlock";
import { HomeHero } from "./components/HomeHero";
import { listProjects } from "../../lib/projects.data";

export default function Home() {
  return (
    <>
      <HomeHero projects={listProjects()} />
      <ContactBlock />
    </>
  );
}
