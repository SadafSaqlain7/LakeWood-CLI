import { Text, View, StyleSheet} from 'react-native';
import { fonts } from '../../theme/theme';
export default function Divider({style})
{
    return (
        <View style={[styles.container , style]}>
                <View style={styles.line} />
                <Text style={styles.text}>or</Text>
                <View style={styles.line} />
              </View>
    );
}
const styles = StyleSheet.create({
    container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    marginBottom: 40
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
    marginLeft: 10,
    marginRight: 10
  },
  text: {
    marginHorizontal: 10,
    color: 'black',
    fontSize: 14,
    fontFamily: fonts.Bold
  },
});