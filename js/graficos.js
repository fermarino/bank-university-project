document.addEventListener('DOMContentLoaded', () => {
  const csvInput = document.getElementById('csv-input');
  const loadButton = document.getElementById('load-data');
  const chartTypeSelect = document.getElementById('chart-type');
  const chartCanvas = document.getElementById('chart');
  const exportButton = document.getElementById('export-chart');
  const dataTable = document.getElementById('data-table');

  let selectedData = [];
  let chart = null;

  csvInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          selectedData = result.data;
          createTable(selectedData);
        },
      });
    }
  });

  loadButton.addEventListener('click', () => {
    createChart();
  });

  exportButton.addEventListener('click', () => {
    if (chart) {
      const chartImage = chart.toBase64Image('image/png', 1.0);
      const downloadLink = document.createElement('a');
      downloadLink.href = chartImage;
      downloadLink.download = 'chart.png';
      downloadLink.click();
    }
  });

  function createTable(data) {
    // Preencha a tabela com os dados CSV
    const [headers, ...rows] = data;
    const tableHead = document.querySelector('#data-table thead');
    const tableBody = document.querySelector('#data-table tbody');

    tableHead.innerHTML = '';
    tableBody.innerHTML = '';

    const headerRow = document.createElement('tr');
    headers.forEach((header) => {
      const th = document.createElement('th');
      th.textContent = header;
      headerRow.appendChild(th);
    });
    tableHead.appendChild(headerRow);

    rows.forEach((row) => {
      const tableRow = document.createElement('tr');
      row.forEach((cell) => {
        const td = document.createElement('td');
        td.textContent = cell;
        tableRow.appendChild(td);
      });
      tableBody.appendChild(tableRow);
    });
  }

  function createChart() {
    if (chart) {
      chart.destroy();
    }

    const labels = selectedData[0].slice(1);
    const data = selectedData[1].slice(1); // Assumindo que você deseja exibir a segunda linha do CSV

    chart = new Chart(chartCanvas, {
      type: chartTypeSelect.value,
      data: {
        labels: labels,
        datasets: [{
          label: 'Dados',
          data: data,
          backgroundColor: getRandomColor(data.length),
          borderColor: getRandomColor(data.length),
          borderWidth: 1,
        }],
      },
    });
  }

  function getRandomColor(count) {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      colors.push(color);
    }
    return colors;
  }
});
