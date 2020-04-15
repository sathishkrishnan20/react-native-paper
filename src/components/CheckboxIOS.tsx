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
    const { status, disabled, onPress, theme, ...rest } = this.props;
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
    console.log('Logging into RN CHeckbox');
    return (
      null
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
    padding: 6,
  },
});

export default withTheme(CheckboxIOS);

// @component-docs ignore-next-line
export { CheckboxIOS };
