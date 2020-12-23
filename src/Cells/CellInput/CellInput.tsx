import React, { useEffect, useRef } from 'react';

type Props = {
  clickHandler: () => void;
  inputHandler: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  keyUpHandler: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  left: number;
  width: number;
  height: number;
  top: number;
};

const CellInput = ({
  clickHandler,
  inputHandler,
  keyUpHandler,
  left,
  width,
  height,
  top,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  });

  return (
    <div
      className="crossword__hidden-input-wrapper"
      style={{
        width: `${width}%`,
        height: `${height}%`,
        top: `${top}%`,
        left: `${left}%`,
      }}
    >
      <input
        type="text"
        aria-label="letter"
        maxLength={1}
        value=""
        autoComplete="off"
        spellCheck="false"
        autoCorrect="off"
        className="crossword__hidden-input"
        onKeyUp={keyUpHandler}
        onInput={inputHandler}
        onClick={clickHandler}
        ref={inputRef}
      />
    </div>
  );
};

export default CellInput;
