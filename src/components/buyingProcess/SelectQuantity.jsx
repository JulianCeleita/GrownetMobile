import React, { useState, useEffect } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { ProductsStyle } from '../../styles/ProductsStyle'

const SelectQuantity = ({
  widthOrder,
  productData,
  onAmountChange,
  counter,
}) => {
  const { id } = productData
  const [amount, setAmount] = useState(productData.amount)

  useEffect(() => {
    onAmountChange(id, amount)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount])

  return (
    <View style={widthOrder ? ProductsStyle.countOrderD : ProductsStyle.count}>
      <TouchableOpacity
        onPress={() => {
          if (amount > counter) {
            setAmount(amount - 1)
          }
        }}
      >
        <Text style={ProductsStyle.button}>-</Text>
      </TouchableOpacity>

      <TextInput
        style={ProductsStyle.countSelect}
        keyboardType="numeric"
        value={amount.toString()}
        onChangeText={(value) => {
          setAmount(parseInt(value, 10))
        }}
      />

      <TouchableOpacity
        onPress={() => {
          setAmount(amount + 1)
        }}
      >
        <Text style={ProductsStyle.button2}>+</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SelectQuantity
