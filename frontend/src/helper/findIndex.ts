const findIndex = (x = 0, y: number, list: string[], value: string): number => {
    let borderIndex = Math.floor((x + y) / 2)

    if (list[borderIndex] == value) {
        return borderIndex
    } else {
        if (list[borderIndex] > value) {
            return findIndex(0, borderIndex - 1, list, value)
        } else {
            return findIndex(borderIndex + 1, y, list, value)
        }
    }
}
export default findIndex