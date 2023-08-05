import { deleteMessageFromMessageArray } from "../redux/features/chatSlice"

const deleteMessage = (x = 0, y: number, list: string[], value: string, dispatch: any): void => {
    let borderIndex = Math.floor((x + y) / 2)

    if (list[borderIndex] == value) {
        console.log('borderIndex', borderIndex)
        console.log('list.splice(borderIndex, 1):', list.splice(borderIndex, 1))
        dispatch(deleteMessageFromMessageArray(borderIndex))
    } else {
        if (list[borderIndex] > value) {
            return deleteMessage(0, borderIndex - 1, list, value, dispatch)
        } else {
            return deleteMessage(borderIndex + 1, y, list, value, dispatch)
        }
    }
}
export default deleteMessage