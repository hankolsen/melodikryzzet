import React, { useEffect, useRef } from 'react';
import { useCrossword } from 'Crossword/CrosswordContext';
import useInputPosition from 'Crossword/utils/useInputPosition';

const CellInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    inputClickHandler,
    inputHandler,
    keyUpHandler,
    inputWidth,
    inputHeight,
    showInput,
  } = useCrossword();
  const { left, top } = useInputPosition();

  useEffect(() => {
    inputRef.current?.focus();
  });

  if (!showInput) {
    return null;
  }

  return (
    <div
      className="crossword__hidden-input-wrapper"
      style={{
        width: `${inputWidth}%`,
        height: `${inputHeight}%`,
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
        onClick={inputClickHandler}
        ref={inputRef}
      />
    </div>
  );
};

export default CellInput;
