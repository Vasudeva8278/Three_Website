
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

function SecondsBox({ seconds, hovered, onHover }) {
  const ref = useRef();
  
  useEffect(() => {
    // No need to do anything on mount, this effect is for showing state updates if needed
  }, [seconds]);

  useFrame(() => {
    // Calculate rotation based on seconds (1 full rotation = 60 seconds)
    ref.current.rotation.x = (seconds / 60) * 2 * Math.PI;
  });

  return (
    <mesh
      ref={ref}
      position={[1.2, 0, 0]}
      scale={hovered ? 1.5 : 1}
      onPointerOver={(event) => (event.stopPropagation(), onHover(true))}
      onPointerOut={() => onHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      <Text position={[0, 0, 1]} fontSize={0.5} color="white">
        {seconds}
      </Text>
    </mesh>
  );
}

export default SecondsBox;
