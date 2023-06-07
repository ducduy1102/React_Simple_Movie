import React from 'react';

// 231 loading
const LoadingSkeleton = (props) => {
  return (
    <div
      className={`skeleton ${props.className}`}
      style={{
        height: props.height,
        width: props.width || '100%',
        borderRadius: props.radius,
      }}
    ></div>
  );
};

export default LoadingSkeleton;
