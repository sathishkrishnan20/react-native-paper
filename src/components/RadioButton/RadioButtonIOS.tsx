import * as React from 'react';
import { StyleSheet, View, I18nManager } from 'react-native';
import color from 'color';
import { RadioButtonContext, RadioButtonContextType } from './RadioButtonGroup';
import { handlePress, isChecked } from './utils';
import MaterialCommunityIcon from '../MaterialCommunityIcon';
import TouchableRipple from '../TouchableRipple';
import { withTheme } from '../../core/theming';
import { Theme, $RemoveChildren } from '../../types';

type Props = $RemoveChildren<typeof TouchableRipple> & {
  /**
   * Value of the radio button
   */
  value: string;
  /**
   * Status of radio button.
   */
  status?: 'checked' | 'unchecked';
  /**
   * Whether radio is disabled.
   */
  disabled?: boolean;
  /**
   * Function to execute on press.
   */
  onPress?: () => void;
  /**
   * Custom color for radio.
   */
  color?: string;
  /**
   * @optional
   */
  theme: Theme;
  customContainerStyle?: object; 
  customViewStyle?: object; 
};

/**
 * Radio buttons allow the selection a single option from a set.
 * This component follows platform guidelines for iOS.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img src="screenshots/radio-enabled.ios.png" />
 *     <figcaption>Enabled</figcaption>
 *   </figure>
 *   <figure>
 *     <img src="screenshots/radio-disabled.ios.png" />
 *     <figcaption>Disabled</figcaption>
 *   </figure>
 * </div>
 */
class RadioButtonIOS extends React.Component<Props> {
  static displayName = 'RadioButton.IOS';

  render() {
    const { disabled, onPress, theme, status, customContainerStyle, customViewStyle, value, ...rest } = this.props;

    const checkedColor = disabled
      ? theme.colors.disabled
      : this.props.color || theme.colors.accent;

    let rippleColor: string;

    if (disabled) {
      rippleColor = color(theme.colors.text)
        .alpha(0.16)
        .rgb()
        .string();
    } else {
      rippleColor = color(checkedColor)
        .fade(0.32)
        .rgb()
        .string();
    }

    return (
      <RadioButtonContext.Consumer>
        {(context?: RadioButtonContextType) => {
          const checked =
            isChecked({
              contextValue: context?.value,
              status,
              value,
            }) === 'checked';

          return (
            <TouchableRipple
              {...rest}
              borderless
              rippleColor={rippleColor}
              onPress={
                disabled
                  ? undefined
                  : () => {
                      handlePress({
                        onPress,
                        value,
                        onValueChange: context?.onValueChange,
                      });
                    }
              }
              accessibilityTraits={disabled ? ['button', 'disabled'] : 'button'}
              accessibilityComponentType={
                checked ? 'radiobutton_checked' : 'radiobutton_unchecked'
              }
              accessibilityRole="button"
              accessibilityStates={disabled ? ['disabled'] : []}
              accessibilityLiveRegion="polite"
              style={customContainerStyle ? customContainerStyle : styles.container}
            >
               <View style={[{ opacity: checked ? 1 : 0}, customViewStyle ? customViewStyle : styles.viewStyle ]}>
                <MaterialCommunityIcon
                  allowFontScaling={false}
                  name="check"
                  size={15}
                  color={"#fff"}
                  direction={I18nManager.isRTL ? 'rtl' : 'ltr'}
                />
              </View>
            </TouchableRipple>
          );
        }}
      </RadioButtonContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 50/2,
    borderColor:'#000',
    borderWidth:0.5,
    height:16,
    width:16,
    marginTop:10,
    marginRight: 3,
  },
  viewStyle:{
    backgroundColor:"#775DA3",
   
   }
});

export default withTheme(RadioButtonIOS);

// @component-docs ignore-next-line
export { RadioButtonIOS };
