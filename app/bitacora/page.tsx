import { db } from '../../lib/db';
import { calculateRate, calculateRateNum, calculatePpDiff } from '../../lib/experiment';

export default function BitacoraPage() {
  const liveMetrics = db.getMetrics();

  const fixedCase = {
    a: { impressions: 240, conversions: 18 },
    b: { impressions: 236, conversions: 31 },
  };

  const fixedRateA_num = calculateRateNum(fixedCase.a.conversions, fixedCase.a.impressions);
  const fixedRateB_num = calculateRateNum(fixedCase.b.conversions, fixedCase.b.impressions);

  const fixedRateA = calculateRate(fixedCase.a.conversions, fixedCase.a.impressions);
  const fixedRateB = calculateRate(fixedCase.b.conversions, fixedCase.b.impressions);
  const fixedPpDiff = calculatePpDiff(fixedRateA_num, fixedRateB_num);

  const liveRateA_num = calculateRateNum(liveMetrics.a.conversions, liveMetrics.a.impressions);
  const liveRateB_num = calculateRateNum(liveMetrics.b.conversions, liveMetrics.b.impressions);

  const liveRateA = calculateRate(liveMetrics.a.conversions, liveMetrics.a.impressions);
  const liveRateB = calculateRate(liveMetrics.b.conversions, liveMetrics.b.impressions);
  const livePpDiff = calculatePpDiff(liveRateA_num, liveRateB_num);

  return (
    <main style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Bitácora del Experimento A/B</h1>

      <h2>1. Caso de Prueba Fijo</h2>
      <table border={1} cellPadding={8} style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>Variante</th>
            <th>Impresiones</th>
            <th>Conversiones</th>
            <th>Tasa (%)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>A (Control)</td>
            <td>{fixedCase.a.impressions}</td>
            <td>{fixedCase.a.conversions}</td>
            <td>{fixedRateA}</td>
          </tr>
          <tr>
            <td>B (Tratamiento)</td>
            <td>{fixedCase.b.impressions}</td>
            <td>{fixedCase.b.conversions}</td>
            <td>{fixedRateB}</td>
          </tr>
          <tr>
            <td><strong>Diferencia (B - A)</strong></td>
            <td>-</td>
            <td>-</td>
            <td><strong>{fixedPpDiff}</strong></td>
          </tr>
        </tbody>
      </table>

      <h2 style={{ marginTop: '40px' }}>2. Métricas en Vivo (Sesión Actual)</h2>
      <table border={1} cellPadding={8} style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>Variante</th>
            <th>Impresiones</th>
            <th>Conversiones</th>
            <th>Tasa (%)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>A (Control)</td>
            <td>{liveMetrics.a.impressions}</td>
            <td>{liveMetrics.a.conversions}</td>
            <td>{liveRateA}</td>
          </tr>
          <tr>
            <td>B (Tratamiento)</td>
            <td>{liveMetrics.b.impressions}</td>
            <td>{liveMetrics.b.conversions}</td>
            <td>{liveRateB}</td>
          </tr>
          <tr>
            <td><strong>Diferencia (B - A)</strong></td>
            <td>-</td>
            <td>-</td>
            <td><strong>{livePpDiff}</strong></td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}
