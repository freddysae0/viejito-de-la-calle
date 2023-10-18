
function myNext() {
    return (position + 1) % 4;
}
function myPrevious() {
    if (position == 0) return 3;
    return position - 1;
}
function myPartner() {
    return (position + 2) % 4;
}

function match(p, heads) {
    if ((p[0] == heads[0] || p[1] == heads[0]) && (p[0] == heads[1] || p[1] == heads[1])) {
        return 2;
    }
    if (p[0] == heads[0] || p[1] == heads[0]) {
        return 0;
    } else if (p[0] == heads[1] || p[1] == heads[1]) {
        return 1;
    }
    return -1;
}
function hallarLinduraCarry(myPreviousPlayed, lastValOfMyPrevious, myPartnerPlayed, lastValOfMyPartner, pieces, heads, myMoves, myPartnerMoves, myPartnerNoLleva, myNextplayerMoves, myNextplayerNoLleva, myPreviousplayerMoves, myPreviousplayerNoLleva) {
    var lindura = new Array(10).fill(0);

    pieces.forEach((piece, i) => {


        let vecesJugada = 0;
        let cantTengo = 0;
        myMoves.forEach(move => {
            if (move[0] == piece[0]) {
                vecesJugada++;
            }
            if (move[0] == piece[1]) {
                vecesJugada++;
            }
            if (move[1] == piece[0]) {
                vecesJugada++;
            }
            if (move[1] == piece[1]) {
                vecesJugada++;
            }
        });
        myPartnerMoves.forEach(move => {
            if (move[0] == piece[0]) {
                vecesJugada++;
            }
            if (move[0] == piece[1]) {
                vecesJugada++;
            }
            if (move[1] == piece[0]) {
                vecesJugada++;
            }
            if (move[1] == piece[1]) {
                vecesJugada++;
            }
        });
        myNextplayerMoves.forEach(move => {
            if (move[0] == piece[0]) {
                vecesJugada++;
            }
            if (move[0] == piece[1]) {
                vecesJugada++;
            }
            if (move[1] == piece[0]) {
                vecesJugada++;
            }
            if (move[1] == piece[1]) {
                vecesJugada++;
            }
        });
        myPreviousplayerMoves.forEach(move => {
            if (move[0] == piece[0]) {
                vecesJugada++;
            }
            if (move[0] == piece[1]) {
                vecesJugada++;
            }
            if (move[1] == piece[0]) {
                vecesJugada++;
            }
            if (move[1] == piece[1]) {
                vecesJugada++;
            }
        });
        pieces.forEach((otherPiece, j) => {
            if (i != j) {
                if (piece[0] == otherPiece[0]) {
                    cantTengo++;
                }
                if (piece[0] == otherPiece[1]) {
                    cantTengo++;
                }
                if (piece[1] == otherPiece[0]) {
                    cantTengo++;
                }
                if (piece[1] == otherPiece[1]) {
                    cantTengo++;
                }


            }
        });
        lindura[i] += (vecesJugada * cantTengo) / 100 + (piece[0] + piece[1]) / 100;
        if (piece[0] == piece[1]) {
            lindura[i] += 10 / 100;

        }
        let mt = match(heads, piece);
        if (mt != -1) {
            if (mt == 1 && myNextplayerNoLleva[piece[0]]) {
                lindura[i] += 0.4;
            }
            if (mt == 0 && myNextplayerNoLleva[piece[1]]) {
                lindura[i] += 0.4;
            }

            lindura[i] += 0.2;
            if (mt == 1 && myPartnerNoLleva[piece[0]]) {
                lindura[i] -= 0.10;
            }
            if (mt == 0 && myNextplayerNoLleva[piece[1]]) {
                lindura[i] -= 0.10;
            }
        }

    });

    return lindura;
}
function hallarLinduraSupport(myPreviousPlayed, lastValOfMyPrevious, myPartnerPlayed, lastValOfMyPartner, pieces, heads, myMoves, myPartnerMoves, myPartnerNoLleva, myNextplayerMoves, myNextplayerNoLleva, myPreviousplayerMoves, myPreviousplayerNoLleva) {
    var lindura = new Array(10).fill(0);

    pieces.forEach((piece, i) => {


        let vecesJugada = 0;
        let cantTengo = 0;
        myMoves.forEach(move => {
            if (move[0] == piece[0]) {
                vecesJugada++;
            }
            if (move[0] == piece[1]) {
                vecesJugada++;
            }
            if (move[1] == piece[0]) {
                vecesJugada++;
            }
            if (move[1] == piece[1]) {
                vecesJugada++;
            }
        });
        myPartnerMoves.forEach(move => {
            if (move[0] == piece[0]) {
                vecesJugada++;
            }
            if (move[0] == piece[1]) {
                vecesJugada++;
            }
            if (move[1] == piece[0]) {
                vecesJugada++;
            }
            if (move[1] == piece[1]) {
                vecesJugada++;
            }
        });
        myNextplayerMoves.forEach(move => {
            if (move[0] == piece[0]) {
                vecesJugada++;
            }
            if (move[0] == piece[1]) {
                vecesJugada++;
            }
            if (move[1] == piece[0]) {
                vecesJugada++;
            }
            if (move[1] == piece[1]) {
                vecesJugada++;
            }
        });
        myPreviousplayerMoves.forEach(move => {
            if (move[0] == piece[0]) {
                vecesJugada++;
            }
            if (move[0] == piece[1]) {
                vecesJugada++;
            }
            if (move[1] == piece[0]) {
                vecesJugada++;
            }
            if (move[1] == piece[1]) {
                vecesJugada++;
            }
        });
        pieces.forEach((otherPiece, j) => {
            if (i != j) {
                if (piece[0] == otherPiece[0]) {
                    cantTengo++;
                }
                if (piece[0] == otherPiece[1]) {
                    cantTengo++;
                }
                if (piece[1] == otherPiece[0]) {
                    cantTengo++;
                }
                if (piece[1] == otherPiece[1]) {
                    cantTengo++;
                }


            }
        });
        lindura[i] += (vecesJugada * cantTengo) / 100 + (piece[0] + piece[1]) / 100;
        if (piece[0] == piece[1]) {
            lindura[i] += 10 / 100;

        }
        let mt = match(heads, piece);
        if (mt != -1) {
            if (mt == 1 && myNextplayerNoLleva[piece[0]]) {
                lindura[i] += 0.2;
            }
            if (mt == 0 && myNextplayerNoLleva[piece[1]]) {
                lindura[i] += 0.2;
            }

            //MIPARTNER NO SE HA PASADO
            lindura[i] += 0.4;
            if (mt == 1 && myPartnerNoLleva[piece[0]]) {
                lindura[i] -= 0.20;
            }
            if (mt == 0 && myNextplayerNoLleva[piece[1]]) {
                lindura[i] -= 0.20;
            }
            //Por aqui deberia tratar de no quitarle las jugadas al carry
        }

        if (myPartnerNoLleva[heads[0]] && (match(piece, heads) == 0 || match(piece, heads) == 2)) {
            lindura[i] += 0.5;
        }

        if (myPartnerNoLleva[heads[1]] && (match(piece, heads) == 1 || match(piece, heads) == 2)) {
            lindura[i] += 0.5;
        }
    });

    return lindura;
}
function playAsCarry(myPreviousPlayed, lastValOfMyPrevious, myPartnerPlayed, lastValOfMyPartner, pieces, heads, myMoves, myPartnerMoves, myPartnerNoLleva, myNextplayerMoves, myNextplayerNoLleva, myPreviousplayerMoves, myPreviousplayerNoLleva) {

    let lindura = hallarLinduraCarry(myPreviousPlayed, lastValOfMyPrevious, myPartnerPlayed, lastValOfMyPartner, pieces, heads, myMoves, myPartnerMoves, myPartnerNoLleva, myNextplayerMoves, myNextplayerNoLleva, myPreviousplayerMoves, myPreviousplayerNoLleva);
    let jugarPor = new Array(10).fill(0);
    pieces.forEach((piece, i) => {
        let mat = match(piece, heads);
        if (mat != -1) {

            lindura[i] += 5;

            if (mat == 1) {
                jugarPor[i] = 1;
            }

            if (mat == 0) {
                jugarPor[i] = 0;
            }
        }
    });
    console.log("lindura", lindura);

    let sePuede = Boolean(false);

    let maxxLindura = 5;
    if (heads[0] == -1) {
        maxxLindura = 0;
    }
    let AJUGAR = [];
    let POR;
    pieces.forEach((piece, i) => {
        if (lindura[i] >= maxxLindura) {
            sePuede = true;
            AJUGAR = piece;
            POR = jugarPor[i];
            maxxLindura = lindura[i];
        }
    });

    console.log("piecesAndHeads\n", pieces, heads);
    if (sePuede) {
        return {
            piece: AJUGAR,
            head: POR
        }
    } else {
        return {
            piece: null,
            head: null

        }
    }
}
function playAsSupport(myPreviousPlayed, lastValOfMyPrevious, myPartnerPlayed, lastValOfMyPartner, pieces, heads, myMoves, myPartnerMoves, myPartnerNoLleva, myNextplayerMoves, myNextplayerNoLleva, myPreviousplayerMoves, myPreviousplayerNoLleva) {

    let lindura = hallarLinduraSupport(myPreviousPlayed, lastValOfMyPrevious, myPartnerPlayed, lastValOfMyPartner, pieces, heads, myMoves, myPartnerMoves, myPartnerNoLleva, myNextplayerMoves, myNextplayerNoLleva, myPreviousplayerMoves, myPreviousplayerNoLleva);
    let jugarPor = new Array(10).fill(0);
    pieces.forEach((piece, i) => {
        let mat = match(piece, heads);
        if (mat != -1) {

            lindura[i] += 5;

            if (mat == 1) {
                jugarPor[i] = 1;
            }

            if (mat == 0) {
                jugarPor[i] = 0;
            }
        }
    });
    console.log("lindura", lindura);

    let sePuede = Boolean(false);

    let maxxLindura = 5;
    if (heads[0] == -1) {
        maxxLindura = 0;
    }
    let AJUGAR = [];
    let POR;
    pieces.forEach((piece, i) => {
        if (lindura[i] >= maxxLindura) {
            sePuede = true;
            AJUGAR = piece;
            POR = jugarPor[i];
            maxxLindura = lindura[i];
        }
    });

    console.log("piecesAndHeads\n", pieces, heads);
    if (sePuede) {
        return {
            piece: AJUGAR,
            head: POR
        }
    } else {
        return {
            piece: null,
            head: null

        }
    }
}


