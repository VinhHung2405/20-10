document.getElementById('show-message').addEventListener('click', function() {
    const message = document.getElementById('message');
    const fireworksSound = document.getElementById('fireworks-sound');

    message.classList.toggle('hidden');
    if (!message.classList.contains('hidden')) {
        fireworksSound.play();
        createFireworks();
    }
});

function createFireworks() {
    const canvas = document.getElementById('fireworks');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fireworks = [];
    const colors = ['#FF004D', '#FF9B00', '#FFEA00', '#00E7E0', '#00FF2D'];

    class Firework {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 10 + 5;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.exploded = false;
            this.particles = [];

            this.explode = () => {
                for (let i = 0; i < 100; i++) {
                    const angle = Math.random() * 2 * Math.PI;
                    const speed = Math.random() * 5 + 2;
                    this.particles.push(new Particle(this.x, this.y, angle, speed));
                }
                this.exploded = true;
            };

            this.update = () => {
                if (!this.exploded) {
                    this.size *= 1.05;
                    if (this.size >= 30) {
                        this.explode();
                    }
                } else {
                    for (const particle of this.particles) {
                        particle.update();
                    }
                }
            };

            this.draw = () => {
                if (!this.exploded) {
                    ctx.fillStyle = this.color;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fill();
                } else {
                    for (const particle of this.particles) {
                        particle.draw();
                    }
                }
            };
        }
    }

    class Particle {
        constructor(x, y, angle, speed) {
            this.x = x;
            this.y = y;
            this.speedX = Math.cos(angle) * speed;
            this.speedY = Math.sin(angle) * speed;
            this.size = Math.random() * 2 + 1;
            this.alpha = 1;

            this.update = () => {
                this.x += this.speedX;
                this.y += this.speedY;
                this.alpha -= 0.02;
            };

            this.draw = () => {
                ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            };
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const firework of fireworks) {
            firework.update();
            firework.draw();
        }
        fireworks.push(new Firework(Math.random() * canvas.width, Math.random() * canvas.height));
        requestAnimationFrame(animate);
    }

    animate();
}
