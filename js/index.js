var sign = ['', 'o', 'x'];
var count = 0;

selectedTabs = {
    x: [],
    o: []
}

var winStates = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

var currSign = 1;

function updateTab(id) {
    if (selectedTabs.x.includes(parseInt(id)) || selectedTabs.o.includes(parseInt(id))) return;
    count++;
    currSign = currSign === 1 ? 2 : 1;
    document.getElementById(id).innerText = sign[currSign];
    selectedTabs[sign[currSign]].push(parseInt(id));
    if (count > 4) {
        setTimeout(function () {
            if (checkWinCondition(currSign)) {
                var restart = confirm(sign[currSign] + ' Wins. Restart ?');
                if (restart) {
                    reset();
                }
            } else if (count === 9) {
                var restart = confirm('Match draw. Restart ?');
                if (restart) {
                    reset();
                }
            }
        })

    }
}

function checkWinCondition(currSign) {
    for (var i = 0; i < winStates.length; i++) {
        var isWin = winStates[i].every(tab => {
            var isThere = selectedTabs[sign[currSign]].includes(tab);
            return isThere;
        });
        if (isWin) {
            return true;
        }
    }
    return false;
}

function reset() {
    currSign = 0;
    count = 0;
    selectedTabs = {
        x: [],
        o: []
    }
    for (var i = 1; i < 10; i++) {
        document.getElementById(i.toString()).innerText = sign[0];
    }
}