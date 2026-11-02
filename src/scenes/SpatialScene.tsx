import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Group } from 'three';

function OrbitWorld({moving}:{moving:boolean}) {
  const rig=useRef<Group>(null);
  const inputs=useRef({x:0,y:0,scroll:0});
  const elapsed=useRef(0);
  useEffect(()=>{
    const pointer=(e:PointerEvent)=>{inputs.current.x=e.clientX/window.innerWidth-.5;inputs.current.y=e.clientY/window.innerHeight-.5;};
    const scroll=()=>{inputs.current.scroll=window.scrollY/Math.max(1,document.documentElement.scrollHeight-window.innerHeight);};
    window.addEventListener('pointermove',pointer,{passive:true});window.addEventListener('scroll',scroll,{passive:true});scroll();
    return ()=>{window.removeEventListener('pointermove',pointer);window.removeEventListener('scroll',scroll);};
  },[]);
  useFrame((_,delta)=>{
    if(!moving||!rig.current)return;
    elapsed.current+=Math.min(delta,.05);
    rig.current.rotation.y+=(inputs.current.x*.12-rig.current.rotation.y)*.025;
    rig.current.rotation.x+=(-inputs.current.y*.08-rig.current.rotation.x)*.025;
    rig.current.children.forEach((child,i)=>{child.rotation.z=elapsed.current*.025*(i%2?1:-1)+inputs.current.scroll*.6;child.rotation.y=elapsed.current*.035+i*.8;});
  });
  return <group ref={rig}>
    {([-1,1] as const).flatMap((side)=>[0,1,2].map(i=><group key={`${side}-${i}`} position={[side*(6+i*.8),2.8-i*3.1,-i*1.3]} rotation={[.4+i*.4,.5,i*.3]}>
      <mesh><torusGeometry args={[1.7+i*.2,.012,8,72]}/><meshBasicMaterial color={['#39ff14','#c69cff','#72bcff'][i]} transparent opacity={.38}/></mesh>
      <mesh rotation={[.7,.5,.2]}><icosahedronGeometry args={[1.3,0]}/><meshBasicMaterial color={['#39ff14','#c69cff','#72bcff'][i]} wireframe transparent opacity={.18}/></mesh>
      {Array.from({length:8},(_,n)=><mesh key={n} position={[Math.cos(n*Math.PI/4)*1.7,Math.sin(n*Math.PI/4)*1.7,0]}><sphereGeometry args={[.035,8,8]}/><meshBasicMaterial color={['#39ff14','#c69cff','#72bcff'][i]}/></mesh>)}
    </group>))}
  </group>;
}
export default function SpatialScene({moving}:{moving:boolean}) {
  return <Canvas camera={{position:[0,0,12],fov:48}} dpr={[1,1.5]} frameloop={moving?'always':'demand'} gl={{alpha:true,antialias:false,powerPreference:'low-power'}}><OrbitWorld moving={moving}/></Canvas>;
}
