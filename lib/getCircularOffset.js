/**
 * Signed distance from `activeIndex` to `index` in a looping list, picking the shorter way round.
 * Used to arrange testimonial avatars around the active one.
 *
 * @example getCircularOffset(4, 0, 5) // -1 (index 4 sits just before index 0)
 */
export default function getCircularOffset(index, activeIndex, total) {
  const half = Math.floor(total / 2);
  const forward = (index - activeIndex + total) % total;
  return forward <= half ? forward : forward - total;
}
