const ProdButton = ({ buttonName, buttonClick, product }) => {
  return (
    <button
      onClick={() => buttonClick(product)}
      className="w-full px-4 py-2 font-semibold text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
    >
      {buttonName}
    </button>
  );
};

export default ProdButton;
