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
    //Clear screen
    ctx.clearRect(0, 0, width, height);

    //Calculate center point
    const centerX = width / 2;
    const centerY = height / 2;

    //Calculate distance from center point and angle the arrow should be pointed
    const dx = mouse.x - centerX;
    const dy = mouse.y - centerY;
    const angle = Math.atan2(dy, dx);

    //save state before rotation
    ctx.save();

    //move arrow to center of screen and rotate
    ctx.translate(centerX, centerY);
    ctx.rotate(angle);

    const arrowLength = 50;

    //Draw tail of arrow
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(arrowLength, 0);

    //draw arrowhead
    ctx.lineTo(arrowLength - 15, -8);
    ctx.moveTo(arrowLength, 0);
    ctx.lineTo(arrowLength - 15, 8);

    //Fill in arrow
    ctx.strokeStyle = 'rgba(0, 220, 255, 0.8)';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.restore();

    requestAnimationFrame(animate);
}

animate();