import Title from "./components/Title";
import Button from "./components/Button";
import { v4 as uuidv4 } from "uuid";
import Die from "./components/Die";
import React from "react";

export default function App() {
  const [dice, setDice] = React.useState(generateAllNewDice());

  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  function generateAllNewDice() {
    const newDice = Array.from({ length: 10 }, () => ({
      id: uuidv4(),
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
    }));
    return newDice;
  }

  function hold(id) {
    setDice((previousDice) =>
      previousDice.map((dice) =>
        dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice
      )
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      hold={hold}
      isHeld={die.isHeld}
      id={die.id}
    />
  ));

  function rollDice() {
    setDice((previousDice) =>
      previousDice.map((dice) =>
        dice.isHeld ? dice : { ...dice, value: Math.ceil(Math.random() * 6) }
      )
    );
    gameWon ? setDice(generateAllNewDice) : null;
  }

  return (
    <main className="bg-white h-full rounded flex flex-col justify-between items-center px-20 py-20">
      <Title />
      <div className="diceGrid grid gap-4 grid-cols-5 grid-rows-2">
        {diceElements}
      </div>
      <Button gameWon={gameWon} roll={rollDice} />
    </main>
  );
}
