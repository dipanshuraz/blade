import { Svg, Path } from '../_Svg';
import type { IconComponent } from '..';
import useIconProps from '../useIconProps';

const InvoicesIcon: IconComponent = ({ size, color }) => {
  const { height, width, iconColor } = useIconProps({ size, color });

  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19.7778 3.2H15.1333C14.6667 1.924 13.4444 1 12 1C10.5556 1 9.33333 1.924 8.86667 3.2H4.22222C3 3.2 2 4.19 2 5.4V20.8C2 22.01 3 23 4.22222 23H19.7778C21 23 22 22.01 22 20.8V5.4C22 4.19 21 3.2 19.7778 3.2ZM12 3.2C12.6111 3.2 13.1111 3.695 13.1111 4.3C13.1111 4.905 12.6111 5.4 12 5.4C11.3889 5.4 10.8889 4.905 10.8889 4.3C10.8889 3.695 11.3889 3.2 12 3.2ZM14.2222 18.6H6.44444V16.4H14.2222V18.6ZM17.5556 14.2H6.44444V12H17.5556V14.2ZM17.5556 9.8H6.44444V7.6H17.5556V9.8Z"
        fill={iconColor}
      />
    </Svg>
  );
};

export default InvoicesIcon;
