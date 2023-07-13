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
        this.prevSelectedPos = [];
        this.turn = 'W';
        this.enPassant = [];
        this.promoteTo = 'Q';

        // TODO:
        // this.avaliableMoves = [];
    }

    setPromoteTo(piece){
        this.promoteTo = piece;
    }

    getBoard(){
        return this.board;
    }

    selectPiece(xpos, ypos){
        if(this.prevSelectedPos.length === 0){
            if(this.board[xpos][ypos] === ''){
                return false;
            }
            let selectedColor = this.board[xpos][ypos][0];
            if(selectedColor === this.turn){
                this.prevSelectedPos = [xpos, ypos];
            }
            return false;
        }
        let selectedColor = this.board[this.prevSelectedPos[0]][this.prevSelectedPos[1]][0];
        if(selectedColor === this.board[xpos][ypos][0]){
            if(this.prevSelectedPos[0] === xpos && this.prevSelectedPos[1] === ypos){
                this.prevSelectedPos = [];
                return false;
            }
            this.prevSelectedPos = [xpos, ypos];
            return false;
        }
        let moveResult = this.move(xpos, ypos);
        this.prevSelectedPos = [];

        return moveResult;
    }

    // TODO:
    //  After move piece from/to position of rook, or king,
    //      Set castle to false.
    move(tarX, tarY){
        const [curX, curY] = this.prevSelectedPos;
        
        // let curColor = this.board[curX][curY][0];
        let curPiece = this.board[curX][curY][1];
        let result = false;
        switch(curPiece){
            case 'P':
                result = this.movePawn(tarX, tarY);
                break;
            case 'R':
                result = this.moveRook(tarX, tarY);
                break;
            case 'N':
                result = this.moveKnight(tarX, tarY);
                break;
            case 'B':
                result = this.moveBishop(tarX, tarY);
                break;
            case 'Q':
                result = this.moveRook(tarX, tarY) || this.moveBishop(tarX, tarY);
                break;
            case 'K':
                result = this.moveKing(tarX, tarY);
                break;
            default:
                console.log("DEFAULT");
                result = false;
        }
        if(result){
            if(this.turn === 'W'){
                this.turn = 'B';
            }
            else{
                this.turn = 'W';
            }
            if(curPiece != 'P'){
                this.enPassant = [];
            }
        }
        return result;
    }

    movePawn(tarX, tarY){
        const [curX, curY] = this.prevSelectedPos;
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
            if(rowDiff !== 1) return false;
            // en passant
            if(this.board[tarX][tarY] === ''){
                if(curColor === 'W'){
                    if(this.enPassant && this.enPassant[0] === tarX + 1 && this.enPassant[1] === tarY){
                        this.board[this.enPassant[0]][this.enPassant[1]] = '';
                        this.board[tarX][tarY] = this.board[curX][curY];
                        this.board[curX][curY] = '';
                        return true;
                    }
                }
                else{
                    if(this.enPassant && this.enPassant[0] === tarX - 1 && this.enPassant[1] === tarY){
                        this.board[this.enPassant[0]][this.enPassant[1]] = '';
                        this.board[tarX][tarY] = this.board[curX][curY];
                        this.board[curX][curY] = '';
                        return true;
                    }
                }
                return false;
            }
            this.board[tarX][tarY] = this.board[curX][curY];
            this.board[curX][curY] = '';
            if(tarX === 0 || tarX === 7){ // Promotion
                this.board[tarX][tarY] = curColor + this.promoteTo;
            }
            this.enPassant = [];
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
                this.enPassant = [tarX, tarY];
                this.board[tarX][tarY] = this.board[curX][curY];
                this.board[curX][curY] = '';
                return true;
            }
            else{
                return false;
            }
        }

        this.board[tarX][tarY] = this.board[curX][curY];
        this.board[curX][curY] = '';
        if(tarX === 0 || tarX === 7){ // Promotion
            this.board[tarX][tarY] = curColor + this.promoteTo;
        }
        this.enPassant = [];
        return true;
    }

    moveRook(tarX, tarY){
        const [curX, curY] = this.prevSelectedPos;
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
        const [curX, curY] = this.prevSelectedPos;
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
        const [curX, curY] = this.prevSelectedPos;
        let rowDiff = Math.abs(tarX - curX);
        let colDiff = Math.abs(tarY - curY);
        if(rowDiff !== colDiff){
            return false;
        }
        let xDir, yDir;
        if(tarX > curX){
            xDir = 1;
        }
        else{
            xDir = -1;
        }
        if(tarY > curY){
            yDir = 1;
        }
        else{
            yDir = -1;
        }
        let x = curX + xDir, y = curY + yDir;
        while(x !== tarX){
            if(this.board[x][y] !== ''){
                return false;
            }
            x += xDir;
            y += yDir;
        }
        
        this.board[tarX][tarY] = this.board[curX][curY];
        this.board[curX][curY] = '';
        return true;
    }

    moveKing(tarX, tarY){
        const [curX, curY] = this.prevSelectedPos;
        let rowDiff = Math.abs(tarX - curX);
        let colDiff = Math.abs(tarY - curY);
        if(rowDiff > 1 || colDiff > 1){
            return false;
        }
        
        this.board[tarX][tarY] = this.board[curX][curY];
        this.board[curX][curY] = '';
        return true;
    }

    // Test if the king is under check, by provided king position
    testUnderCheck(posx, posy){
        let kingColor = this.board[posx][posy][0];
        
        // pawn:
        if(kingColor === 'W'){

            if(posx){

            }
        }
        
        
        return false;
    }

    // Test if the movement is valid or not.
    //      - currently only test if under check
    testMovement(curX, curY, tarX, tarY){
        
    }

}

export default ChessboardNode;

