
import * as React from 'react';
import { StyleSheet, View, I18nManager } from 'react-native';
import color from 'color';
import MaterialCommunityIcon from './MaterialCommunityIcon';
import TouchableRipple from './TouchableRipple';
import { withTheme } from '../core/theming';
import { Theme, $RemoveChildren } from '../types';

type Props = $RemoveChildren<typeof TouchableRipple> & {
  /**
   * Status of checkbox.
   */
  status: 'checked' | 'unchecked' | 'indeterminate';
  /**
   * Whether checkbox is disabled.
   */
  disabled?: boolean;
  /**
   * Function to execute on press.
   */
  onPress?: () => void;
  /**
   * Custom color for checkbox.
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
 * Checkboxes allow the selection of multiple options from a set.
 * This component follows platform guidelines for iOS.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img src="screenshots/checkbox-enabled.ios.png" />
 *     <figcaption>Enabled</figcaption>
 *   </figure>
 *   <figure>
 *     <img src="screenshots/checkbox-disabled.ios.png" />
 *     <figcaption>Disabled</figcaption>
 *   </figure>
 * </div>
 */
class CheckboxIOS extends React.Component<Props> {
  static displayName = 'Checkbox.IOS';

  render() {
    const { status, disabled, onPress, customContainerStyle, customViewStyle, theme, ...rest } = this.props;
    const checked = status === 'checked';
    const indeterminate = status === 'indeterminate';

    const checkedColor = disabled
      ? theme.colors.disabled
      : this.props.color || theme.colors.accent;

    let rippleColor;

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

    const icon = indeterminate ? 'minus' : 'check';

    return (
      <TouchableRipple
        {...rest}
        borderless
        rippleColor={rippleColor}
        onPress={onPress}
        disabled={disabled}
        accessibilityTraits={disabled ? ['button', 'disabled'] : 'button'}
        accessibilityComponentType="button"
        accessibilityRole="button"
        accessibilityStates={disabled ? ['disabled'] : []}
        accessibilityLiveRegion="polite"
        style={customContainerStyle ? customContainerStyle : styles.container}
      >
         <View style={[{ opacity: indeterminate || checked ? 1 : 0 }, customViewStyle ? customViewStyle : styles.viewStyle]}>
          <MaterialCommunityIcon
           allowFontScaling={false}
           name="check"
           size={17.5}
           color={"#fff"}
           direction={I18nManager.isRTL ? 'rtl' : 'ltr'}
          />
        </View>
      </TouchableRipple>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginRight: 3,
    borderRadius: 2,
    height:16, 
    borderColor:'#000',
    borderWidth:0.5,
  },
  viewStyle:{
    marginTop:-2,
    backgroundColor:"#775DA3"
  }
});

export default withTheme(CheckboxIOS);

// @component-docs ignore-next-line
export { CheckboxIOS };
