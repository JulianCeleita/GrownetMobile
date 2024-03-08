import React, { useEffect, useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'

const SelectQuantity = ({
  widthOrder,
  productData,
  onAmountChange,
  counter,
  style,
}) => {
  const { id } = productData
  const [amount, setAmount] = useState(productData.amount)

  useEffect(() => {
    onAmountChange(id, amount)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount])

  return (
    <View style={widthOrder ? style.countOrderD : style.count}>
      <TouchableOpacity
        onPress={() => {
          if (amount > counter) {
            setAmount(amount - 1)
          }
        }}
      >
        <Text style={style.button}>-</Text>
      </TouchableOpacity>

      <TextInput
        style={style.countSelect}
        keyboardType="numeric"
        value={amount.toString()}
        onChangeText={(value) => {
          const formattedValue = value.replace(/,/g, '.')
          setAmount(formattedValue)
        }}
      />

      <TouchableOpacity
        onPress={() => {
          setAmount(amount + 1)
        }}
      >
        <Text style={style.button2}>+</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SelectQuantity
