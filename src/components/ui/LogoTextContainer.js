import { Text, Image, View, StyleSheet } from 'react-native';
import { fonts } from '../../theme/theme';
import LogoMini from '../../assets/svgs/Logo2.svg';

export default function LogoTextContainer({...props}) {
    return (
        <View style={styles.topContainer}>
            <View style={styles.textContainer}>
                <Text style={styles.mainText}>{props.title}</Text>
                <Text style={styles.Text}>{props.subtitle}</Text>
            </View>
            <LogoMini  style={styles.logoImage}   />
        </View>
    );
}

const styles = StyleSheet.create(
    {
        Container: {
            flex: 1,
            padding: 22,
            marginTop: 20,
        },
        mainText: {
            fontFamily: fonts.Bold,
            fontSize: 24,
            marginTop: 12,
        },
        Text: {
            fontFamily: fonts.Light,
            fontSize: 14,
            marginTop: 12,
        },
        logoImage: {
            width: 108,
            height: 62,
            marginTop: 10,

        },

        topContainer: {
            flexDirection: "row",
            marginBottom: 60,
            marginTop: 20
        },
        textContainer: {
            fontFamily: fonts.Bold,
            fontSize: 24,
        }
    }
);