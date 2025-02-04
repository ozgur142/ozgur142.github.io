// 3-Body Simulation
(function() {
    const G = 1;
    const TIME_STEP = 0.04;
    const SCALE = 300;
    const TRAIL_LENGTH = 150;

    const bodies = [
        { 
            mass: 1, 
            x: 1, 
            y: 0, 
            vx: 0, 
            vy: 0.55 
        },
        { 
            mass: 1, 
            x: Math.cos(2*Math.PI/3), y: Math.sin(2*Math.PI/3), 
            vx: 0.55 * Math.cos(2*Math.PI/3 + Math.PI/2), 
            vy: 0.55 * Math.sin(2*Math.PI/3 + Math.PI/2) 
        },
        { 
            mass: 1, 
            x: Math.cos(4*Math.PI/3), y: Math.sin(4*Math.PI/3),
            vx: 0.55 * Math.cos(4*Math.PI/3 + Math.PI/2), 
            vy: 0.55 * Math.sin(4*Math.PI/3 + Math.PI/2) 
        }
    ];

    const trails = [[], [], []];
    const canvas = document.getElementById('simulation-canvas');
    const ctx = canvas.getContext('2d');
    const bodyElements = [...document.getElementsByClassName('body')];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function calculateAccelerations() {
        for (let i = 0; i < bodies.length; i++) {
            let ax = 0, ay = 0;
            for (let j = 0; j < bodies.length; j++) {
                if (i === j) continue;
                const dx = bodies[j].x - bodies[i].x;
                const dy = bodies[j].y - bodies[i].y;
                const r = Math.sqrt(dx*dx + dy*dy);
                const F = G * bodies[j].mass / (r*r*r);
                ax += F * dx;
                ay += F * dy;
            }
            bodies[i].ax = ax;
            bodies[i].ay = ay;
        }
    }

    function updatePositions() {
        calculateAccelerations();
        for (const body of bodies) {
            body.vx += body.ax * TIME_STEP;
            body.vy += body.ay * TIME_STEP;
            body.x += body.vx * TIME_STEP;
            body.y += body.vy * TIME_STEP;
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        bodies.forEach((body, i) => {
            const x = canvas.width/2 + body.x * SCALE;
            const y = canvas.height/2 - body.y * SCALE;
            
            trails[i].push({ x: x + 10, y: y + 10 });
            if (trails[i].length > TRAIL_LENGTH) trails[i].shift();

            bodyElements[i].style.transform = `translate(${x}px, ${y}px)`;

            let color = getComputedStyle(bodyElements[i]).backgroundColor;

            if (trails[i].length > 1) {
                ctx.beginPath();
                ctx.strokeStyle = color;
                ctx.lineWidth = 1;
                ctx.moveTo(trails[i][0].x, trails[i][0].y);
                for (let j = 1; j < trails[i].length; j++) {
                    ctx.lineTo(trails[i][j].x, trails[i][j].y);
                }
                ctx.stroke();
            }
        });

        updatePositions();
        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    draw();
})();


