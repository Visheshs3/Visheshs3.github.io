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





const canvas2 =document.getElementById("educationCanvas");
const header = document.getElementById("header-container");
// Mouse position tracker
const mouse = { x: canvas2.width / 2, y: canvas2.height / 2 };

// Track mouse movement inside the header
header.addEventListener("mousemove", (event) => {
    const rect = header.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
});


// canvas2 for educationQualifications


const c = canvas2.getContext("2d");

canvas2.width = header.clientWidth;
canvas2.height = header.clientHeight;


window.addEventListener("resize", () => {
    canvas2.width = header.clientWidth;
    canvas2.height = header.clientHeight;
});

let colors = [];

class Colors{
    constructor() {
        this.radius = Math.random() * 6 + 10; // radius from 6 to 26
        this.x = Math.random() * (canvas2.width - 2*this.radius) + this.radius;
        
        this.y = Math.random() * (canvas2.height - 2*this.radius) + this.radius;
        
        this.opacity = Math.random() * 0.5 + 0.2;

        this.red = Math.random() * 127 + 127;
        this.green = Math.random() * 127 + 127;
        this.blue = Math.random() * 127 + 127;

        this.originalRadius = this.radius; // Store the original radius
    }

    change() {
        const distance = Math.hypot(mouse.x - this.x, mouse.y - this.y);
        let targetRadius;
        if (distance < this.radius * 2) {
            targetRadius = this.originalRadius* 3;
        } else {
            targetRadius = this.originalRadius;
        }
        this.radius += (targetRadius - this.radius) * 0.1; // Smooth transition
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = `rgba(${this.red},${this.green},${this.blue}, ${this.opacity})`; // Light blue
        c.fill();
    }
}

let max =1000;

if(canvas2.width < 800){
    max = 500;
}
for (let i = 0; i < max; i++) {
    colors.push(new Colors());
}


// Animation loop
function animate() {

    c.clearRect(0,0,canvas2.width, canvas2.height);
    
    colors.forEach((color) => {
        color.change();
        color.draw();
    })
    requestAnimationFrame(animate);
}

// Start animation
animate();