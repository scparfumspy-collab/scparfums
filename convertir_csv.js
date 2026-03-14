const fs = require('fs');
const csv = require('csv-parser');

const resultados = [];

fs.createReadStream('perfumes.csv')
  .pipe(csv())
  .on('data', (row) => {
    if (row['perfume clicado'] && row['perfume clicado'] !== 'Total') {
      resultados.push({
        nombre: row['perfume clicado'],
        clicks: parseInt(row['Número de eventos'], 10)
      });
    }
  })
  .on('end', () => {
    resultados.sort((a, b) => b.clicks - a.clicks);
    fs.writeFileSync('perfumes_populares.json', JSON.stringify(resultados, null, 2));
    console.log('Archivo perfumes_populares.json generado con éxito');
  });
