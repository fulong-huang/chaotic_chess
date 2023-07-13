class ChessboardNode{
    constructor(board = [
        ['BR', 'BN', 'BB', 'BQ', 'BK', 'BB', 'BN', 'BR'],
        // ['BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP'],
        ['BP', 'BP', 'BP', '', '', '', '', ''],
        ['',   '',   '',   '',   '',   '',   '',   ''],
        ['',   '',   '',   '',   '',   '',   '',   ''],
        ['',   '',   '',   '',   '',   '',   '',   ''],
        ['',   '',   '',   '',   '',   '',   '',   ''],
        ['WP', 'WP', 'WP', '', '', '', '', ''],
        // ['WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP'],
        ['WR', 'WN', 'WB', 'WQ', 'WK', 'WB', 'WN', 'WR'],
    ]){
        this.board = board;
        this.selected = [];
        // console.log("NEW CHESSBOARD");
    }

    getBoard(){
        return this.board;
    }

    move(tarX, tarY){
        const [curX, curY] = this.selected;
        
        // let curColor = this.board[curX][curY][0];
        let curPiece = this.board[curX][curY][1];
        switch(curPiece){
            case 'P':
                this.movePawn(tarX, tarY);
                break;
            case 'R':
                this.moveRook(tarX, tarY);
                break;
            case 'N':
                this.moveKnight(tarX, tarY);
                break;
            case 'B':
                this.moveBishop(tarX, tarY);
                break;
            case 'Q':
                // break;
            case 'K':
                // break;
            default:
                console.log("DEFAULT");
                this.board[tarX][tarY] = this.board[curX][curY];
                this.board[curX][curY] = '';
        }
    }

    selectPiece(xpos, ypos){
        if(this.selected.length === 0){
            if(this.board[xpos][ypos] !== ''){
                this.selected = [xpos, ypos];
                console.log(`Select: ${this.selected}`);
            }
            return false;
        }
        let selectedColor = this.board[this.selected[0]][this.selected[1]][0];
        if(selectedColor === this.board[xpos][ypos][0]){
            // Do not take your own piece,
            //  select the second piece instead
            this.selected = [xpos, ypos];
            console.log(`Select: ${this.selected}`);
            return false;
        }
        this.move(xpos, ypos);
        this.selected = [];

        return true;
    }

    movePawn(tarX, tarY){
        const [curX, curY] = this.selected;
        let rowDiff = tarX - curX;
        let curColor = this.board[curX][curY][0];
        if(curColor === 'W'){
            rowDiff = -rowDiff;
        }
        let colDiff = Math.abs(tarY - curY);
        if(colDiff >= 2 || rowDiff >= 3 || rowDiff <= 0){
            return false;
        }

        if(colDiff === 1){ // attack
            if(rowDiff !== 1 || this.board[tarX][tarY] === ''){
                // TODO: 
                //  enpissant
                //  implement last
                return false;
            }
            this.board[tarX][tarY] = this.board[curX][curY];
            this.board[curX][curY] = '';
            if(tarX === 0 || tarX === 7){ // Promotion
                this.board[tarX][tarY] = curColor+"Q";
            }
            return true;
        }

        //move 1 
        if(rowDiff === 1){
            if(this.board[tarX][tarY] !== ''){
                return false;
            }
        }

        //move 2 in beginning
        if(rowDiff === 2){
            if((curColor === 'W' && curX === 6) ||
                (curColor === 'B' && curX === 1)){

            }
            else{
                return false;
            }
        }

        this.board[tarX][tarY] = this.board[curX][curY];
        this.board[curX][curY] = '';
        if(tarX === 0 || tarX === 7){ // Promotion
            this.board[tarX][tarY] = curColor+"Q";
        }
        return true;
    }

    moveRook(tarX, tarY){
        const [curX, curY] = this.selected;
        if(curX !== tarX && curY !== tarY){
            return false;
        }
        let start, end;
        if(curX === tarX){
            if(curY > tarY){
                start = tarY;
                end = curY;
            }
            else{
                start = curY;
                end = tarY;
            }
            for(let i = start + 1; i < end; i++){
                if(this.board[curX][i] !== ''){
                    return false;
                }
            }
        }
        else{
            if(curX > tarX){
                start = tarX;
                end = curX;
            }
            else{
                start = curX;
                end = tarX;
            }
            for(let i = start + 1; i < end; i++){
                if(this.board[i][curY] !== ''){
                    return false;
                }
            }
        }
        this.board[tarX][tarY] = this.board[curX][curY];
        this.board[curX][curY] = '';
        return true;
    }

    moveKnight(tarX, tarY){
        const [curX, curY] = this.selected;
        let rowDiff = Math.abs(tarX - curX);
        let colDiff = Math.abs(tarY - curY);
        if((rowDiff === 1 && colDiff === 2) ||
        (rowDiff === 2 && colDiff === 1)){
            this.board[tarX][tarY] = this.board[curX][curY];
            this.board[curX][curY] = '';
            return true;
        }
        // for(let v = -1; v < 2; v += 2){
        //     for(let h = -1; h < 2; h+= 2){
        //         let x, y;
        //         x = curX + (v * 1);
        //         y = curY + (h * 2);
        //         console.log(`X: ${x}, Y: ${y}`);

        //         x = curX + (v * 2);
        //         y = curY + (h * 1);
        //         console.log(`X: ${x}, Y: ${y}`);
        //     }
        // }
        return false;
    }

    moveBishop(tarX, tarY){
        const [curX, curY] = this.selected;
        let rowDiff = Math.abs(tarX - curX);
        let colDiff = Math.abs(tarY - curY);
    }

}

export default ChessboardNode;

