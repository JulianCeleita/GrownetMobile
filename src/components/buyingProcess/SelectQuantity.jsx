import React, { useState, useEffect, useRef } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { ProductsStyle } from '../../styles/ProductsStyle'

const SelectQuantity = ({
  widthOrder,
  productData,
  onAmountChange,
  counter,
  style,
  onAmountUpdate,
}) => {
  const { id } = productData
  const [amount, setAmount] = useState(productData.amount)
  console.log(amount, 'En select')
  useEffect(() => {
    onAmountChange(id, amount)
    onAmountUpdate && onAmountUpdate(amount)
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
          const numericValue = parseInt(value, 10)
          if (isNaN(numericValue)) {
            setAmount('')
          } else {
            setAmount(numericValue)
          }
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