export function decideAPiece(myPreviousPlayed, lastValOfMyPrevious, myPartnerPlayed, lastValOfMyPartner, pieces, heads, myMoves, myPartnerMoves, myPartnerNoLleva, myNextplayerMoves, myNextplayerNoLleva, myPreviousplayerMoves, myPreviousplayerNoLleva) {
    if (myMoves.length >= myPartnerMoves.length) {
        //Soy carry
        console.log("soy carry!!");
        return playAsCarry(myPreviousPlayed, lastValOfMyPrevious, myPartnerPlayed, lastValOfMyPartner, pieces, heads, myMoves, myPartnerMoves, myPartnerNoLleva, myNextplayerMoves, myNextplayerNoLleva, myPreviousplayerMoves, myPreviousplayerNoLleva);
    } else {
        //Play as support
        return playAsSupport(myPreviousPlayed, lastValOfMyPrevious, myPartnerPlayed, lastValOfMyPartner, pieces, heads, myMoves, myPartnerMoves, myPartnerNoLleva, myNextplayerMoves, myNextplayerNoLleva, myPreviousplayerMoves, myPreviousplayerNoLleva);
        //return playAsSupport(pieces, heads, myMoves, myPartnerMoves, myPartnerNoLleva, myNextplayerMoves, myNextplayerNoLleva, myPreviousplayerMoves, myPreviousplayerNoLleva);
    }


}
