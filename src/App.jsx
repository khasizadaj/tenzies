import { useState } from "react";
import { nanoid } from "nanoid";
import Die from "./components/Die";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

function generateNewDice() {
  const list = new Array(10).fill(0).map(() => {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
    };
  });
  return list;
}

function App() {
  const [dice, setDice] = useState(() => generateNewDice());
  const gameIsOver = dice.every(
    (die) => die.isHeld && die.value === dice[0].value
  );
  const { width, height } = useWindowSize();

  function roll() {
    setDice((dice) =>
      dice.map((die) => {
        if (die.isHeld) {
          return die;
        }
        return { ...die, value: 1 };
      })
    );
  }

  function restart() {
    setDice(generateNewDice());
  }

  function hold(id) {
    setDice((dice) => {
      return dice.map((die) => {
        if (die.id === id) {
          return { ...die, isHeld: !die.isHeld };
        }
        return die;
      });
    });
  }

  return (
    <main>
      {gameIsOver && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={1000}
          tweenDuration={7000}
          gravity={0.1}
        />
      )}
      <section className="flex flex-col justify-center items-center gap-4 h-screen bg-blue-900">
        <div className="flex-grow-0 space-y-2 text-center p-4 sm:py-8">
          <h1 className="text-4xl font-bold text-blue-50">Tenzies</h1>
          <h3 className="text-lg font-semibold text-blue-50">
            Be the first player to get all ten of your dice to show the same
            number.
          </h3>
        </div>
        <div className="grid grid-cols-5 grid-row-span-2 gap-2 sm:gap-4 px-4 sm:px-12">
          {dice.map((die) => {
            return (
              <Die
                key={die.id}
                value={die.value}
                isHeld={die.isHeld}
                hold={() => hold(die.id)}
              />
            );
          })}
        </div>
        <div>
          {gameIsOver ? (
            <button
              onClick={restart}
              className={
                `bg-blue-500 text-white p-4 px-8 text-xl font-bold rounded-lg m-8` +
                (gameIsOver ? " bg-blue-50 text-blue-900" : "")
              }
            >
              New Game
            </button>
          ) : (
            <button
              onClick={roll}
              className="bg-blue-500 text-white p-4 px-8 text-xl font-bold rounded-lg m-8"
            >
              Roll
            </button>
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
