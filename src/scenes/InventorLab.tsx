import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line, RoundedBox } from '@react-three/drei';
import { Group, Vector3, Quaternion } from 'three';

const route: [number,number,number][] = [[-3.7,1.5,-1.3],[-1.3,2.3,-1.8],[1.2,2.3,-1.8],[3.6,1.5,-1.3]];

type Point = [number, number, number];
function SoftForm({position,scale,color,roughness=.65}: {position:Point;scale:Point;color:string;roughness?:number}) {
  return <mesh position={position} scale={scale}><sphereGeometry args={[1,32,24]}/><meshStandardMaterial color={color} roughness={roughness}/></mesh>;
}
function Limb({from,to,radius,color}:{from:Point;to:Point;radius:number;color:string}) {
  const a=new Vector3(...from), b=new Vector3(...to), delta=b.clone().sub(a);
  const rotation=new Quaternion().setFromUnitVectors(new Vector3(0,1,0),delta.clone().normalize());
  return <mesh position={a.add(b).multiplyScalar(.5)} quaternion={rotation}><capsuleGeometry args={[radius,Math.max(.01,delta.length()-radius*2),8,20]}/><meshStandardMaterial color={color} roughness={.75}/></mesh>;
}

function World({ step, moving, accent }: { step: number; moving: boolean; accent: string }) {
  const head = useRef<Group>(null);
  const hands = useRef<Group>(null);
  const packets = useRef<Group>(null);
  const clock = useRef(0);
  const point = useRef(new Vector3());
  const target = useRef(new Vector3());
  useFrame((_, delta) => {
    if (!moving) return;
    clock.current += Math.min(delta,.05);
    const t = clock.current;
    if (head.current) head.current.rotation.z = Math.sin(t * 1.3) * .04;
    if (hands.current) hands.current.rotation.x = Math.sin(t * 12) * .05;
    packets.current?.children.forEach((child,index) => {
      const edge = index % 3;
      const progress = (t * .22 + index * .19) % 1;
      point.current.set(...route[edge]).lerp(target.current.set(...route[edge+1]),progress);
      child.position.copy(point.current);
    });
  });
  return <>
    <ambientLight intensity={1.6} />
    <directionalLight position={[3,6,-5]} intensity={3} color="#bfffd2" />
    <pointLight position={[0,2,-1]} intensity={12} color={accent} distance={7} />
    <mesh rotation={[-Math.PI/2,0,0]} position={[0,-1.12,0]}><circleGeometry args={[5.1,64]} /><meshStandardMaterial color="#091b18" metalness={.5} roughness={.5} /></mesh>
    <gridHelper args={[10,20,'#165b3b','#103626']} position={[0,-1.1,0]} />
    {/* Workbench and keyboard */}
    <RoundedBox args={[3.5,.16,1.65]} radius={.07} position={[0,.15,0]}><meshStandardMaterial color="#183c36" metalness={.65} roughness={.3} /></RoundedBox>
    {[-1.4,1.4].map(x=><mesh key={x} position={[x,-.45,.1]}><boxGeometry args={[.12,1.2,1.1]} /><meshStandardMaterial color="#102a26" /></mesh>)}
    <mesh position={[0,.26,.43]} rotation={[-.05,0,0]}><boxGeometry args={[1.1,.04,.4]} /><meshStandardMaterial color="#2a6756" emissive={accent} emissiveIntensity={.15} /></mesh>
    {/* Floating main display */}
    <RoundedBox args={[2.4,1.45,.08]} radius={.08} position={[-.9,1.2,-.65]} rotation={[-.12,0,0]}><meshStandardMaterial color="#08372f" emissive={accent} emissiveIntensity={.2} /></RoundedBox>
    {Array.from({length:6},(_,i)=><mesh key={i} position={[-1.1+(i%2)*.15,1.7-i*.19,-.76]}><boxGeometry args={[i%2===0?1.5:1.1,.035,.02]} /><meshBasicMaterial color={i===step?'#edf5ff':accent} transparent opacity={i===step?1:.35} /></mesh>)}
    {/* Smooth, articulated character with a shaped face, layered hair and individual fingers. */}
    <group position={[.5,0,1.15]} rotation={[0,-.12,0]}>
      <SoftForm position={[0,-.34,.08]} scale={[.46,.12,.4]} color="#102e2c"/>
      <SoftForm position={[0,.03,.43]} scale={[.43,.52,.12]} color="#143c39"/>
      <Limb from={[0,-.38,.12]} to={[0,-.96,.12]} radius={.065} color="#658178"/>
      {[-1,1].map(side=><Limb key={side} from={[0,-1,.1]} to={[side*.42,-1,.32]} radius={.045} color="#34534c"/>)}
      <SoftForm position={[0,.03,0]} scale={[.32,.42,.24]} color="#266f7b"/>
      <SoftForm position={[0,.33,.04]} scale={[.29,.18,.26]} color="#215c65"/>
      <Limb from={[0,.3,0]} to={[0,.56,0]} radius={.11} color="#c38968"/>
      <Line points={[[-.09,.35,-.21],[-.1,.08,-.24]]} color="#8cb4b5" lineWidth={1.3}/>
      <Line points={[[.09,.35,-.21],[.1,.1,-.24]]} color="#8cb4b5" lineWidth={1.3}/>
      <Line points={[[-.17,-.08,-.21],[0,-.16,-.245],[.17,-.08,-.21]]} color="#184c57" lineWidth={2}/>
      <group ref={head} position={[0,.77,-.035]} rotation={[.08,-.1,0]}>
        <SoftForm position={[0,0,0]} scale={[.29,.365,.285]} color="#d6a17d" roughness={.8}/>
        <SoftForm position={[0,-.16,-.06]} scale={[.22,.19,.23]} color="#d6a17d"/>
        {[-1,1].map(side=><group key={side}>
          <SoftForm position={[side*.28,-.015,.005]} scale={[.065,.105,.06]} color="#ca8e70"/>
          <SoftForm position={[side*.295,-.015,-.025]} scale={[.028,.062,.025]} color="#af6c56"/>
          <SoftForm position={[side*.11,.015,-.26]} scale={[.075,.055,.027]} color="#f2ede3"/>
          <SoftForm position={[side*.115,.012,-.285]} scale={[.029,.037,.016]} color="#3c3028"/>
          <SoftForm position={[side*.12,.017,-.299]} scale={[.014,.022,.009]} color="#111c1c"/>
          <SoftForm position={[side*.13,.03,-.304]} scale={[.009,.011,.006]} color="#ffffff"/>
          <Line points={[[side*.05,.09,-.26],[side*.11,.105,-.275],[side*.17,.085,-.25]]} color="#382920" lineWidth={3}/>
        </group>)}
        <SoftForm position={[0,-.055,-.29]} scale={[.047,.073,.065]} color="#cd9473"/>
        <Line points={[[-.07,-.16,-.268],[0,-.174,-.283],[.065,-.151,-.263]]} color="#8c5143" lineWidth={1.5}/>
        <SoftForm position={[0,.22,.04]} scale={[.305,.21,.285]} color="#29231f"/>
        {Array.from({length:11},(_,i)=><mesh key={i} position={[-.23+(i%6)*.085,.22+Math.sin(i*1.8)*.055,-.12+(i>5?.15:0)]} rotation={[.25,0,-.5+i*.07]} scale={[.12,.19,.13]}><sphereGeometry args={[1,20,16]}/><meshStandardMaterial color={i%3===0?'#403027':'#29231f'} roughness={.9}/></mesh>)}
        <SoftForm position={[-.23,.1,.06]} scale={[.065,.18,.21]} color="#29231f"/>
        <SoftForm position={[.23,.12,.07]} scale={[.065,.18,.21]} color="#29231f"/>
      </group>
      <group ref={hands}>
        {[-1,1].map(side=><group key={side}>
          <Limb from={[side*.24,.27,0]} to={[side*.39,.04,-.19]} radius={.105} color="#266f7b"/>
          <Limb from={[side*.39,.04,-.19]} to={[side*.28,.23,-.52]} radius={.08} color="#266f7b"/>
          <SoftForm position={[side*.28,.23,-.56]} scale={[.09,.045,.11]} color="#d6a17d"/>
          {[0,1,2,3].map(i=><Limb key={i} from={[side*.28+(i-1.5)*.035,.23,-.6]} to={[side*.28+(i-1.5)*.035,.215,-.7+Math.abs(i-1.5)*.015]} radius={.014} color="#d6a17d"/>)}
          <Limb from={[side*.23,.23,-.55]} to={[side*.18,.22,-.61]} radius={.023} color="#d6a17d"/>
        </group>)}
      </group>
      {[-.18,.18].map(x=><group key={x}>
        <Limb from={[x,-.22,0]} to={[x,-.4,-.42]} radius={.14} color="#253c51"/>
        <Limb from={[x,-.4,-.42]} to={[x,-.91,-.43]} radius={.105} color="#253c51"/>
        <SoftForm position={[x,-.98,-.52]} scale={[.135,.095,.24]} color="#d2ded7"/>
        <SoftForm position={[x,-.94,-.5]} scale={[.125,.09,.19]} color="#527e80"/>
        <Line points={[[x-.07,-.87,-.53],[x+.07,-.87,-.53],[x-.07,-.88,-.6],[x+.07,-.88,-.6]]} color="#dce9de" lineWidth={1.5}/>
      </group>)}
    </group>
    <Line points={route} color={accent} transparent opacity={.35} lineWidth={1.5} />
    {route.map((position,index)=><group key={index} position={position}>
      <RoundedBox args={[.75,.8,.18]} radius={.08}><meshStandardMaterial color={index===step?accent:'#182a31'} emissive={accent} emissiveIntensity={index===step?.5:.08} /></RoundedBox>
      {[0,1,2].map(i=><mesh key={i} position={[0,.2-i*.2,.11]}><boxGeometry args={[.44,.035,.02]} /><meshBasicMaterial color={index===step?'#10161e':accent} /></mesh>)}
    </group>)}
    <group ref={packets}>{Array.from({length:12},(_,i)=><mesh key={i} position={route[0]}><sphereGeometry args={[.045,8,8]} /><meshBasicMaterial color="#b7ffcf" /></mesh>)}</group>
    <mesh position={[0,-1.08,0]} rotation={[-Math.PI/2,0,0]}><ringGeometry args={[4.4,4.42,64]} /><meshBasicMaterial color={accent} transparent opacity={.35} /></mesh>
  </>;
}

export default function InventorLab({ step, moving, active, accent }: { step: number; moving: boolean; active: boolean; accent: string }) {
  const [lost,setLost] = useState(false);
  const cleanup = useRef<(()=>void)|null>(null);
  useEffect(()=>()=>cleanup.current?.(),[]);
  if (lost) return null;
  return <Canvas camera={{position:[5,2.9,-5.5],fov:43}} dpr={[1,1.5]} frameloop={active ? 'always':'never'} gl={{antialias:true,alpha:true,powerPreference:'low-power'}} onCreated={({gl})=>{
    const onLost=(e:Event)=>{e.preventDefault();setLost(true);};
    gl.domElement.addEventListener('webglcontextlost',onLost);
    cleanup.current=()=>gl.domElement.removeEventListener('webglcontextlost',onLost);
  }}><World step={step} moving={moving} accent={accent} /></Canvas>;
}
