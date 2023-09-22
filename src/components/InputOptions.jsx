import React from "react";
import "../css/inputOptions.css";

function InputOptions({ Icon, title, color, onClick }) {
  return (
    <div className="inputOption" onClick={onClick}>
      <Icon style={{ color: color }} />
      <h4>{title}</h4>
    </div>
  );
}

export default InputOptions;
