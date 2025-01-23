

let logo1=document.getElementById("logo1");
let paint=document.getElementById('paint');
let mona=document.getElementById('mona_lisa');
let tool1=document.getElementById('tools_section');
let tool2=document.getElementById('tools_section2');
let pencil=document.getElementById('pencil');
let eraser=document.getElementById('eraser');
let canvas=document.querySelector('canvas');
let ctx=canvas.getContext('2d');
let clicked_color=document.querySelectorAll('.colors');
let rect=document.getElementById('rectanglei');
let line=document.getElementById('linei');
let circle=document.getElementById('circlei');
let slider=document.getElementById('size_slider');
let current_color=document.getElementById('scol');
let color_selector=document.getElementById('color_selector');
let start_color=document.getElementById('color');
let clear_canvas=document.getElementById('clear_canvas');


let isdrawing=false;
let prevMouseX,prevMouseY,snapshot;
let selected_element=null;
let prev_selected_element;
let pencil_width=slider.value;
let selected_color="rgba(0,0,0,255)";
let start_coloring=false;
let selected_color_array=[];
let canvas_data;


current_color.style.backgroundColor=selected_color;
const match = selected_color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
if (match) {
  const r = parseInt(match[1], 10); // Red
  const g = parseInt(match[2], 10); // Green
  const b = parseInt(match[3], 10); // Blue
  const a = match[4] !== undefined ? Math.round(parseFloat(match[4]) * 255) : 255; // Alpha (default 255 for opaque)      
  selected_color_array=[r, g, b, a];
  console.log(selected_color_array);
}


window.addEventListener("load",()=> {
    canvas.width=canvas.offsetWidth;
    canvas.height=canvas.offsetHeight;
});

let drawing = (e) =>{
    if(!isdrawing) return;                    //mousedraw function required
    ctx.putImageData(snapshot,0,0);           //continiously moves the state of canvas back to predrawing of current shape such that the shape which is being drawn is not permanent 
    if(selected_element==pencil)
    {   
    ctx.lineTo(e.offsetX,e.offsetY);
    ctx.stroke();
    }
    else if(selected_element==eraser)
    {   
        ctx.strokeStyle="#fff";
        ctx.lineTo(e.offsetX,e.offsetY);
        ctx.stroke();
    }
    else if(selected_element==line)
    {
    drawline(e);
    }    
    else if(selected_element==rect)
    {
    drawRect(e);
    }
    else if(selected_element==circle)
    {
    drawcircle(e);
    }  
    else if(selected_element==start_color)
    {
        color_function(e);
    }      
   
}

let mousedraw = (e)=> {
    isdrawing=true;
    prevMouseX=e.offsetX;
    prevMouseY=e.offsetY;
    ctx.beginPath( );                       //for new line when mouse is pressed
    ctx.lineWidth=pencil_width;
    ctx.strokeStyle=selected_color;
    ctx.lineCap="round";
    snapshot=ctx.getImageData(0,0,canvas.width,canvas.height);               //stores state of canvas before the current shape is being drawn
    
}
function drawline(e)
{
    ctx.beginPath();
    ctx.moveTo(prevMouseX,prevMouseY);
    ctx.lineTo(e.offsetX,e.offsetY);
    ctx.stroke();
}
function drawRect(e)
{  
   ctx.strokeRect(e.offsetX,e.offsetY,prevMouseX-e.offsetX,prevMouseY-e.offsetY);
}
function drawcircle(e)
{
    ctx.beginPath();
    let radius=Math.sqrt(Math.pow((prevMouseX-e.offsetX),2)+Math.pow((prevMouseY-e.offsetY),2));
    ctx.arc(prevMouseX,prevMouseY,radius,0,2*Math.PI);
    ctx.stroke();
}
logo1.addEventListener('click', () => {
    console.log("logo clicked");
    paint.classList.add('show');
    logo1.classList.add('logo_move');
    logo1.classList.remove('logo_breathe');
    mona.classList.add('mona_slide');
    tool1.classList.add('tool_go_left');
    tool2.classList.add('tool_go_right');
});

canvas.addEventListener("mousemove",drawing);
canvas.addEventListener("mousedown",mousedraw);
canvas.addEventListener("mouseup",() => {isdrawing=false;})
canvas.addEventListener("mouseleave",() => {isdrawing=false;})
canvas.addEventListener("mousemove",drawing);


pencil.addEventListener("click",() => {
    if(selected_element) 
    {
      prev_selected_element=selected_element;
      console.log(prev_selected_element.id+" deactivated");
      prev_selected_element.classList.remove('hoo');
    }   
    selected_element=pencil;
    selected_element.classList.add('hoo');
    console.log(selected_element.id+" activated")});

