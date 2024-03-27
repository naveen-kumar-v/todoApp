/* eslint-disable react/prop-types */
const CustomButton = ({ onClick, bgColor, text, isEmpty }) => {
  return (
    <button
      className={`bg-${bgColor}-700 px-3.5 py-0.5 rounded font-semibold active:${bgColor} w-full disabled:opacity-80
            disabled:pointer-events-none`}
      onClick={onClick}
      disabled={isEmpty}
    >
      {text}
    </button>
  );
};

export default CustomButton;
