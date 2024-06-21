import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import 'bootstrap/dist/css/bootstrap.min.css';
import bg from './assets/bg.png';
import box1 from './assets/react3.png';
import box2 from './assets/react1.png';

function Box({ time, color, scale, position, onClick, hovered, onHover, background }) {
  const ref = useRef();
  useFrame((state, delta) => (ref.current.rotation.x += delta));
  const textProps = {
    fontSize: 0.5,
    color: 'white',
  };

  return (
    <mesh
  ref={ref}
  position={position}
  scale={scale}
  onClick={onClick}
  onPointerOver={(event) => (event.stopPropagation(), onHover(true))}
  onPointerOut={(event) => onHover(false)}
>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : color} map={new THREE.TextureLoader().load(background)} />
      <Text position={[0, 0, 0.51]} {...textProps}>
        {time}
      </Text>
      <Text position={[0, 0, -0.51]} rotation={[0, Math.PI, 0]} {...textProps}>
        {time}
      </Text>
      <Text position={[0.51, 0, 0]} rotation={[0, -Math.PI / 2, 0]} {...textProps}>
        {time}
      </Text>
      <Text position={[-0.51, 0, 0]} rotation={[0, Math.PI / 2, 0]} {...textProps}>
        {time}
      </Text>
      <Text position={[0, 0.51, 0]} rotation={[-Math.PI / 2, 0, 0]} {...textProps}>
        {time}
      </Text>
      <Text position={[0, -0.51, 0]} rotation={[Math.PI / 2, 0, 0]} {...textProps}>
        {time}
      </Text>
    </mesh>
  );
}

function App() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [hovered, setHovered] = useState([false, false]);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 59) {
            setMinutes((prevMinutes) => prevMinutes + 1);
            return 0;
          }
          return prevSeconds + 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const resetTimer = () => {
    setIsActive(false);
    setSeconds(0);
    setMinutes(0);
  };

  const handleHover = (index, value) => {
    const newHovered = [...hovered];
    newHovered[index] = value;
    setHovered(newHovered);
  };

  return (
    <div style={{ backgroundImage: `url(${bg})`, marginTop: '-10rem', height: '100vh', backgroundSize: 'cover' }}>
      <div style={{ marginTop: '10rem' }}>
        <Canvas style={{ height: '30rem' }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={1} />
          <Box
            position={[-1.2, 0, 0]}
            time={minutes}
            color={'orange'}
            scale={hovered[0] ? 1.5 : 1}
            onClick={() => {}}
            hovered={hovered[0]}
            onHover={(value) => handleHover(0, value)}
            background={box1}
          />
          <Box
            position={[1.2, 0, 0]}
            time={seconds}
            color={'orange'}
            scale={hovered[1] ? 1.5 : 1}
            onClick={() => {}}
            hovered={hovered[1]}
            onHover={(value) => handleHover(1, value)}
            background={box2}
          />
          <OrbitControls minDistance={2} maxDistance={6} />
        </Canvas>
      </div>
      <div>
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button className="btn btn-danger btn-lg" style={{ marginLeft: '5rem', width: '10rem' }} onClick={() => setIsActive(!isActive)}>
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button className="btn btn-primary btn-lg" style={{ width: '10rem', marginLeft: '10rem' }} onClick={resetTimer}>
            Reset
          </button>
        </div>
        <h1 className='text-white' style={{textAlign:"center",marginTop:"2rem",marginLeft:"5rem"}}>🅿🅾🅼🅾🅳🅾🆁🅾</h1>
      </div>
    </div>
  );
}

export default App;
