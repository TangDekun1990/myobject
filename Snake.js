/**
 * Created by Administrator on 2017-11-29.
 */
//小蛇的对象---Snake
(function () {

    var elements = [];//用来存储小蛇的每个部分,将来为了删除小蛇的==========================================================
    //小蛇的构造函数
    function Snake(width, height, direction) {
        //设置宽和高
        this.width = width || 20;
        this.height = height || 20;
        this.body = [
            {x: 3, y: 2, color: "red"},
            {x: 2, y: 2, color: "orange"},
            {x: 1, y: 2, color: "orange"}
        ];
        //方向---默认小蛇向右走
        this.direction = direction || "right";
    }

    //通过原型添加方法----初始化小蛇---在地图上显示小蛇
    Snake.prototype.init = function (map) {
        //删除小蛇
        remove();//==========================================================================
        //创建小蛇--
        //循环遍历this.body创建相应的div,并设置样式
        for (var i = 0; i < this.body.length; i++) {
            //创建div
            var div = document.createElement("div");
            map.appendChild(div);//把创建的div加入到了map中
            //设置样式了
            div.style.width = this.width + "px";
            div.style.height = this.height + "px";
            div.style.position = "absolute";
            div.style.left = this.body[i].x * this.width + "px";
            div.style.top = this.body[i].y * this.height + "px";
            div.style.backgroundColor = this.body[i].color;
            //把div加入到数组中,为了删除============================================================================
            elements.push(div);
        }
    };
    //通过原型添加方法----设置小蛇要移动============================================
    Snake.prototype.moveSnake = function (food,map) {
        //移动小蛇---就是把小蛇的头的数据给小蛇的第一个身体部分,第一个部分给第二个部分
        //2
        var i = this.body.length - 1;
        for (; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;//横坐标
            this.body[i].y = this.body[i - 1].y;//纵坐标
        }

        //判断小蛇移动的方向
        switch (this.direction) {
            case "right":
                this.body[0].x += 1;
                break;
            case "left":
                this.body[0].x -= 1;
                break;
            case "top":
                this.body[0].y -= 1;
                break;
            case "bottom":
                this.body[0].y += 1;
                break;
        }

        //判断小蛇有没有吃到食物
        //获取的小蛇的头的横纵坐标
        var snakeX=this.body[0].x;
        var snakeY=this.body[0].y;
        //获取食物的横纵坐标
        var foodX=food.x/food.width;
        var foodY=food.y/food.height;
        //吃食物
        if(snakeX==foodX&&snakeY==foodY){
            //先获取小蛇的尾巴的数据,然后向小蛇的数组中追加这样的一个数据
            var lastBody=this.body[this.body.length-1];
            var obj={
                x:lastBody.x,y:lastBody.y,color:lastBody.color
            };
            this.body.push(obj);
            //删除食物,重新画出来一个食物
            food.init(map);


        }

    };//私有函数---删除小蛇的每个部分的========================================================================
    function remove() {
        var i = elements.length - 1;
        for (; i >= 0; i--) {
            var ele = elements[i];//每个数组元素,就是一个div
            ele.parentNode.removeChild(ele);
            elements.splice(i, 1);
        }
    }

    //把Snake暴露给window
    window.Snake = Snake;
})();