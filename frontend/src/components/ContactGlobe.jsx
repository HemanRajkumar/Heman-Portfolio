import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// A quiet "signal" motif for the contact section: a wireframe core (echoing
// the hero orb for visual consistency) with a small pulse orbiting it —
// a message being sent, not a decoration.

function Core() {
  const wireRef = useRef();
  const glowRef = useRef();

  useFrame((_, delta) => {
    if (wireRef.current) wireRef.current.rotation.y += delta * 0.15;
    if (glowRef.current) glowRef.current.rotation.y -= delta * 0.05;
  });

  return (
    <group>
      {/* faint solid glow behind the wireframe, additive so it reads as light, not mass */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.82, 32, 32]} />
        <meshBasicMaterial color="#5CF29A" transparent opacity={0.08} depthWrite={false} />
      </mesh>
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#5CF29A" wireframe transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

// A small bright dot that travels around one ring's path — the "message" ping.
function Pulse({ radius, tilt, speed }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    const x = Math.cos(t) * radius;
    const z = Math.sin(t) * radius;
    const pos = new THREE.Vector3(x, 0, z).applyAxisAngle(new THREE.Vector3(1, 0, 0), tilt);
    if (ref.current) ref.current.position.copy(pos);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.028, 12, 12]} />
      <meshBasicMaterial color="#FFB454" />
    </mesh>
  );
}

function Scene() {
  return (
    <Canvas camera={{ position: [0, 0.4, 3.5], fov: 42 }} gl={{ antialias: true, alpha: true }}>
      <Suspense fallback={null}>
        <Core />
        <Pulse radius={1.3} tilt={0.35} speed={0.5} />
      </Suspense>
    </Canvas>
  );
}

export default function ContactGlobe({ className = "absolute inset-0 h-full w-full" }) {
  return (
    <div className={className}>
      <Scene />
    </div>
  );
}
