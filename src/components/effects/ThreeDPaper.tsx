"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface ThreeDPaperProps {
  variant?: "original" | "japanese" | "certificate";
  className?: string;
  style?: React.CSSProperties;
}

/**
 * ThreeDPaper - Interactive 3D Japanese Parchment / Washi Paper Component
 * Features:
 * - 100% transparent WebGL canvas background that blends seamlessly with the watercolor landscape
 * - Delicate, soft-feathered translucent washi paper sheet with procedural fibers & gold-vermilion flecks
 * - Real 3D bent curvature geometry
 * - Mouse hover light tracking
 * - Pointer parallax tilt
 * - Grab-and-drag 3D rotation with smooth inertial settling
 * - Zero static box / zero bounding card styling
 */
export function ThreeDPaper({
  variant = "original",
  className = "",
  style = {},
}: ThreeDPaperProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. Scene setup with transparent alpha
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.8);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0); // 100% transparent WebGL background
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // 2. Procedural Japanese Translucent Washi Paper Texture with Feathered Edges
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      // Clear with transparent alpha
      ctx.clearRect(0, 0, 1024, 1024);

      // Feathered organic washi sheet (no hard box borders)
      const grad = ctx.createRadialGradient(512, 512, 120, 512, 512, 480);
      grad.addColorStop(0, "rgba(250, 244, 232, 0.55)");
      grad.addColorStop(0.65, "rgba(246, 236, 218, 0.42)");
      grad.addColorStop(0.88, "rgba(238, 224, 202, 0.22)");
      grad.addColorStop(1, "rgba(238, 224, 202, 0.0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 1024);

      // Delicate washi mulberry fibers (kōzo fibers)
      ctx.strokeStyle = "rgba(75, 80, 71, 0.04)";
      for (let i = 0; i < 600; i++) {
        ctx.beginPath();
        const x = Math.random() * 800 + 112;
        const y = Math.random() * 800 + 112;
        ctx.moveTo(x, y);
        ctx.bezierCurveTo(
          x + Math.random() * 30 - 15,
          y + Math.random() * 30 - 15,
          x + Math.random() * 40 - 20,
          y + Math.random() * 40 - 20,
          x + Math.random() * 50 - 25,
          y + Math.random() * 50 - 25
        );
        ctx.lineWidth = Math.random() * 1.5 + 0.3;
        ctx.stroke();
      }

      // Golden & vermilion leaf specks (kirihaku traditional motif)
      for (let i = 0; i < 180; i++) {
        const x = Math.random() * 700 + 162;
        const y = Math.random() * 700 + 162;
        const rad = Math.random() * 3 + 1;
        ctx.fillStyle =
          Math.random() > 0.4
            ? "rgba(217, 166, 110, 0.28)" // Amber gold
            : "rgba(184, 76, 61, 0.22)"; // Vermilion
        ctx.beginPath();
        ctx.arc(x, y, rad, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = true;

    // 3. Curved 3D Paper Geometry (natural bent washi sheet)
    const aspect = width / height;
    const paperWidth = aspect > 1.2 ? 3.4 : 2.6;
    const paperHeight = aspect > 1.2 ? 2.6 : 3.2;
    const geometry = new THREE.PlaneGeometry(paperWidth, paperHeight, 48, 48);
    const pos = geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const u = pos.getX(i);
      const v = pos.getY(i);
      // Fluid natural paper wave & curl
      const z =
        Math.sin(u * 0.9) * 0.16 -
        Math.cos(v * 1.0) * 0.12 +
        Math.sin((u + v) * 0.6) * 0.05;
      pos.setZ(i, z);
    }
    geometry.computeVertexNormals();

    const material = new THREE.MeshPhysicalMaterial({
      map: texture,
      roughness: 0.42,
      metalness: 0.04,
      clearcoat: 0.3,
      clearcoatRoughness: 0.3,
      transmission: 0.48, // Translucent paper lets watercolor landscape shine through
      opacity: 0.88,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false, // Ensures zero z-fighting or black masking
    });

    const paperMesh = new THREE.Mesh(geometry, material);
    // Position paper offset slightly toward the hero text side
    paperMesh.position.set(aspect > 1 ? -0.4 : 0, 0.05, 0);
    scene.add(paperMesh);

    // 4. Subtle Atmospheric Lighting
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 1.4);
    scene.add(ambientLight);

    const hoverLight = new THREE.PointLight(0xffedd5, 2.2, 14);
    hoverLight.position.set(-0.5, 0.5, 2.5);
    scene.add(hoverLight);

    const rimLight = new THREE.DirectionalLight(0xb84c3d, 0.5);
    rimLight.position.set(-3, -2, -1);
    scene.add(rimLight);

    // 5. Interactive Physics (Hover tracking, parallax tilt, grab & drag rotation)
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let baseRotationX = 0.06;
    let baseRotationY = -0.08;
    let currentRotX = baseRotationX;
    let currentRotY = baseRotationY;
    let targetRotX = baseRotationX;
    let targetRotY = baseRotationY;
    let dragVelocityX = 0;
    let dragVelocityY = 0;

    const onPointerDown = (e: PointerEvent) => {
      // Only initiate drag if clicking primary button
      if (e.button !== 0) return;
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      dragVelocityX = 0;
      dragVelocityY = 0;
      container.style.cursor = "grabbing";
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const mouseNormX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseNormY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      // Move point light to track hover smoothly
      hoverLight.position.x = mouseNormX * 3.0;
      hoverLight.position.y = mouseNormY * 2.5;

      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;

        dragVelocityX = deltaX * 0.006;
        dragVelocityY = deltaY * 0.006;

        targetRotY += dragVelocityX;
        targetRotX += dragVelocityY;
      } else {
        // Pointer parallax tilt (subtle response to cursor position)
        targetRotY = baseRotationY + mouseNormX * 0.16;
        targetRotX = baseRotationX - mouseNormY * 0.14;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
      container.style.cursor = "grab";
    };

    container.style.cursor = "grab";
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerUp);

    // 6. Smooth Animation Loop with Inertial Damping & Floating Breathing
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Damped rotation interpolation
      currentRotX += (targetRotX - currentRotX) * 0.08;
      currentRotY += (targetRotY - currentRotY) * 0.08;

      // When not dragging, gently spring back toward base tilt
      if (!isDragging) {
        targetRotX += (baseRotationX - targetRotX) * 0.015;
        targetRotY += (baseRotationY - targetRotY) * 0.015;
      }

      paperMesh.rotation.x = currentRotX;
      paperMesh.rotation.y = currentRotY;

      // Gentle floating breathing wave
      const time = Date.now() * 0.0012;
      paperMesh.position.y = (aspect > 1.2 ? 0.05 : 0) + Math.sin(time) * 0.05;
      paperMesh.position.z = Math.cos(time * 0.8) * 0.03;

      renderer.render(scene, camera);
    };
    animate();

    // 7. Responsive Viewport Resize
    const onResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", onResize);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      texture.dispose();
    };
  }, [variant]);

  return (
    <div
      ref={mountRef}
      className={`w-full h-full select-none pointer-events-auto ${className}`}
      style={{
        background: "transparent",
        ...style,
      }}
    />
  );
}

export default ThreeDPaper;
