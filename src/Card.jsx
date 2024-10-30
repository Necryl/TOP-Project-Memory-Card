import "./Card.css";

// eslint-disable-next-line react/prop-types
function Card({ children, index, clicked }) {
  return (
    <div
      className="card"
      onClick={() => {
        clicked(index);
      }}
    >
      {children}
    </div>
  );
}

export default Card;
