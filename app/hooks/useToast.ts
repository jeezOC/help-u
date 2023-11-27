import NativeToast from 'react-native-root-toast';
import { AppColors, AppFonts, AppTextSizes } from '../styles/AppTheme';

interface IToast {
  message: string;
  duration?: number;
  type?: 'success' | 'error' | 'warning' | 'default';
  hideOnPress?: boolean;
}

const colors = {
  success: AppColors.greenGhost,
  error: AppColors.redGhost,
  warning: AppColors.orangeGhost,
  default: AppColors.gray,
}

const useToast = () => {
  return (config: IToast) => {
    const { message, duration = 3000, hideOnPress = true, type = 'default' } = config;
    return NativeToast.show(message, {
      duration: NativeToast.durations.LONG,
      position: NativeToast.positions.BOTTOM,
      shadow: false,
      animation: true,
      hideOnPress,
      delay: 0,
      textStyle:{
        fontSize: AppTextSizes.sm,
        fontFamily: AppFonts.regular,
        color: AppColors.notBlack,
      },
      containerStyle:{
        backgroundColor: colors[type],
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
      },
      opacity:1
    });
  }
}

export default useToast;
