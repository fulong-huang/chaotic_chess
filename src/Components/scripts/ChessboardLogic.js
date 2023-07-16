class ChessboardNode{
    constructor(board = [
        ['BR', 'BN', 'BB', 'BQ', 'BK', 'BB', 'BN', 'BR'],
        // ['BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP'],
        ['BP', 'BP', 'BP', '', '', '', 'WP', 'WP'],
        ['',   '',   '',   '',   '',   '',   '',   ''],
        ['',   '',   '',   'WP',   '',   '',   '',   ''],
        ['',   '',   '',   '',   '',   '',   '',   ''],
        ['',   '',   '',   '',   '',   '',   '',   ''],
        ['WP', 'WP', 'WP', '', '', '', 'BP', 'BP'],
        // ['WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP'],
        ['WR', 'WN', 'WB', 'WQ', 'WK', 'WB', 'WN', 'WR'],
    ]){
        this.board = board;
        this.prevSelectedPos = [];
        this.turn = 'W';
        this.enPassant = [];
        this.promoteTo = 'Q';
        this.avaliableMoves = new Map();
        this.findAllValidMoves();
    }

    setPromoteTo(piece){
        this.promoteTo = piece;
    }

    getBoard(){
        return this.board;
    }

    getValidMovements(xpos, ypos){
        let idx = xpos * 8 + ypos;
        return this.avaliableMoves.get(idx) || [];
    }

    findAllValidMoves(){
        this.avaliableMoves.clear();
        console.log("----------EMPTY MOVES----------");
        for(let i = 0; i < 8; i++){
            for(let j = 0; j < 8; j++){
                if(this.board[i][j] === ''){
                    continue;
                }
                let currColor = this.board[i][j][0];
                if(currColor !== this.turn){
                    continue;
                }
                let movesFound = [];
                switch(this.board[i][j][1]){
                    case 'P':
                        if(this.checkPawnMovement(i, j, i + 1, j)){
                            movesFound.push([i + 1, j]);
                        }
                        if(this.checkPawnMovement(i, j, i - 1, j)){
                            movesFound.push([i - 1, j]);
                        }
                        if(this.checkPawnMovement(i, j, i + 2, j)){
                            movesFound.push([i + 2, j]);
                        }
                        if(this.checkPawnMovement(i, j, i - 2, j)){
                            movesFound.push([i - 2, j]);
                        }
                        if(this.checkPawnMovement(i, j, i + 1, j + 1)){
                            movesFound.push([i + 1, j + 1]);
                        }
                        if(this.checkPawnMovement(i, j, i - 1, j + 1)){
                            movesFound.push([i - 1, j + 1]);
                        }
                        if(this.checkPawnMovement(i, j, i + 1, j - 1)){
                            movesFound.push([i + 1, j - 1]);
                        }
                        if(this.checkPawnMovement(i, j, i - 1, j - 1)){
                            movesFound.push([i - 1, j - 1]);
                        }
                        break;
                    case 'N':
                        for(let v = -1; v < 2; v += 2){
                            for(let h = -1; h < 2; h+= 2){
                                let x, y;
                                x = i + (v * 1);
                                y = j + (h * 2);
                                if(this.checkKnightMovement(i, j, x, y)){
                                    movesFound.push([x, y]);
                                }
                
                                x = i + (v * 2);
                                y = j + (h * 1);
                                if(this.checkKnightMovement(i, j, x, y)){
                                    movesFound.push([x, y]);
                                }
                            }
                        }
                        break;
                    case 'Q':
                    case 'B':
                        let max = i < j? i : j;
                        for(let diff = 1; diff <= max; diff++){
                            let x = i - diff, y = j - diff;
                            if(this.board[x][y] !== ''){
                                if(this.board[x][y][0] !== this.turn){
                                    if(this.checkBishopMovement(i,j,x,y)){
                                        movesFound.push([x,y]);
                                    }
                                }
                                break;
                            }
                            if(this.checkBishopMovement(i,j,x,y)){
                                movesFound.push([x,y]);
                            }
                        }

                        max = i < 7 - j? i : 7 - j;
                        for(let diff = 1; diff <= max; diff++){
                            let x = i - diff, y = j + diff;
                            if(this.board[x][y] !== ''){
                                if(this.board[x][y][0] !== this.turn){
                                    if(this.checkBishopMovement(i,j,x,y)){
                                        movesFound.push([x,y]);
                                    }
                                }
                                break;
                            }
                            if(this.checkBishopMovement(i,j,x,y)){
                                movesFound.push([x,y]);
                            }
                        }

                        max = 7 - i < j? 7 - i : j;
                        for(let diff = 1; diff <= max; diff++){
                            let x = i + diff, y = j - diff;
                            if(this.board[x][y] !== ''){
                                if(this.board[x][y][0] !== this.turn){
                                    if(this.checkBishopMovement(i,j,x,y)){
                                        movesFound.push([x,y]);
                                    }
                                }
                                break;
                            }
                            if(this.checkBishopMovement(i,j,x,y)){
                                movesFound.push([x,y]);
                            }
                        }

                        max = 7 - i < 7 - j? 7 - i : 7 - j;
                        for(let diff = 1; diff <= max; diff++){
                            let x = i + diff, y = j + diff;
                            if(this.board[x][y] !== ''){
                                if(this.board[x][y][0] !== this.turn){
                                    if(this.checkBishopMovement(i,j,x,y)){
                                        movesFound.push([x,y]);
                                    }
                                }
                                break;
                            }
                            if(this.checkBishopMovement(i,j,x,y)){
                                movesFound.push([x,y]);
                            }
                        }
                                                
                        if(this.board[i][j][1] === 'B'){
                            break;
                        }
                    case 'R':
                        for(let x = i - 1; x >= 0; x--){
                            if(this.board[x][j] !== ''){
                                if(this.board[x][j][0] !== this.turn){
                                    if(this.checkRookMovement(i, j, x, j)){
                                        movesFound.push([x, j]);
                                    }
                                }
                                break;
                            }
                            if(this.checkRookMovement(i, j, x, j)){
                                movesFound.push([x, j]);
                            }
                        }
                        for(let x = i + 1; x < 8; x++){
                            if(this.board[x][j] !== ''){
                                if(this.board[x][j][0] !== this.turn){
                                    if(this.checkRookMovement(i, j, x, j)){
                                        movesFound.push([x, j]);
                                    }
                                }
                                break;
                            }
                            if(this.checkRookMovement(i, j, x, j)){
                                movesFound.push([x, j]);
                            }
                        }

                        for(let y = j - 1; y >= 0; y--){
                            if(this.board[i][y] !== ''){
                                if(this.board[i][y][0] !== this.turn){
                                    if(this.checkRookMovement(i, j, i, y)){
                                        movesFound.push([i, y]);
                                    }
                                }
                                break;
                            }
                            if(this.checkRookMovement(i, j, i, y)){
                                movesFound.push([i, y]);
                            }
                        }
                        for(let y = j + 1; y < 8; y++){
                            if(this.board[i][y] !== ''){
                                if(this.board[i][y][0] !== this.turn){
                                    if(this.checkRookMovement(i, j, i, y)){
                                        movesFound.push([i, y]);
                                    }
                                }
                                break;
                            }
                            if(this.checkRookMovement(i, j, i, y)){
                                movesFound.push([i, y]);
                            }
                        }
                        break;
                    case 'K':
                        for(let x = i - 1; x < i + 2; x++){
                            if(x < 0 || x >= 8){
                                continue;
                            }
                            for(let y = j - 1; y < j + 2; y++){
                                if(y < 0 || y >= 8){
                                    continue;
                                }
                                if(this.board[x][y] === '' || this.board[x][y][0] !== this.turn){
                                    if(this.checkKingMovement(i, j, x, y)){
                                        movesFound.push([x, y]);
                                    }
                                }
                            }
                        }
                        break;
                    default:
                        alert("Case not found");
                }
                if(movesFound.length !== 0){
                    this.avaliableMoves.set(i*8+ j, movesFound);
                }
            }
        }
        console.log("========= King is currently in check: \n ======", this.kingUnderCheck());

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

        let moveIdx = this.prevSelectedPos[0]*8+this.prevSelectedPos[1];
        let isValidMove =
            this.avaliableMoves.get(moveIdx) &&
            this.avaliableMoves.get(moveIdx).some(inner =>
                inner.every((element, index) => element === [xpos, ypos][index])
        );

        let moveResult = false;
        if(isValidMove){
            console.log("MOVE RESULT");
            moveResult = this.move(xpos, ypos);
        }
        else{
            console.log(xpos, ypos, moveIdx, this.avaliableMoves);
        }

        if(moveResult){
            this.findAllValidMoves();
        }
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
            if(curPiece !== 'P'){
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

    checkPawnMovement(curX, curY, tarX, tarY){
        if(tarX >= 8 || tarY >= 8 || tarX < 0 || tarY < 0){
            return false;
        }
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
                        // Try the move:
                        let pieceTaken = this.board[tarX][tarY];
                        
                        this.board[this.enPassant[0]][this.enPassant[1]] = '';
                        this.board[tarX][tarY] = this.board[curX][curY];
                        this.board[curX][curY] = '';
                        // Test if in check:
                        let kingIsUnderCheck = this.kingUnderCheck();
                        // Undo Move
                        this.board[this.enPassant[0]][this.enPassant[1]] = 'BP';
                        this.board[tarX][tarY] = pieceTaken;
                        this.board[curX][curY] = 'WP';
                        // only return true if king was not under check.
                        return !kingIsUnderCheck;
                    }
                }
                else{
                    if(this.enPassant && this.enPassant[0] === tarX - 1 && this.enPassant[1] === tarY){
                        // Try the move:
                        let pieceTaken = this.board[tarX][tarY];
                        
                        this.board[this.enPassant[0]][this.enPassant[1]] = '';
                        this.board[tarX][tarY] = this.board[curX][curY];
                        this.board[curX][curY] = '';
                        // Test if in check:
                        let kingIsUnderCheck = this.kingUnderCheck();
                        // Undo Move
                        this.board[this.enPassant[0]][this.enPassant[1]] = 'WP';
                        this.board[tarX][tarY] = pieceTaken;
                        this.board[curX][curY] = 'BP';
                        // only return true if king was not under check.
                        return !kingIsUnderCheck;
                    }
                }
                return false;
            }
            let pieceTaken = this.board[tarX][tarY];

            this.board[tarX][tarY] = this.board[curX][curY];
            this.board[curX][curY] = '';
            // Test if in check:
            let kingIsUnderCheck = this.kingUnderCheck();

            this.board[tarX][tarY] = pieceTaken;
            this.board[curX][curY] = this.turn + 'P';
            return !kingIsUnderCheck;
        }

        //move 1 
        if(rowDiff === 1){
            if(this.board[tarX][tarY] !== ''){
                return false;
            }
            else{
                this.board[tarX][tarY] = this.board[curX][curY];
                this.board[curX][curY] = '';
                // Test if in check:
                let kingIsUnderCheck = this.kingUnderCheck();
    
                this.board[tarX][tarY] = '';
                this.board[curX][curY] = this.turn + 'P';
                return !kingIsUnderCheck;
            }
        }

        //move 2 in beginning
        if(rowDiff === 2){
            if(this.board[tarX][tarY] !== ''){
                return false;
            }
            if((curColor === 'W' && curX === 6) ||
            (curColor === 'B' && curX === 1)){
                let middleRow = (curX + tarX) / 2;
                if(this.board[middleRow][tarY] !== ''){
                    return false;
                }
                this.board[tarX][tarY] = this.board[curX][curY];
                this.board[curX][curY] = '';
                // Test if in check:
                let kingIsUnderCheck = this.kingUnderCheck();
    
                this.board[tarX][tarY] = '';
                this.board[curX][curY] = this.turn + 'P';
                return !kingIsUnderCheck;
            }
            else{
                return false;
            }
        }
        return false;
    }

    // TODO: 
    //  More invalid moves
    checkKnightMovement(curX, curY, tarX, tarY){
        if(0 > tarX || tarX >= 8 || 0 > tarY || tarY >= 8){
            return false;
        }
        if(this.board[tarX][tarY] !== '' && this.board[tarX][tarY][0] === this.turn){
            return false;
        }
        // save pieces
        let targetPiece = this.board[tarX][tarY];
        let currPiece = this.board[curX][curY];
        // try move
        this.board[tarX][tarY] = currPiece;
        this.board[curX][curY] = '';
        // check if checked
        let kingIsUnderCheck = this.kingUnderCheck();
        // undo move
        this.board[tarX][tarY] = targetPiece;
        this.board[curX][curY] = currPiece;
        return !kingIsUnderCheck;
    }

    checkBishopMovement(curX, curY, tarX, tarY){
        // no need to check bound as all values will be valid.
        let targetPiece = this.board[tarX][tarY];
        let currPiece = this.board[curX][curY];
        this.board[tarX][tarY] = currPiece;
        this.board[curX][curY] = '';
        let kingIsUnderCheck = this.kingUnderCheck();
        this.board[tarX][tarY] = targetPiece;
        this.board[curX][curY] = currPiece;
        return !kingIsUnderCheck;

    }

    checkRookMovement(curX, curY, tarX, tarY){
        // no need to check bound as all values will be valid.
        let targetPiece = this.board[tarX][tarY];
        let currPiece = this.board[curX][curY];
        this.board[tarX][tarY] = currPiece;
        this.board[curX][curY] = '';
        let kingIsUnderCheck = this.kingUnderCheck();
        this.board[tarX][tarY] = targetPiece;
        this.board[curX][curY] = currPiece;
        return !kingIsUnderCheck;

    }

    checkKingMovement(curX, curY, tarX, tarY){
        let targetPiece = this.board[tarX][tarY];
        let currPiece = this.board[curX][curY];
        this.board[tarX][tarY] = currPiece;
        this.board[curX][curY] = '';
        let kingIsUnderCheck = this.kingUnderCheck();
        this.board[tarX][tarY] = targetPiece;
        this.board[curX][curY] = currPiece;
        return !kingIsUnderCheck;
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

    kingUnderCheck(){
        // find king's position:
        let kingx = -1, kingy = -1;
        for(let idx = 0; idx < 64; idx++){
            let i = Math.floor(idx / 8), j = idx % 8;
            if(this.board[i][j] !== '' && this.board[i][j] === this.turn + 'K'){
                kingx = i;
                kingy = j;
                break;
            }
        }
        // Targeted by Bishop or Queen
        {
        let max = kingx < kingy? kingx : kingy;
        for(let diff = 1; diff <= max; diff++){
            let currPiece = this.board[kingx - diff][kingy - diff];
            if(currPiece === ''){
                continue;
            }
            if(currPiece[0] === this.turn ||
            (currPiece[1] !== 'B' && currPiece[1] !== 'Q')){
                break;
            }
            return true;
        }
        max = kingx < 7 - kingy? kingx : 7 - kingy;
        for(let diff = 1; diff <= max; diff++){
            let currPiece = this.board[kingx - diff][kingy + diff];
            if(currPiece === ''){
                continue;
            }
            if(currPiece[0] === this.turn ||
            (currPiece[1] !== 'B' && currPiece[1] !== 'Q')){
                break;
            }
            return true;
        }
        max = 7 - kingx < kingy? 7 - kingx : kingy;
        for(let diff = 1; diff <= max; diff++){
            let currPiece = this.board[kingx + diff][kingy - diff];
            if(currPiece === ''){
                continue;
            }
            if(currPiece[0] === this.turn ||
            (currPiece[1] !== 'B' && currPiece[1] !== 'Q')){
                break;
            }
            return true;
        }
        max = 7 - kingx < 7 - kingy? 7 - kingx : 7 - kingy;
        for(let diff = 1; diff <= max; diff++){
            let currPiece = this.board[kingx + diff][kingy + diff];
            if(currPiece === ''){
                continue;
            }
            if(currPiece[0] === this.turn ||
            (currPiece[1] !== 'B' && currPiece[1] !== 'Q')){
                break;
            }
            return true;
        }
        }

        // Targeted by Rook or Queen
        {
            for(let x = kingx - 1; x >= 0; x--){
                if(this.board[x][kingy] === ''){
                    continue;
                }
                let currPiece = this.board[x][kingy];
                if(currPiece[0] === this.turn || (currPiece[1] !== 'R' && currPiece[1] !== 'Q')){
                    break;
                }
                return true;
            }
            for(let x = kingx + 1; x < 8; x++){
                if(this.board[x][kingy] === ''){
                    continue;
                }
                let currPiece = this.board[x][kingy];
                if(currPiece[0] === this.turn || (currPiece[1] !== 'R' && currPiece[1] !== 'Q')){
                    break;
                }
                return true;
            }
            for(let y = kingy - 1; y >= 0; y--){
                if(this.board[kingx][y] === ''){
                    continue;
                }
                let currPiece = this.board[kingx][y];
                if(currPiece[0] === this.turn || (currPiece[1] !== 'R' && currPiece[1] !== 'Q')){
                    break;
                }
                return true;
            }
            for(let y = kingy + 1; y < 8; y++){
                if(this.board[kingx][y] === ''){
                    continue;
                }
                let currPiece = this.board[kingx][y];
                if(currPiece[0] === this.turn || (currPiece[1] !== 'R' && currPiece[1] !== 'Q')){
                    break;
                }
                return true;
            }
        }

        // Targeted by Pawn
        {
        if(this.turn === 'B'){
            let x = kingx + 1;
            let y = kingy - 1;
            if(x < 8){
                if(y >= 0 && this.board[x][y] === 'WP'){
                    return true;
                }
                y = kingy + 1;
                if(y < 8 && this.board[x][y] === 'WP'){
                    return true;
                }
            }
        }
        else{
            let x = kingx - 1;
            let y = kingy - 1;
            if(x >= 0){
                if(y >= 0 && this.board[x][y] === 'BP'){
                    return true;
                }
                y = kingy + 1;
                if(y < 8 && this.board[x][y] === 'BP'){
                    return true;
                }
            }
        }
        }

        // Targeted by Knight
        {
        for(let v = -1; v < 2; v += 2){
            for(let h = -1; h < 2; h+= 2){
                let x, y;
                x = kingx + (v * 1);
                y = kingy + (h * 2);
                if(x > 0 && x < 8 && y > 0 && y < 8){
                    if(this.board[x][y] !== '' && this.board[x][y][0] !== this.turn && this.board[x][y][1] === 'N'){
                        return true;
                    }
                }
                x = kingx + (v * 2);
                y =  + (h * 1);
                if(x > 0 && x < 8 && y > 0 && y < 8){
                    if(this.board[x][y] !== '' && this.board[x][y][0] !== this.turn && this.board[x][y][1] === 'N'){
                        return true;
                    }
                }
            }
        }
        }
        
        // Targeted by King
        for(let x = kingx - 1; x < kingx + 2; x++){
            if(x < 0 || x >= 8){
                continue;
            }
            for(let y = kingy - 1; y < kingy + 2; y++){
                if(y < 0 || y >= 8 ||
                    (kingx === x && kingy === y)){
                    continue;
                }
                if(this.board[x][y] !== '' && this.board[x][y][1] === 'K'){
                    return true;
                }
            }
        }

        return false;
    }

}

export default ChessboardNode;

