import { useSelector, useDispatch } from 'react-redux'
import { Text, Button } from 'react-native'
export default function OutfitPage({ navigation }) {
    const selectedDay = useSelector(state => state.selectedDay.value)

    return (
        <>
            <Text style={{ fontSize: 20 }}>{selectedDay.dateString}</Text>
            <Button
                title="No Clothes? Create Some!"
                onPress={() => navigation.navigate('Create Clothes')}
            />
        </>
    )
}