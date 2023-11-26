const { useRef, useEffect } = require("react");

const usePrevious = (value) => {
  const ref = useRef();

  useEffect(
    function () {
      ref.current = value;
    },
    [value]
  );

  return ref.current
};


export default usePrevious; 