import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from '../../lib/motion';

export function Hero3DScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGlSupported, setWebGlSupported] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Check WebGL availability and connection save-data
    if (typeof window === 'undefined') return;

    if (prefersReducedMotion) {
      setWebGlSupported(false);
      return;
    }

    const nav = navigator as unknown as { connection?: { saveData?: boolean } };
    if (nav.connection?.saveData) {
      setWebGlSupported(false);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebGlSupported(false);
      return;
    }

    if (!renderer) {
      setWebGlSupported(false);
      return;
    }

    // Performance budget: clamp DPR to max 1.5
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    renderer.setPixelRatio(dpr);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    const canvas = renderer.domElement;
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.pointerEvents = 'none';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    container.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xf1fcf4, 2.4);
    keyLight.position.set(5, 6, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x62dd9e, 1.8);
    fillLight.position.set(-6, -3, 2);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0x99f6c2, 3.0, 15);
    rimLight.position.set(0, 4, -2);
    scene.add(rimLight);

    // Root Group for the floating cluster
    const clusterGroup = new THREE.Group();
    scene.add(clusterGroup);

    // Materials in curated brand colors
    const emeraldMat = new THREE.MeshStandardMaterial({
      color: 0x006a42,
      roughness: 0.18,
      metalness: 0.85,
    });

    const jadeMat = new THREE.MeshStandardMaterial({
      color: 0x62dd9e,
      roughness: 0.25,
      metalness: 0.6,
    });

    const obsidianMat = new THREE.MeshStandardMaterial({
      color: 0x002111,
      roughness: 0.12,
      metalness: 0.9,
    });

    const platinumMat = new THREE.MeshStandardMaterial({
      color: 0xe8f4eb,
      roughness: 0.1,
      metalness: 0.95,
    });

    // 1. Central Kinetic Logo Prism (Extruded Diamond Form)
    const diamondShape = new THREE.Shape();
    diamondShape.moveTo(0, 1.4);
    diamondShape.lineTo(1.1, 0);
    diamondShape.lineTo(0, -1.4);
    diamondShape.lineTo(-1.1, 0);
    diamondShape.closePath();

    const extrudeSettings = {
      depth: 0.45,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.08,
      bevelThickness: 0.08,
    };
    const centerGeom = new THREE.ExtrudeGeometry(diamondShape, extrudeSettings);
    centerGeom.center();
    const centerMesh = new THREE.Mesh(centerGeom, emeraldMat);
    clusterGroup.add(centerMesh);

    // 2. Torus Ring (Precision Gold/Platinum)
    const torusGeom = new THREE.TorusGeometry(1.9, 0.07, 16, 64);
    const torusMesh = new THREE.Mesh(torusGeom, platinumMat);
    torusMesh.rotation.x = Math.PI / 3;
    torusMesh.rotation.y = Math.PI / 6;
    clusterGroup.add(torusMesh);

    // 3. Floating Orb (Jade)
    const sphereGeom = new THREE.SphereGeometry(0.42, 32, 32);
    const sphereMesh = new THREE.Mesh(sphereGeom, jadeMat);
    sphereMesh.position.set(2.2, 1.2, 0.4);
    clusterGroup.add(sphereMesh);

    // 4. Faceted Octahedron (Obsidian)
    const octaGeom = new THREE.OctahedronGeometry(0.55, 0);
    const octaMesh = new THREE.Mesh(octaGeom, obsidianMat);
    octaMesh.position.set(-2.0, -1.1, 0.8);
    clusterGroup.add(octaMesh);

    // 5. Rounded Capsule/Cylinder
    const cylinderGeom = new THREE.CylinderGeometry(0.18, 0.18, 0.9, 24);
    const cylinderMesh = new THREE.Mesh(cylinderGeom, jadeMat);
    cylinderMesh.position.set(-1.8, 1.6, -0.6);
    cylinderMesh.rotation.z = Math.PI / 4;
    clusterGroup.add(cylinderMesh);

    // Position cluster to the right side of the hero, away from left-side typography
    clusterGroup.position.set(2.8, 0.2, 0);

    // Mouse parallax tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handlePointerMove = (e: PointerEvent) => {
      // Normalize between -1 and 1
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // Scroll-linked rotation & retreat
    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Pause when tab hidden or off-screen
    let isVisible = true;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const observer = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
    });
    observer.observe(container);

    // Resize handling
    const handleResize = () => {
      if (!container || !renderer) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      // Responsive positioning
      if (width < 768) {
        clusterGroup.position.set(0, 0.5, -1.2);
        clusterGroup.scale.set(0.7, 0.7, 0.7);
      } else {
        clusterGroup.position.set(2.8, 0.2, 0);
        clusterGroup.scale.set(1, 1, 1);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // Render loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth lerp for mouse parallax
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Parallax camera offset (max 12px equivalent in 3D world units)
      camera.position.x = mouseX * 0.45;
      camera.position.y = mouseY * 0.35;
      camera.lookAt(0, 0, 0);

      // Idle float motion
      const floatY = Math.sin(elapsed * 1.2) * 0.12;
      centerMesh.position.y = floatY;
      centerMesh.rotation.y = elapsed * 0.35;
      centerMesh.rotation.x = Math.sin(elapsed * 0.5) * 0.15;

      // Secondary shapes orbit & rotation
      torusMesh.rotation.z = elapsed * 0.25;
      torusMesh.rotation.x = Math.PI / 3 + Math.sin(elapsed * 0.8) * 0.1;

      sphereMesh.position.y = 1.2 + Math.cos(elapsed * 1.5) * 0.15;
      sphereMesh.position.x = 2.2 + Math.sin(elapsed * 1.1) * 0.1;

      octaMesh.rotation.x = elapsed * 0.6;
      octaMesh.rotation.y = elapsed * 0.4;

      cylinderMesh.rotation.y = elapsed * 0.5;

      // Scroll retreat effect
      const scrollProgress = Math.min(scrollY / (window.innerHeight * 0.8 || 800), 1.5);
      clusterGroup.rotation.y = scrollProgress * 1.2;
      clusterGroup.position.z = -scrollProgress * 3.5;
      clusterGroup.position.y = (container.clientWidth < 768 ? 0.5 : 0.2) + scrollProgress * 0.8;

      renderer?.render(scene, camera);
    };

    animate();

    // Context Loss handling
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      cancelAnimationFrame(animId);
    };
    const handleContextRestored = () => {
      animate();
    };
    canvas.addEventListener('webglcontextlost', handleContextLost, false);
    canvas.addEventListener('webglcontextrestored', handleContextRestored, false);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();

      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);

      // Cleanup geometries & materials
      centerGeom.dispose();
      torusGeom.dispose();
      sphereGeom.dispose();
      octaGeom.dispose();
      cylinderGeom.dispose();
      emeraldMat.dispose();
      jadeMat.dispose();
      obsidianMat.dispose();
      platinumMat.dispose();

      renderer?.dispose();
      if (canvas.parentElement) {
        canvas.parentElement.removeChild(canvas);
      }
    };
  }, [prefersReducedMotion]);

  if (!webGlSupported) {
    // Elegant fallback: SVG kinetic geometric illustration
    return (
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none flex items-center justify-end pr-12 opacity-80 overflow-hidden"
      >
        <div className="relative w-80 h-80 max-w-full">
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
            <defs>
              <linearGradient id="fallbackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#006a42" />
                <stop offset="50%" stopColor="#62dd9e" />
                <stop offset="100%" stopColor="#002111" />
              </linearGradient>
            </defs>
            <polygon
              points="100,20 170,100 100,180 30,100"
              fill="url(#fallbackGrad)"
              opacity="0.85"
            />
            <circle cx="100" cy="100" r="55" stroke="#96f3bf" strokeWidth="2" fill="none" opacity="0.6" />
            <circle cx="150" cy="50" r="14" fill="#62dd9e" opacity="0.9" />
            <polygon points="40,150 60,130 50,170" fill="#002111" opacity="0.75" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none"
    />
  );
}
