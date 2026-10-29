"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const LIME = new THREE.Color("#C8FF00");
const LAYERS = 5;
const SLAB = { w: 3.2, d: 2.2, h: 0.22, r: 0.22 };

/** Rounded-rectangle slab geometry, built once and shared by every layer. */
function useSlabGeometry() {
    return useMemo(() => {
        const { w, d, h, r } = SLAB;
        const shape = new THREE.Shape();
        const x = -w / 2;
        const y = -d / 2;
        shape.moveTo(x + r, y);
        shape.lineTo(x + w - r, y);
        shape.quadraticCurveTo(x + w, y, x + w, y + r);
        shape.lineTo(x + w, y + d - r);
        shape.quadraticCurveTo(x + w, y + d, x + w - r, y + d);
        shape.lineTo(x + r, y + d);
        shape.quadraticCurveTo(x, y + d, x, y + d - r);
        shape.lineTo(x, y + r);
        shape.quadraticCurveTo(x, y, x + r, y);

        const geo = new THREE.ExtrudeGeometry(shape, {
            depth: h,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.03,
            bevelSegments: 3,
            curveSegments: 10,
        });
        geo.rotateX(-Math.PI / 2);
        geo.translate(0, -h / 2, 0);
        geo.computeVertexNormals();
        const edges = new THREE.EdgesGeometry(geo, 30);
        return { geo, edges };
    }, []);
}

/** Thin bars on top of each slab, hinting at the UI or code living on that layer. */
function LayerDetails({ index }: { index: number }) {
    const isTop = index === LAYERS - 1;
    const rows = useMemo(() => {
        const out: { x: number; z: number; w: number }[] = [];
        const count = 3 + (index % 3);
        for (let i = 0; i < count; i++) {
            const w = 0.5 + ((index * 7 + i * 13) % 10) / 10;
            out.push({ x: -1.1 + w / 2, z: -0.65 + i * 0.32, w });
        }
        return out;
    }, [index]);

    return (
        <group position={[0, SLAB.h / 2 + 0.035, 0]}>
            {rows.map((it, i) => (
                <mesh key={i} position={[it.x, 0, it.z]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[it.w, 0.07]} />
                    <meshBasicMaterial
                        color={isTop ? "#000000" : i === 0 ? LIME : "#ffffff"}
                        transparent
                        opacity={isTop ? 0.35 : i === 0 ? 0.85 : 0.18}
                    />
                </mesh>
            ))}
            <mesh position={[0.95, 0, 0.1]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[0.8, 0.9]} />
                <meshBasicMaterial color={isTop ? "#000000" : "#ffffff"} transparent opacity={isTop ? 0.2 : 0.06} />
            </mesh>
        </group>
    );
}

function Stack({ progress, pointer }: { progress: React.RefObject<number>; pointer: React.RefObject<{ x: number; y: number }> }) {
    const group = useRef<THREE.Group>(null);
    const layers = useRef<(THREE.Group | null)[]>([]);
    const { geo, edges } = useSlabGeometry();

    const bodyMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#171717", metalness: 0.35, roughness: 0.55 }), []);
    const topMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "#C8FF00", metalness: 0.05, roughness: 0.6 }), []);
    const edgeMaterial = useMemo(() => new THREE.LineBasicMaterial({ color: "#ffffff", transparent: true, opacity: 0.16 }), []);

    useFrame((state, delta) => {
        const t = state.clock.elapsedTime;
        const p = progress.current ?? 0;
        const pt = pointer.current ?? { x: 0, y: 0 };
        const g = group.current;
        if (!g) return;

        // Slow idle spin, steered by the cursor.
        g.rotation.y = THREE.MathUtils.damp(g.rotation.y, -0.6 + t * 0.06 + pt.x * 0.35, 3, delta);
        g.rotation.x = THREE.MathUtils.damp(g.rotation.x, 0.42 + pt.y * 0.12, 3, delta);

        // Layers breathe apart, and spread further as the page scrolls.
        const spread = 0.42 + Math.sin(t * 0.8) * 0.03 + p * 0.9;
        layers.current.forEach((layer, i) => {
            if (!layer) return;
            const targetY = (i - (LAYERS - 1) / 2) * spread + Math.sin(t * 1.1 + i * 0.7) * 0.03;
            layer.position.y = THREE.MathUtils.damp(layer.position.y, targetY, 4, delta);
            layer.rotation.y = THREE.MathUtils.damp(layer.rotation.y, Math.sin(t * 0.5 + i) * 0.04 + p * (i - 2) * 0.12, 3, delta);
        });
    });

    return (
        <group ref={group} position={[0, -0.1, 0]}>
            {Array.from({ length: LAYERS }).map((_, i) => (
                <group key={i} ref={(el) => { layers.current[i] = el; }} position={[0, (i - 2) * 0.42, 0]}>
                    <mesh geometry={geo} material={i === LAYERS - 1 ? topMaterial : bodyMaterial} />
                    <lineSegments geometry={edges} material={edgeMaterial} />
                    <LayerDetails index={i} />
                </group>
            ))}
        </group>
    );
}

/** Keeps the camera framing sensible from phones to ultrawide screens. */
function ResponsiveCamera() {
    const { camera, size } = useThree();
    useEffect(() => {
        const aspect = size.width / size.height;
        const cam = camera as THREE.PerspectiveCamera;
        cam.position.set(0, 1.4, aspect < 0.9 ? 10.5 : 8.6);
        cam.lookAt(0, 0, 0);
        cam.updateProjectionMatrix();
    }, [camera, size]);
    return null;
}

export default function StackScene({ className }: { className?: string }) {
    const wrapper = useRef<HTMLDivElement>(null);
    const progress = useRef(0);
    const pointer = useRef({ x: 0, y: 0 });
    const [visible, setVisible] = useState(true);
    const [isSmall] = useState(() => typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches);

    useEffect(() => {
        const el = wrapper.current;
        if (!el) return;

        const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0 });
        io.observe(el);

        const onScroll = () => {
            const rect = el.getBoundingClientRect();
            progress.current = Math.min(1, Math.max(0, -rect.top / (rect.height || 1)));
        };
        const onPointer = (e: PointerEvent) => {
            pointer.current = {
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: (e.clientY / window.innerHeight) * 2 - 1,
            };
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("pointermove", onPointer, { passive: true });
        onScroll();

        return () => {
            io.disconnect();
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("pointermove", onPointer);
        };
    }, []);

    return (
        <div ref={wrapper} className={className} aria-hidden="true">
            <Canvas
                frameloop={visible ? "always" : "never"}
                dpr={isSmall ? [1, 1.5] : [1, 2]}
                gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
                camera={{ fov: 35, near: 0.1, far: 100, position: [0, 1.4, 8.6] }}
            >
                <ResponsiveCamera />
                <ambientLight intensity={0.55} />
                <directionalLight position={[4, 6, 5]} intensity={1.8} color="#ffffff" />
                <directionalLight position={[-5, 3, -4]} intensity={0.5} color="#ffffff" />
                <hemisphereLight args={["#ffffff", "#0a0a0a", 0.35]} />
                <Stack progress={progress} pointer={pointer} />
            </Canvas>
        </div>
    );
}
