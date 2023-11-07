import React, { useState } from 'react'
import { Checkbox } from 'react-native-paper'

function CheckList() {
  const [checked, setChecked] = useState(false)

  const onToggleCheckbox = () => {
    setChecked(!checked)
  }

  return (
    <Checkbox
      status={checked ? 'checked' : 'unchecked'}
      onPress={onToggleCheckbox}
    />
  )
}

export default CheckList
