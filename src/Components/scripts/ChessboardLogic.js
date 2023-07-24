class ChessboardNode{
    constructor(board = [
        ['BR', 'BN', 'BB', 'BQ', 'BK', '', '', 'BR'],
        // ['BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP'],
        ['BP', 'BP', 'BP', '', '', '', '', ''],
        ['',   '',   '',   '',   '',   '',   '',   ''],
        ['',   '',   '',   'WP',   '',   '',   '',   ''],
        ['',   '',   '',   '',   '',   '',   '',   ''],
        ['',   '',   '',   '',   '',   '',   '',   ''],
        ['WP', 'WP', 'WP', '', '', '', '', ''],
        ['WR', 'WN', 'WB', 'WQ', 'WK', '', '', 'WR'],
        // ['WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP'],
        // ['WR', 'WN', 'WB', 'WQ', 'WK', 'WB', 'WN', 'WR'],
    ]){
        this.board = board;
        this.prevSelectedPos = [];
        this.turn = 'W';
        this.enPassant = [];
        this.promoteTo = 'Q';
        this.avaliableMoves = new Map();
        this.castles = [true, true, true, true];
        this.findAllValidMoves();
    }

    setBoard(){
        
    }

    getBoard(){
        return {
            
        }
        //ok just get board
         
        // return object contains{
        //      board, 
        //      turn,
        //      en passant,
        //      4 castles,
        // }
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
                    if(this.checkPawnMovement(kingx, kingy, i, j, i + 1, j)){
                        movesFound.push([i + 1, j]);
                    }
                    if(this.checkPawnMovement(kingx, kingy, i, j, i - 1, j)){
                        movesFound.push([i - 1, j]);
                    }
                    if(this.checkPawnMovement(kingx, kingy, i, j, i + 2, j)){
                        movesFound.push([i + 2, j]);
                    }
                    if(this.checkPawnMovement(kingx, kingy, i, j, i - 2, j)){
                        movesFound.push([i - 2, j]);
                    }
                    if(this.checkPawnMovement(kingx, kingy, i, j, i + 1, j + 1)){
                        movesFound.push([i + 1, j + 1]);
                    }
                    if(this.checkPawnMovement(kingx, kingy, i, j, i - 1, j + 1)){
                        movesFound.push([i - 1, j + 1]);
                    }
                    if(this.checkPawnMovement(kingx, kingy, i, j, i + 1, j - 1)){
                        movesFound.push([i + 1, j - 1]);
                    }
                    if(this.checkPawnMovement(kingx, kingy, i, j, i - 1, j - 1)){
                        movesFound.push([i - 1, j - 1]);
                    }
                    break;
                case 'N':
                    for(let v = -1; v < 2; v += 2){
                        for(let h = -1; h < 2; h+= 2){
                            let x, y;
                            x = i + (v * 1);
                            y = j + (h * 2);
                            if( 0 <= x && x < 8 && 0 <= y && y < 8 &&
                                this.turn !== this.board[x][y][0] &&
                                this.checkBasicMovement(kingx, kingy, i, j, x, y)){
                                movesFound.push([x, y]);
                            }
            
                            x = i + (v * 2);
                            y = j + (h * 1);
                            if( 0 <= x && x < 8 && 0 <= y && y < 8 &&
                                this.turn !== this.board[x][y][0] &&
                                this.checkBasicMovement(kingx, kingy, i, j, x, y)){
                                movesFound.push([x, y]);
                            }
                        }
                    }
                    break;
                case 'Q':
                case 'B':{
                    let max = i < j? i : j;
                    for(let diff = 1; diff <= max; diff++){
                        let x = i - diff, y = j - diff;
                        if(this.board[x][y] !== ''){
                            if(this.board[x][y][0] !== this.turn){
                                if(this.checkBasicMovement(kingx, kingy, i,j,x,y)){
                                    movesFound.push([x,y]);
                                }
                            }
                            break;
                        }
                        if(this.checkBasicMovement(kingx, kingy, i,j,x,y)){
                            movesFound.push([x,y]);
                        }
                    }

                    max = i < 7 - j? i : 7 - j;
                    for(let diff = 1; diff <= max; diff++){
                        let x = i - diff, y = j + diff;
                        if(this.board[x][y] !== ''){
                            if(this.board[x][y][0] !== this.turn){
                                if(this.checkBasicMovement(kingx, kingy, i,j,x,y)){
                                    movesFound.push([x,y]);
                                }
                            }
                            break;
                        }
                        if(this.checkBasicMovement(kingx, kingy, i,j,x,y)){
                            movesFound.push([x,y]);
                        }
                    }

                    max = 7 - i < j? 7 - i : j;
                    for(let diff = 1; diff <= max; diff++){
                        let x = i + diff, y = j - diff;
                        if(this.board[x][y] !== ''){
                            if(this.board[x][y][0] !== this.turn){
                                if(this.checkBasicMovement(kingx, kingy, i,j,x,y)){
                                    movesFound.push([x,y]);
                                }
                            }
                            break;
                        }
                        if(this.checkBasicMovement(kingx, kingy, i,j,x,y)){
                            movesFound.push([x,y]);
                        }
                    }

                    max = 7 - i < 7 - j? 7 - i : 7 - j;
                    for(let diff = 1; diff <= max; diff++){
                        let x = i + diff, y = j + diff;
                        if(this.board[x][y] !== ''){
                            if(this.board[x][y][0] !== this.turn){
                                if(this.checkBasicMovement(kingx, kingy, i,j,x,y)){
                                    movesFound.push([x,y]);
                                }
                            }
                            break;
                        }
                        if(this.checkBasicMovement(kingx, kingy, i,j,x,y)){
                            movesFound.push([x,y]);
                        }
                    }
                                            
                    if(this.board[i][j][1] === 'B'){
                        break;
                    }
                    /* falls through */
                }
                case 'R':
                    for(let x = i - 1; x >= 0; x--){
                        if(this.board[x][j] !== ''){
                            if(this.board[x][j][0] !== this.turn){
                                if(this.checkBasicMovement(kingx, kingy, i, j, x, j)){
                                    movesFound.push([x, j]);
                                }
                            }
                            break;
                        }
                        if(this.checkBasicMovement(kingx, kingy, i, j, x, j)){
                            movesFound.push([x, j]);
                        }
                    }
                    for(let x = i + 1; x < 8; x++){
                        if(this.board[x][j] !== ''){
                            if(this.board[x][j][0] !== this.turn){
                                if(this.checkBasicMovement(kingx, kingy, i, j, x, j)){
                                    movesFound.push([x, j]);
                                }
                            }
                            break;
                        }
                        if(this.checkBasicMovement(kingx, kingy, i, j, x, j)){
                            movesFound.push([x, j]);
                        }
                    }

                    for(let y = j - 1; y >= 0; y--){
                        if(this.board[i][y] !== ''){
                            if(this.board[i][y][0] !== this.turn){
                                if(this.checkBasicMovement(kingx, kingy, i, j, i, y)){
                                    movesFound.push([i, y]);
                                }
                            }
                            break;
                        }
                        if(this.checkBasicMovement(kingx, kingy, i, j, i, y)){
                            movesFound.push([i, y]);
                        }
                    }
                    for(let y = j + 1; y < 8; y++){
                        if(this.board[i][y] !== ''){
                            if(this.board[i][y][0] !== this.turn){
                                if(this.checkBasicMovement(kingx, kingy, i, j, i, y)){
                                    movesFound.push([i, y]);
                                }
                            }
                            break;
                        }
                        if(this.checkBasicMovement(kingx, kingy, i, j, i, y)){
                            movesFound.push([i, y]);
                        }
                    }
                    break;
                case 'K':{
                    for(let x = i - 1; x < i + 2; x++){
                        if(x < 0 || x >= 8){
                            continue;
                        }
                        for(let y = j - 1; y < j + 2; y++){
                            if(y < 0 || y >= 8){
                                continue;
                            }
                            if(this.board[x][y] === '' || this.board[x][y][0] !== this.turn){
                                if(this.checkBasicMovement(x, y, i, j, x, y)){
                                    movesFound.push([x, y]);
                                }
                            }
                        }
                    }
                    // castle
                    let queenSideCastle = 0, kingSideCastle = 1;
                    if(this.turn === 'W'){
                        queenSideCastle += 2;
                        kingSideCastle += 2;
                    }
                    if(this.castles[queenSideCastle] &&
                        this.board[i][j - 1] === '' &&
                        this.board[i][j - 2] === '' &&
                        this.board[i][j - 3] === '' &&
                        ! this.squareUnderAttack(i, j) && 
                        ! this.squareUnderAttack(i, j - 1) &&
                        ! this.squareUnderAttack(i, j - 2)){
                        movesFound.push([i, j - 2]);
                    }
                    if(this.castles[kingSideCastle] &&
                        this.board[i][j + 1] === '' &&
                        this.board[i][j + 2] === '' &&
                        ! this.squareUnderAttack(i, j) && 
                        ! this.squareUnderAttack(i, j - 1)){
                        movesFound.push([i, j + 2]);
                    }
                    break;
                }
                default:
                    alert('Case not found');
                }
                if(movesFound.length !== 0){
                    this.avaliableMoves.set(i*8+ j, movesFound);
                }
            }
        }
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

        if(isValidMove){
            this.move(xpos, ypos);
            this.findAllValidMoves();
            if(this.avaliableMoves.size === 0){
                if(this.kingUnderCheck()){
                    alert('CHECK MATE, current turn: ' + this.turn);
                }
                else{
                    alert('STALE MATE');
                }
            }
        }
        this.prevSelectedPos = [];
        return isValidMove;
    }

    move(tarX, tarY){
        const [curX, curY] = this.prevSelectedPos;
        let curPiece = this.board[curX][curY][1];
        switch(curPiece){
        case 'P':
            this.movePawn(tarX, tarY);
            break;
        case 'K':
            this.moveKing(tarX, tarY);
            break;
        default: // Rook, Knight, Bishop, Queen.
            this.board[tarX][tarY] = this.board[curX][curY];
            this.board[curX][curY] = '';
            this.enPassant = [];
        }
        if(this.turn === 'W'){
            if(curX === 7 && curY === 0){
                this.castles[2] = false;
            }
            else if(tarX === 7 && tarY === 0){
                this.castles[2] = false;
            }
            if(curX === 7 && curY === 7){
                this.castles[3] = false;
            }
            else if(tarX === 7 && tarY === 7){
                this.castles[3] = false;
            }
            this.turn = 'B';
        }
        else{
            if(curX === 0 && curY === 0){
                this.castles[0] = false;
            }
            else if(tarX === 0 && tarY === 0){
                this.castles[0] = false;
            }
            if(curX === 0 && curY === 7){
                this.castles[1] = false;
            }
            else if(tarX === 0 && tarY === 7){
                this.castles[1] = false;
            }
            this.turn = 'W';
        }
        if(curPiece !== 'P'){
            this.enPassant = [];
        }
    }

    moveKing(tarX, tarY){
        const [curX, curY] = this.prevSelectedPos;
        let colDiff = Math.abs(tarY - curY);
        if(colDiff === 2){
            if(tarY === 2){
                this.board[tarX][3] = this.board[tarX][0];
                this.board[tarX][0] = '';
            }
            else{
                this.board[tarX][5] = this.board[tarX][7];
                this.board[tarX][7] = '';
            }
        }
        this.board[tarX][tarY] = this.board[curX][curY];
        this.board[curX][curY] = '';
        this.enPassant = [];
        if(this.turn === 'W'){
            this.castles[2] = this.castles[3] = false;
        }
    }

    movePawn(tarX, tarY){
        const [curX, curY] = this.prevSelectedPos;
        let rowDiff = Math.abs(tarX - curX);
        if(curY !== tarY && this.board[tarX][tarY] === ''){
            this.board[curX][tarY] = '';
        }
        if(tarX === 0 || tarX === 7){
            this.board[tarX][tarY] = this.turn + this.promoteTo;
        }
        else{
            this.board[tarX][tarY] = this.board[curX][curY];
        }
        this.board[curX][curY] = '';
        if(rowDiff === 2){
            this.enPassant = [tarX, tarY];
        }
        else{
            this.enPassant = [];
        }
        return true;
    }

    checkPawnMovement(safeX, safeY, curX, curY, tarX, tarY){
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
                        let squareIsSafe = ! this.squareUnderAttack(safeX, safeY);
                        // Undo Move
                        this.board[this.enPassant[0]][this.enPassant[1]] = 'BP';
                        this.board[tarX][tarY] = pieceTaken;
                        this.board[curX][curY] = 'WP';
                        // only return true if king was not under check.
                        return squareIsSafe;
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
                        let squareIsSafe = ! this.squareUnderAttack(safeX, safeY);
                        // Undo Move
                        this.board[this.enPassant[0]][this.enPassant[1]] = 'WP';
                        this.board[tarX][tarY] = pieceTaken;
                        this.board[curX][curY] = 'BP';
                        // only return true if king was not under check.
                        return squareIsSafe;
                    }
                }
                return false;
            }
            else if(this.board[tarX][tarY][0] === this.turn){
                return false;
            }
            let pieceTaken = this.board[tarX][tarY];

            this.board[tarX][tarY] = this.board[curX][curY];
            this.board[curX][curY] = '';
            // Test if in check:
            let squareIsSafe = ! this.squareUnderAttack(safeX, safeY);

            this.board[tarX][tarY] = pieceTaken;
            this.board[curX][curY] = this.turn + 'P';
            return squareIsSafe;
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
                let squareIsSafe = ! this.squareUnderAttack(safeX, safeY);
    
                this.board[tarX][tarY] = '';
                this.board[curX][curY] = this.turn + 'P';
                return squareIsSafe;
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
                let squareIsSafe = ! this.squareUnderAttack(safeX, safeY);
    
                this.board[tarX][tarY] = '';
                this.board[curX][curY] = this.turn + 'P';
                return squareIsSafe;
            }
            else{
                return false;
            }
        }
        return false;
    }

    checkBasicMovement(safeX, safeY, curX, curY, tarX, tarY){
        // no need to check bound as all values will be valid.
        let targetPiece = this.board[tarX][tarY];
        let currPiece = this.board[curX][curY];
        this.board[tarX][tarY] = currPiece;
        this.board[curX][curY] = '';
        let squareIsSafe = ! this.squareUnderAttack(safeX, safeY);
        this.board[tarX][tarY] = targetPiece;
        this.board[curX][curY] = currPiece;
        return squareIsSafe;

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
        return this.squareUnderAttack(kingx, kingy);
    }

    squareUnderAttack(posx, posy){
        // Targeted by Bishop or Queen
        {
            let max = posx < posy? posx : posy;
            for(let diff = 1; diff <= max; diff++){
                let currPiece = this.board[posx - diff][posy - diff];
                if(currPiece === ''){
                    continue;
                }
                if(currPiece[0] === this.turn ||
                (currPiece[1] !== 'B' && currPiece[1] !== 'Q')){
                    break;
                }
                return true;
            }
            max = posx < 7 - posy? posx : 7 - posy;
            for(let diff = 1; diff <= max; diff++){
                let currPiece = this.board[posx - diff][posy + diff];
                if(currPiece === ''){
                    continue;
                }
                if(currPiece[0] === this.turn ||
                (currPiece[1] !== 'B' && currPiece[1] !== 'Q')){
                    break;
                }
                return true;
            }
            max = 7 - posx < posy? 7 - posx : posy;
            for(let diff = 1; diff <= max; diff++){
                let currPiece = this.board[posx + diff][posy - diff];
                if(currPiece === ''){
                    continue;
                }
                if(currPiece[0] === this.turn ||
                (currPiece[1] !== 'B' && currPiece[1] !== 'Q')){
                    break;
                }
                return true;
            }
            max = 7 - posx < 7 - posy? 7 - posx : 7 - posy;
            for(let diff = 1; diff <= max; diff++){
                let currPiece = this.board[posx + diff][posy + diff];
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
            for(let x = posx - 1; x >= 0; x--){
                if(this.board[x][posy] === ''){
                    continue;
                }
                let currPiece = this.board[x][posy];
                if(currPiece[0] === this.turn || (currPiece[1] !== 'R' && currPiece[1] !== 'Q')){
                    break;
                }
                return true;
            }
            for(let x = posx + 1; x < 8; x++){
                if(this.board[x][posy] === ''){
                    continue;
                }
                let currPiece = this.board[x][posy];
                if(currPiece[0] === this.turn || (currPiece[1] !== 'R' && currPiece[1] !== 'Q')){
                    break;
                }
                return true;
            }
            for(let y = posy - 1; y >= 0; y--){
                if(this.board[posx][y] === ''){
                    continue;
                }
                let currPiece = this.board[posx][y];
                if(currPiece[0] === this.turn || (currPiece[1] !== 'R' && currPiece[1] !== 'Q')){
                    break;
                }
                return true;
            }
            for(let y = posy + 1; y < 8; y++){
                if(this.board[posx][y] === ''){
                    continue;
                }
                let currPiece = this.board[posx][y];
                if(currPiece[0] === this.turn || (currPiece[1] !== 'R' && currPiece[1] !== 'Q')){
                    break;
                }
                return true;
            }
        }

        // Targeted by Pawn
        {
            if(this.turn === 'B'){
                let x = posx + 1;
                let y = posy - 1;
                if(x < 8){
                    if(y >= 0 && this.board[x][y] === 'WP'){
                        return true;
                    }
                    y = posy + 1;
                    if(y < 8 && this.board[x][y] === 'WP'){
                        return true;
                    }
                }
            }
            else{
                let x = posx - 1;
                let y = posy - 1;
                if(x >= 0){
                    if(y >= 0 && this.board[x][y] === 'BP'){
                        return true;
                    }
                    y = posy + 1;
                    if(y < 8 && this.board[x][y] === 'BP'){
                        return true;
                    }
                }
            }
        }

        // Targeted by Knight
        {
            for(let v = -1; v < 2; v += 2){
                for(let h = -1; h < 2; h += 2){
                    let x, y;
                    x = posx + (v * 1);
                    y = posy + (h * 2);
                    if(x >= 0 && x < 8 && y >= 0 && y < 8){
                        if(this.board[x][y] !== '' && this.board[x][y][0] !== this.turn && this.board[x][y][1] === 'N'){
                            return true;
                        }
                    }
                    x = posx + (v * 2);
                    y = posy + (h * 1);
                    if(x >= 0 && x < 8 && y >= 0 && y < 8){
                        if(this.board[x][y] !== '' && this.board[x][y][0] !== this.turn && this.board[x][y][1] === 'N'){
                            return true;
                        }
                    }
                }
            }
        }
        
        // Targeted by King
        for(let x = posx - 1; x < posx + 2; x++){
            if(x < 0 || x >= 8){
                continue;
            }
            for(let y = posy - 1; y < posy + 2; y++){
                if(y < 0 || y >= 8 ||
                    (posx === x && posy === y)){
                    continue;
                }
                if(this.board[x][y] !== '' && this.board[x][y][0] !== this.turn && this.board[x][y][1] === 'K'){
                    return true;
                }
            }
        }

        return false;
    }

}

export default ChessboardNode;

