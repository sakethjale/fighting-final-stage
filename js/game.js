class Game
 {
    constructor()
    {
  
    }
  
    getState()
    {
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data)

      {
         gameState = data.val();
      })
  
    }
  
    update(state)
    {
      database.ref('/').update
      ({
        gameState: state
      });
    }

    async start()
    {

      if(gameState === 0)
      {
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");

        if(playerCountRef.exists())
        {
          playerCount = playerCountRef.val();
          player.getCount();
        }

        form = new Form()
        form.display();
      }
  
    }
    play()
    {
      form.hidden()

      background(bgimg)

      Player.getPlayerInfo()

     if(allPlayers!==undefined)
    {
        player.getposition();

       

          if(player.index===1)
          {
            hero2.x=allPlayers["player2"].x;
            hero2.y=allPlayers["player2"].y;
            hero2.health=allPlayers["player2"].health;
            hero1.health=player.health;
           
            hero1.x=player.xpos;
            hero1.y=player.ypos; 
            hero1.name=player.name;
            hero2.name=allPlayers["player2"].name;
            textSize(20);
            fill("red")
            text(player.name,hero1.x,hero1.y+60); 

            if(keyCode===LEFT_ARROW)
            {
              player.changePosition(-10,0)

              hero1.endAnimation=frameCount+10
              hero1.changeAnimation("hero lwalk",lwalking)
            }

            if(keyCode===RIGHT_ARROW)
            {
              hero1.changeAnimation("hero walk",walking) 
              hero1.endAnimation=frameCount+10

              player.changePosition(10,0)
            }

            if(keyCode===113)
            {
              hero1.changeAnimation("hero punch",punch)
              hero1.endAnimation=frameCount+10;
              hitman="hero1";

              kickpunch.play()
            hero1.setCollider("rectangle",25,-27,10,10)
                

            }  

            if(keyCode===101)
            {
              hero1.changeAnimation("hero kick",kick)
              hero1.endAnimation=frameCount+10; 
              hitman="hero1";
              kickpunch.play() 
              hero1.setCollider("rectangle",30,-40,10,10)

            }

            if(keyCode===101&&hero2.isTouching(hero1)||keyCode===113&&hero2.isTouching(hero1))
            {
                player.changePosition(-20,0);
                hero2.changeAnimation("hero2 recover",lrecover);
           
                if(hero1.x<hero2.x)
                {
                 player.health-=20;
                 player.updateHealth();
                 }

                if(player.health<=10)
                {                  
                  player.health=0;
                  player.updateHealth();
                }

                hero2.endAnimation=frameCount+10; 

                kicksound.play()    
            }

            keyCode=65;

            if(hero1.health<=0||hero2.health<=0)
            {
              hero1.visible=false
              hero2.visible=false
              gameState=2;
              game.update(2);
            }
          }
          
          if(player.index===2)
          
        {
            hero1.x=allPlayers["player1"].x;
            hero1.y=allPlayers["player1"].y;
            hero1.health=allPlayers["player1"].health;
            hero2.health=player.health;
            hero2.x=player.xpos;
            hero2.y=player.ypos;     
          
            hero2.name=player.name;
            hero1.name=allPlayers["player1"].name;
            textSize(20);
            fill("red")
            text(player.name,hero2.x,hero2.y+60);    
 
            if(keyCode===LEFT_ARROW)
            {
              player.changePosition(-10,0) 

              hero2.changeAnimation("hero2 lwalk",lwalking)
              hero2.endAnimation=frameCount+10;
            }

            if(keyCode===RIGHT_ARROW)
            {
              player.changePosition(10,0)

              hero2.changeAnimation("hero2 walk",walking)           
              hero2.endAnimation=frameCount+10; 
            }

            if(keyCode===113)
            {
              hero2.changeAnimation("hero2 punch",lpunch)
              hero2.endAnimation=frameCount+10;
              hitman="hero2";
              kickpunch.play() 
            hero2.setCollider("rectangle",-25,-27,10,10)


            }
     
            if(keyCode===101)
            {
              hero2.changeAnimation("hero2 kick",lkick)
              hero2.endAnimation=frameCount+10;   
              hitman="hero2";
              kickpunch.play() 
              hero2.setCollider("rectangle",-30,-40,10,10)


            }

            if(keyCode===101&&hero1.isTouching(hero2)||keyCode===113&&hero1.isTouching(hero2))
            {
              kicksound.play()

              player.changePosition(20,0);
              hero1.changeAnimation("hero recover",recover)
                        
              if(hero1.x<hero2.x)
               {
                player.health-=20;
                player.updateHealth();
               }

                hero1.endAnimation=frameCount+10;

               if(player.health<=10)
               {
                 player.health=0;
                 player.updateHealth();
               }

            }

          if(hero2.health<=0||hero1.health<=0)
          {
            hero1.visible=false
            hero2.visible=false
            gameState=2
            game.update(2)
          }

            keyCode=65;

       }
       this.showHealth();
      hero1.collide(invisibl)
      hero2.collide(invisibl)
      hero1.collide(edges)
  hero2.collide(edges)
  }
}

    showHealth()
    {
      textSize(20);
      fill("blue");
      text(hero1.name,250,100)

      fill("white")
      rect(width/3-200,30,200,20)

      fill("yellow")
      rect(width/3-200,30,hero2.health,20)
    
      textSize(20);
      fill("green");
      text(hero2.name,width/2+150,100)

      fill("white")
      rect(width-500,30,200,20)

      fill("blue")
      rect(width-500,30,hero1.health,20)

    }

    end(){
      // hero1.visible=false

      // hero2.visible=false

     

      trofi.visible=true

      textSize(30)
      fill("red")
      text("Fighting Finish",width/2-100,150);
      textSize(30)
      fill("red")
      text("Press reload button to play again",width/2-50,height/2+250);
      
background(endbg)
      var msg=createElement("h1");
      var msg2=createElement("h1");
      if(hero1.health>hero2.health)
      {
        msg.html(hero2.name+" Winner")
        msg2.html(hero1.name+" Losser")
      }
      else
      {
        msg.html(hero1.name+" Winner")
        msg2.html(hero2.name+" Losser")
      }
      msg.position(displayWidth/2-90,displayHeight/2-200)
      msg2.position(displayWidth/2-90,displayHeight/2-150)
    }
  }