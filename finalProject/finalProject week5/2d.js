document.getElementById("translate").onclick = function() {
        value = translate_val.value;
        transform("translate(" + value + ")");
    }
    document.getElementById("rotate").onclick = function() {
        value = rotate_val.value.split(",");
        transform("rotate(" + value[0] + " " + value[1] + " " + value[2] + ")");
    }
    document.getElementById("scale").onclick = function() {
        value = scale_val.value.split(",");
        transform("scale(" + value[0] + " " + value[1] + ")");
    }
    document.getElementById("shear").onclick = function() {
        value = shear_val.value;
        x = value.split(",")[0];
        y = value.split(",")[1];
        transform("skewX(" + x + ") skewY(" + y + ")");
    }

    function transform(value) {
        default_attr = ""
        l1.setAttribute("transform", default_attr + value);
        l2.setAttribute("transform", default_attr + value);
        l3.setAttribute("transform", default_attr + value);
        l4.setAttribute("transform", default_attr + value);
        l5.setAttribute("transform", default_attr + value);
        l6.setAttribute("transform", default_attr + value);
        l7.setAttribute("transform", default_attr + value);
        l8.setAttribute("transform", default_attr + value);
        l9.setAttribute("transform", default_attr + value);
        l10.setAttribute("transform", default_attr + value);
        l11.setAttribute("transform", default_attr + value);
        l12.setAttribute("transform", default_attr + value);
        rectangle1.setAttribute("transform", default_attr + value);
        rectangle2.setAttribute("transform", default_attr + value);
        rectangle3.setAttribute("transform", default_attr + value);
    }

        function OnClickrectangleangle()
        {
            rectangle1.style.fill = "white";
            rectangle2.style.fill = "white";
            rectangle3.style.fill = "white";
        }
        
        function OnClickFill()
        {
            l1.style.fill = "pink";
            l2.style.fill = "pink";
            l3.style.fill = "pink";
            l4.style.fill = "pink";
            l5.style.fill = "pink";
            l6.style.fill = "pink";
            l7.style.fill = "pink";
            l8.style.fill = "pink";
            l9.style.fill = "pink";
            l10.style.fill = "pink";
            l11.style.fill = "pink";
            l12.style.fill = "pink";
        }
        
        function OnClickLine()
        {
            l1.style.stroke = "blue";
            l2.style.stroke = "blue";
            l3.style.stroke = "blue";
            l4.style.stroke = "blue";
            l5.style.stroke = "blue";
            l6.style.stroke = "blue";
            l7.style.stroke = "blue";
            l8.style.stroke = "blue";
            l9.style.stroke = "blue";
            l10.style.stroke = "blue";
            l11.style.stroke = "blue";
            l12.style.stroke = "blue";
            
            rectangle1.style.stroke = "blue";
            rectangle2.style.stroke = "blue";
            rectangle3.style.stroke = "blue";
        }
