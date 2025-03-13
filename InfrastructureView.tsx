import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Box } from '@react-three/drei';
import { motion } from 'framer-motion';

function Server({ position, name, status }: { position: [number, number, number]; name: string; status: string }) {
  const color = status === 'healthy' ? '#22c55e' : status === 'degraded' ? '#eab308' : '#ef4444';
  
  return (
    <group position={position}>
      <mesh scale={[1, 1, 1]}>
        <boxGeometry args={[1, 2, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Text
        position={[0, -1.5, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
    </group>
  );
}

function Connection({ start, end }: { start: [number, number, number]; end: [number, number, number] }) {
  return (
    <line>
      <bufferGeometry attach="geometry" />
      <lineBasicMaterial attach="material" color="#4f46e5" linewidth={2} />
    </line>
  );
}

export function InfrastructureView() {
  const groupRef = useRef<THREE.Group>();

  return (
    <div className="h-[400px] bg-gray-800 rounded-lg overflow-hidden">
      <Canvas camera={{ position: [0, 5, 10] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />
        
        <group ref={groupRef}>
          <Server position={[-2, 0, 0]} name="API Gateway" status="healthy" />
          <Server position={[0, 0, 0]} name="Auth Service" status="degraded" />
          <Server position={[2, 0, 0]} name="Database" status="healthy" />
          
          <Connection start={[-2, 0, 0]} end={[0, 0, 0]} />
          <Connection start={[0, 0, 0]} end={[2, 0, 0]} />
        </group>
      </Canvas>
    </div>
  );
}