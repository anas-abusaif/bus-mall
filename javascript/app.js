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

let randomLeft;
let randomMiddle;
let randomRight;
let randomLeftRepeat;
let randomMiddleRepeat;
let randomRightRepeat;



let productsSection=document.getElementById('productsSection');
let leftProduct=document.getElementById('left');
let middleProduct=document.getElementById('middle');
let rightProduct=document.getElementById('right');
let list=document.getElementById('list');
let setForm=document.getElementById('setForm');
let viewButton=document.getElementById('viewButton');
let pSection=document.getElementById('pSection');

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

function display(){


  do{
    randomLeft= randomNumber(0, productArray.length-1);
    randomMiddle= randomNumber(0, productArray.length-1);
    randomRight= randomNumber(0, productArray.length-1);
    while((randomLeft===randomLeftRepeat || randomLeft===randomMiddleRepeat || randomLeft===randomRightRepeat)||(randomMiddle===randomLeftRepeat || randomMiddle===randomMiddleRepeat || randomMiddle===randomRightRepeat)||(randomRight===randomLeftRepeat || randomRight===randomMiddleRepeat || randomRight===randomRightRepeat)){
      randomLeft= randomNumber(0, productArray.length-1);
      randomMiddle= randomNumber(0, productArray.length-1);
      randomRight= randomNumber(0, productArray.length-1);
    }
  }while(randomLeft===randomMiddle || randomLeft===randomRight || randomMiddle===randomRight);

  leftProduct.src=Product.all[randomLeft].path;
  middleProduct.src=Product.all[randomMiddle].path;
  rightProduct.src=Product.all[randomRight].path;

  randomLeftRepeat=randomLeft;
  randomMiddleRepeat=randomMiddle;
  randomRightRepeat=randomRight;
  Product.all[randomLeft].views++;
  Product.all[randomMiddle].views++;
  Product.all[randomRight].views++;

}


let attempts=0;
let defaultAttempts=25;
function setAttempts(event){
  event.preventDefault();
  let value=document.getElementById('numInput').value;
  if(value){
    defaultAttempts=Number(value);
  }
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
    Product.all[randomRight].clicks++;
    display();
  }else if(attempts===defaultAttempts){
    let thanks=document.createElement('p');
    thanks.textContent=('thank you for choosing our products');
    pSection.appendChild(thanks);
    productsSection.removeEventListener('click', chooseProduct);
  }

}
productsSection.addEventListener('click', chooseProduct);
function element (){
  for(let i=0; i<productArray.length; i++){
    let element=document.createElement('li');
    element.textContent=(`${productArray[i].split('.')[0]} had ${Product.all[i].clicks} votes, and was seen ${Product.all[i].views} times.`);
    list.appendChild(element);
  }
  chartView();
  storeData(),
  viewButton.removeEventListener('click',element);
  productsSection.removeEventListener('click', chooseProduct);
}
viewButton.addEventListener('click',element);

function chartView(){
  let barName=[];
  let barViews=[];
  let barClicks=[];
  for(let i=0; i<Product.all.length; i++){
    barName.push(Product.all[i].name);
    barViews.push(Product.all[i].views);
    barClicks.push(Product.all[i].clicks);
  }
  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: barName,
      datasets: [{
        label: '# of Views',
        data: barViews,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      },
      {
        label: '# of Votes',
        data: barClicks,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}



function storeData(){
  let storedData=JSON.stringify(Product.all);
  localStorage.setItem('preData',storedData);
}

function retriveData(){
  let retvivedData=localStorage.getItem('preData');

  if(retvivedData) {
    Product.all=JSON.parse(retvivedData);
  }else {

    for (let i=0; i<productArray.length; i++){
      new Product(productArray[i].split('.')[0], productArray[i]);
    }

  }
  display();
}
retriveData();
