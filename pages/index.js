import { useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const users = [
  { name: "Bjarne Helland", email: "bh@profitbase.no" },
  { name: "Christine Valker", email: "chv@profitbase.no" },
  { name: "Håvard Eikeland", email: "haei@profitbase.no" },
  { name: "Leiv Erik Larsen", email: "lel@profitbase.no" },
  { name: "Sigve Hansen", email: "sh@profitbase.no" },
  { name: "Tore Senneseth", email: "ts@profitbase.no" },
  { name: "Øyvind Johnsen", email: "oej@profitbase.no" },
];
export default function Home() {
  const [players, setPlayers] = useState(users);
  const [winners, setWinners] = useState([]);

  function chooseWinner() {
    if (!players.length) return;

    const winnerIndex = Math.floor(Math.random() * players.length);
    setWinners([...winners, players[winnerIndex]]);
    setPlayers([
      ...players.slice(0, winnerIndex),
      ...players.slice(winnerIndex + 1),
    ]);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>The winner is?</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <h2>Players</h2>
          <ul>
            {players.map((user) => (
              <li key={user.name}>{user.name}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Winners</h2>
          <ol>
            {winners.map((user) => (
              <li key={user.name}>{user.name}</li>
            ))}
          </ol>
        </div>

        <button onClick={chooseWinner}>Choose winner</button>
      </main>
    </div>
  );
}
