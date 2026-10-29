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

/** Soft radial sprite used for the glow under the stack (cheaper than a bloom pass). */
function useGlowTexture() {
    return useMemo(() => {
        const size = 256;
        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = size;
        const ctx = canvas.getContext("2d")!;
        const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
        g.addColorStop(0, "rgba(200,255,0,0.55)");
        g.addColorStop(0.35, "rgba(200,255,0,0.16)");
        g.addColorStop(1, "rgba(200,255,0,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, size, size);
        const tex = new THREE.CanvasTexture(canvas);
        tex.colorSpace = THREE.SRGBColorSpace;
        return tex;
    }, []);
}

/** Small glowing bars on top of each slab, hinting at UI / code living on that layer. */
function LayerDetails({ index }: { index: number }) {
    const items = useMemo(() => {
        const rows: { x: number; z: number; w: number; o: number }[] = [];
        const count = 3 + (index % 3);
        for (let i = 0; i < count; i++) {
            const w = 0.5 + ((index * 7 + i * 13) % 10) / 10;
            rows.push({ x: -1.1 + w / 2, z: -0.65 + i * 0.32, w, o: 0.25 + (i === 0 ? 0.5 : 0) });
        }
        return rows;
    }, [index]);

    return (
        <group position={[0, SLAB.h / 2 + 0.035, 0]}>
            {items.map((it, i) => (
                <mesh key={i} position={[it.x, 0, it.z]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[it.w, 0.07]} />
                    <meshBasicMaterial color={LIME} transparent opacity={it.o} toneMapped={false} />
                </mesh>
            ))}
            {/* a little "card" tile on the right of each layer */}
            <mesh position={[0.95, 0, 0.1]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[0.8, 0.9]} />
                <meshBasicMaterial color={index === LAYERS - 1 ? "#000000" : LIME} transparent opacity={index === LAYERS - 1 ? 0.35 : 0.07} toneMapped={false} />
            </mesh>
        </group>
    );
}

function Stack({ progress, pointer }: { progress: React.RefObject<number>; pointer: React.RefObject<{ x: number; y: number }> }) {
    const group = useRef<THREE.Group>(null);
    const layers = useRef<(THREE.Group | null)[]>([]);
    const glow = useRef<THREE.Mesh>(null);
    const { geo, edges } = useSlabGeometry();
    const glowTex = useGlowTexture();

    const bodyMaterial = useMemo(
        () =>
            new THREE.MeshStandardMaterial({
                color: "#121410",
                metalness: 0.65,
                roughness: 0.28,
                envMapIntensity: 0.6,
            }),
        []
    );
    const topMaterial = useMemo(
        () =>
            new THREE.MeshStandardMaterial({
                color: "#C8FF00",
                emissive: "#7a9c00",
                emissiveIntensity: 0.55,
                metalness: 0.3,
                roughness: 0.35,
            }),
        []
    );
    const edgeMaterial = useMemo(() => new THREE.LineBasicMaterial({ color: LIME, transparent: true, opacity: 0.55 }), []);

    useFrame((state, delta) => {
        const t = state.clock.elapsedTime;
        const p = progress.current ?? 0;
        const pt = pointer.current ?? { x: 0, y: 0 };
        const g = group.current;
        if (!g) return;

        // Slow idle spin, steered by the cursor.
        g.rotation.y = THREE.MathUtils.damp(g.rotation.y, -0.6 + t * 0.08 + pt.x * 0.45, 3, delta);
        g.rotation.x = THREE.MathUtils.damp(g.rotation.x, 0.42 + pt.y * 0.18, 3, delta);

        // Layers breathe apart, and spread further as the page scrolls.
        const spread = 0.42 + Math.sin(t * 0.9) * 0.04 + p * 0.9;
        layers.current.forEach((layer, i) => {
            if (!layer) return;
            const targetY = (i - (LAYERS - 1) / 2) * spread + Math.sin(t * 1.2 + i * 0.7) * 0.035;
            layer.position.y = THREE.MathUtils.damp(layer.position.y, targetY, 4, delta);
            layer.rotation.y = THREE.MathUtils.damp(layer.rotation.y, Math.sin(t * 0.5 + i) * 0.05 + p * (i - 2) * 0.12, 3, delta);
        });

        if (glow.current) {
            const s = 7 + Math.sin(t * 1.4) * 0.4;
            glow.current.scale.set(s, s, 1);
        }
    });

    return (
        <group ref={group} position={[0, -0.1, 0]}>
            {Array.from({ length: LAYERS }).map((_, i) => {
                const isTop = i === LAYERS - 1;
                return (
                    <group key={i} ref={(el) => { layers.current[i] = el; }} position={[0, (i - 2) * 0.42, 0]}>
                        <mesh geometry={geo} material={isTop ? topMaterial : bodyMaterial} castShadow />
                        <lineSegments geometry={edges} material={edgeMaterial} />
                        <LayerDetails index={i} />
                    </group>
                );
            })}

            {/* Vertical data rails at the corners, linking the layers */}
            {[
                [-SLAB.w / 2 + 0.25, -SLAB.d / 2 + 0.25],
                [SLAB.w / 2 - 0.25, SLAB.d / 2 - 0.25],
            ].map(([x, z], i) => (
                <mesh key={i} position={[x, 0, z]}>
                    <cylinderGeometry args={[0.012, 0.012, 4.2, 6]} />
                    <meshBasicMaterial color={LIME} transparent opacity={0.35} toneMapped={false} />
                </mesh>
            ))}

            <mesh ref={glow} position={[0, -1.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[1, 1]} />
                <meshBasicMaterial map={glowTex} transparent depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
            </mesh>
        </group>
    );
}

function Particles({ count }: { count: number }) {
    const ref = useRef<THREE.Points>(null);
    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            // Deterministic pseudo-random so renders are stable.
            const a = (i * 2.399963) % (Math.PI * 2);
            const r = 2.6 + ((i * 7919) % 1000) / 1000 * 2.2;
            const y = (((i * 104729) % 1000) / 1000 - 0.5) * 4.5;
            arr[i * 3] = Math.cos(a) * r;
            arr[i * 3 + 1] = y;
            arr[i * 3 + 2] = Math.sin(a) * r;
        }
        return arr;
    }, [count]);

    useFrame((_, delta) => {
        if (ref.current) ref.current.rotation.y += delta * 0.05;
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial color={LIME} size={0.025} sizeAttenuation transparent opacity={0.7} depthWrite={false} toneMapped={false} />
        </points>
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
                <ambientLight intensity={0.35} />
                <directionalLight position={[4, 6, 5]} intensity={1.6} color="#ffffff" />
                <directionalLight position={[-6, 2, -4]} intensity={0.8} color="#C8FF00" />
                <pointLight position={[0, -2.5, 0]} intensity={14} distance={8} color="#C8FF00" />
                <hemisphereLight args={["#e9ffd0", "#050505", 0.4]} />
                <Stack progress={progress} pointer={pointer} />
                <Particles count={isSmall ? 220 : 480} />
            </Canvas>
        </div>
    );
}
