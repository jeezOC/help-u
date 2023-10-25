import { StyleSheet } from "react-native";

export const AppColors = {
  background: '#F5F5F5',
  white: '#FFF',
  gray: '#E2E2E2',
  notBlack: '#141414',
  orangeSolid: '#F79321',
  orangeGhost: '#FBC990',
  greenSolid: '#8BC53B',
  greenGhost: '#C5E29D',
  redSolid: '#FF3B30',
  redGhost: '#FF9D98',
}

export const AppTextSizes = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
}

export const StackStyles = StyleSheet.create({
  headerContainer: {
    backgroundColor: AppColors.orangeSolid,
    borderBottomWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  title: {
    color: AppColors.white,
    fontSize: AppTextSizes.lg,
    fontWeight: '700',
    margin: 0,
    padding: 0
  },
  rightButton: {
    color: AppColors.white,
    fontSize: AppTextSizes.md,
  },
  leftButton: {
    color: AppColors.white,
    fontSize: AppTextSizes.md,
  },
  contentContainer: {
    backgroundColor: AppColors.white,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export const PageNotFoundStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  textTitle: {
    color: AppColors.orangeSolid,
    fontSize: AppTextSizes.xl * 2,
    fontWeight: '500',
  },
  textDescription: {
    color: AppColors.notBlack,
    fontSize: AppTextSizes.xl * 2,
    fontWeight: '500',
  },
});

export const LoadingPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  text: {
    color: AppColors.notBlack,
    fontSize: AppTextSizes.xl * 2,
    fontWeight: '500',
  },
});