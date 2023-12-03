import React, { useState, useEffect, useRef } from 'react'
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
  const timerRef = useRef(null);

  useEffect(() => {
    onAmountChange(id, amount)
    if (amount === '' || isNaN(amount)) {
      timerRef.current = setTimeout(() => {
        setAmount(0);
      }, 3000);
    }
    return () => clearTimeout(timerRef.current);
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
        value={isNaN(amount) ? '' : amount.toString()}
        onChangeText={(value) => {
        const numericValue = parseInt(value, 10);
        setAmount(isNaN(numericValue) ? '' : numericValue);
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
