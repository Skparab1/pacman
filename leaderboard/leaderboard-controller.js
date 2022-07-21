const table = document.getElementById('table');

fetch("./sample-data.json")
    .then(response => {
        return response.json();
    })
    .then(data => {
        const allPlays = data.data;
        allPlays.sort((a, b) => (a.score < b.score) ? 1 : -1);
        for (let i = 0; i < allPlays.length; i++) {
            const play = allPlays[i];
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