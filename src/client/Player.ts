module Roomiverse {
	export class Player {
		context: any
		group: Phaser.Group
		graphics: Phaser.Graphics

		radius: number = 43
		velocity: Point = Point.create()
		inventory: Inventory

		constructor(context: any, group: Phaser.Group) {
			this.context = context

			this.group = this.context.add.group(group)
			this.group.x = this.context.world.centerX
			this.group.y = this.context.world.centerY

			this.graphics = this.context.add.graphics(0, 0, this.group)
			this.graphics.beginFill(0xffffff, 1)
			this.graphics.drawCircle(0, 0, this.radius)

			this.inventory = new Inventory(context, group)
		}

		tick(seconds: number) {
			this.velocity.scale(Math.pow(0.987, 1000 * seconds))
			this.moveBy(this.velocity.scaled(seconds))

			// keep player in room
			const leeway = this.radius / 2 + 3
			if(this.group.x < 400 + leeway) { this.group.x = 400 + leeway }
			if(this.group.y < 120 + leeway) { this.group.y = 120 + leeway }
			if(this.group.x > 880 - leeway) { this.group.x = 880 - leeway }
			if(this.group.y > 600 - leeway) { this.group.y = 600 - leeway }
		}

		accelBy(p: Point) {
			this.velocity.translateBy(p)
		}

		moveBy(p: Point) {
			this.group.x += p.x
			this.group.y += p.y
		}
	}
}
