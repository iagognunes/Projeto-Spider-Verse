import HeroesList from "@/components/HeroesList";
import { IHeroData } from "@/interfaces/heroes";
import styles from "./page.module.scss";

async function getHeroesData(): Promise<{ data: IHeroData[] }> {
  const apiUrl = process.env.DOMAIN_ORIGIN;
  const response = await fetch(`${apiUrl}/api/heroes`, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Failed to request heroes list.");
  }

  return response.json();
}

export default async function Home() {
  const heroes = await getHeroesData();

  return (
    <main className={styles.main}>
      <HeroesList heroes={heroes.data} />
    </main>
  );
}
