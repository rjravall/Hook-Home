import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

function LinearGradient_primary({
  colors = ['#E9584E', '#E62371'],
  angle = 223.07,
  useAngle = true,
  style,
  children,
}) {
  return (
    <LinearGradient
      colors={colors}
      style={style}
      angle={angle}
      useAngle={useAngle}>
      {children}
    </LinearGradient>
  );
}

export default LinearGradient_primary;