rect.addEventListener("click",()=> {
    if(selected_element) 
        {
          prev_selected_element=selected_element;
          console.log(prev_selected_element.id+" deactivated");
          prev_selected_element.classList.remove('hoo');
        }  
   
    selected_element=rect;
    selected_element.classList.add('hoo');
    console.log(selected_element.id+" activated")});



line.addEventListener("click",()=> {
    if(selected_element) 
        {
          prev_selected_element=selected_element;
          console.log(prev_selected_element.id+" deactivated");
          prev_selected_element.classList.remove('hoo');
        }  
        selected_element=line;
        selected_element.classList.add('hoo');
        console.log(selected_element.id+" activated")});


circle.addEventListener("click",()=> {
    if(selected_element) 
        {
          prev_selected_element=selected_element;
          console.log(prev_selected_element.id+" deactivated");
          prev_selected_element.classList.remove('hoo');
        }  
       
        selected_element=circle;
        selected_element.classList.add('hoo');
        console.log(selected_element.id+" activated")
});

eraser.addEventListener("click",()=>{
    if(selected_element) 
        {
          prev_selected_element=selected_element;
          console.log(prev_selected_element.id+" deactivated");
          prev_selected_element.classList.remove('hoo'); 
        } 
   
    selected_element=eraser;
    selected_element.classList.add('hoo');
    console.log(selected_element.id+" activated")
});

slider.addEventListener("change",()=>{pencil_width=size_slider.value;});

clicked_color.forEach(ccol => {
    ccol.addEventListener("click",()=>{
        selected_color=window.getComputedStyle(ccol).getPropertyValue("background-color");
        console.log("selected_color : "+selected_color)
        current_color.style.backgroundColor=selected_color;
        const match = selected_color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
        if (match) {
          const r = parseInt(match[1], 10); // Red
          const g = parseInt(match[2], 10); // Green
          const b = parseInt(match[3], 10); // Blue
          const a = match[4] !== undefined ? Math.round(parseFloat(match[4]) * 255) : 255; // Alpha (default 255 for opaque)      
          selected_color_array=[r, g, b, a];
          console.log(selected_color_array);
        }
    });
    
});
color_selector.addEventListener("change",(e)=>{
    selected_color=color_selector.value;
    console.log("selected_color : "+selected_color)
    current_color.style.backgroundColor=selected_color;
});

start_color.addEventListener("click",()=>{ 
    if(selected_element) 
    {
        prev_selected_element=selected_element;
        console.log(prev_selected_element.id+" deactivated");
        prev_selected_element.classList.remove('hoo');    
    }  
   
    selected_element=start_color;
    selected_element.classList.add('hoo');
    console.log(selected_element.id+" activated")});

 

canvas.addEventListener("click",function color_function(e) {
    if(selected_element!=start_color) return;
    canvas_data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let X = Math.floor(e.offsetX);
    let Y = Math.floor(e.offsetY);


    let startColor = getPixel(X,Y);


    fill_color(X, Y, startColor);


    ctx.putImageData(canvas_data, 0, 0);
});


function fill_color(x, y, startColor) {
    let fill_stack = [];
    fill_stack.push([x, y]);

    while (fill_stack.length > 0) {
        let [currentX, currentY] = fill_stack.pop();

        if (!valid(currentX, currentY)) continue;

        
        if (!isSameColor(currentX, currentY, startColor)) continue;

        setPixel(currentX, currentY);

        
        fill_stack.push([currentX + 1, currentY]);
        fill_stack.push([currentX - 1, currentY]);
        fill_stack.push([currentX, currentY - 1]);
        fill_stack.push([currentX, currentY + 1]);
    }
}


function setPixel(x, y) {
    const pixels = canvas_data.data;
    const i = (y * canvas.width + x) * 4;


    pixels[i] = selected_color_array[0];
    pixels[i + 1] = selected_color_array[1];
    pixels[i + 2] = selected_color_array[2];
    pixels[i + 3] = selected_color_array[3];
}


function getPixel(x, y) {
    const pixels = canvas_data.data;
    const i = (y * canvas.width + x) * 4;


    return [pixels[i], pixels[i + 1], pixels[i + 2], pixels[i + 3]];
}


function isSameColor(x, y, color) {
    const pixelColor = getPixel(x, y);


    for (let i = 0; i < 4; i++) {
        if (pixelColor[i] !== color[i]) return false;
    }
    return true;
}


function valid(x, y) {
    return x >= 0 && x < canvas.width && y >= 0 && y < canvas.height;
}

clear_canvas.addEventListener("click",()=>{
    alert("your current progress will be cleared");
    ctx.clearRect(0,0,canvas.width,canvas.height);    
});