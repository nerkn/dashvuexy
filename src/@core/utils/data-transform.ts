/**
 * given l as array, d as group column, counts,sums for column t
 * ie: l=[['cow', 'pet', 1], ['dog','pet, 2 ], ['cow', 'meat', 7] ]
 *                         [item        , count,  sums]
 *  toplayici(l, 0, 2) => [['cow','dog'], [2, 1], [8, 2]]
 *  toplayici(l, 1, 2) => [['pet','meat'],[2, 1], [3, 7]]
 */

function toplayici(l: string[][], d: number, t: number) {
  if (typeof l != 'object') return [[], [], []]

  const bilinen: string[] = []
  const bilinenSay: number[] = []
  const bilinenSum: number[] = []
  l.forEach(row => {
    let plc = bilinen.indexOf(row[d])
    if (plc == -1) {
      plc = bilinen.push(row[d]) - 1
      bilinenSay[plc] = 1
      bilinenSum[plc] = parseFloat(row[t]) || 0
    } else {
      bilinenSay[plc] += 1
      bilinenSum[plc] += parseFloat(row[t]) || 0
    }
  })

  return [bilinen, bilinenSay, bilinenSum]
}
export { toplayici }
