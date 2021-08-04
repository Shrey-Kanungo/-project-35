//Create variables here
var dog, Happydog,dogImg;
var database
var food, foodStock,foodImg




function preload()
{
	//load images here
  dogImg = loadImage("images/dogImg.png");
  
  Happydog = loadImage("images/dogImg1.png");
  foodImg = loadImage("images/mik.jpg");
}

function setup() {
  database=firebase.database();
	createCanvas(800, 700);
  dog = createSprite(400,350,40,30);
  dog.addImage(dogImg);
  dog.scale = 0.19;
  food = createSprite(250,200,20,10);
  food.addImage(foodImg);
  food.scale = 0.09



  food=database.ref('food') ;
  food.on("value",ReadFoodstock);
  
}


function draw() {  
background(46,139,87);

if (keyWentDown(UP_ARROW)){
  writeStock(food)
  dog.addImage("HappyDog")
}
  drawSprites();
  //add styles here

}

function ReadFoodstock(data){
  foods = data.val();
}
  function writeStock(x){
    database.ref('/').update({
      food : x 
    })
  }

  

