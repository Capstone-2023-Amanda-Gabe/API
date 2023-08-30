import { useSelector, useDispatch } from 'react-redux'
import { Text } from 'react-native'
export default function OutfitPage() {
    const selectedDay = useSelector(state => state.selectedDay.value)

    return (
        <>
        <Text>{selectedDay.dateString}</Text>
        </>
    )
}