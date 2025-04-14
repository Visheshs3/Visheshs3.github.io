// question 2

function event(eventType, element){
    const time = new Date().toISOString();
    const tag = element.tagName;
    console.log(`${time} | ${eventType} | ${tag}`);
}

window.addEventListener("DOMContentLoaded", ()=>{
    event("view", document.body);
})

document.addEventListener("click", e =>{
    event("click", e.target);
})


const canvas = document.getElementById("headerCanvas");
const ctx = canvas.getContext("2d");

const header = document.getElementById("header-container");


canvas.width = header.clientWidth;
canvas.height = header.clientHeight;

let bubbles = [];
const maxBubbles = 100;
window.addEventListener("resize", () => {
    canvas.width = header.clientWidth;
    canvas.height = header.clientHeight;
});

// Mouse position tracker
const mouse = { x: canvas.width / 2, y: canvas.height / 2 };

// Track mouse movement inside the header
header.addEventListener("mousemove", (event) => {
    const rect = header.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
});

// Bubble class
class Bubble {
    constructor() {
        this.x = 36 + Math.random() * (canvas.width -72);
        this.y =36 + Math.random() * (canvas.height-72);
        this.radius = Math.random() * 6 + 30; 
        this.speed = Math.random() * (0.1) +0.5; // Speed: 0.1 to 0.4
        this.directionX = (Math.random() - 0.5) * 2;
        this.directionY = (Math.random() - 0.5) * 2;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    move() {
        // Move towards cursor
        const angle = Math.atan2(mouse.y - this.y, mouse.x - this.x);
        this.x += Math.cos(angle) * this.speed * 0.05;
        this.y += Math.sin(angle) * this.speed * 0.05;
        if(this.speed < 0){
            this.speed/=-3
        }
        // Keep bubbles within bounds
        if (this.x - (this.radius) < 0 || this.x + (this.radius) > canvas.width) {
            this.directionX *= -1
            this.speed*=-3
        }
        if (this.y - (this.radius) < 0 || this.y + (this.radius) > canvas.height){
            this.directionY *=-1;  
            this.speed*=-3;        

        } 
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(208,227,127, ${this.opacity})`; // Light blue
        ctx.fill();
    }
    
}


for (let i = 0; i < 20; i++) {
    bubbles.push(new Bubble());
}





// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bubbles.forEach((bubble) => {
        bubble.move();
        bubble.draw();
    });
    
    requestAnimationFrame(animate);
}

// Start animation
animate();