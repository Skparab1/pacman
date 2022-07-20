const table = document.getElementById('table');

fetch("https://wfcdaj.deta.dev/leaderboard?number=10")
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            const play = data[i];
            table.appendChild(createTableRow(i + 1, play.name, play.score, play.time));
        }
    });

function createTableRow(rank, name, score, time) {
    const tableRow = document.createElement('tr');
    tableRow.appendChild(createTableData(rank));
    tableRow.appendChild(createTableData(name));
    tableRow.appendChild(createTableData(score));
    tableRow.appendChild(createTableData(time));
    return tableRow;
}

function createTableData(data) {
    const tableData = document.createElement('td');
    const textData = document.createTextNode(data);
    tableData.appendChild(textData);
    return tableData;
}