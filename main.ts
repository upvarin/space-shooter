controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile2 = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        9 9 9 9 9 9 2 2 2 2 2 1 1 1 1 1 
        9 9 9 9 9 9 2 2 2 2 2 1 1 1 1 1 
        9 9 9 9 9 9 2 2 2 2 2 1 1 1 1 1 
        9 9 9 9 9 9 2 2 2 2 2 1 1 1 1 1 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, mySprite, 1000, 30)
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    sprites.destroy(status.spriteAttachedTo())
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -50
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprites.destroy(otherSprite, effects.disintegrate, 500)
    scene.cameraShake(4, 500)
})
let statusbar: StatusBarSprite = null
let i_am_a_bad_guy: Sprite = null
let projectile2: Sprite = null
let mySprite: Sprite = null
effects.starField.startScreenEffect()
mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    9 9 9 9 9 9 9 9 . . . . . . . . 
    9 9 9 9 9 9 9 9 . . . . . . . . 
    9 9 9 9 9 9 9 9 . . . . . . . . 
    9 2 6 9 9 9 9 9 . . . . . . . . 
    9 2 6 6 9 9 9 9 . . . . . . . . 
    9 2 6 6 6 9 9 9 . . . . . . . . 
    9 2 6 6 6 6 9 9 . . . . . . . . 
    9 2 6 6 6 6 6 9 . . . . . . . . 
    9 2 6 6 6 6 6 6 6 . . . . . . . 
    9 2 6 6 6 6 6 9 . . . . . . . . 
    9 2 6 6 6 6 9 9 . . . . . . . . 
    9 2 6 6 6 9 9 9 . . . . . . . . 
    9 2 6 6 9 9 9 9 . . . . . . . . 
    9 9 9 9 9 9 9 9 . . . . . . . . 
    9 9 9 9 9 9 9 9 . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(mySprite, 150, 150)
mySprite.setStayInScreen(true)
info.setLife(10)
let enemyspeed = 20
game.onUpdateInterval(2000, function () {
    i_am_a_bad_guy = sprites.create(img`
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        2 . . . . . . . . . . . . . . 2 
        2 . . . . . . . . . . . . . . 2 
        2 . . 9 . . . . . . . . 9 . . 2 
        2 . . . . . . . . . . . . . . 2 
        2 . . . . . . 9 9 . . . . . . 2 
        2 . . . . . . 9 9 . . . . . . 2 
        2 . . . . . . 9 9 . . . . . . 2 
        2 . . . . 9 9 9 9 9 9 . . . . 2 
        2 . . . . 9 3 3 3 3 9 . . . . 2 
        2 . . . . 9 9 9 9 9 9 . . . . 2 
        2 . . . . . . . . . . . . . . 2 
        2 . . . . . . . . . . . . . . 2 
        2 . . . . . . . . . . . . . . 2 
        2 . . . . . . . . . . . . . . 2 
        2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
        `, SpriteKind.Enemy)
    i_am_a_bad_guy.x = scene.screenWidth()
    i_am_a_bad_guy.vx = 0 - enemyspeed
    i_am_a_bad_guy.y = randint(scene.screenHeight() - 10, 10)
    statusbar = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    statusbar.attachToSprite(i_am_a_bad_guy)
})
