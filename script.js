window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas1.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.fillStyle = "green";
    ctx.lineCap = "round";
    ctx.shadowColor = "rgba(0,0,0,0.7)";
    ctx.shadow0ffsetX = 0;
    ctx.shadow0ffsetY = 0;
    ctx.shadowBlur = 0;

    //effect settings
    let size = canvas.width < canvas.height ? canvas.width * 0.2 : canvas.height * 0.2;
    const maxLevel = 4;
    let branches = 2;
    
    let sides = 5;
    let scale = 0.5;
    let spread = 0.5;
    let color = 'hsl('+ Math.random() * 360 + ', 100%, 50%)';
    let lineWidth = Math.floor(Math.random() * 10 + 10);

    //controls
    const randomizeButton = document.getElementById('randomizeButton');
    const resetButton = document.getElementById("resetButton");
    const slider_spread = document.getElementById("spread");
    const label_spread = document.querySelector('[for="spread"]');
    slider_spread.addEventListener("change", function (e) {
        spread = e.target.value;
        updateSliders();
        drawFractal();
    });
    slider_sides = document.getElementById('sides');
    label_sides = document.querySelector('[for="sides"]');
    slider_sides.addEventListener('change', function(e){
        sides = e.target.value;
        updateSliders();
        drawFractal();
    })

    function drawBranch(level){
        if (level > maxLevel) return;
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(size,0);
        ctx.stroke();
        for (let i = 0; i < branches; i++){
            ctx.save();
            ctx.translate(size - (size / branches) * i, 0);
            ctx.scale(scale, scale);

            ctx.save();
            ctx.rotate(spread);
            drawBranch(level + 1);
            ctx.restore();

            /*ctx.save();
            ctx.rotate(-spread);
            drawBranch(level + 1);
            ctx.restore();*/

            ctx.restore();
        }   
        ctx.beginPath();
        ctx.arc(0, size, size * 0.1, 0, Math.PI * 2);
        ctx.fill();
    }

    function drawFractal(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.translate(canvas.width / 2, canvas.height / 2);
        for (let i = 0; i < sides; i++) {
            ctx.rotate((Math.PI * 2) / sides);
            drawBranch(0);
        }
        ctx.restore();
        randomizeButton.style.backgroundColor = color;
    }
    drawFractal();

    function randomizeFractal(){
        sides = Math.floor(Math.random() * 7 + 2);
        scale = Math.random() * 0.2 + 0.4;
        spread = Math.random() * 2.9 + 0.1;
        color = 'hsl(' + Math.random() * 360 + ', 100%, 50%)';
        lineWidth = Math.floor(Math.random() * 10 );
    }
    randomizeButton.addEventListener('click', function(){
        randomizeFractal();
        updateSliders();
        drawFractal();
    });
    
    function updateSliders() {
        slider_spread.value = spread;
        label_spread.innerText = "Spread: " + Number(spread).toFixed(1);
        slider_sides.value = sides;
        label_sides.innerText = "Sides: " + sides;  
    }
    updateSliders();

    window.addEventListener("resize", function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        size = canvas.width < canvas.height ? canvas.width * 0.3 : canvas.height * 0.3;
        ctx.shadowColor = "rgba(0,0,0,0.7)";
        ctx.shadow0ffsetX = 10;
        ctx.shadow0ffsetY = 5;
        ctx.shadowBlur = 10;
        drawFractal();
    });

});    