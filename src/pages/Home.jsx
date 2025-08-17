import { useState, useMemo } from "react";
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

function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortMode, setSortMode] = useState("random");
  const [randomKey, setRandomKey] = useState(0); // ключ для обновления рандома

  const sortedAchievements = useMemo(() => {
    const copy = [...achievements];

    if (sortMode === "asc") {
      return copy.sort((a, b) => rarityOrder[a.rarity] - rarityOrder[b.rarity]);
    } else if (sortMode === "desc") {
      return copy.sort((a, b) => rarityOrder[b.rarity] - rarityOrder[a.rarity]);
    } else {
      return copy.sort(() => Math.random() - 0.5);
    }
  }, [sortMode, randomKey]);

  const totalPages = Math.ceil(sortedAchievements.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = sortedAchievements.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleSortChange = (value) => {
    setSortMode(value);
    setCurrentPage(1);
    if (value === "random") {
      setRandomKey((prev) => prev + 1); // триггерим пересортировку
    }
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
        <p>Ps. все карточки кликабельные</p>
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
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default Home;
