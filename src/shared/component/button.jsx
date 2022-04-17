// @flow

import React from "react";

type Props = {
  label: string,
  handleClick: Function,
};

function Button({ label, handleClick }: Props) {
  return (
    <button onClick={handleClick} className="btn btn-primary" type="button">
      {label}
    </button>
  );
}

export default Button;
