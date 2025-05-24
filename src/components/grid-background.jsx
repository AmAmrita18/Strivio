import Header from "@/components/header";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

const GridBackground = () => {
  useEffect(() => {
    // Create the 3D grid structure
    const gridBackground = document.querySelector(".grid-background");
    if (!gridBackground.querySelector(".grid-container")) {
      // Create grid container
      const gridContainer = document.createElement("div");
      gridContainer.className = "grid-container";
      gridContainer.id = "gridContainer";

      // Create grid layers
      for (let i = 0; i < 4; i++) {
        const layer = document.createElement("div");
        layer.className = "grid-layer";
        gridContainer.appendChild(layer);
      }

      gridBackground.appendChild(gridContainer);

      // Create interactive nodes
      const nodeCount = 15;
      for (let i = 0; i < nodeCount; i++) {
        const node = document.createElement("div");
        node.className = "node";

        const x = Math.random() * 100;
        const y = Math.random() * 100;

        node.style.left = `${x}%`;
        node.style.top = `${y}%`;
        node.style.animationDelay = `${Math.random() * 2}s`;

        gridBackground.appendChild(node);

        // Add click interaction
        node.addEventListener("click", () => {
          node.style.animation = "none";
          node.style.transform = "scale(5)";
          node.style.boxShadow = "0 0 50px #00ffff, 0 0 100px #00ffff";

          setTimeout(() => {
            node.style.animation = "pulse 2s ease-in-out infinite";
            node.style.transform = "scale(1)";
            node.style.boxShadow = "0 0 10px #00ffff, 0 0 20px #00ffff";
          }, 1000);
        });
      }

      // Create meteors (reduced count for professional look)
      const meteorCount = 3;
      for (let i = 0; i < meteorCount; i++) {
        const meteor = document.createElement("div");
        meteor.className = "meteor";

        // Position meteors to start from top-left area
        const startX = Math.random() * 30; // Start from left 30% of screen
        meteor.style.left = `${startX}%`;
        meteor.style.top = "-10vh";
        meteor.style.animationDelay = `${i * 2}s`; // Stagger them nicely
        meteor.style.animationDuration = `${4 + Math.random() * 1}s`;

        gridBackground.appendChild(meteor);
      }

      // Create sparkles
      const sparkleCount = 20;
      for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement("div");
        sparkle.className = "sparkle";

        const x = Math.random() * 100;
        const y = Math.random() * 100;

        sparkle.style.left = `${x}%`;
        sparkle.style.top = `${y}%`;
        sparkle.style.animationDelay = `${Math.random() * 4}s`;

        gridBackground.appendChild(sparkle);
      }
    }

    // Mouse interaction setup
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 60;
    let targetRotationY = 0;
    let currentRotationX = 60;
    let currentRotationY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.clientY / window.innerHeight) * 2 - 1;

      targetRotationX = 60 + mouseY * 20;
      targetRotationY = mouseX * 15;
    };

    // Touch support
    const handleTouchMove = (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      mouseX = (touch.clientX / window.innerWidth) * 2 - 1;
      mouseY = (touch.clientY / window.innerHeight) * 2 - 1;

      targetRotationX = 60 + mouseY * 15;
      targetRotationY = mouseX * 10;
    };

    // Animation loop
    const animate = () => {
      const gridContainer = document.getElementById("gridContainer");
      if (gridContainer) {
        currentRotationX += (targetRotationX - currentRotationX) * 0.05;
        currentRotationY += (targetRotationY - currentRotationY) * 0.05;

        gridContainer.style.transform = `
          translate(-50%, -50%) 
          rotateX(${currentRotationX}deg) 
          rotateY(${currentRotationY}deg) 
          translateZ(-100px)
        `;
      }
      requestAnimationFrame(animate);
    };

    // Dynamic color shifting
    let colorShift = 0;
    const colorInterval = setInterval(() => {
      colorShift += 0.5;
      const layers = document.querySelectorAll(".grid-layer");
      layers.forEach((layer, index) => {
        const hue1 = (200 + colorShift + index * 20) % 360; // Blue spectrum
        const hue2 = (30 + colorShift + index * 15) % 360; // Orange spectrum

        layer.style.backgroundImage = `
          linear-gradient(hsla(${hue1}, 70%, 70%, 0.25) 1px, transparent 1px),
          linear-gradient(90deg, hsla(${hue1}, 70%, 70%, 0.25) 1px, transparent 1px),
          linear-gradient(hsla(${hue2}, 80%, 65%, 0.15) 1px, transparent 1px),
          linear-gradient(90deg, hsla(${hue2}, 80%, 65%, 0.15) 1px, transparent 1px)
        `;
      });
    }, 100);

    // Add event listeners
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });

    // Start animation
    animate();

    // Cleanup function
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleTouchMove);
      clearInterval(colorInterval);
    };
  }, []);

  return <div className="grid-background"></div>;
};

export default GridBackground;
