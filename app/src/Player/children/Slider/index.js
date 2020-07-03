import React  from  'react'
import PropTypes from 'prop-types'
import  { default as MaterialSlider } from '@material-ui/core/Slider'
import Tooltip from '@material-ui/core/Tooltip'

function ValueLabelComponent({ children, open, value }) {
  const realValue = Math.round(value)

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={realValue}>
      {children}
    </Tooltip>
  )
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
}

const Slider = ({ value = 0, onSeek }) => {
    const onSeekWrapper = (_, value) => onSeek(value)
    return (
        <div style={{ margin: '0 15px' }}>
            <MaterialSlider
                ValueLabelComponent={ValueLabelComponent}
                defaultValue={0}
                value={value}
                onChange={onSeekWrapper}
            />
        </div>
    )
}

Slider.propTypes = {
    onSeek: PropTypes.func.isRequired,
    value: PropTypes.number
}

export default Slider
