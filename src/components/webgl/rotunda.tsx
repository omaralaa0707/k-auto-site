"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useWebglHealth } from "@/lib/use-webgl-health";

/**
 * K.auto's signature piece: the rotunda.
 *
 * Their showroom is a circular dais under a domed ceiling, with a cove light
 * running round the rim and the cars stood on the turning floor. So this is
 * that floor, seen from above and slightly to one side, with their own frames
 * standing on it — and the whole plate turns.
 *
 * It is a *plan*, not a carousel: the camera looks down onto a real disc, the
 * radial cove segments are instanced geometry around its rim, and the frames
 * stand upright on the plate rather than being wrapped around a cylinder. The
 * plate keeps turning on its own and the pointer adds or removes momentum
 * rather than driving it directly, because a turntable has mass.
 */

const SPOKES = 48;

function Cove() {
  const mesh = useRef<THREE.InstancedMesh>(null);

  useEffect(() => {
    const m = mesh.current;
    if (!m) return;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < SPOKES; i++) {
      const a = (i / SPOKES) * Math.PI * 2;
      dummy.position.set(Math.cos(a) * 3.05, 0.02, Math.sin(a) * 3.05);
      dummy.rotation.set(-Math.PI / 2, 0, -a);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    }
    m.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, SPOKES]} frustumCulled={false}>
      <planeGeometry args={[0.3, 0.055]} />
      <meshBasicMaterial color="#c9a06a" toneMapped={false} transparent opacity={0.85} />
    </instancedMesh>
  );
}

function Frame({ src, angle }: { src: string; angle: number }) {
  const tex = useTexture(src);
  const r = 2.25;

  return (
    <group position={[Math.cos(angle) * r, 0.52, Math.sin(angle) * r]} rotation={[0, -angle + Math.PI / 2, 0]}>
      <mesh>
        <planeGeometry args={[1.44, 0.96]} />
        <meshBasicMaterial map={tex} map-colorSpace={THREE.SRGBColorSpace} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
      {/* A soft ellipse under each frame, so it reads as standing on the plate
          rather than floating over it. */}
      <mesh position={[0, -0.49, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[1, 0.42, 1]}>
        <circleGeometry args={[0.82, 28]} />
        <meshBasicMaterial color="#6f5c4c" toneMapped={false} transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

function Plate({ frames }: { frames: string[] }) {
  const group = useRef<THREE.Group>(null);
  const spin = useRef(0.16);
  const angle = useRef(0);
  const pointer = useRef(0);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      // Horizontal pointer position adds or removes momentum, rather than
      // setting the angle: a loaded turntable has mass.
      pointer.current = (e.clientX / window.innerWidth - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    const target = 0.16 + pointer.current * 0.5;
    spin.current += (target - spin.current) * (1 - Math.pow(0.05, dt));
    angle.current += spin.current * dt;
    if (group.current) group.current.rotation.y = angle.current;
  });

  const placed = useMemo(
    () => frames.map((src, i) => ({ src, angle: (i / frames.length) * Math.PI * 2 })),
    [frames],
  );

  return (
    <group ref={group}>
      {/* Their floor, as their own photographs have it: a cream turning plate
          set into a timber floor, with the cove light round the outside. Not a
          stage black — the room is bright, and every frame proves it. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[3.4, 72]} />
        <meshBasicMaterial color="#7a5c46" toneMapped={false} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.006, 0]}>
        <circleGeometry args={[2.72, 64]} />
        <meshBasicMaterial color="#e6ded2" toneMapped={false} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, 0]}>
        <ringGeometry args={[2.66, 2.72, 64]} />
        <meshBasicMaterial color="#c9a06a" toneMapped={false} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[3.28, 3.4, 72]} />
        <meshBasicMaterial color="#c9a06a" toneMapped={false} />
      </mesh>
      <Cove />
      <Suspense fallback={null}>
        {placed.map((p) => (
          <Frame key={p.src} src={p.src} angle={p.angle} />
        ))}
      </Suspense>
    </group>
  );
}

/**
 * A context the browser refuses outright makes r3f throw on mount, which
 * use-webgl-health cannot see — it only reports a context created and then
 * lost. Probe before rendering the Canvas at all.
 */
function canRenderWebgl() {
  try {
    const c = document.createElement("canvas");
    return Boolean(
      c.getContext("webgl2") ?? c.getContext("webgl") ?? c.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
}

export function Rotunda({
  frames,
  still,
  alt,
  className,
}: {
  frames: string[];
  /** Shown when the canvas cannot run: their own photograph of the room. */
  still: string;
  alt: string;
  className?: string;
}) {
  const { lost, bind } = useWebglHealth();
  const [supported, setSupported] = useState<boolean | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    // A browser-only capability answer cannot be known before an effect runs,
    // and a lazy initialiser reading `window` would desync hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSupported(canRenderWebgl());
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  if (lost || reduced || supported !== true) {
    return (
      <div className={className}>
        <img src={still} alt={alt} className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <div className={className} role="img" aria-label={alt}>
      <Canvas
        style={{ width: "100%", height: "100%" }}
        camera={{ position: [0, 4.1, 7.8], fov: 38 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl, camera }) => {
          bind(gl.domElement);
          camera.lookAt(0, 0.4, 0);
        }}
      >
        <Plate frames={frames} />
      </Canvas>
    </div>
  );
}
