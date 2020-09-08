import { useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { AnimateSharedLayout, motion } from "framer-motion";

const users = [
  { name: "Bjarne Helland", email: "bh@profitbase.no" },
  { name: "Christine Valker", email: "chv@profitbase.no" },
  { name: "Håvard Eikeland", email: "haei@profitbase.no" },
  { name: "Leiv Erik Larsen", email: "lel@profitbase.no" },
  { name: "Sigve Hansen", email: "sh@profitbase.no" },
  { name: "Tore Senneseth", email: "ts@profitbase.no" },
  { name: "Øyvind Johnsen", email: "oej@profitbase.no" },
];

function User({ user }) {
  return (
    <motion.div
      className={styles.player}
      initial={false}
      layoutId={user.name}
      animate={{ zIndex: 1 }}
      transition={{
        type: "spring",
      }}
    >
      {user.name}
    </motion.div>
  );
}
export default function Home() {
  const [players, setPlayers] = useState(users);

  const [winners, setWinners] = useState([]);

  function chooseWinner() {
    if (!players.length) return;

    const winnerIndex = Math.floor(Math.random() * players.length);
    setPlayers([
      ...players.slice(0, winnerIndex),
      ...players.slice(winnerIndex + 1),
    ]);

    setWinners([...winners, players[winnerIndex]]);
  }

  return (
    <div className={styles.container}>
      <AnimateSharedLayout>
        <Head>
          <title>The winner is?</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.players}>
          <button className={styles.chooseBtn} onClick={chooseWinner}>
            Choose winner
          </button>
          <h2>Players</h2>
          <ul>
            {players.map((user) => (
              <li key={user.name}>
                <User user={user} />
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.main}>
          <div className={styles.podiumContainer}>
            <div className={styles.secondPlace}>
              {winners[1] && (
                <motion.div layoutId={winners[1].name}>
                  {winners[1].name}
                </motion.div>
              )}
            </div>

            <div className={styles.firstPlace}>
              {winners[2] && (
                <motion.div layoutId={winners[2].name}>
                  {winners[2].name}
                </motion.div>
              )}
            </div>
            <div className={styles.thirdPlace}>
              {winners[0] && (
                <motion.div layoutId={winners[0].name}>
                  {winners[0].name}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </AnimateSharedLayout>
    </div>
  );
}
