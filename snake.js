'use strict'

document.querySelectorAll('.player').forEach(e => {
    e.addEventListener('click', () => {
        if (e.getAttribute('data') == 1) {
            game([160, 80, 'green', 'points1', 65, 87, 68, 83], []);
        } else {
            game([160, 80, 'green', 'points1', 65, 87, 68, 83], [160, 320, 'blue', 'points2', 37, 38, 39, 40]);
        }
    })
})




function game(player1, player2) {

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
        x: 192,
        y: 192
    };

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    class Snake {
        constructor(x, y, color, pointAdress, left, up, right, down) {
            this.x = x,
                this.y = y,
                this.dx = grid,
                this.dy = 0,
                this.cells = [],
                this.maxCells = 4,
                this.points = 0,
                this.color = color,
                this.left = left,
                this.up = up,
                this.right = right,
                this.down = down,
                this.pointAddress = document.querySelector('#' + pointAdress);
            this.key();

        }

        mowe() {
            this.x += this.dx;
            this.y += this.dy;

            if (this.x < 0) {
                this.x = canvas.width - grid;
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

            context.fillStyle = this.color;
            this.cells.forEach((cell, index) => {
                context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

                if (cell.x === apple.x && cell.y === apple.y) {
                    this.maxCells++;
                    this.points += 1;
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

        key() {
            document.addEventListener('keydown', (e) => {
                if (e.which === this.left && this.dx === 0) {
                    this.dx = -grid;
                    this.dy = 0;
                } else if (e.which === this.up && this.dy === 0) {
                    this.dy = -grid;
                    this.dx = 0;
                } else if (e.which === this.right && this.dx === 0) {
                    this.dx = grid;
                    this.dy = 0;
                } else if (e.which === this.down && this.dy === 0) {
                    this.dy = grid;
                    this.dx = 0;
                }

            });
        }


    }

    const snake1 = new Snake(...player1);
    const snake2 = new Snake(...player2);

    function loop() {
        requestAnimationFrame(loop);
        if (++count < 8) {
            return;
        }
        count = 0;
        context.clearRect(0, 0, canvas.width, canvas.height);
        snake1.mowe();
        snake2.mowe();

        snake1.cells.forEach((cell) => {
            if (cell.x == snake2.x && cell.y == snake2.y) {
                console.log('тарарам')
            }
        })
        snake2.cells.forEach((cell) => {
            if (cell.x == snake1.x && cell.y == snake1.y) {
                console.log('тарараhfhfv')
            }
        })
    
        context.fillStyle = 'red';
        context.fillRect(apple.x, apple.y, grid - 1, grid - 1);
    }

    requestAnimationFrame(loop);
}