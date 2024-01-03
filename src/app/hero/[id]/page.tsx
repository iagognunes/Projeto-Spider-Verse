import Carousel from "@/components/Carousel";
import { IHeroData } from "@/interfaces/heroes";

interface IProps {
  params: {
    id: string;
  };
}

async function getHeroesData(): Promise<{ data: IHeroData[] }> {
  const apiUrl = process.env.DOMAIN_ORIGIN;
  const response = await fetch(`${apiUrl}/api/heroes`, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Failed to request heroes list.");
  }

  return response.json();
}

export default async function Hero({ params: { id } }: IProps) {
  const heroes = await getHeroesData();

  return <Carousel heroes={heroes.data} activeId={id} />;
}
