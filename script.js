// Year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Contact form demo
function handleContact(e) {
  e.preventDefault();
  const fd = new FormData(e.target);
  const data = Object.fromEntries(fd.entries());
  alert(`Thank you, ${data.name}! Your message was received.`);
  e.target.reset();
}

// ---------------- Background bloodstream animation ----------------
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");
let w, h;

function resizeCanvas() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Particle class = blood cell
class Cell {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * w;
    this.y = -20;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = 1 + Math.random() * 1.5;
    this.size = 10 + Math.random() * 15;
    this.color = Math.random() > 0.8 
      ? "rgba(255,255,255,0.8)" 
      : "rgba(220,40,40,0.5)";
    this.rotation = Math.random() * Math.PI;
    this.rotSpeed = (Math.random() - 0.5) * 0.02;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.rotation += this.rotSpeed;
    if (this.y > h + 40) this.reset();
  }
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.ellipse(0, 0, this.size, this.size * 0.6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

let cells = Array.from({ length: 60 }, () => new Cell());

function animate() {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "rgba(15,0,5,0.5)";
  ctx.fillRect(0, 0, w, h);

  cells.forEach(cell => {
    cell.update();
    cell.draw();
  });

  requestAnimationFrame(animate);
}
animate();
