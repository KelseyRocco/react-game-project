import "../App.css";
import LoginButton from "./LoginButton";
import { GiRayGun, GiCheckedShield, GiElectric } from "react-icons/gi";
import { useState } from "react";
import ShowWinner from "./ShowWinner";
import MainTitle from "./MainTitle";
import { useAuth0 } from "@auth0/auth0-react";

/*GLOBAL VARIABLES*/
const actions = {
  raygun: "raygun",
  shield: "shield",
  charges: "charges",
};

/*FUNCTIONS*/

/*DISPLAYS ICONS BASED ON ACTION*/
function ActionIcon({ action, ...props }) {
  const icons = {
    raygun: GiRayGun,
    shield: GiCheckedShield,
    charges: GiElectric,
  };
  const Icon = icons[action];

  return <Icon {...props} />;
}

/*PLAYER */
function Player({
  name = "player",
  score = 0,
  action = "raygun",
  charges = 0,
}) {
  return (
    <div>
      <div className="player">
        <div className="score">{`${name}: ${score}`}</div>
        <div className="action">
          {action && <ActionIcon action={action} size={75} />}
        </div>
      </div>
      <div class="charges">{`Charges: ${charges}`}</div>
    </div>
  );
}

/*MESSAGE RETURN*/
function calculateWinner(playerChoice, compChoice) {
  if (playerChoice === compChoice) {
    return 1;
  } else if (
    (playerChoice === "raygun" && compChoice === "shield") ||
    (playerChoice === "shield" && compChoice === "raygun")
  ) {
    return 2;
  } else if (playerChoice === "raygun" && compChoice === "charges") {
    return 3;
  } else if (playerChoice === "charges" && compChoice === "raygun") {
    return 4;
  } else {
    return 5;
  }

  return null;
}

/*PLAY GAME*/
function GamePlay() {
  const { user, isAuthenticated } = useAuth0();
  const [playerAction, setPlayerAction] = useState("");
  const [compAction, setCompAction] = useState("");

  const [playerScore, setPlayerScore] = useState(0);
  const [compScore, setCompScore] = useState(0);
  const [winner, setWinner] = useState(0);

  const [chargeCount, setChargeCount] = useState(0);
  const [chargeCountComp, setChargeCountComp] = useState(0);

  /*CHOOSE DIFF ACTIONS*/
  function ActionButton({ action = "raygun", onActionSelected }) {
    return (
      <button className="round-btn" onClick={() => onActionSelected(action)}>
        <ActionIcon action={action} size={35} />
      </button>
    );
  }
  /*COMPUTER CHOICE */
  function randomAction() {
    const keys = Object.keys(actions);
    const index = Math.floor(Math.random() * keys.length);

    if (keys[index] === "charges") {
      setChargeCountComp(chargeCountComp + 1);
    }

    if (keys[index] === "raygun") {
      if (chargeCountComp === 0) {
        setChargeCount = 0;
      } else {
        setChargeCountComp(chargeCountComp - 1);
      }
    }

    return keys[index];
  }

  /*UPDATES ACTION*/
  const onActionSelected = (selectedAction) => {
    setPlayerAction(selectedAction);
    const newCompAction = randomAction();
    setCompAction(newCompAction);

    if (selectedAction === "charges") {
      setChargeCount(chargeCount + 1);
    }

    if (selectedAction === "raygun") {
      if (chargeCount === 0) {
        setChargeCount = 0;
      } else {
        setChargeCount(chargeCount - 1);
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

    if (playerScore === 3) {
      alert(`${user.given_name ? user.given_name : "You"} won!`);
    }
  };
  if (compScore === 3) {
    alert("The Alien won!");
  }

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
                charges={chargeCount}
              />

              <Player
                name="Alien"
                score={compScore}
                action={compAction}
                charges={chargeCountComp}
              />
            </div>

            <div>
              <ActionButton
                action="raygun"
                onActionSelected={onActionSelected}
              />
              <ActionButton
                action="shield"
                onActionSelected={onActionSelected}
              />
              <ActionButton
                action="charges"
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
