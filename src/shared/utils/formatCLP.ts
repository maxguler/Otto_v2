export function formatCLP(n: number): string {
  if (!n) return '-';
  return '$' + n.toLocaleString('es-CL') + ' CLP';
}
