const canvas = document.getElementById('elec-pot-bg');
const ctx = canvas.getContext('2d');
let width, height;
//let arrows[];
let mouse = {x: -1000, y: -1000 };

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

function animate() {
    ctx.clearRect(0, 0, width, height);
    const centerX = width / 2;
    const centerY = height / 2;

    const dx = mouse.x - centerX;
    const dy = mouse.y - centerY;
    const angle = Math.atan2(dy, dx);

    ctx.save();

    ctx.translate(centerX, centerY);
    ctx.rotate(angle);

    const arrowLength = 80;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(arrowLength, 0);

    ctx.lineTo(arrowLength - 15, -8);
    ctx.moveTo(arrowLength, 0);
    ctx.lineTo(arrowLength - 15, 8);

    ctx.strokeStyle = 'rgba(0, 220, 255, 0.8)';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.restore();

    requestAnimationFrame(animate);
}

animate();