/**
 * Created by Administrator on 2017-11-29.
 */
//食物的对象----Food
(function () {//自调用函数

    var elements = [];//数组,保存新创建的食物的
    //食物的构造函数
    function Food(x, y, width, height, color) {
        //设置横纵坐标
        this.x = x || 0;
        this.y = y || 0;
        //设置宽和高
        this.width = width || 20;
        this.height = height || 20;
        //背景颜色
        this.color = color || "green";
    }

    //通过原型添加方法-----初始化食物---产生食物的
    Food.prototype.init = function (map) {
        //先删除食物,之后再创建
        remove();
        //创建元素---创建食物
        var div = document.createElement("div");
        map.appendChild(div);//把创建的元素追加到map中
        //设置样式
        div.style.width = this.width + "px";
        div.style.height = this.height + "px";
        div.style.backgroundColor = this.color;
        //脱离文档流
        div.style.position = "absolute";
        //设置横纵坐标----此时获取的是随机的横纵坐标
        this.x = parseInt(Math.random() * (map.offsetWidth / this.width)) * this.width;
        this.y = parseInt(Math.random() * (map.offsetHeight / this.height)) * this.height;
        //设置食物的横纵坐标
        div.style.left = this.x + "px";
        div.style.top = this.y + "px";
        elements.push(div);//把新的食物加入到数组中

    };

    //私有函数---删除食物的
    function remove() {
        //直接删除食物
        for (var i = 0; i < elements.length; i++) {
            //数组元素
            var ele = elements[i];
            //从map中删除了这个div
            ele.parentNode.removeChild(ele);
            //再次从数组中移除这个元素
            elements.splice(i, 1);
        }
    }

    //把函数Food对象暴露给window.外部可以使用
    window.Food = Food;
})();