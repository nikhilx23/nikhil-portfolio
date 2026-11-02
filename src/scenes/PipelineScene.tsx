import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import { BufferAttribute, Group, MathUtils, Points } from 'three';

const nodes: [number, number, number][] = [
  [-7,-2,-2],[-5,1,0],[-3,-1,1],[-2,3,-2],[0,0,0],[2,2,1],[3,-2,-1],[5,1,-2],[7,3,0],[7,-3,0],[0,-4,-2],[-6,4,-3],
];
const edges = [[0,1],[1,2],[1,3],[2,4],[3,4],[4,5],[4,6],[5,7],[7,8],[6,9],[6,10],[2,10],[3,11],[5,8]];

function Network({ mobile }: { mobile: boolean }) {
  const group = useRef<Group>(null);
  const particles = useRef<Points>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const elapsed = useRef(0);
  const count = mobile ? 42 : 168;
  const positions = useMemo(() => new Float32Array(count * 3), [count]);
  useEffect(() => {
    if (mobile) return;
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      pointer.current = { x: event.clientX / window.innerWidth - 0.5, y: event.clientY / window.innerHeight - 0.5 };
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [mobile]);
  useFrame((_, delta) => {
    elapsed.current += Math.min(delta, 0.05);
    if (group.current) {
      group.current.rotation.y = MathUtils.damp(group.current.rotation.y, pointer.current.x * 0.13, 3, delta);
      group.current.rotation.x = MathUtils.damp(group.current.rotation.x, pointer.current.y * 0.08, 3, delta);
    }
    for (let i = 0; i < count; i++) {
      const [from, to] = edges[i % edges.length];
      const t = (elapsed.current * 0.12 + i * 0.61803398875) % 1;
      for (let axis = 0; axis < 3; axis++) positions[i * 3 + axis] = MathUtils.lerp(nodes[from][axis], nodes[to][axis], t);
    }
    if (particles.current) (particles.current.geometry.attributes.position as BufferAttribute).needsUpdate = true;
  });
  return <group ref={group}>
    {edges.map(([a,b]) => <Line key={`${a}-${b}`} points={[nodes[a], nodes[b]]} color="#00FF9C" transparent opacity={0.16} lineWidth={1} />)}
    {nodes.map((position, index) => <mesh key={index} position={position}><sphereGeometry args={[0.055, 8, 8]} /><meshBasicMaterial color="#39FF14" /></mesh>)}
    <points ref={particles} frustumCulled={false}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
      <pointsMaterial color="#39FF14" size={mobile ? 0.045 : 0.035} transparent opacity={0.8} depthWrite={false} sizeAttenuation />
    </points>
  </group>;
}

export default function PipelineScene({ active, mobile }: { active: boolean; mobile: boolean }) {
  const [lost, setLost] = useState(false);
  const cleanup = useRef<(() => void) | null>(null);
  useEffect(() => () => cleanup.current?.(), []);
  if (lost) return null;
  return <Canvas dpr={[1, mobile ? 1 : 2]} frameloop={active ? 'always' : 'never'} camera={{ position: [0,0,12], fov: 48 }} gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }} fallback={null}
    onCreated={({ gl }) => {
      const canvas = gl.domElement;
      const onLost = (event: Event) => { event.preventDefault(); setLost(true); };
      canvas.addEventListener('webglcontextlost', onLost);
      cleanup.current = () => canvas.removeEventListener('webglcontextlost', onLost);
    }}>
    <Network mobile={mobile} />
  </Canvas>;
}
