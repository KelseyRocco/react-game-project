import "../App.css";
import LoginButton from "./LoginButton";
import {
  GiSawedOffShotgun,
  GiCheckedShield,
  GiHeavyBullets,
} from "react-icons/gi";
import { useState } from "react";
import ShowWinner from "./ShowWinner";
import MainTitle from "./MainTitle";
import { useAuth0 } from "@auth0/auth0-react";

/*GLOBAL VARIABLES*/
const actions = {
  gun: "gun",
  shield: "shield",
  bullets: "bullets",
};

/*FUNCTIONS*/

/*DISPLAYS ICONS BASED ON ACTION*/
function ActionIcon({ action, ...props }) {
  const icons = {
    gun: GiSawedOffShotgun,
    shield: GiCheckedShield,
    bullets: GiHeavyBullets,
  };
  const Icon = icons[action];

  return <Icon {...props} />;
}

/*PLAYER */
function Player({ name = "player", score = 0, action = "gun", bullets = 0 }) {
  return (
    <div>
      <div className="player">
        <div className="score">{`${name}: ${score}`}</div>
        <div className="action">
          {action && <ActionIcon action={action} size={60} />}
        </div>
      </div>
      <div class="bullets">{`Bullets: ${bullets}`}</div>
    </div>
  );
}

/*MESSAGE RETURN*/
function calculateWinner(playerChoice, compChoice) {
  if (playerChoice === compChoice) {
    return 1;
  } else if (
    (playerChoice === "gun" && compChoice === "shield") ||
    (playerChoice === "shield" && compChoice === "gun")
  ) {
    return 2;
  } else if (playerChoice === "gun" && compChoice === "bullets") {
    return 3;
  } else if (playerChoice === "bullets" && compChoice === "gun") {
    return 4;
  } else {
    return 5;
  }

  return null;
}

/*CHOOSE DIFF ACTIONS*/
function ActionButton({ action = "gun", onActionSelected }) {
  return (
    <button className="round-btn" onClick={() => onActionSelected(action)}>
      <ActionIcon action={action} size={35} />
    </button>
  );
}

/*PLAY GAME*/
function GamePlay() {
  const { user, isAuthenticated } = useAuth0();
  const [playerAction, setPlayerAction] = useState("");
  const [compAction, setCompAction] = useState("");

  const [playerScore, setPlayerScore] = useState(0);
  const [compScore, setCompScore] = useState(0);
  const [winner, setWinner] = useState(0);

  const [bulletCount, setBulletCount] = useState(0);
  const [bulletCountComp, setBulletCountComp] = useState(0);

  /*COMPUTER CHOICE */
  function randomAction() {
    const keys = Object.keys(actions);
    const index = Math.floor(Math.random() * keys.length);

    if (keys[index] === "bullets") {
      setBulletCountComp(bulletCountComp + 1);
    }

    if (keys[index] === "gun") {
      setBulletCountComp(bulletCountComp - 1);
    }

    return keys[index];
  }

  /*UPDATES ACTION*/
  const onActionSelected = (selectedAction) => {
    setPlayerAction(selectedAction);
    const newCompAction = randomAction();
    setCompAction(newCompAction);

    if (selectedAction === "bullets") {
      setBulletCount(bulletCount + 1);
    }

    if (selectedAction === "gun") {
      if (bulletCount === 0) {
        setBulletCount = 0;
      } else {
        setBulletCount(bulletCount - 1);
      }
    }

    /*KEEPS TRACK OF SCORE */
    const newWinner = calculateWinner(selectedAction, newCompAction);
    setWinner(newWinner);
    if (newWinner === 3) {
      setPlayerScore(playerScore + 1);
    } else if (newWinner === 4) {
      setCompScore(compScore + 1);
    }
  };

  return (
    isAuthenticated && (
      <main className="column">
        <LoginButton />

        <div className="center">
          <MainTitle />
          <div>
            <div className="container">
              <Player
                name={user.given_name ? user.given_name : "player"}
                score={playerScore}
                action={playerAction}
                bullets={bulletCount}
              />

              <Player
                name="Computer"
                score={compScore}
                action={compAction}
                bullets={bulletCountComp}
              />
            </div>

            <div>
              <ActionButton action="gun" onActionSelected={onActionSelected} />
              <ActionButton
                action="shield"
                onActionSelected={onActionSelected}
              />
              <ActionButton
                action="bullets"
                onActionSelected={onActionSelected}
              />
            </div>
            <ShowWinner winner={winner} />
          </div>
        </div>
      </main>
    )
  );
}

export default GamePlay;
