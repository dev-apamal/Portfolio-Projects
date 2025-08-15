export default function die(props) {
  return (
    <button
      onClick={() => props.hold(props.id)}
      value={props.value ? props.value : 0}
      className={`font-bold text-base px-4 py-2 shadow-lg rounded-lg transition-all
        ${props.isHeld ? "bg-lime-500" : "bg-white"}
      `}
    >
      {props.value ? props.value : 0}
    </button>
  );
}
