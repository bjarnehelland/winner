import styles from "./Podeum.module.css";
import { motion } from "framer-motion";

function Podeum({ color, height, winner }) {
  return (
    <div className={styles.podeum} style={{ height }}>
      <div className={styles.platform} style={{ background: color }}>
        <motion.div layoutId={winner.name}>{winner.name}</motion.div>
      </div>
      <div className={styles.base} style={{ background: color }}>
        <div className={styles.shadow}></div>
        {winner.position}
      </div>
    </div>
  );
}

const colors = ["#ffd25c", "#66c6b9", "#f37159"];

function order(winners, numberOfWinners) {
  let players = [...Array(numberOfWinners)].map((_, i) => winners[i]).reverse();
  players = players.map((w, i) => ({ ...w, position: i + 1 })).reverse();

  const result = [
    ...players.filter((p) => (p.position - 1) % 2),
    ...players.filter((p) => !((p.position - 1) % 2)).reverse(),
  ];

  console.log(players, result);

  return result;
}

export default function Podeums({ winners, numberOfWinners = 5 }) {
  return (
    <div
      className={styles.podiums}
      style={{ gridTemplateColumns: `repeat(${numberOfWinners}, 1fr)` }}
    >
      {order(winners, numberOfWinners).map((winner, index) => (
        <div key={index} className={styles.place}>
          <Podeum
            color={colors[index]}
            height={`calc(100% - ${(winner.position - 1) * 40}px)`}
            winner={winner}
          />
        </div>
      ))}
    </div>
  );
}
