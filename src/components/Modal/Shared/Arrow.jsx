import React from "react";

const Arrow = ({ direction = "left", style = null }) => {
  switch (direction) {
    case "up":
      style.transform = "rotate(90deg)";
      break;
    case "right":
      style.transform = "rotate(180deg)";
      break;
    case "down":
      style.transform = "rotate(270deg)";
      break;
    default:
      break;
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" style={style}>
      <path
        fill="var(--black)"
        fillrule="evenodd"
        d="M7.7.3a1 1 0 010 1.4L2.3 7l5.4 5.3c.4.3.4 1 0 1.4a1 1 0 01-1.4 0L.3 8A1 1 0 010 7c0-.3 0-.6.3-.9l6-5.8a1 1 0 011.4 0z"
      ></path>
    </svg>
  );
};

export default Arrow;
