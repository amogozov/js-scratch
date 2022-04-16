// @flow

import React from "react";

type Props = {
  label: string,
  handleClick: Function,
};

function Button({ label, handleClick }: Props) {
  return (
    <button type="button" onClick={handleClick}>
      {label}
    </button>
  );
}

export default Button;
