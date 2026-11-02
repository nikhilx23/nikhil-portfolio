import { useEffect, useMemo, useRef, useState, type MutableRefObject, type PointerEvent } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { CanvasTexture, Group, MathUtils, SRGBColorSpace } from 'three';
import { portfolio } from '../data/portfolio';
import { spherePoints } from '../lib/spherePoints';

type Rotation = { x: number; y: number; dragging: boolean };

function SkillLabel({ text, position }: { text: string; position: [number, number, number] }) {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024; canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.font = '38px monospace';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillStyle = '#D7E0DA';
      ctx.fillText(text, 512, 64, 980);
    }
    const result = new CanvasTexture(canvas);
    result.colorSpace = SRGBColorSpace;
    return result;
  }, [text]);
  useEffect(() => () => texture.dispose(), [texture]);
  return <sprite position={position} scale={[4, 0.5, 1]}><spriteMaterial map={texture} transparent depthWrite={false} opacity={0.92} /></sprite>;
}

function Cloud({ tags, rotation, paused }: { tags: string[]; rotation: MutableRefObject<Rotation>; paused: boolean }) {
  const group = useRef<Group>(null);
  const positions = useMemo(() => spherePoints(tags.length), [tags.length]);
  useFrame((_, delta) => {
    if (!group.current) return;
    const dt = Math.min(delta, .05);
    if (!paused && !rotation.current.dragging) rotation.current.y += dt * .065;
    group.current.rotation.x = MathUtils.damp(group.current.rotation.x, rotation.current.x, 8, dt);
    group.current.rotation.y = MathUtils.damp(group.current.rotation.y, rotation.current.y, 8, dt);
  });
  return <group ref={group}>{tags.map((tag,index) => <SkillLabel key={tag} text={tag} position={positions[index]} />)}</group>;
}

export default function SkillsCloud({ active, tags }: { active: boolean; tags: string[] }) {
  const rotation = useRef<Rotation>({ x: 0, y: 0, dragging: false });
  const last = useRef({ x: 0, y: 0 });
  const [paused, setPaused] = useState(false);
  const [lost, setLost] = useState(false);
  const cleanup = useRef<(() => void) | null>(null);
  useEffect(() => () => cleanup.current?.(), []);
  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (!rotation.current.dragging) return;
    rotation.current.y += (event.clientX - last.current.x) * .006;
    rotation.current.x = MathUtils.clamp(rotation.current.x + (event.clientY - last.current.y) * .006, -1.1, 1.1);
    last.current = { x: event.clientX, y: event.clientY };
  };
  const stop = () => { rotation.current.dragging = false; };
  const rotate = (x: number, y: number) => {
    setPaused(true);
    rotation.current.x = MathUtils.clamp(rotation.current.x + x, -1.1, 1.1);
    rotation.current.y += y;
  };
  if (lost) return <p className="cloud-fallback">{portfolio.labels.cloudFallback}</p>;
  return <div className="skills-cloud">
    <div className="skills-canvas" aria-hidden="true" onPointerDown={event => {
      if (event.button !== 0) return;
      event.currentTarget.setPointerCapture(event.pointerId);
      rotation.current.dragging = true;
      last.current = { x: event.clientX, y: event.clientY };
    }} onPointerMove={move} onPointerUp={stop} onPointerCancel={stop} onLostPointerCapture={stop}>
      <Canvas dpr={[1,2]} frameloop={active ? 'always' : 'never'} camera={{ position: [0,0,13], fov: 50 }} gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }} fallback={<p>{portfolio.labels.cloudFallback}</p>}
        onCreated={({gl}) => {
          const canvas = gl.domElement;
          const onLost = (event: Event) => { event.preventDefault(); setLost(true); };
          canvas.addEventListener('webglcontextlost', onLost);
          cleanup.current = () => canvas.removeEventListener('webglcontextlost', onLost);
        }}>
        <Cloud tags={tags} rotation={rotation} paused={paused} />
      </Canvas>
    </div>
    <p className="cloud-instructions">{portfolio.labels.skillInstructions}</p>
    <div className="cloud-controls" role="group" aria-label={portfolio.labels.cloudControls}>
      <button type="button" onClick={() => setPaused(!paused)} aria-pressed={paused}>{paused ? portfolio.labels.resumeRotation : portfolio.labels.pauseRotation}</button>
      <button type="button" onClick={() => rotate(0,-.35)} aria-label={portfolio.labels.rotateLeft}>←</button>
      <button type="button" onClick={() => rotate(0,.35)} aria-label={portfolio.labels.rotateRight}>→</button>
      <button type="button" onClick={() => rotate(-.25,0)} aria-label={portfolio.labels.rotateUp}>↑</button>
      <button type="button" onClick={() => rotate(.25,0)} aria-label={portfolio.labels.rotateDown}>↓</button>
    </div>
  </div>;
}
