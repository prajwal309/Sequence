// Define the helper function
const areAllSame = array => array.every(color => color === array[0]);

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

    return false;
}

// Test cases
function runTests() {
    const tests = [
        {
            description: "5 same colors in a row",
            grid: [
                ["red", "red", "red", "red", "red", "blue", "green", "yellow", "purple", "green"],
                ["blue", "green", "yellow", "purple", "blue", "red", "blue", "yellow", "purple", "green"],
                // Remaining rows
            ],
            expected: true
        },
        {
            description: "5 same colors in a column",
            grid: [
                ["red", "blue", "green", "yellow", "purple", "green", "blue", "yellow", "purple", "green"],
                ["red", "green", "yellow", "purple", "blue", "red", "blue", "yellow", "purple", "green"],
                ["red", "green", "yellow", "purple", "blue", "red", "blue", "yellow", "purple", "green"],
                ["red", "green", "yellow", "purple", "blue", "red", "blue", "yellow", "purple", "green"],
                ["red", "green", "yellow", "purple", "blue", "red", "blue", "yellow", "purple", "green"],
                // Remaining rows
            ],
            expected: true
        },
        {
            description: "No matching colors in a row or column",
            grid: [
                ["red", "blue", "green", "yellow", "purple", "green", "blue", "yellow", "purple", "green"],
                ["blue", "green", "yellow", "purple", "blue", "red", "blue", "yellow", "purple", "green"],
                ["green", "yellow", "purple", "blue", "red", "blue", "yellow", "purple", "green", "red"],
                ["yellow", "purple", "blue", "red", "blue", "yellow", "purple", "green", "red", "blue"],
                ["purple", "blue", "red", "blue", "yellow", "purple", "green", "red", "blue", "yellow"],
                // Remaining rows
            ],
            expected: false
        },
        {
            description: "Empty grid",
            grid: [],
            expected: false
        },
        {
            description: "Grid with insufficient rows/columns",
            grid: [
                ["red", "red", "red", "red"], // Less than 5 columns
                ["blue", "blue", "blue", "blue"],
                ["green", "green", "green", "green"],
                ["yellow", "yellow", "yellow", "yellow"]
            ],
            expected: false
        }
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
