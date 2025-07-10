// CR Bar with CI — Looker Studio Community Viz
const DSCC = dscc;     // alias

const drawChart = (data) => {
  // ---- pull data ----
  const rows = data.tables.DEFAULT;
  const labels   = rows.map(r => r.variant[0]);     // 'Control' / 'Treatment'
  const cr       = rows.map(r => r.cr[0]);
  const ciLow    = rows.map(r => r.ci_low[0]);
  const ciHigh   = rows.map(r => r.ci_high[0]);

  // ---- build dataset with error magnitudes ----
  const dataset = {
    label: 'Conversion Rate',
    backgroundColor: ['#396AB1','#3CB371'],
    borderWidth: 1,
    data: cr,
    errorDir: 'y',
    errorMagnitudes: cr.map((v,i)=>[v - ciLow[i], ciHigh[i] - v])
  };

  // ---- inject canvas ----
  const div = document.getElementById('container');
  div.innerHTML = '<canvas id="cnv"></canvas>';

  // ---- Chart.js ----
  new Chart('cnv', {
    type: 'barWithErrorBars',
    data: { labels, datasets:[dataset] },
    options: {
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks:{
            label:(ctx)=>`${(ctx.parsed.y*100).toFixed(2)}% ± ${(dataset.errorMagnitudes[ctx.dataIndex][1]*100).toFixed(2)}%`
          }
        }
      },
      scales: {
        y: { ticks:{ callback:v=>`${(v*100).toFixed(1)}%`}, beginAtZero:true, suggestedMax:0.05 }
      }
    }
  });
};

// ---- load external libs, then subscribe ----
const loadScript = src => new Promise(r=>{
  const s=document.createElement('script'); s.src=src; s.onload=r; document.head.appendChild(s);
});

Promise.all([
  loadScript('https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js'),
  loadScript('https://cdn.jsdelivr.net/npm/chartjs-chart-error-bars@4.4.1')
]).then(()=> dscc.subscribeToData(drawChart));
