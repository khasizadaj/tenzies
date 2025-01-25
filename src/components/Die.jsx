export default function Die(props) {
  return (
    <button
      onClick={props.hold}
      className={
        `col-span-1 flex flex-col justify-center items-center text-center rounded-lg h-24 w-24 text-2xl font-bold text-blue-50` +
        (props.isHeld
          ? " bg-blue-950 border-4 border-blue-400 border-solid"
          : " bg-blue-600")
      }
      aria-pressed={props.isHeld}
      aria-label={`Die with value ${props.value}, ${props.isHeld ? "held" : "not held"}`}
    >
      {props.value}
    </button>
  );
}
