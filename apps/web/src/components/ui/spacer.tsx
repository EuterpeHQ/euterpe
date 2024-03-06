import React from "react";
import PropTypes from "prop-types";

function Spacer({
  horizontal = false,
  size,
}: {
  horizontal?: boolean;
  size: number;
}) {
  const defaultValue = "auto";
  const style = {
    width: horizontal ? size : defaultValue,
    height: !horizontal ? size : defaultValue,
  };

  return <div style={style} />;
}

Spacer.propTypes = {
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  horizontal: PropTypes.bool,
};

export default Spacer;
