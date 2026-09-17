import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import useTypewriter from "../hooks/useTypewriter.js";

// A wireframe core with a loose points cloud drifting around it — reacts gently
// to pointer position without needing any external assets.
function TechOrb() {
  const coreRef = useRef();
  const cloudRef = useRef();
  const pointer = useRef({ x: 0, y: 0 });

  const sphere = random.inSphere(new Float32Array(1800), { radius: 2.4 });

  useFrame((state, delta) => {
    const { x, y } = state.pointer;
    pointer.current.x += (x - pointer.current.x) * 0.04;
    pointer.current.y += (y - pointer.current.y) * 0.04;

    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.18;
      coreRef.current.rotation.x = pointer.current.y * 0.3;
      coreRef.current.rotation.z = -pointer.current.x * 0.2;
    }
    if (cloudRef.current) {
      cloudRef.current.rotation.y -= delta * 0.05;
      cloudRef.current.rotation.x = pointer.current.y * 0.1;
    }
  });

  return (
    <group>
      <Icosahedron ref={coreRef} args={[1.15, 1]}>
        <meshBasicMaterial color="#5CF29A" wireframe transparent opacity={0.85} />
      </Icosahedron>
      <Points ref={cloudRef} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#5CF29A"
          size={0.02}
          sizeAttenuation
          depthWrite={false}
          opacity={0.5}
        />
      </Points>
    </group>
  );
}

function Scene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5.2], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <Suspense fallback={null}>
        <TechOrb />
      </Suspense>
    </Canvas>
  );
}

// Static 2D fallback for reduced-motion users or low-power devices —
// same silhouette, no WebGL/animation cost.
function OrbFallback() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="h-64 w-64 rounded-full border border-signal/40" />
      <div className="absolute h-48 w-48 rounded-full border border-signal/25" />
      <div className="absolute h-32 w-32 rounded-full border border-signal/40" />
    </div>
  );
}

export default function Hero3D() {
  const [webglOk, setWebglOk] = useState(() => {
    if (typeof window === "undefined") return true;
    try {
      const canvas = document.createElement("canvas");
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
    } catch {
      return false;
    }
  });

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const eyebrow = useTypewriter("Computer Science Student & AI/ML Enthusiast");

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-24"
    >
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="mb-4 flex items-center font-mono text-xs text-signal">
            {eyebrow}
            <span className="ml-0.5 h-3.5 w-[2px] animate-pulse bg-signal" aria-hidden />
          </p>
          <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            Heman
            <br />
            Rajkumar
          </h1>
          <p className="mt-4 font-mono text-sm text-signal">
            B.Tech Computer Science &amp; Engineering — AI/ML Enthusiast
          </p>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-light dark:text-muted-dark">
            I study computer science at Lovely Professional University and spend most of my
            time turning that coursework into working software — FastAPI services,
            machine-learning pipelines, and interactive front ends. I'm drawn to problems where
            software development and applied AI meet.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5 dark:bg-signal dark:text-ink"
            >
              See the work
            </a>
            <a
              href="#assistant"
              className="rounded-full border border-ink-line/30 px-5 py-2.5 text-sm font-medium transition-colors hover:border-signal hover:text-signal dark:border-ink-line"
            >
              Ask the AI about me
            </a>
          </div>

          <div className="mt-10 flex items-center gap-5 text-muted-light dark:text-muted-dark">
            <a
              href="https://github.com/HemanRajkumar"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="transition-colors hover:text-signal"
            >
              <Github size={19} />
            </a>
            <a
              href="https://linkedin.com/in/hemanrajkumar"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="transition-colors hover:text-signal"
            >
              <Linkedin size={19} />
            </a>
            <a
              href="mailto:hemanrajkumar359660070@gmail.com"
              aria-label="Email"
              className="transition-colors hover:text-signal"
            >
              <Mail size={19} />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="relative mx-auto aspect-square w-full max-w-md"
        >
          {webglOk && !prefersReducedMotion ? <Scene /> : <OrbFallback />}

          {/* Profile frame, tilted, sitting in front of the orb */}
          <div
            className="absolute inset-0 grid place-items-center"
            style={{ perspective: "900px" }}
          >
            <div
              className="h-40 w-40 rounded-2xl border border-ink-line/30 bg-paper-surface/70 shadow-xl backdrop-blur-sm transition-transform duration-500 hover:rotate-y-0 dark:border-ink-line dark:bg-ink-surface/70 sm:h-48 sm:w-48"
              style={{ transform: "rotateY(-10deg) rotateX(6deg)" }}
            >
              <div className="flex h-full w-full items-center justify-center rounded-2xl">
                {/* Replace src with your own photo at /public/profile.jpg */}
                <img
                  src="/profile.jpg"
                  alt="Heman Rajkumar"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.nextSibling.style.display = "flex";
                  }}
                  className="h-full w-full rounded-2xl object-cover"
                />
                <div
                  style={{ display: "none" }}
                  className="h-full w-full flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-signal/10 to-transparent"
                >
                  <span className="font-display text-4xl font-semibold text-signal">
                    HR
                  </span>
                  <span className="mt-1 font-mono text-[10px] text-muted-light dark:text-muted-dark">
                    add /profile.jpg
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
