import { useLayoutEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import { Group, MathUtils, MeshStandardMaterial } from 'three';

const STATIONS = [-3.1, 0, 3.1];
const COLORS = ['#39ff14', '#c69cff', '#72bcff'];
const REST_YAW = -Math.PI / 15;
// Larger than life so he reads clearly from the camera; lifted so the casters rest on the floor (y = -.3).
const SCALE = 1.3;
const SCALE_Y = -.3 + .285 * SCALE;
const SPOKES = Array.from({ length: 5 }, (_, i) => i * Math.PI * 2 / 5);

export default function LabDeveloper({ selected, moving }: { selected: number; moving: boolean }) {
  const station = MathUtils.clamp(Math.round(selected), 0, 2);
  const root = useRef<Group>(null);
  const swivel = useRef<Group>(null);
  const torso = useRef<Group>(null);
  const head = useRef<Group>(null);
  const leftArm = useRef<Group>(null);
  const rightArm = useRef<Group>(null);
  const wheels = useRef<(Group | null)[]>([]);
  const clock = useRef(0);
  const initialX = useRef(STATIONS[station]);
  const invalidate = useThree(state => state.invalidate);
  const materials = useMemo(() => ({
    hoodie: new MeshStandardMaterial({ color: '#4d6278', roughness: .8 }),
    pants: new MeshStandardMaterial({ color: '#22303f', roughness: .9 }),
    skin: new MeshStandardMaterial({ color: '#c68b64', roughness: .85 }),
    hair: new MeshStandardMaterial({ color: '#171519', roughness: 1 }),
    chair: new MeshStandardMaterial({ color: '#232f3d', roughness: .6 }),
    metal: new MeshStandardMaterial({ color: '#667582', metalness: .8, roughness: .35 }),
    sole: new MeshStandardMaterial({ color: '#c4ced4', roughness: .8 }),
    accent: new MeshStandardMaterial({ color: COLORS[0], emissive: COLORS[0], emissiveIntensity: .5 }),
  }), []);

  // The JSX meshes own their geometry; these shared materials are disposed here.
  useLayoutEffect(() => () => {
    Object.values(materials).forEach(material => material.dispose());
  }, [materials]);

  useLayoutEffect(() => {
    materials.accent.color.set(COLORS[station]);
    materials.accent.emissive.set(COLORS[station]);
    // Reduced motion still responds to selection, without a transition.
    if (!moving) {
      if (root.current) root.current.position.x = STATIONS[station];
      if (swivel.current) swivel.current.rotation.y = REST_YAW;
      if (torso.current) { torso.current.rotation.x = -.07; torso.current.scale.y = 1; }
      if (head.current) head.current.rotation.set(0, 0, 0);
      if (leftArm.current) leftArm.current.rotation.x = 0;
      if (rightArm.current) rightArm.current.rotation.x = 0;
    }
    invalidate();
  }, [station, moving, materials, invalidate]);

  useFrame((_, delta) => {
    if (!moving || !root.current || !swivel.current || !torso.current || !head.current) return;
    const dt = Math.min(delta, .1);
    clock.current += dt;
    const t = clock.current;
    const previous = root.current.position.x;
    const distance = STATIONS[station] - previous;
    root.current.position.x = MathUtils.damp(previous, STATIONS[station], 3.8, dt);
    const travel = MathUtils.smoothstep(Math.abs(distance), .025, .65);
    const work = 1 - travel;
    const targetYaw = REST_YAW - Math.sign(distance) * travel * .16 + Math.sin(t * .55) * .025 * work;
    swivel.current.rotation.y = MathUtils.damp(swivel.current.rotation.y, targetYaw, 5, dt);
    torso.current.rotation.x = MathUtils.damp(torso.current.rotation.x, -.07 + travel * .2, 6, dt);
    torso.current.scale.y = 1 + Math.sin(t * 1.8) * .008;
    head.current.rotation.y = Math.sin(t * .7) * .065 * work;
    head.current.rotation.x = -.025 - Math.pow(Math.max(0, Math.sin(t * .48)), 8) * .1 * work;
    if (leftArm.current) leftArm.current.rotation.x = travel * .48 + Math.sin(t * 21) * .025 * work;
    if (rightArm.current) rightArm.current.rotation.x = travel * .48 + Math.sin(t * 21 + Math.PI) * .025 * work;
    const roll = (root.current.position.x - previous) / .065;
    for (const wheel of wheels.current) if (wheel) wheel.rotation.x += roll;
  });

  return <group ref={root} position={[initialX.current, SCALE_Y, 1.6]} scale={SCALE}>
    <pointLight position={[0, 2.1, .9]} intensity={2.2} distance={3.2} decay={1.6} color="#e6eeff" />
    <mesh position={[0, -.282, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[1, .85, 1]}>
      <circleGeometry args={[.62, 32]} />
      <meshBasicMaterial color="#000000" transparent opacity={.23} depthWrite={false} />
    </mesh>
    <mesh position={[0, .12, 0]} material={materials.metal}><cylinderGeometry args={[.045, .065, .56, 10]} /></mesh>
    {SPOKES.map((angle, i) => <group key={angle} rotation={[0, angle, 0]}>
      <mesh position={[0, -.15, .23]} material={materials.metal}><boxGeometry args={[.055, .045, .46]} /></mesh>
      <group position={[0, -.22, .44]} rotation={[0, -angle + Math.PI / 2, 0]}>
        <group ref={node => { wheels.current[i] = node; }}>
          <mesh rotation={[0, 0, Math.PI / 2]} material={materials.chair}><cylinderGeometry args={[.065, .065, .085, 10]} /></mesh>
          <mesh position={[.045, 0, 0]} material={materials.metal}><boxGeometry args={[.012, .08, .018]} /></mesh>
        </group>
      </group>
    </group>)}
    <group ref={swivel} rotation={[0, REST_YAW, 0]}>
      <RoundedBox args={[.62, .12, .58]} radius={.06} smoothness={2} position={[0, .42, 0]} material={materials.chair} />
      <RoundedBox args={[.52, .85, .12]} radius={.07} smoothness={2} position={[0, .89, .28]} rotation={[.1, 0, 0]} material={materials.chair} />
      <RoundedBox args={[.3, .18, .14]} radius={.05} smoothness={2} position={[0, 1.28, .31]} material={materials.chair} />
      <mesh position={[0, 1.18, .355]} material={materials.accent}><boxGeometry args={[.32, .035, .012]} /></mesh>
      {[-1, 1].map(side => <group key={side}>
        <RoundedBox args={[.09, .68, .17]} radius={.035} smoothness={2} position={[side * .27, .9, .23]} rotation={[0, 0, side * -.1]} material={materials.accent} />
        <mesh position={[side * .36, .55, .04]} material={materials.metal}><boxGeometry args={[.035, .26, .035]} /></mesh>
        <RoundedBox args={[.09, .065, .38]} radius={.025} smoothness={2} position={[side * .36, .69, -.04]} material={materials.chair} />
        <mesh position={[side * .14, .52, -.24]} rotation={[Math.PI / 2, 0, 0]} material={materials.pants}><capsuleGeometry args={[.105, .29, 4, 10]} /></mesh>
        <mesh position={[side * .14, .2, -.43]} material={materials.pants}><capsuleGeometry args={[.08, .36, 4, 10]} /></mesh>
        <RoundedBox args={[.18, .13, .31]} radius={.04} smoothness={2} position={[side * .14, -.08, -.51]} material={materials.hoodie} />
        <RoundedBox args={[.19, .035, .32]} radius={.012} smoothness={2} position={[side * .14, -.15, -.51]} material={materials.sole} />
      </group>)}
      <group ref={torso} position={[0, .53, -.04]} rotation={[-.07, 0, 0]}>
        <RoundedBox args={[.43, .5, .31]} radius={.11} smoothness={3} position={[0, .25, 0]} material={materials.hoodie} />
        <mesh position={[0, .45, .09]} scale={[1, .55, 1]} material={materials.hoodie}><sphereGeometry args={[.19, 16, 10]} /></mesh>
        <mesh position={[0, .54, -.015]} material={materials.skin}><cylinderGeometry args={[.065, .075, .12, 10]} /></mesh>
        <group ref={head} position={[0, .72, -.025]}>
          <mesh scale={[.83, 1, .86]} material={materials.skin}><sphereGeometry args={[.185, 20, 14]} /></mesh>
          <mesh position={[0, .065, .018]} scale={[.88, .7, .9]} material={materials.hair}><sphereGeometry args={[.19, 16, 12]} /></mesh>
          <mesh position={[0, -.005, -.16]} material={materials.skin}><sphereGeometry args={[.035, 10, 8]} /></mesh>
          {[-1, 1].map(side => <group key={side}>
            <mesh position={[side * .15, -.015, 0]} material={materials.skin}><sphereGeometry args={[.04, 10, 8]} /></mesh>
            <mesh position={[side * .06, .015, -.153]} material={materials.hair}><sphereGeometry args={[.012, 8, 6]} /></mesh>
          </group>)}
        </group>
        {[-1, 1].map(side => <group key={side} ref={side === -1 ? leftArm : rightArm} position={[side * .25, .48, -.015]}>
          <mesh position={[0, -.13, -.1]} rotation={[.55, 0, 0]} material={materials.hoodie}><capsuleGeometry args={[.07, .21, 4, 10]} /></mesh>
          <group position={[0, -.2, -.18]} rotation={[Math.PI / 2 + .18, 0, 0]}>
            <mesh position={[0, -.16, 0]} material={materials.hoodie}><capsuleGeometry args={[.06, .24, 4, 10]} /></mesh>
            <mesh position={[0, -.33, 0]} scale={[1, 1.4, .65]} material={materials.skin}><sphereGeometry args={[.066, 12, 8]} /></mesh>
          </group>
        </group>)}
      </group>
    </group>
  </group>;
}
