import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Background3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const codeElementsRef = useRef<THREE.Group[]>([]);
  const circuitLinesRef = useRef<THREE.Group>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Create floating code symbols
    const createCodeElement = (symbol: string, position: THREE.Vector3, color: string, size: number = 1) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d')!;
      canvas.width = 128;
      canvas.height = 128;
      
      // Draw code symbol
      context.fillStyle = color;
      context.font = `bold ${60 * size}px 'Courier New', monospace`;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(symbol, 64, 64);
      
      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.SpriteMaterial({ 
        map: texture, 
        transparent: true,
        opacity: 0.8
      });
      
      const sprite = new THREE.Sprite(material);
      sprite.position.copy(position);
      sprite.scale.setScalar(size * 2);
      
      return sprite;
    };

    // Programming symbols to display
    const codeSymbols = [
      '{ }', '</>', '( )', '[ ]', '&&', '||', '++', '--', 
      '==', '!=', '<=', '=>', 'fn', 'if', 'for', 'var',
      'int', 'str', 'bool', 'null', 'true', 'false'
    ];

    const colors = ['#8B5CF6', '#EC4899', '#06B6D4', '#10B981', '#F59E0B', '#EF4444'];

    // Create floating code elements
    const codeGroup = new THREE.Group();
    for (let i = 0; i < 30; i++) {
      const symbol = codeSymbols[Math.floor(Math.random() * codeSymbols.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10
      );
      const size = Math.random() * 0.5 + 0.5;
      
      const codeElement = createCodeElement(symbol, position, color, size);
      codeGroup.add(codeElement);
      codeElementsRef.current.push(codeGroup);
    }
    scene.add(codeGroup);

    // Create circuit-like connection lines
    const circuitGroup = new THREE.Group();
    
    // Create grid of connection points
    const gridSize = 8;
    const spacing = 4;
    const connectionPoints: THREE.Vector3[] = [];
    
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        for (let z = 0; z < 3; z++) {
          connectionPoints.push(new THREE.Vector3(
            (x - gridSize/2) * spacing,
            (y - gridSize/2) * spacing,
            (z - 1) * spacing
          ));
        }
      }
    }

    // Create connections between nearby points
    for (let i = 0; i < connectionPoints.length; i++) {
      const point1 = connectionPoints[i];
      
      // Find nearby points and create connections
      for (let j = i + 1; j < connectionPoints.length; j++) {
        const point2 = connectionPoints[j];
        const distance = point1.distanceTo(point2);
        
        if (distance < spacing * 1.5 && Math.random() > 0.7) {
          const lineGeometry = new THREE.BufferGeometry();
          const linePositions = new Float32Array([
            point1.x, point1.y, point1.z,
            point2.x, point2.y, point2.z
          ]);
          lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
          
          const lineMaterial = new THREE.ShaderMaterial({
            uniforms: {
              time: { value: 0 },
              color1: { value: new THREE.Color('#8B5CF6') },
              color2: { value: new THREE.Color('#06B6D4') },
            },
            vertexShader: `
              varying float vProgress;
              uniform float time;
              
              void main() {
                vProgress = position.y * 0.1 + time * 0.5;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              }
            `,
            fragmentShader: `
              varying float vProgress;
              uniform float time;
              uniform vec3 color1;
              uniform vec3 color2;
              
              void main() {
                float pulse = sin(vProgress * 10.0) * 0.5 + 0.5;
                vec3 color = mix(color1, color2, pulse);
                float alpha = pulse * 0.6;
                gl_FragColor = vec4(color, alpha);
              }
            `,
            transparent: true,
          });
          
          const line = new THREE.Line(lineGeometry, lineMaterial);
          circuitGroup.add(line);
        }
      }
    }
    
    scene.add(circuitGroup);
    circuitLinesRef.current = circuitGroup;

    // Create floating geometric shapes representing data structures
    const dataStructures = [
      // Stack representation
      (() => {
        const stackGroup = new THREE.Group();
        for (let i = 0; i < 5; i++) {
          const boxGeometry = new THREE.BoxGeometry(1, 0.3, 1);
          const boxMaterial = new THREE.MeshBasicMaterial({
            color: new THREE.Color().setHSL(0.7, 0.8, 0.6),
            transparent: true,
            opacity: 0.7,
            wireframe: true
          });
          const box = new THREE.Mesh(boxGeometry, boxMaterial);
          box.position.y = i * 0.4;
          stackGroup.add(box);
        }
        stackGroup.position.set(-8, 0, -5);
        return stackGroup;
      })(),
      
      // Tree structure
      (() => {
        const treeGroup = new THREE.Group();
        const sphereGeometry = new THREE.SphereGeometry(0.3, 8, 6);
        
        // Root node
        const rootMaterial = new THREE.MeshBasicMaterial({
          color: '#EC4899',
          transparent: true,
          opacity: 0.8,
          wireframe: true
        });
        const root = new THREE.Mesh(sphereGeometry, rootMaterial);
        treeGroup.add(root);
        
        // Child nodes
        const positions = [
          [-1, -1, 0], [1, -1, 0],
          [-1.5, -2, 0], [-0.5, -2, 0], [0.5, -2, 0], [1.5, -2, 0]
        ];
        
        positions.forEach(pos => {
          const childMaterial = new THREE.MeshBasicMaterial({
            color: '#06B6D4',
            transparent: true,
            opacity: 0.6,
            wireframe: true
          });
          const child = new THREE.Mesh(sphereGeometry, childMaterial);
          child.position.set(pos[0], pos[1], pos[2]);
          treeGroup.add(child);
        });
        
        treeGroup.position.set(8, 2, -3);
        return treeGroup;
      })(),
    ];

    dataStructures.forEach(structure => scene.add(structure));

    camera.position.z = 12;

    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;

    // Mouse movement handler
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    // Resize handler
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;

      timeRef.current += 0.01;
      const time = timeRef.current;

      // Animate code elements
      codeElementsRef.current.forEach((group, index) => {
        group.children.forEach((sprite, spriteIndex) => {
          // Floating motion
          sprite.position.y += Math.sin(time + index + spriteIndex) * 0.002;
          sprite.position.x += Math.cos(time * 0.7 + index + spriteIndex) * 0.001;
          
          // Rotation
          sprite.rotation.z += 0.005;
          
          // Mouse interaction
          const mouseInfluence = 0.1;
          sprite.position.x += mouseRef.current.x * mouseInfluence * 0.05;
          sprite.position.y += mouseRef.current.y * mouseInfluence * 0.05;
          
          // Opacity pulsing
          if (sprite.material instanceof THREE.SpriteMaterial) {
            sprite.material.opacity = 0.6 + Math.sin(time * 2 + index + spriteIndex) * 0.2;
          }
        });
      });

      // Update circuit lines
      if (circuitLinesRef.current) {
        circuitLinesRef.current.children.forEach((line, index) => {
          if (line instanceof THREE.Line && line.material instanceof THREE.ShaderMaterial) {
            line.material.uniforms.time.value = time + index * 0.1;
          }
        });
        circuitLinesRef.current.rotation.y += 0.001;
      }

      // Animate data structures
      dataStructures.forEach((structure, index) => {
        structure.rotation.y += 0.01 + index * 0.005;
        structure.position.y += Math.sin(time + index * 2) * 0.01;
        
        // Mouse interaction
        structure.position.x += mouseRef.current.x * 0.02;
        structure.position.y += mouseRef.current.y * 0.02;
      });

      // Camera movement
      cameraRef.current.position.x += (mouseRef.current.x * 0.5 - cameraRef.current.position.x) * 0.02;
      cameraRef.current.position.y += (mouseRef.current.y * 0.5 - cameraRef.current.position.y) * 0.02;
      cameraRef.current.lookAt(0, 0, 0);

      rendererRef.current.render(sceneRef.current, cameraRef.current);
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        background: `
          radial-gradient(ellipse at top left, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
          radial-gradient(ellipse at top right, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
          radial-gradient(ellipse at bottom left, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
          radial-gradient(ellipse at bottom right, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
          linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(0, 0, 0, 0.99) 100%)
        `
      }}
    />
  );
};

export default Background3D;