import {
  Pressable,
  StyleSheet,
  Text,
  PressableProps,
  StyleProp,
  ViewStyle
} from 'react-native'
import { AppColors, AppFonts, AppTextSizes } from '../../styles/AppTheme'
import Icon, { IIconProps } from '../Icon/Icon'

interface IButton extends PressableProps {
  label: string
  accent?: 'confirm' | 'cancel' | 'none'
  variant?: 'solid' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  position?: 'left' | 'rigth'
  iconProps?: IIconProps
  style?: StyleProp<ViewStyle>
}

const Button = ({
  label,
  accent = 'none',
  size = 'md',
  variant = 'solid',
  position = 'left',
  style: extendedStyles,
  iconProps,
  ...props
}: IButton) => {
  const { buttonStyle, textStyle } = buildButtonStyle(accent, variant, size)
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        buttonStyle,
        extendedStyles,
        pressed && { opacity: 0.5 }
      ]}
    >
      {({ pressed }) => (
        <Text style={[textStyle, pressed && { opacity: 0.5 }]}>
          {position === 'left' && iconProps && <Icon {...iconProps} />}
          {label}
          {position === 'rigth' && iconProps && <Icon {...iconProps} />}
        </Text>
      )}
    </Pressable>
  )
}

const buttonSizes = StyleSheet.create({
  sm: {
    fontSize: AppTextSizes.sm,
    paddingVertical: 8,
    paddingHorizontal: 10
  },
  md: {
    fontSize: AppTextSizes.md,
    paddingVertical: 8,
    paddingHorizontal: 18
  },
  lg: {
    fontSize: AppTextSizes.lg,
    paddingVertical: 8,
    paddingHorizontal: 24
  }
})

const { button } = StyleSheet.create({
  button: {
    borderRadius: 100,
    borderWidth: 2,
    alignItems: 'center'
  }
})

const colorSchemes = {
  confirm: {
    accentColor: AppColors.greenSolid
  },
  cancel: {
    accentColor: AppColors.redSolid
  },
  none: {
    accentColor: AppColors.orangeSolid
  }
}

const buildButtonStyle = (
  accent: 'confirm' | 'cancel' | 'none',
  variant: 'solid' | 'outline' | 'ghost',
  size: 'sm' | 'md' | 'lg'
) => {
  const { accentColor } = colorSchemes[accent]

  const buttonVariant = StyleSheet.create({
    solid: {
      backgroundColor: accentColor,
      borderColor: accentColor,
      color: AppColors.background
    },
    outline: {
      backgroundColor: AppColors.background,
      borderColor: accentColor,
      color: accentColor
    },
    ghost: {
      backgroundColor: AppColors.background,
      borderColor: AppColors.background,
      color: accentColor
    }
  })

  return StyleSheet.create({
    buttonStyle: {
      ...button,
      ...buttonSizes[size],
      ...buttonVariant[variant]
    },
    textStyle: {
      fontSize: buttonSizes[size].fontSize,
      color: buttonVariant[variant].color,
      fontFamily: AppFonts.bold,
    }
  })
}

export default Button
