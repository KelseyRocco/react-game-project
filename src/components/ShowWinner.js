function ShowWinner({ winner = 0 }) {
  const text = {
    1: "Tie",
    2: "Blocked",
    3: "You win!",
    4: "You lose!",
    5: "Keep going",
  };

  return <h2>{text[winner]}</h2>;
}

export default ShowWinner;
