'use strict'

document.querySelector('.player').addEventListener('click', () => {
    document.querySelector('body').innerHTML = `
    <div id="points1">0</div>
    <canvas id="game" width="400" height="400"></canvas>
    <div id="points2">0</div>
`

    let canvas = document.querySelector('#game');
    let context = canvas.getContext('2d');
    const grid = 16;
    let count = 0;

    let apple = {
        x: 320,
        y: 320
    };

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    class Snake {
        constructor(x, y, color, pointAdress) {
            this.x = x,
                this.y = y,
                this.dx = grid,
                this.dy = 0,
                this.cells = [],
                this.maxCells = 4,
                this.points = 0,
                this.color = color
            this.pointAddress = document.querySelector('#' + pointAdress);

        }

        mowe() {
            this.x += this.dx;
            this.y += this.dy;

            if (this.x < 0) {
                snake1.x = canvas.width - grid;
            } else if (this.x >= canvas.width) {
                this.x = 0;
            }
            if (this.y < 0) {
                this.y = canvas.height - grid;
            } else if (this.y >= canvas.height) {
                this.y = 0;
            }

            this.cells.unshift({
                x: this.x,
                y: this.y
            });

            if (this.cells.length > this.maxCells) {
                this.cells.pop();
            }
        }

        render() {
            context.fillStyle = this.color;
            this.cells.forEach((cell, index) => {
                context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

                if (cell.x === apple.x && cell.y === apple.y) {
                    this.maxCells++;
                    this.points += 10;
                    this.pointAddress.innerHTML = this.points;
                    apple.x = getRandomInt(0, 25) * grid;
                    apple.y = getRandomInt(0, 25) * grid;
                }

                for (let i = index + 1; i < this.cells.length; i++) {
                    if (cell.x === this.cells[i].x && cell.y === this.cells[i].y) {
                        this.x = 160;
                        this.y = 160;
                        this.cells = [];
                        this.maxCells = 4;
                        this.dx = grid;
                        this.dy = 0;
                        this.points = 0;
                        apple.x = getRandomInt(0, 25) * grid;
                        apple.y = getRandomInt(0, 25) * grid;
                    }
                }
            });
        }

    }

    const snake1 = new Snake(160, 160, 'green', 'points1');
    const snake2 = new Snake(320, 320, 'blue', 'points2');

    function loop() {
        requestAnimationFrame(loop);
        if (++count < 8) {
            return;
        }
        count = 0;
        context.clearRect(0, 0, canvas.width, canvas.height);

        snake1.mowe();
        snake2.mowe();
        snake1.render();
        snake2.render();

        context.fillStyle = 'red';
        context.fillRect(apple.x, apple.y, grid - 1, grid - 1);

    }

    document.addEventListener('keydown', function (e) {
        if (e.which === 37 && snake1.dx === 0) {
            snake1.dx = -grid;
            snake1.dy = 0;
        } else if (e.which === 38 && snake1.dy === 0) {
            snake1.dy = -grid;
            snake1.dx = 0;
        } else if (e.which === 39 && snake1.dx === 0) {
            snake1.dx = grid;
            snake1.dy = 0;
        } else if (e.which === 40 && snake1.dy === 0) {
            snake1.dy = grid;
            snake1.dx = 0;
        }

        if (e.which === 65 && snake2.dx === 0) {
            snake2.dx = -grid;
            snake2.dy = 0;
        } else if (e.which === 87 && snake2.dy === 0) {
            snake2.dy = -grid;
            snake2.dx = 0;
        } else if (e.which === 68 && snake2.dx === 0) {
            snake2.dx = grid;
            snake2.dy = 0;
        } else if (e.which === 83 && snake2.dy === 0) {
            snake2.dy = grid;
            snake2.dx = 0;
        }
    });

    requestAnimationFrame(loop);

})