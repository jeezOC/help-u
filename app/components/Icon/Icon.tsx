import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'

export interface IIconProps {
  iconName: string
  iconSize?: 'sm' | 'md' | 'lg' | number
  iconColor?: string
}

const Icon = ({
  iconName,
  iconSize = 'md',
  iconColor,
}: IIconProps) => {
  const sizeAsNumber = typeof iconSize === 'number'
  return (
    <FontAwesomeIcon name={iconName} size={sizeAsNumber ? iconSize : iconSizes[iconSize]} color={iconColor} />
  )
};

const iconSizes = {
  sm: 12,
  md: 16,
  lg: 18,
}

export default Icon