"use client";
import { useEffect, useMemo, useState } from "react";
import { IHeroData } from "@/interfaces/heroes";
import HeroDetails from "../HeroDetails/indesx";
import styles from "./carousel.module.scss";
import HeroPicture from "../HeroPicture";
import { AnimatePresence, motion } from "framer-motion";

enum enPosition {
  FRONT = 0,
  MIDDLE = 1,
  BACK = 2,
}

interface IProps {
  heroes: IHeroData[];
  activeId: string;
}

export default function Carousel({ heroes, activeId }: IProps) {
  const [visibleItens, setVisibleItens] = useState<IHeroData[] | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(
    heroes.findIndex((hero) => hero.id === activeId) - 1
  );

  const transitionAudio = useMemo(() => new Audio("/songs/transition.mp3"), []);

  const voicesAudio: Record<string, HTMLAudioElement> = useMemo(
    () => ({
      "spider-man-616": new Audio("/songs/spider-man-616.mp3"),
      "mulher-aranha-65": new Audio("/songs/mulher-aranha-65.mp3"),
      "spider-man-1610": new Audio("/songs/spider-man-1610.mp3"),
      "sp-dr-14512": new Audio("/songs/sp-dr-14512.mp3"),
      "spider-ham-8311": new Audio("/songs/spider-ham-8311.mp3"),
      "spider-man-90214": new Audio("/songs/spider-man-90214.mp3"),
      "spider-man-928": new Audio("/songs/spider-man-928.mp3"),
    }),
    []
  );

  useEffect(() => {
    const indexInArrayScope =
      ((activeIndex % heroes.length) + heroes.length) % heroes.length;

    const visibleItens = [...heroes, ...heroes].slice(
      indexInArrayScope,
      indexInArrayScope + 3
    );

    setVisibleItens(visibleItens);
  }, [heroes, activeIndex]);

  useEffect(() => {
    const htmlElement = document.querySelector("html");

    if (!htmlElement || !visibleItens) {
      return;
    }

    const currentHeroId = visibleItens[enPosition.MIDDLE].id;
    htmlElement.style.backgroundImage = `url("/spiders/${currentHeroId}-background.png")`;
    htmlElement.classList.add("hero-page");

    return () => {
      htmlElement.classList.remove("hero-page");
    };
  }, [visibleItens]);

  useEffect(() => {
    if (!visibleItens) {
      return;
    }

    transitionAudio.play();

    const voiceAudio = voicesAudio[visibleItens[enPosition.MIDDLE].id];
    if (!voiceAudio) {
      return;
    }
    voiceAudio.volume = 0.2;
    voiceAudio.play();
  }, [visibleItens, transitionAudio, voicesAudio]);

  const handleChangeActiveIndex = (newDirection: number) => {
    setActiveIndex((prevActiveIndex) => prevActiveIndex + newDirection);
  };

  if (!visibleItens) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.carousel}>
        <div
          className={styles.wrapper}
          onClick={() => handleChangeActiveIndex(1)}
        >
          <AnimatePresence mode="popLayout">
            {visibleItens.map((item, position) => (
              <motion.div
                key={item.id}
                className={styles.hero}
                transition={{ duration: 0.8 }}
                initial={{
                  x: -1500,
                  scale: 0.75,
                }}
                animate={{ x: 0, ...getItemStyles(position) }}
                exit={{
                  x: 0,
                  left: "-20%",
                  opacity: 0,
                  scale: 1,
                }}
              >
                <HeroPicture hero={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <motion.div
        className={styles.details}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 2 }}
      >
        <HeroDetails data={visibleItens[enPosition.MIDDLE]} />
      </motion.div>
    </div>
  );
}

const getItemStyles = (position: enPosition) => {
  if (position === enPosition.FRONT) {
    return {
      zIndex: 3,
      filter: "blur(10px)",
      scale: 1.2,
    };
  }

  if (position === enPosition.MIDDLE) {
    return {
      zIndex: 2,
      left: 300,
      scale: 0.8,
      top: "-10%",
    };
  }

  if (position === enPosition.BACK) {
    return {
      zIndex: 1,
      filter: "blur(10px)",
      left: 160,
      top: "-20%",
      scale: 0.6,
      opacity: 0.8,
    };
  }
};
