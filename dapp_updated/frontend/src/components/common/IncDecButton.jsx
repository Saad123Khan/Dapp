import React, { useEffect, useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

const IncDecButton = ({ count, setCount }) => {
  const [empty, setEmpty] = useState(true);

  useEffect(() => {
    if (count > 0) {
      return setEmpty(false);
    }
    return setEmpty(true);
  }, [count]);

  const increase = () => {
    return setCount((prev) => prev + 1);
  };
  const decrease = () => {
    if (empty) {
      return;
    }
    return setCount((prev) => prev - 1);
  };

  return (
    <>
      <div className="inc-dec-button">
        <button
          type="button"
          className={`${!empty && "primary"} `}
          onClick={decrease}
        >
          <FiMinus />
        </button>
        <input type="number" readOnly value={count} onWheel={(e) => e.target.blur()}/>
        <button
          type="button"
          className={`${!empty && "primary"} `}
          onClick={increase}
        >
          <FiPlus />
        </button>
      </div>
    </>
  );
};

export default IncDecButton;
