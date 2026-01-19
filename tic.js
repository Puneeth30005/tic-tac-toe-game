let boxes=document.querySelectorAll(".box");
let reset=document.querySelector(".reset");
let turnContainer=document.querySelector(".turn-details");
let winModel=document.querySelector(".model");
let winMessageContent=document.querySelector(".winmessagecontent");
let playbutton=document.querySelector(".Play-Again");
const ting=new Audio('ting.mp3.wav');
const winSound=new Audio('gameover.mp3.wav');
const drawSound=new Audio('punch.mp3.mp3');
let turn='X';
let isgameover=false;


const changeTurn = () => {
    turn = turn === "X" ? "0" : "X";
}

const checkWin = () => {
    const win = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];
    for (let i=0;i<win.length;i++) {
        let indexes=win[i];
        if(
            boxes[indexes?.[0]].innerHTML === boxes[indexes?.[1]].innerHTML &&
            boxes[indexes?.[1]].innerHTML === boxes[indexes?.[2]].innerHTML &&
            boxes[indexes?.[0]].innerHTML !== ''
        ) {
            let winner=boxes[indexes?.[0]].innerHTML;
            turnContainer.innerHTML = `${winner} has won!`;
            isgameover=true;
            winSound.play();
            winMessageContent.innerHTML = `Player ${winner} wins!`;
            winModel.style.display = 'flex';
            playbutton.addEventListener('click', resetFuntion);
        }
    }


}

for(let i=0;i<boxes.length;i++) {
    boxes[i].addEventListener(`click`, (e) => {
        if(e.target.innerHTML === '' && !isgameover) {
            e.target.innerHTML = turn;
            changeTurn();
            turnContainer.innerHTML = `Turn for ${turn}`;
            ting.play();
            checkWin();
            checkDraw();

        }
    });
}
const resetFuntion = () => {
    for (let i=0;i<boxes.length;i++) {
        boxes[i].innerHTML = '';
    }
    turn = 'X';
    isgameover = false;
    turnContainer.innerHTML = `Turn for X`;
    winModel.style.display = 'none';
}
reset.addEventListener('click', () => {
    resetFuntion();
});

const checkDraw = () => {
    let anyBlocksEmpty = false;
    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].innerHTML === '') {
            anyBlocksEmpty = true;
            break;
        }
    }
    if(anyBlocksEmpty) {
        return ;
    }
    if(!anyBlocksEmpty && !isgameover) {
        winMessageContent.innerHTML = `It's a Draw!`;
            winModel.style.display = 'flex';
            playbutton.addEventListener('click', resetFuntion);
            drawSound.play();
    }
}