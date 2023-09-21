import { Button, View } from "react-native"
import { FIREBASE_AUTH } from "../../FirebaseConfig"
import AppContext from "../../context/appContext"
import React from "react"
import useContext from "react"

export default function ProfileScreen() {
    return (
        <View>
            <Button title="Logout" onPress={() => FIREBASE_AUTH.signOut()}></Button>
        </View>
    )
}