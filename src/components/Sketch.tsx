import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

interface SketchProps {
  sketch: (p: p5) => void;
  className?: string;
}

const Sketch: React.FC<SketchProps> = ({ sketch, className }) => {
  const sketchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let phInstance: p5 | null = null;
    if (sketchRef.current) {
      phInstance = new p5(sketch, sketchRef.current);
    }
    return () => {
      if (phInstance) {
        phInstance.remove();
      }
    };
  }, [sketch]); // 将sketch添加到依赖数组中，以便在sketch函数变化时重新创建p5实例

  return <div ref={sketchRef} className={className}></div>;
};

export default Sketch;
