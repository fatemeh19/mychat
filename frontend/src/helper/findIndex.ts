import { deleteMessageFromMessageArray } from "../redux/features/chatSlice"

const findIndex = (x = 0, y: number, list: string[], value: string, dispatch: any): void => {
    let borderIndex = Math.floor((x + y) / 2)

    if (list[borderIndex] == value) {
        console.log('borderIndex', borderIndex)
        console.log('list.splice(borderIndex, 1):', list.splice(borderIndex, 1))
        dispatch(deleteMessageFromMessageArray(borderIndex))
        return
        // return borderIndex
    } else {
        if (list[borderIndex] > value) {
            return findIndex(0, borderIndex - 1, list, value, dispatch)
        } else {
            return findIndex(borderIndex + 1, y, list, value, dispatch)
        }
    }
}
export default findIndex