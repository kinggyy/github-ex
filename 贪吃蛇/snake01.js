//获取id为"snake"的canvas DOM对象
var cvs = document.getElementById("snake")
//在canvas DOM对象中获取渲染上下文和绘画功能 以下功能代码得以在canvas上运行显示
var ctx = cvs.getContext("2d")

//导入地图图片
var ground = new Image()
ground.src = "img/ground.png"

var foodImg = new Image()
foodImg.src = "img/food.png"

//创建地图格子
var box = 32;
//创建蛇 (数组)
var snake = []
snake[0] = {
    x: 9 * box,
    y: 10 * box
}
//创建食物
var food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}
//得分
var score = 0;

//控制方向
var d;
document.addEventListener("keydown", direction)
function direction(event) {
    var key = event.keyCode;
    if (key == 37 && d != "RIGHT") {
        d = "LEFT";
    } else if (key == 38 && d != "DOWN") {
        d = "UP";
    } else if (key == 39 && d != "LEFT") {
        d = "RIGHT";
    } else if (key == 40 && d != "UP") {
        d = "DOWN";
    }
}

//撞到自己时
function conllision(head, array) {
    for (var i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true
        }
    }
    return false
}

// 绘制地图
function draw() {
    ctx.drawImage(ground, 0, 0)

    for (var i = 0; i < snake.length; i++) {
        //fillStyle填充颜色 是头部就绿色 尾部就白色
        //fillRect  位置  x y 轴  大小
        ctx.fillStyle = (i == 0) ? "green" : "white"
        ctx.fillRect(snake[i].x, snake[i].y, box, box)

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);

    }
    ctx.drawImage(foodImg, food.x, food.y);

    ctx.fillStyle = "white"//字体颜色
    ctx.font = "45px Changa one"
    ctx.fillText(score, 2 * box, 1.6 * box);//对象  位置

    //记录蛇的原位置
    var snakeX = snake[0].x;
    var snakeY = snake[0].y

    //转方向
    //蛇再 y轴走时 左减 右加
    if (d == "LEFT") snakeX -= box
    if (d == "RIGHT") snakeX += box

    //蛇再 X轴走时 上减 下加
    if (d == "UP") snakeY -= box
    if (d == "DOWN") snakeY += box

    //如果吃到食物
    //即头部与食物 的位置相同
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }
    } else {
        snake.pop()//删除并返回数组最后一个元素
    }

    //蛇的新位置
    var newHead = {
        x: snakeX,
        y: snakeY
    }

    //Game Over
    //撞到墙或者撞到自己
    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || conllision(newHead, snake)) {
        clearInterval(game)
    }

    snake.unshift(newHead)//向数组头部添加新元素并返回长度
}
game = setInterval(draw, 150)
