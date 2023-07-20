let gamePattern = [];
let userPattern = [];
let color = ['red', 'green', 'blue', 'yellow'];
let level = 0;
let start = true;



function ComputerTurn() {
    userPattern = [];
    let randomNum = Math.round(Math.random() * 3);
    let computerSelectColor = color[randomNum];
    gamePattern.push(computerSelectColor);
    $('#' + computerSelectColor).fadeIn(100).fadeOut(100).fadeIn(100);
    level++;
    $('#level-title').text('Level ' + level);
    playSound(computerSelectColor);
}

$(document).keydown(function () {
    if (start) {
        ComputerTurn();
        start = false;
    }
})

function playSound(sound) {
    let audio = new Audio('sounds/' + sound + '.mp3');
    audio.play();
}

$('.btn').click(function (data) {
    let colorUserChoose = data.target.id;
    $('#' + colorUserChoose).addClass('pressed');
    setTimeout(function () {
        $('#' + colorUserChoose).removeClass('pressed');
    }, 100)
    userPattern.push(colorUserChoose);
    playSound(colorUserChoose);
    operation(userPattern.length - 1);

})


function operation(levels) {
    if (gamePattern[levels] === userPattern[levels]) {
        if (gamePattern.length === userPattern.length) {
            setTimeout(function () {
                ComputerTurn();
            }, 1000)
        }
    } else {
        $('#level-title').text('Game over, Press any key to restart');
        playSound('wrong');
        $('body').addClass('game-over');
        setTimeout(function () {
            $('body').removeClass('game-over');
        }, 200)
        start = true;
        level = 0;
        gamePattern = [];
    }
}