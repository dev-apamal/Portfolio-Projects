export default function Button(props) {
  return (
    <button
      onClick={props.roll}
      className="px-4 py-4 bg-buttonColor rounded text-white font-bold"
    >
      {props.gameWon ? "New Game" : "Roll Now"}
    </button>
  );
}
