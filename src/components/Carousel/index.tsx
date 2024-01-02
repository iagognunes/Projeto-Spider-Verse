import { IHeroData } from "@/interfaces/heroes";
import HeroDetails from "../HeroDetails/indesx";
import styles from "./carousel.module.scss";

interface IProps {
  heroes: IHeroData[];
  activeId: string;
}

export default function Carousel({ heroes, activeId }: IProps) {
  return (
    <div className={styles.container}>
      <div className={styles.carousel}>
        <div className={styles.wrapper}>Lista com os heróis</div>
      </div>
      
      <div className={styles.details}>
        <HeroDetails data={heroes[0]} />
      </div>
    </div>
  );
}
