import { useState } from "react";

function Die(props) {
  function handleClick() {
    console.log(props.value);
  }

  return (
    <button onClick={handleClick} className="col-span-1 flex flex-col justify-center items-center text-center bg-blue-950 rounded-lg h-24 w-24 text-2xl font-bold text-blue-50">
      {props.value}
    </button>
  );
}

function getContent() {
  const list = new Array(10).fill(0).map(() => Math.ceil(Math.random() * 6));
  return list;
}

function App() {
  const [contentList, setContentList] = useState(getContent());

  function reset() {
    setContentList(getContent());
  }

  return (
    <main>
      <section className="flex flex-col justify-center items-center gap-4 h-screen bg-blue-900">
        <div className="flex-grow-0 space-y-2 text-center p-4 sm:py-8">
          <h1 className="text-4xl font-bold text-blue-50">Tenzies</h1>
          <h3 className="text-lg font-semibold text-blue-50">
            Be the first player to get all ten of your dice to show the same
            number.
          </h3>
        </div>
        <div className="grid grid-cols-5 grid-row-span-2 gap-2 sm:gap-4 px-4 sm:px-12">
          {contentList.map((value, index) => {
            return <Die key={index} value={value} />;
          })}
        </div>
        <div>
          <button
            onClick={reset}
            className="bg-blue-500 text-white p-4 text-xl font-bold rounded-lg m-8"
          >
            Restart
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;
