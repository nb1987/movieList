import { useState } from "react";
import Star from "./Star";

import PropTypes from "prop-types";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
};

StarRating.propTypes = {
  maxRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  messages: PropTypes.array,
  defaultRating: PropTypes.number,
  onSetYourRating: PropTypes.func,
};

export default function StarRating({
  maxRating = 10,
  color = "#f8cdfa",
  size = 10,
  messages = [],
  defaultRating = 0,
  onSetYourRating = () => {}, //Default function to prevent errors if not provided
}) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  const handleRating = (ratingValue) => {
    setRating(ratingValue);
    onSetYourRating(ratingValue);
  }; //setRating(ratingValue) updates the `rating` state.
  //yourRating should be displayed.

  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${size}px`,
  };

  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            filled={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            handleRating={() => handleRating(i + 1)}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={textStyle}>
        {maxRating == messages.length
          ? messages[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ""}
      </p>
    </div>
  );
}
