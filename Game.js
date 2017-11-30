/**
 * Created by Administrator on 2017-11-29.
 */
//游戏对象---Game======
(function () {
    //游戏的构造函数
    var that=null ;//没用------
    //游戏的构造函数
    function Game(map) {
        this.snake = new Snake();//创建小蛇对象
        this.food = new Food();//创建食物对象
        this.map = map;//把传进来的map赋值给this.map这个属性
        that = this;//存储的是游戏的实例对象
    }

    //初始化游戏---通过原型添加方法
    Game.prototype.init = function () {
        //初始化食物
        this.food.init(this.map);//========================================
        //初始化小蛇
        this.snake.init(this.map);

        //小蛇动起来
        this.runSnake();
        //获取按键
        this.keyBind();

    };
    //通过原型添加方法----设置小蛇移动---自动移动
    Game.prototype.runSnake = function () {
        //小蛇自己移动
        var timeId=setInterval(function () {
            this.snake.moveSnake(this.food,this.map);
            this.snake.init(this.map);//===========================================
            //有界限
            //获取地图的最大边界---横坐标
            var maxX = this.map.offsetWidth / this.snake.width;
            var maxY = this.map.offsetHeight / this.snake.height;
            //小蛇的头的的横纵坐标
            var headX = this.snake.body[0].x;
            var headY = this.snake.body[0].y;
            //是否撞墙
            if(headX<0||headX>=maxX){
                //清理定时器
                clearInterval(timeId);
                alert("都死了,还跑什么");
            }
            //判断纵坐标
            if(headY<0||headY>=maxY){
                //清理定时器
                clearInterval(timeId);
                alert("都死了,还跑什么");
            }

        }.bind(that), 150);
    };
    //通过原型添加方法----获取用户按键
    Game.prototype.keyBind=function () {
        //页面的任何地方都可以获取用户按键
        document.addEventListener("keydown",function (e) {

            switch (e.keyCode){
                case 37:this.snake.direction="left";break;
                case 38:this.snake.direction="top";break;
                case 39:this.snake.direction="right";break;
                case 40:this.snake.direction="bottom";break;
            }
        }.bind(that),false);
    };

    //Game暴露给window
    window.Game = Game;
})();