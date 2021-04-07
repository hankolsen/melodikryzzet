import { useCrossword } from 'Crossword/CrosswordContext';
import useInputPosition from 'Crossword/utils/useInputPosition';
import React, { useEffect, useRef } from 'react';

type Props = {
  clickHandler: () => void;
  inputHandler: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  keyUpHandler: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

const CellInput = ({
  clickHandler,
  inputHandler,
  keyUpHandler,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { inputWidth, inputHeight } = useCrossword();
  const { left, top } = useInputPosition();

  useEffect(() => {
    inputRef.current?.focus();
  });

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
        onClick={clickHandler}
        ref={inputRef}
      />
    </div>
  );
};

export default CellInput;
