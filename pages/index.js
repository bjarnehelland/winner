import { useState, useEffect } from "react";
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
function Winner({ winner }) {
  return <motion.div layoutId={winner.name}>{winner.name}</motion.div>;
}

export default function Home() {
  const [countdown, setCountdown] = useState(null);
  const [players, setPlayers] = useState(users);
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    if (countdown > 0) {
      setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      console.log("winner");
      const winnerIndex = Math.floor(Math.random() * players.length);
      setWinners([...winners, players[winnerIndex]]);
      setPlayers([
        ...players.slice(0, winnerIndex),
        ...players.slice(winnerIndex + 1),
      ]);
    }
  }, [countdown]);

  function chooseWinner() {
    if (!players.length) return;
    setCountdown(3);
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
              {winners[1] && <Winner winner={winners[1]} />}
            </div>
            <div className={styles.firstPlace}>
              {winners[2] && <Winner winner={winners[2]} />}
            </div>
            <div className={styles.thirdPlace}>
              {winners[0] && <Winner winner={winners[0]} />}
            </div>
          </div>
          {countdown > 0 && (
            <div className={styles.countdown}>
              <div className={styles.countdownCircle}>{countdown}</div>
            </div>
          )}
        </div>
      </AnimateSharedLayout>
    </div>
  );
}
