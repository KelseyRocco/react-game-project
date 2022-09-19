import "./App.css";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import WelcomeMessage from "./components/WelcomeMessage";
import GamePlay from "./components/GamePlay";
import AvatarImage from "./components/AvatarImage";

function App() {
  return (
    <main className="column">
      <LoginButton />
      <LogoutButton />
      <AvatarImage />
      <WelcomeMessage />
      <GamePlay />
    </main>
  );
}

export default App;
