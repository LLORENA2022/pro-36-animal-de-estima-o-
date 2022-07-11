var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feeddog;
var lastFed;
var feed;
//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feeddog=createButton("Feed the Dog");
  feeddog.position(850,95);
  feeddog.mousePressed(feedDog);
  
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  HorarioRefeicao= database.ref('HorarioRefeicao');
  HorarioRefeicao.on("value", function(data){
    HorarioRefeicao= data.val();
  });
 
  //write code to display text lastFed time here
if(lastFed>=12){
  //mostrar o tempo em formato PM quando lastfed 12
}else if(lastFed==0){
  text("Last Feed : 12 AM",350,30);
 
}else{
  text("Ultima refeição:"+ lastFed+"da manhã", 350,30);
  
  //mostrar tempo em formato AM quando lastfed 12
}
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  var food_stock_val= foodObj.getFoodStock();
  if(food_stock_val<=0){
    foodObj.updateFoodStock(food_stock_val*0);
  }else{
    foodObj.updateFoodStock(food_stock_val-1);
  }
  //write code here to update food stock and last fed time
database.ref('/').update({
  Food:foodObj.getFoodStock(),
  HorarioRefeicao:hour()
})
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
