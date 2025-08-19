import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { achievements } from "../data/achievements";
import Card from "../components/Card";
import Pagination from "../components/Pagination";
import styles from "../styles/Home.module.css";

const ITEMS_PER_PAGE = 10;

const rarityOrder = {
  bronze: 1,
  iron: 2,
  silver: 3,
  gold: 4,
  mythril: 5,
};

function seededShuffle(array, seed) {
  const result = [...array];
  let currentIndex = result.length;
  let random;

  while (currentIndex !== 0) {
    seed = (seed * 9301 + 49297) % 233280;
    random = seed / 233280;
    const randomIndex = Math.floor(random * currentIndex);
    currentIndex--;

    [result[currentIndex], result[randomIndex]] = [
      result[randomIndex],
      result[currentIndex],
    ];
  }

  return result;
}

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const sortMode = searchParams.get("sort") || "random";
  const seedParam = parseInt(searchParams.get("seed") || "1");

  const [currentPage, setCurrentPage] = useState(1);
  const [randomSeed, setRandomSeed] = useState(seedParam);

  useEffect(() => {
    const pageParam = parseInt(searchParams.get("page") || "1");
    setCurrentPage(pageParam);
  }, [searchParams]);

  useEffect(() => {
    const scrollY = sessionStorage.getItem("scrollY");
    if (scrollY) {
      window.scrollTo(0, parseInt(scrollY));
      sessionStorage.removeItem("scrollY");
    }
  }, []);

  const sortedAchievements = useMemo(() => {
    const copy = [...achievements];

    if (sortMode === "asc") {
      return copy.sort((a, b) => rarityOrder[a.rarity] - rarityOrder[b.rarity]);
    } else if (sortMode === "desc") {
      return copy.sort((a, b) => rarityOrder[b.rarity] - rarityOrder[a.rarity]);
    } else {
      return seededShuffle(copy, randomSeed);
    }
  }, [sortMode, randomSeed]);

  const totalPages = Math.ceil(sortedAchievements.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = sortedAchievements.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleSortChange = (value) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort", value);
    newParams.set("page", "1");

    if (value === "random") {
      const newSeed = Date.now();
      newParams.set("seed", newSeed.toString());
      setRandomSeed(newSeed);
    } else {
      newParams.delete("seed");
    }

    setSearchParams(newParams);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", page.toString());
    setSearchParams(newParams);
    setCurrentPage(page);
  };

  const handleCardClick = (id) => {
    sessionStorage.setItem("scrollY", window.scrollY.toString());
    navigate(`/achievement/${id}`);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Достижения</h1>
        <p>
          С днём рождения сучка, я подготовил для тебя особый подарок, я нихуя
          не умею поздравлять там счастья здоровья и тд поэтому мучайся и сиди
          читай.
        </p>
        <p>Ps. все карточки кликабельные, а также есть пасхалка, но где ?</p>
        <div className={styles.filter}>
          <select
            value={sortMode}
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="asc">⬆️ От бронзы к мифрилу</option>
            <option value="desc">⬇️ От мифрила к бронзе</option>
            <option value="random">🎲 Случайный порядок</option>
          </select>
        </div>
      </header>

      <div className={styles.grid}>
        {currentItems.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            rarity={item.rarity}
            onClick={() => handleCardClick(item.id)}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Home;
