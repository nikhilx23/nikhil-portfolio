import { useMemo, useRef } from 'react';
import LabDeveloper from './LabDeveloper';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import { CatmullRomCurve3, Group, Mesh, Vector3 } from 'three';

const colors = ['#39ff14', '#c69cff', '#72bcff'];
function Pipe({ x, color, moving }: { x:number; color:string; moving:boolean }) {
  const curve=useMemo(()=>new CatmullRomCurve3([new Vector3(x,1,-3.3),new Vector3(x,2.7,-2.8),new Vector3(x*.55,3,-1.4),new Vector3(x,1.25,0)]),[x]);
  const packets=useRef<Group>(null);
  const time=useRef(0);
  useFrame((_,delta)=>{if(!moving||!packets.current)return; time.current+=Math.min(delta,.05);packets.current.children.forEach((m,i)=>{m.position.copy(curve.getPoint((time.current*.11+i/6)%1));m.rotation.y=time.current*.7;});});
  return <group>
    <mesh><tubeGeometry args={[curve,40,.055,8,false]}/><meshStandardMaterial color={color} emissive={color} emissiveIntensity={.35} transparent opacity={.22} roughness={.15}/></mesh>
    <mesh><tubeGeometry args={[curve,40,.012,6,false]}/><meshBasicMaterial color={color}/></mesh>
    <group ref={packets}>{Array.from({length:6},(_,i)=><mesh key={i} position={curve.getPoint(i/6)}><boxGeometry args={[.09,.13,.025]}/><meshBasicMaterial color={color}/></mesh>)}</group>
  </group>;
}
function Terminal({x,index,selected,onSelect}:{x:number;index:number;selected:number;onSelect:(index:number)=>void}) {
  const color=colors[index];
  const face=useRef<Mesh>(null);
  return <group position={[x,0,0]} onClick={e=>{e.stopPropagation();onSelect(index);}} onPointerOver={e=>{e.stopPropagation();document.body.style.cursor='pointer';}} onPointerOut={()=>{document.body.style.cursor='';}}>
    <RoundedBox args={[2.5,.16,1.25]} radius={.06} position={[0,.72,.25]}><meshStandardMaterial color="#24333e" metalness={.85} roughness={.23}/></RoundedBox>
    {[-.95,.95].map(n=><mesh key={n} position={[n,.25,.32]}><boxGeometry args={[.1,.95,.8]}/><meshStandardMaterial color="#101c24" metalness={.7} roughness={.3}/></mesh>)}
    <mesh position={[0,1.04,-.08]}><boxGeometry args={[.1,.7,.12]}/><meshStandardMaterial color="#566577" metalness={.8} roughness={.2}/></mesh>
    <RoundedBox args={[2.15,1.25,.12]} radius={.07} position={[0,1.8,-.12]}><meshStandardMaterial color="#16252f" metalness={.8} roughness={.2}/></RoundedBox>
    <mesh ref={face} position={[0,1.8,-.052]}><planeGeometry args={[1.98,1.1]}/><meshStandardMaterial color="#061116" emissive={color} emissiveIntensity={selected===index?.18:.035}/></mesh>
    <mesh position={[-.65,2.14,.02]}><planeGeometry args={[.45,.035]}/><meshBasicMaterial color={color}/></mesh>
    {Array.from({length:5},(_,i)=><group key={i} position={[-.23,1.94-i*.12,.02]}><mesh><planeGeometry args={[1.2-i%3*.18,.025]}/><meshBasicMaterial color={color} transparent opacity={.45}/></mesh><mesh position={[-.55,0,.01]}><planeGeometry args={[.045,.045]}/><meshBasicMaterial color={color}/></mesh></group>)}
    <mesh position={[.7,1.75,.02]}><torusGeometry args={[.16,.018,8,32]}/><meshBasicMaterial color={color}/></mesh>
    <mesh position={[0,.82,.55]} rotation={[-Math.PI/2,0,0]}><boxGeometry args={[.9,.32,.03]}/><meshStandardMaterial color="#253847" roughness={.6}/></mesh>
    <mesh position={[0,.66,.89]}><boxGeometry args={[2.3,.022,.022]}/><meshBasicMaterial color={color}/></mesh>
    {selected===index&&<pointLight position={[0,1.9,.8]} color={color} intensity={3} distance={4}/>}
  </group>;
}
function Room({selected,onSelect,moving}:{selected:number;onSelect:(i:number)=>void;moving:boolean}) {
  const rig=useRef<Group>(null);
  useFrame(({pointer})=>{if(moving&&rig.current){rig.current.rotation.y+=(pointer.x*.025-rig.current.rotation.y)*.04;}});
  return <group ref={rig}>
    <LabDeveloper selected={selected} moving={moving} />
    <ambientLight intensity={.5}/><hemisphereLight args={['#b1c9db','#030708',1.4]}/><directionalLight position={[2,7,5]} intensity={3} color="#bad8ec"/>
    <pointLight position={[-5,3,-2]} intensity={20} color="#00ff9c" distance={9}/><pointLight position={[5,3,-2]} intensity={20} color="#8274ff" distance={9}/>
    <mesh rotation={[-Math.PI/2,0,0]} position={[0,-.3,0]}><planeGeometry args={[24,20]}/><meshStandardMaterial color="#0e1921" metalness={.8} roughness={.23}/></mesh>
    <gridHelper args={[24,30,'#1b4654','#142833']} position={[0,-.285,0]}/>
    <mesh position={[0,2,-4]}><boxGeometry args={[17,5,.2]}/><meshStandardMaterial color="#101923" metalness={.55} roughness={.4}/></mesh>
    {[-6,-4.5,-3,3,4.5,6].map((x,i)=><group key={x} position={[x,0,-3.45]}>
      <RoundedBox args={[1.05,3.7,.65]} radius={.035} position={[0,1.6,0]}><meshStandardMaterial color="#15222d" metalness={.8} roughness={.3}/></RoundedBox>
      {Array.from({length:9},(_,n)=><group key={n} position={[0,n*.34+.15,.35]}><mesh><boxGeometry args={[.88,.23,.035]}/><meshStandardMaterial color="#070c12"/></mesh><mesh position={[-.32,0,.03]}><boxGeometry args={[.07,.025,.02]}/><meshBasicMaterial color={colors[i%3]}/></mesh><mesh position={[.1,0,.03]}><boxGeometry args={[.4,.01,.02]}/><meshBasicMaterial color="#506270"/></mesh></group>)}
    </group>)}
    {[-5,0,5].map(x=><mesh key={x} position={[x,4.3,-1]}><boxGeometry args={[2.2,.025,.25]}/><meshBasicMaterial color="#b2e0ef"/></mesh>)}
    {[-3.1,0,3.1].map((x,i)=><group key={x}><Pipe x={x} color={colors[i]} moving={moving}/><Terminal x={x} index={i} selected={selected} onSelect={onSelect}/></group>)}
    <mesh position={[0,2,-3.7]}><torusGeometry args={[.66,.02,8,64]}/><meshBasicMaterial color={colors[selected]}/></mesh>
    <mesh position={[0,2,-3.65]} rotation={[0,0,Math.PI/4]}><octahedronGeometry args={[.3,0]}/><meshStandardMaterial color={colors[selected]} wireframe emissive={colors[selected]} emissiveIntensity={2}/></mesh>
  </group>;
}
export default function ProjectLabScene(props:{selected:number;onSelect:(i:number)=>void;moving:boolean}) {
  return <Canvas camera={{position:[0,4.5,10.8],fov:43}} dpr={[1,1.5]} frameloop={props.moving?'always':'demand'} gl={{antialias:true,alpha:true}} onCreated={({camera})=>camera.lookAt(0,1.2,-.8)}><fog attach="fog" args={['#060c12',13,26]}/><Room {...props}/></Canvas>;
}
