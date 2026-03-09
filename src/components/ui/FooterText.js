import { Text, View, StyleSheet, Pressable } from 'react-native';
import { fonts } from '../../../theme/theme';
export default function FooterText({ ...props }) {
    return (
        <View style={[styles.footerText, props.style]}>
            <Text style={styles.titleText}>{props.title} </Text>
            <Pressable onPress={props.onPress}>
            <Text style={styles.subtitleText}>{props.subtitle}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create(
    {
        footerText: {
            textAlign: "center",
            marginTop: 80,
            flexDirection: 'row',
            justifyContent: 'center',

        },
        titleText:
        {
            fontFamily: fonts.Regular
        },
        subtitleText:
        {
            color: 'rgb(8, 143, 60)',
            fontFamily: fonts.Regular
        }
    }
);