//Create variables here
var dog, happydog,dogImg;
var database
var food, foodStock,foodImg




function preload()
{
	//load images here
  dogImg = loadImage("images/dogImg.png");
  
  happydog = loadImage("images/dogImg1.png");
  foodImg = loadImage("images/Milk.png");
}

function setup() {
  database=firebase.database();
	createCanvas(800, 700);

  foodObj = new food(); 

  

  dog = createSprite(400,350,40,30);
  dog.addImage(dogImg);
  dog.scale = 0.19;

  

  feed = createButton("FEED THE DOG");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("ADD FOOD");
  addFood.position(800,95);
  addFood.mousePressed(addFoods)


  food=database.ref('food') ;
  food.on("value",readfoodstock);
  
}


function draw() {  
background(46,139,87);
foodObj.display()
fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("Last Fed :"+ lastFed%12 +"PM",350,30);
}else if(lastFed==0){
  text("Last Fed : 12 AM",350,30);
}else{
  text("Last Fed :"+lastFed + "AM",350,30);
}
  drawSprites();
  //add styles here

}


function readfoodstock(data){
  
  food = data.val();
  foodObj.updateFoodStock(food);
}

  function feedDog(){
    dog.addImage(happydog);

    if(foodObj.getFoodStock()<= 0){
      foodObj.updateFoodStock(foodObj.getFoodStock()*0);
    }else{
      foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    }
    database.ref('/').update({
      food:foodObj.getfoodstock(),
      FeedTime:hour()
    })
  }

  
function addFood(){
  food++;
  database.ref('/').update({
    food:food
  })
}
