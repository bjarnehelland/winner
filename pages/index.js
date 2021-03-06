import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { AnimateSharedLayout, motion } from "framer-motion";
import Podeums from "../components/Podeum";

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
          <Podeums winners={winners} numberOfWinners={3} />

          {countdown > 0 && (
            <div className={styles.countdown}>
              <motion.div
                className={styles.countdownCircle}
                animate={{ scale: [0, 1, 0] }}
                transition={{
                  duration: 1,
                  ease: "easeInOut",
                  times: [0, 0.5, 1],
                  loop: Infinity,
                }}
              >
                <div>{countdown}</div>
              </motion.div>
            </div>
          )}
        </div>
      </AnimateSharedLayout>
    </div>
  );
}
