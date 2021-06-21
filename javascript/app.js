'use strict';

let productArray=[
  'bag.jpg',
  'banana.jpg',
  'bathroom.jpg',
  'boots.jpg',
  'breakfast.jpg',
  'bubblegum.jpg',
  'chair.jpg',
  'cthulhu.jpg',
  'dog-duck.jpg',
  'dragon.jpg',
  'pen.jpg',
  'pet-sweep.jpg',
  'scissors.jpg',
  'shark.jpg',
  'sweep.png',
  'tauntaun.jpg',
  'unicorn.jpg',
  'usb.gif',
  'water-can.jpg',
  'wine-glass.jpg'
];
let productsSection=document.getElementById('productsSection');
let leftProduct=document.getElementById('left');
let middleProduct=document.getElementById('middle');
let rightProduct=document.getElementById('right');
let list=document.getElementById('list');
let buttonSection =document.getElementById('buttonSection');
let setForm=document.getElementById('setForm');


function randomNumber( min, max ) {
  min = Math.ceil( min );
  max = Math.floor( max );
  return Math.floor( Math.random() * ( max - min + 1 ) + min );
}


function Product (name, path){
  this.name= name;
  this.path=`./images/${path}`;
  this.views=0;
  this.clicks=0;
  Product.all.push(this);
}
Product.all=[];

for (let i=0; i<productArray.length; i++){
  new Product(productArray[i].split('.')[0], productArray[i]);
}
let randomLeft;
let randomMiddle;
let randomRight;

function display(){
  randomLeft= randomNumber(0, productArray.length-1);
  randomMiddle= randomNumber(0, productArray.length-1);
  randomRight= randomNumber(0, productArray.length-1);
  do{
    randomLeft= randomNumber(0, productArray.length-1);
    randomMiddle= randomNumber(0, productArray.length-1);
    randomRight= randomNumber(0, productArray.length-1);
  }while(randomLeft===randomMiddle || randomLeft===randomRight || randomMiddle===randomRight);
  leftProduct.src=Product.all[randomLeft].path;
  middleProduct.src=Product.all[randomMiddle].path;
  rightProduct.src=Product.all[randomRight].path;

  Product.all[randomLeft].views++;
  Product.all[randomMiddle].views++;
  Product.all[randomRight].views++;
}
display();
let attempts=0;
let defaultAttempts;
function setAttempts(event){
  event.preventDefault();
  let value=document.getElementById('numInput').value;
  console.log(value);
  if(value){
    defaultAttempts=Number(value);
  }else{defaultAttempts=25;
  }
  productsSection.addEventListener('click', chooseProduct);
}

setForm.addEventListener('submit', setAttempts);

function chooseProduct(choose){
  if(choose.target.id==='left' && attempts<defaultAttempts){
    attempts++;
    Product.all[randomLeft].clicks++;
    display();
  }else if(choose.target.id==='middle' && attempts<defaultAttempts){
    attempts++;
    Product.all[randomMiddle].clicks++;
    display();
  }else if(choose.target.id==='right' && attempts<defaultAttempts){
    attempts++;
    Product.all[randomRight].views++;
    display();
  }else if(attempts===defaultAttempts){
    console.log('hello');
    let thanks=document.createElement('p');
    thanks.textContent=('thank you for choosing our products');
    buttonSection.appendChild(thanks);
    viewResults();
    productsSection.removeEventListener('click', chooseProduct);
  }

}



let button=document.createElement('button');
function viewResults(){
  button.type=('button');
  button.textContent=('View Results');
  buttonSection.appendChild(button);
}
function element (){
  for(let i=0; i<productArray.length-1; i++){
    let element=document.createElement('li');
    element.textContent=(`${productArray[i].split('.')[0]} had ${Product.all[i].clicks} votes, and was seen ${Product.all[i].views} times.`);
    list.appendChild(element);
  }
  button.removeEventListener('click', element);
}
button.addEventListener('click',element);
