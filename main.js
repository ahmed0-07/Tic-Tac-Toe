const tictac = {
    curPlayer: 'X',
    grid: Array(9).fill(null),
    gameOver: false,
    buttons: Array,

    init(){
        this.buttons = document.getElementsByClassName("button"); //get all buttons from html
        for(let i = 0; i < 9; i++){
            //add event for all buttons onclick
            this.buttons[i].addEventListener("click", (e) => this.handleClick(i));
        }
    },

    handleClick(i){
        if(this.gameOver || this.grid[i])
            return;

        this.grid[i] = this.curPlayer;
        this.buttons[i].textContent = this.curPlayer;
        this.buttons[i].classList.add("taken");

        const win = this.checkWin(); //check if there is a win combination
        if(win){
            this.gameOver = true;
            this.highlight(win);
        }else if(this.grid.every((player) => player)){ //every place is not null and not win so it is tie
            this.gameOver = true;
        }
        else{
            this.curPlayer = this.curPlayer === "X" ? "O" : "X";
        }
    },


    highlight(win) {
        win.forEach((i) => {
            this.buttons[i].style.color = "blue";
        });
    },

    checkWin() {
        const wins = [
            [0, 1, 2], //row
            [3, 4, 5], //row
            [6, 7, 8], //row
            [0, 3, 6], //column
            [1, 4, 7], //column
            [2, 5, 8], //column
            [0, 4, 8], //dia
            [2, 4, 6], //dia
        ];


        for(let i = 0; i < wins.length; i++){
            let win = wins[i];
            let cnt = 0;
            for(let j = 0; j < 3; j++){
                if(this.grid[win[j]] === this.curPlayer)
                    cnt++;
            }

            if(cnt === 3)
                return win;
        }
    },
}

tictac.init();