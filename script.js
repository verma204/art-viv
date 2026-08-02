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

window.addEventListener('touchmove', (e) => {

    e.preventDefault();

    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
}, {passive: false});

window.addEventListener('touchstart', (e) => {

    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
}, {passive: true});


function animate() {
    ctx.clearRect(0, 0, width, height);

    

    populateArrows();

    
    requestAnimationFrame(animate);
     
}

function populateArrows(){
    for (let i = 0; i <= 40; i++) {
        for (let j = 0; j <= 25; j++) {
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
    /*
    if (dist > 100) return;
    */
    
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

    let color = 'rgba(180, 50, 220, 0.7)';

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();


    ctx.beginPath();
    ctx.moveTo(arrowLength - 9, -4);
    ctx.lineTo(arrowLength, 0);
    ctx.lineTo(arrowLength - 9, 4);

    //Fill in arrow
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();


    ctx.restore();

}

animate();