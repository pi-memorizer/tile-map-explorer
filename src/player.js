/** @module Player
  * A class representing the player.
  */
export default class Player {
  /** @constructor
    * Constructs a new player instance
    * @param {float} x - the player's x position
    * @param {float} y - the player's y position
    */
  constructor(x, y) {
    this.x = x;
    this.y = y;
	this.dir = 3;
	this.timeLeft = 0;
	this.speed = 3;
	this.spritesheet = new Image(32*4,48*4);
	this.spritesheet.src = "img/player.png";
	global.player = this;
  }

  /** @method update
    * Updates the player
    * @param {double} deltaT - the elapsed time
    * @param {Input} input - the input object
    */
  update(deltaT, input) {
	 if(this.timeLeft<=0) {
		if(input.keyPressed("ArrowLeft"))
		{
			if(global.game.tilemap.layers[0].data[(Math.floor(this.x+.01)/32)-1+global.game.tilemap.width*(Math.floor(this.y+0.1)/32)]!=2)
			{
				this.dir = 2;
				this.timeLeft = 1/this.speed;
			}
		}
		if(input.keyPressed("ArrowRight"))
		{
			if(global.game.tilemap.layers[0].data[(Math.floor(this.x+.01)/32)+1+global.game.tilemap.width*(Math.floor(this.y+0.1)/32)]!=2)
			{
				this.dir = 0;
				this.timeLeft = 1/this.speed;
			}
		}
		if(input.keyPressed("ArrowUp"))
		{
			if(global.game.tilemap.layers[0].data[(Math.floor(this.x+.01)/32)-global.game.tilemap.width+global.game.tilemap.width*(Math.floor(this.y+0.1)/32)]!=2)
			{
				this.dir = 1;
				this.timeLeft = 1/this.speed;
			}
		}
		if(input.keyPressed("ArrowDown"))
		{
			if(global.game.tilemap.layers[0].data[(Math.floor(this.x+.01)/32)+global.game.tilemap.width+global.game.tilemap.width*(Math.floor(this.y+0.1)/32)]!=2)
			{
				this.dir = 3;
				this.timeLeft = 1/this.speed;
			}
		}
	}
	if(this.timeLeft>0)
	{
		let left = deltaT/1000;
		if(left>this.timeLeft) left = this.timeLeft;
		if(this.dir==0)
		{
			this.x += left*32*this.speed;
		} else if(this.dir==1)
		{
			this.y -= left*32*this.speed;
		} else if(this.dir==2)
		{
			this.x -= left*32*this.speed;
		} else {
			this.y += left*32*this.speed;
		}
		this.timeLeft-= deltaT/1000;
	}
  }

  /** @method render
    * Renders the player
    * @param {double} deltaT - elapsed time
    * @param {Context2D} context - the rendering context
    */
  render(deltaT, context) {
	var index = 0;
	if((this.x%32>=8&&this.x%32<24)||(this.y%32>=8&&this.y%32<24))
	{
		if(Math.floor(this.x/32+this.y/32)%2==0) index = 1; else index = 2;
	}
	context.drawImage(this.spritesheet,index*32,this.dir*48,32,48,this.x,this.y-16,32,48);
  }

}
