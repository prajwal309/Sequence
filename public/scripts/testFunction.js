// Define the helper function
const areAllSame = array => array.length > 0 && array.every(color => color === array[0]) && array[0] !== "";


// Define the main function
function checkFiveInRowOrColumn(grid) {
    
    const size = grid.length;

    // Check rows
    for (let row = 0; row < size; row++) {
        for (let col = 0; col <= size - 5; col++) {
            const rowSegment = grid[row].slice(col, col + 5);
            if (areAllSame(rowSegment)) {
                return true;
            }
        }
    }

    // Check columns
    for (let col = 0; col < size; col++) {
        for (let row = 0; row <= size - 5; row++) {
            const columnSegment = grid.slice(row, row + 5).map(rowArray => rowArray[col]);
            if (areAllSame(columnSegment)) {
                return true;
            }
        }
    }

    // Check diagonals (top-left to bottom-right)
    for (let row = 0; row <= size - 5; row++) {
        for (let col = 0; col <= size - 5; col++) {
            const diagonalSegment = [];
            for (let i = 0; i < 5; i++) {
                diagonalSegment.push(grid[row + i][col + i]);
            }
            if (areAllSame(diagonalSegment)) {
                return true;
            }
        }
    }

    // Check diagonals (top-left to bottom-right)
    for (let row = 0; row <= size - 5; row++) {
        for (let col = 0; col <= size - 5; col++) {
            const diagonalSegment = [];
            for (let i = 0; i < 5; i++) {
                diagonalSegment.push(grid[row + i][col + i]);
            }
            if (areAllSame(diagonalSegment)) {
                console.log("This is the diagonal case.")
                return true;
            }
        }
    }

    // Check diagonals (bottom-left to top-right)
    

    //check for the side cases 
    console.log(grid[0][0])
    if (areAllSame(grid[0].slice(1,  5))){
        //console.log("side case");
        return true;
    } else if (areAllSame(grid[0].slice(5, 9))) {
        //console.log("side case");
        return true;
    } else if (areAllSame(grid[9].slice(1, 5))) {
        //console.log("side case");
       return true;
    } else if (areAllSame(grid[9].slice(5,9))){
        //console.log("side case");
        return true;
    }

    const diagonal1 = [grid[1][1], grid[2][2], grid[3][3], grid[4][4]]
    const diagonal2 = [grid[5][5], grid[6][6], grid[7][7], grid[8][8]]
    const diagonal3 = [grid[8][1], grid[7][2], grid[6][3], grid[5][4]]
    const diagonal4 = [grid[1][8], grid[2][7], grid[3][6], grid[4][5]]

    //add similar cases for the diagonal
    if (areAllSame(diagonal1)){
        //console.log(diagonal1)
        //console.log("Case 1")
        return true;
    }else if(areAllSame(diagonal2)){
        //console.log(diagonal2)
        //console.log("Case 2")
        return true;
    }else if(areAllSame(diagonal3)){
        //console.log(diagonal3)
        //console.log("Case 3")
        return true;
    }else if(areAllSame(diagonal4)){
        //console.log(diagonal4)
        //console.log("Case 4")
        return true;
    }



    return false;
}

// Test cases
function runTests() {
    const tests = [
        {
            description: "5 same colors in a row",
            grid: [
                ["", "red", "red", "red", "red", "red", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "blue", "", "", "", "", "blue", ""],
                ["", "", "", "", "", "", "", "", "", ""],
                ["", "blue", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "blue", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", ""],
                // Remaining rows
            ],
            expected: true
        },
        {
            description: "The side case 1",
            grid: [
                ["", "red", "red", "red", "red", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "red", "", "", ""],
                ["", "", "", "blue", "", "", "", "", "blue", ""],
                ["", "", "", "", "", "", "", "", "", ""],
                ["", "blue", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "blue", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", "", ""]
                // Remaining rows
            ],
            expected: true
        },

        {
            description: "The side case 2",
            grid: [
                ["", "red", "red", "", "red", "", "", "red", "", ""],
                ["", "", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "red", "", "", ""],
                ["", "", "", "blue", "", "", "", "", "blue", ""],
                ["", "", "", "", "", "", "red", "", "", ""],
                ["", "blue", "", "red", "", "", "", "", "", ""],
                ["", "", "red", "", "", "", "", "", "", ""],
                ["", "", "", "", "blue", "", "", "", "", ""],
                ["", "", "", "", "blue", "", "", "", "", ""],
                ["", "blue", "blue", "blue", "blue", "", "", "", "", ""],
                // Remaining rows
            ],
            expected: true
        },


        {
            description: "This is top left diagonal case.",
            grid: [
                ["", "red", "red", "", "red", "", "", "red", "", ""],
                ["", "blue", "", "", "", "", "", "", "", ""],
                ["", "", "blue", "", "", "", "red", "", "", ""],
                ["", "", "", "blue", "", "", "", "", "blue", ""],
                ["", "", "", "", "blue", "", "red", "", "", ""],
                ["", "blue", "", "red", "", "blue", "", "", "", ""],
                ["", "", "red", "", "", "", "", "", "", ""],
                ["", "", "", "", "blue", "", "", "", "", ""],
                ["", "", "", "", "blue", "", "", "", "", ""],
                ["", "blue", "", "blue", "blue", "", "", "", "", ""],
                // Remaining rows
            ],
            expected: true
        },

        {
            description: "This is top right diagonal case.",
            grid: [
                ["", "red", "red", "", "red", "", "", "red", "", ""],
                ["", "blue", "", "", "", "", "", "", "red", ""],
                ["", "", "", "", "", "", "red", "red", "", ""],
                ["", "", "", "blue", "", "", "red", "", "blue", ""],
                ["", "", "", "", "blue", "red", "red", "", "", ""],
                ["", "blue", "", "red", "", "blue", "", "", "", ""],
                ["", "", "red", "", "", "", "", "", "", ""],
                ["", "", "", "", "blue", "", "", "", "", ""],
                ["", "", "", "", "blue", "", "", "", "", ""],
                ["", "blue", "", "blue", "blue", "", "", "", "", ""],
                // Remaining rows
            ],
            expected: true
        },
    ];

    tests.forEach((test, index) => {
        const result = checkFiveInRowOrColumn(test.grid);
        console.log(
            `Test ${index + 1}: ${test.description} - ${
                result === test.expected ? "PASSED" : "FAILED"
            }`
        );
    });
}

//
runTests();
