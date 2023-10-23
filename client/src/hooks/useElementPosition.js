import { useEffect, useState } from "react";

const useElementPosition = (element) => {
  const [y_Pos, setY_Pos] = useState();

  const getPosition = () => {
    const y = element.current.offsetTop;
    setY_Pos(y);
  };

  useEffect(() => {
    getPosition();
  }, []);

  return y_Pos;
};

export default useElementPosition;
