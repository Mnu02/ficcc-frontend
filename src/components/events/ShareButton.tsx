import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import Colors from '@/constants/colors'
import { forwardRef } from 'react';

type ButtonProps = {
    text: string;
  } & React.ComponentPropsWithoutRef<typeof Pressable>;

const ShareButton = forwardRef<View | null, ButtonProps>(
  ({ text, ...pressableProps }, ref) => {
    return (
      <View style={styles.wrapper}>
        <Pressable ref={ref} style={styles.button} {...pressableProps}>
          <Image source={require('@/assets/share.png')} style={styles.icon} />
        </Pressable>
        <Text style={styles.text}>{text}</Text>
      </View>
    );
  }
);

export default ShareButton;

const SIZE = 64;
const ICON_SIZE = 24;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  button: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: Colors.eventButton,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    tintColor: 'white'
  },
  text: {
    color: Colors.text,
    fontSize: 11,
    fontWeight: 'light',
    textAlign: 'center',
    marginTop: 6,
  },
});