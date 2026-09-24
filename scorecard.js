function renderScorecardGrid(courseData, teamScores) {
  const container = document.getElementById('scorecard-grid');
  if (!container || !courseData) return;

  const holes = courseData.holes;
  const totalPar = courseData.par;

  let html = `
    <div class="scorecard-container">
      <table class="scorecard-table">
        <thead>
          <tr>
            <th class="sticky-col">HOLE</th>
  `;

  holes.forEach(h => {
    html += `<th>${h.hole}</th>`;
  });

  html += `
            <th class="tot-col">TOT</th>
          </tr>
          <tr>
            <td class="sticky-col">Par</td>
  `;

  holes.forEach(h => {
    html += `<td>${h.par}</td>`;
  });

  html += `
            <td class="tot-col">${totalPar}</td>
          </tr>
        </thead>
        <tbody>
  `;

  teamScores.forEach(team => {
    let teamTotal = 0;
    html += `<tr><td class="sticky-col">${team.name}</td>`;

    holes.forEach(h => {
      const score = team.scores ? team.scores[h.hole] : null;
      if (score) {
        teamTotal += score;
        const diff = score - h.par;
        let badgeClass = 'score-par';
        
        if (diff <= -2) badgeClass = 'score-eagle';
        else if (diff === -1) badgeClass = 'score-birdie';
        else if (diff === 1) badgeClass = 'score-bogey';
        else if (diff >= 2) badgeClass = 'score-double';

        html += `<td><span class="score-badge ${badgeClass}">${score}</span></td>`;
      } else {
        html += `<td>-</td>`;
      }
    });

    html += `<td class="tot-col">${teamTotal || '-'}</td></tr>`;
  });

  html += `
        </tbody>
      </table>
    </div>
  `;

  container.innerHTML = html;
}
