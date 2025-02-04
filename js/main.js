// Three.js Configuration
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#three-canvas'),
    alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Particles System
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 15000;
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.005,
    color: '#4f46e5'
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);


// Lighting
const pointLight = new THREE.PointLight('#4f46e5', 1);
pointLight.position.set(2, 3, 4);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight('#ffffff', 0.1);
scene.add(ambientLight);

camera.position.z = 3;


function animate() {
    requestAnimationFrame(animate);
    

    // Update particles
    particlesMesh.rotation.y += 0.0006;
    
    renderer.render(scene, camera);
}

animate();


/*
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#three-canvas'),
    alpha: true
});

// Improved renderer configuration
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearAlpha(0); // Ensure full transparency

// Enhanced particle system
const particlesCount = 5000;
const positions = new Float32Array(particlesCount * 3);
const colors = new Float32Array(particlesCount * 3);

// Color palette for better visual interest
const colorPalette = [
    new THREE.Color('#4f46e5'), // Primary
    new THREE.Color('#818cf8'), // Light
    new THREE.Color('#312e81')  // Dark
];

for(let i = 0; i < particlesCount * 3; i += 3) {
    // Spherical distribution for better coverage
    const radius = Math.random() * 5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);

    positions[i] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i + 2] = radius * Math.cos(phi);

    // Random color variation
    const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    colors[i] = color.r;
    colors[i + 1] = color.g;
    colors[i + 2] = color.b;
}

const particlesGeometry = new THREE.BufferGeometry();
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.015,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Improved camera positioning
camera.position.set(0, 0, 10);

// Dynamic lighting
const pointLight = new THREE.PointLight('#4f46e5', 1.5);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight('#ffffff', 0.2);
scene.add(ambientLight);

// Animation logic with continuous rotation
let time = 0;
function animate() {
    requestAnimationFrame(animate);
    
    time += 0.001;
    
    // Multi-axis rotation for better visual dynamics
    particlesMesh.rotation.x = time * 0.2;
    particlesMesh.rotation.y = time * 0.3;
    particlesMesh.rotation.z = time * 0.1;

    // Update light position for dynamic effects
    pointLight.position.x = Math.sin(time) * 5;
    pointLight.position.z = Math.cos(time) * 5;

    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();

*/
