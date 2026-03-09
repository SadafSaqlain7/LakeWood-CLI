import { View, Text, StyleSheet, Pressable } from 'react-native';
import { fonts } from '../../../theme/theme';

export default function ActionButton({ ...props }) {
    return (

        <Pressable style={styles.Button} onPress={props.onPress}>
            <Text style={styles.text}>{props.title}</Text>
        </Pressable>

    )
}

const styles = StyleSheet.create(
    {
        text:
        {
            color: 'white',
            fontFamily: fonts.SemiBold,
            marginLeft: 10,

        },
        Button:
        {
            color: 'white',
            borderRadius: 12,
            backgroundColor: "#rgb(1, 110, 38)167738",
            paddingVertical: 15,
            borderRadius: 25,
            marginBottom: 20,
            alignItems: "center",
            justifyContent: 'center',
            flexDirection: 'row'
        },
    }
);