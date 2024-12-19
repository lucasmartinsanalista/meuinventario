// Função para carregar os dados do relatório
function loadReport() {
    const reportTable = document.getElementById('report-table').querySelector('tbody');
    const inventoryData = JSON.parse(localStorage.getItem('inventory')) || [];

    // Limpar tabela antes de carregar os dados
    reportTable.innerHTML = '';

    inventoryData.forEach(entry => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.material}</td>
            <td>${entry.quantity}</td>
            <td>${entry.user}</td>
            <td>${entry.timestamp}</td>
        `;
        reportTable.appendChild(row);
    });
}

// Função para exportar os dados para Excel
function exportToExcel() {
    const inventoryData = JSON.parse(localStorage.getItem('inventory')) || [];
    const worksheetData = inventoryData.map(entry => [
        entry.material,
        entry.quantity,
        entry.user,
        entry.timestamp
    ]);

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([
        ['Nome do Material', 'Quantidade', 'Usuário', 'Data e Hora'], // Cabeçalho
        ...worksheetData
    ]);

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Relatório de Inventário');
    XLSX.writeFile(workbook, 'Relatorio_Inventario.xlsx');
}

// Função para filtrar materiais na tabela
function filterMaterials() {
    const searchValue = document.getElementById('search-material').value.toLowerCase();
    const rows = document.querySelectorAll('#report-table tbody tr');

    rows.forEach(row => {
        const materialName = row.cells[0].textContent.toLowerCase();
        row.style.display = materialName.includes(searchValue) ? '' : 'none';
    });
}

// Adicionar event listeners
window.addEventListener('DOMContentLoaded', () => {
    loadReport();

    document.getElementById('export-button').addEventListener('click', exportToExcel);
    document.getElementById('search-material').addEventListener('input', filterMaterials);
});
