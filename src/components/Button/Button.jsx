const Button = ({ onLoadMore, isDisable }) => {
  return (
    <button
      className="Button"
      type="button"
      onClick={onLoadMore}
      disabled={isDisable}
    >
      Load More
    </button>
  );
};

export default Button;
