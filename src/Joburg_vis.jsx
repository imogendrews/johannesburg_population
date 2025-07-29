import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { geoMercator, geoCentroid } from 'd3-geo';
import * as d3 from 'd3';
import { sub } from 'three/tsl';

export default function App() {
  const mountRef = useRef();
  const [selectedWard, setSelectedWard] = useState(null);
  const [labelPos, setLabelPos] = useState({ x: 0, y: 0 });
  const [showImage, setShowImage] = useState(false);
           let imageMesh;

  useEffect(() => {
    let points = [];
    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
    camera.position.set(0, 2000, 0);
camera.up.set(0, 0, 1); // Invert the vertical axis

    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(0, 0, 0);
    controls.maxPolarAngle = Math.PI ;
    controls.minPolarAngle = 0;
    controls.dampingFactor = 0.05;

    scene.add(new THREE.AmbientLight(0xffffff));
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(100, 200, 100);
    scene.add(light);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const terrainMeshRef = { mesh: null };

    d3.json('/data/joburg_pop_25_july.json').then((geoData) => {
      const projection = geoMercator().fitExtent([[0, 0], [1000000, 1000000]], geoData);

      points = geoData.features.map((feature) => {
        const [x, y] = projection(geoCentroid(feature));
        const pop = feature.properties._sum || 100;
        const label = feature.properties.WardLabel || 'Unknown';
        return { x, y, population: pop, WardLabel: label };
      });

      const xs = points.map((p) => p.x);
      const ys = points.map((p) => p.y);
      const xMid = (d3.extent(xs)[0] + d3.extent(xs)[1]) / 2;
      const yMid = (d3.extent(ys)[0] + d3.extent(ys)[1]) / 2;
      points.forEach((p) => {
        p.x -= xMid;
        p.y -= yMid;
          p.x = -p.x; // 👈 Flip after centering
      });

      const planeWidth = d3.extent(xs)[1] - d3.extent(xs)[0];
      const planeHeight = d3.extent(ys)[1] - d3.extent(ys)[0];
      const resolution = 200;

      const geometry = new THREE.PlaneGeometry(
        planeWidth + 500,
        planeHeight + 500,
        resolution,
        resolution
      );
      geometry.rotateX(Math.PI / 2);

      const vertices = geometry.attributes.position;

    const popScale = d3.scaleLinear()
  .domain([d3.min(points, d => d.population), d3.max(points, d => d.population)])
  .range([0, 1000]);


      for (let i = 0; i < vertices.count; i++) {
        const x = vertices.getX(i);
        const z = vertices.getZ(i);

        let numerator = 0;
        let denominator = 0;
        const power = 2;
        points.forEach((pt) => {
          const dx = pt.x - x;
          const dz = pt.y - z;
          const distSq = dx * dx + dz * dz;
          const weight = 1 / (distSq + 1e-6) ** (power / 2);
          numerator += pt.population * weight;
          denominator += weight;
        });
        const avgPop = Math.max(1, numerator / denominator);
        const baseHeight = 500;
        vertices.setY(i, popScale(avgPop) + baseHeight);
      }

      geometry.computeVertexNormals();

// Get min and max Y from vertices
let yMin = Infinity, yMax = -Infinity;
for (let i = 0; i < vertices.count; i++) {
  const y = vertices.getY(i);
  if (y < yMin) yMin = y;
  if (y > yMax) yMax = y;
}

const colors = [];
for (let i = 0; i < vertices.count; i++) {
  const y = vertices.getY(i);
  // Normalize y between 0 and 1
  const t = (y - yMin) / (yMax - yMin);
  const color = new THREE.Color(d3.interpolateInferno(t));
  colors.push(color.r, color.g, color.b);
}
geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

      const material = new THREE.MeshStandardMaterial({
      
        flatShading: true,
        metalness: 0.5,
        alphaHash: true,
        roughness: 0.7,
        vertexColors: true,
        side: THREE.DoubleSide,
      });

      const terrainMesh = new THREE.Mesh(geometry, material);
      terrainMeshRef.mesh = terrainMesh;
      scene.add(terrainMesh);



const textureLoader = new THREE.TextureLoader();
textureLoader.load('/images/joburg.png', (texture) => {
  const imageWidth = 600;
  const imageHeight = 400;

  const imageGeometry = new THREE.PlaneGeometry(imageWidth, imageHeight);
  const imageMaterial = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    opacity: 0.7,
    depthTest: false // Ensures it's always rendered on top
  });

  imageMesh = new THREE.Mesh(imageGeometry, imageMaterial);
  imageMesh.position.set(0, yMax + 1000, 0); // Adjust Y so it's above terrain
  imageMesh.lookAt(camera.position); // Face the camera initially
  scene.add(imageMesh);
});
      

      points.forEach(({ x, y, population, WardLabel }) => {
        let nearestIdx = 0;
        let minDist = Infinity;
        for (let i = 0; i < vertices.count; i++) {
          const vx = vertices.getX(i);
          const vz = vertices.getZ(i);
          const dist = (vx - x) ** 2 + (vz - y) ** 2;
          if (dist < minDist) {
            minDist = dist;
            nearestIdx = i;
          }
        }

        const peakHeight = vertices.getY(nearestIdx);

      
        

        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 100;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'white';
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
       
        ctx.fillText(`Ward: ${WardLabel}`, canvas.width / 2, 40);
        ctx.fillText(`Pop: ${population.toLocaleString()}`, canvas.width / 2, 70);


        const texture = new THREE.CanvasTexture(canvas);
        const spriteMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true });
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(30, 10, 1);
        sprite.position.set(x, peakHeight + 20, y);
        scene.add(sprite);
        
      });
    
    });
  

    let isDragging = false;
    function onPointerDown() {
      isDragging = false;
    }
    function onPointerMove() {
      isDragging = true;
    }
    function onPointerUp(event) {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      if (terrainMeshRef.mesh) {
        const intersects = raycaster.intersectObject(terrainMeshRef.mesh);
        if (intersects.length > 0) {
          const intersect = intersects[0];
          const { x, z } = intersect.point;

          let nearest = null;
          let minDist = Infinity;

          points.forEach((pt) => {
            const dx = pt.x - x;
            const dz = pt.y - z;
            const dist = dx * dx + dz * dz;
            if (dist < minDist) {
              minDist = dist;
              nearest = pt;
            }
          });

           const maxDistanceSq = 500 ; // example: 500 units radius

          if (nearest && minDist < maxDistanceSq) {
             d3.json('/data/ward_suburbs_6.json').then((suburbs) => {
                  const wardNumber = nearest.WardLabel.slice(4, 7); // 'Ward 001' -> 1
 
const suburbList = suburbs[wardNumber];

if (suburbList && suburbList.length > 0) {
  const suburbText = suburbList.join(', ');


            setSelectedWard(`Ward: ${nearest.WardLabel}\nPop: ${nearest.population.toLocaleString()}\nSuburb: ${suburbText}`);
            setLabelPos({ x: event.clientX, y: event.clientY });

            }
          });
          }      else {
      // Clear popup if click outside radius
      setSelectedWard(null);
    }
  } else {
    // No terrain intersection — clear popup
    setSelectedWard(null);
  }
        }
      }



    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointerup', onPointerUp);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
        if (imageMesh) {
    imageMesh.lookAt(camera.position);
  }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('pointerup', onPointerUp);
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <>
      <div
        ref={mountRef}
        tabIndex={0}
        style={{
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          position: 'fixed',
          top: 0,
          left: 0,
        }}
      />

      <button
        onClick={() => {
  setShowImage(prev => {
    const newVal = !prev;
    if (imageMesh) imageMesh.visible = newVal;
    return newVal;
  });
}}

        style={{
          position: 'fixed',
          top: 60,
          right: 20,
          zIndex: 100,
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        {showImage ? 'Hide Johannesburg' : 'Show Johannesburg map'}
      </button>

      {showImage && (
        <>
        <img
          src="/images/joburg.png"
          alt="Overlay"
          style={{
               opacity: 0.5, // <-- Add this line to set transparency
            position: 'fixed',
            top: '25%',
            left: '33%',
            width: '300px',
            height: 'auto',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0,0,0,0.5)',
            zIndex: 50,
          }}
        />
          <img
          src="/images/key.png"
          alt="Overlay"
          style={{
   
            position: 'fixed',
            top: '25%',
            left: '7%',
            width: '200px',
            height: 'auto',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0,0,0,0.5)',
            zIndex: 50,
          }}
        />
        </>
      )}

      {selectedWard && (
        <div
          style={{
            position: 'fixed',
            top: labelPos.y,
            left: labelPos.x,
            backgroundColor: 'rgba(0,0,0,0.7)',
            color: 'white',
            padding: '6px 10px',
            borderRadius: '4px',
            whiteSpace: 'pre-line',
            pointerEvents: 'none',
            transform: 'translate(10px, 10px)',
            zIndex: 101,
            fontSize: '14px',
          }}
        >
          {selectedWard}
        </div>
      )}
    </>
  );
}
