const canvas = document.getElementById('elec-pot-bg');
const ctx = canvas.getContext('2d');
let width, height;
//let arrows[];

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

let mouse = {x: -1000, y: -1000 };


window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});
/*
window.addEventListener('mouseout', (e) => {
    mouse.x = -1000;
    mouse.y = -1000;
});
*/
window.addEventListener('touchmove', (e) => {

    e.preventDefault();

    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
});//, {passive: true});

window.addEventListener('touchstart', (e) => {

    e.preventDefault();


    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
});//, {passive: true});

window.addEventListener('touchend', (e) => {
    mouse.x = -1000;
    mouse.y = -1000;
});

window.addEventListener('touchend', (e) => {
    mouse.x = -1000;
    mouse.y = -1000;
});


function animate() {
    ctx.clearRect(0, 0, width, height);

    //Calculate center point

    /*
    const centerX = width / 2;
    const centerY = height / 2;
    drawArrow(centerX, centerY);

    const x2 = 600;
    const y2 = 600;
    drawArrow(x2, y2);
    */


    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 0, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(180, 50, 220, 0.05)';
    ctx.lineWidth = 235;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round'
    ctx.stroke();

    populateArrows();

    
    requestAnimationFrame(animate);
     
}

function populateArrows(){
    for (let i = 0; i <= 35; i++) {
        for (let j = 0; j <= 20; j++) {
            drawArrow(50 * i, 50 * j);
        }
    }
}

function drawArrow(x, y) {
    const dx = mouse.x - x;
    const dy = mouse.y - y;

    const dist = Math.sqrt(dx * dx + dy * dy)

    //Min Max detections
    
    if (dist < 7) return;
    if (dist > 100) return;
    
    
    const angle = Math.atan2(dy,dx) + Math.PI
    
    ctx.save();

    ctx.translate(x, y)
    ctx.rotate(angle);
    
    let arrowLength = 25;
    if (dist < 35) {
        arrowLength = 30 * dist/35;
    }
    
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(arrowLength, 0);

    ctx.lineTo(arrowLength - 15, -8);
    ctx.moveTo(arrowLength, 0);
    ctx.lineTo(arrowLength - 15, 8);

    //Fill in arrow
    ctx.strokeStyle = 'rgba(180, 50, 220, 0.7)';
    ctx.lineWidth = 3;
    ctx.stroke();


    ctx.restore();

}

animate();