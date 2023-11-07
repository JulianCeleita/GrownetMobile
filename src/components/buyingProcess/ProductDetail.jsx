/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import SelectQuantity from './SelectQuantity'
import { Dropdown } from 'react-native-element-dropdown'
import { ProductsStyles } from '../../styles/Styles'
import useOrderStore from '../../store/useOrderStore'
import DeleteProduct from './DeleteProduct'
import { OrderDetailStyle } from '../../styles/OrderDetailStyle'
export default function ProductDetail({
  updateTotalToPay,
  updateTotalTaxes,
  updateTotalNet,
}) {
  const [isFocus, setIsFocus] = useState(false)
  const counter = 1
  const { articlesToPay, setArticlesToPay } = useOrderStore()
  // ACTUALIZAR CANTIDAD DE ARTICULOS
  const [articles, setArticles] = useState(articlesToPay)
  useEffect(() => {
    setArticles(articlesToPay)
  }, [articles, articlesToPay])

  const handleAmountChange = (productId, newAmount) => {
    setArticles((prevArticles) =>
      prevArticles.map((article) =>
        article.id === productId ? { ...article, amount: newAmount } : article,
      ),
    )
    const updatedArticlesToPay = articles.map((article) =>
      article.id === productId
        ? {
            ...article,
            amount: newAmount,
          }
        : article,
    )
    setArticlesToPay(updatedArticlesToPay)

    const newTotalToPay = calculateTotalToPay(updatedArticlesToPay)
    updateTotalToPay(newTotalToPay)
  }

  // ACTUALIZAR UOMTOPAY DE ARTICULOS
  const handleUomChange = (productId, newUomToPay) => {
    const updatedArticlesToPay = articles.map((article) => {
      if (article.id === productId) {
        const selectedPrice = article.prices.find(
          (price) => price.nameUoms === newUomToPay,
        )
        return {
          ...article,
          uomToPay: newUomToPay,
          idUomToPay: selectedPrice.id,
          priceWithTax: selectedPrice.priceWithTax,
        }
      }
      return article
    })
    setArticles(updatedArticlesToPay)
    useOrderStore.setState({ articlesToPay: updatedArticlesToPay })
  }

  // CALCULAR EL NETO
  const calculateItemNet = (prices, amount, uomToPay) => {
    const selectedPrice = prices.find((price) => price.nameUoms === uomToPay)
    const net = selectedPrice.price * amount
    return parseFloat(net.toFixed(2))
  }

  const calculateTotalNet = (articls) => {
    const totalNet = articls.reduce((total, article) => {
      const itemNet = calculateItemNet(
        article.prices,
        article.amount,
        article.uomToPay,
      )
      return total + itemNet
    }, 0)
    return parseFloat(totalNet.toFixed(2))
  }

  // CALCULAR TAXES
   // CALCULAR TAXES 
   const calculateItemTaxes = (prices, tax, amount, uomToPay) => {
    const selectedPrice = prices.find((price) => price.nameUoms === uomToPay);
    if (!selectedPrice || isNaN(tax) || isNaN(amount)) {
      return 0;
    }
    const taxes = selectedPrice.price * tax * amount;
    const parsedTaxes = parseFloat(taxes.toFixed(2));
  return isNaN(parsedTaxes) ? 0 : parsedTaxes;
  };

  const calculateTotalTaxes = (articls) => {
    const totalTaxes = articls.reduce((total, article) => {
      const itemTaxes = calculateItemTaxes(
        article.prices,
        article.tax,
        article.amount,
        article.uomToPay,
      )
      return total + itemTaxes
    }, 0)
    return parseFloat(totalTaxes.toFixed(2))
  }

  // CALCULAR TOTAL A PAGAR
  const calculateItemToPay = (article, amount) => {
    const selectedPrice = article.prices.find(
      (price) => price.nameUoms === article.uomToPay,
    )
    const total = selectedPrice.priceWithTax * amount
    const totalItemToPay = parseFloat(total.toFixed(2))

    const selectedPriceWithTax = selectedPrice.priceWithTax

    if ('totalItemToPay' in article) {
      article.totalItemToPay = totalItemToPay
    } else {
      Object.assign(article, { totalItemToPay })
    }

    if ('selectedPriceWithTax' in article) {
      article.selectedPriceWithTax = selectedPriceWithTax
    } else {
      Object.assign(article, { selectedPriceWithTax })
    }

    return totalItemToPay
  }

  const calculateTotalToPay = (articls) => {
    const filteredArticles = articls.filter((article) => article.amount > 0)
    const totalToPay = filteredArticles.reduce((total, article) => {
      return total + article.totalItemToPay
    }, 0)
    return parseFloat(totalToPay.toFixed(2))
  }

  useEffect(() => {
    const newTotalTaxes = calculateTotalTaxes(articles)
    updateTotalTaxes(newTotalTaxes)

    const newTotalToPay = calculateTotalToPay(articles)
    updateTotalToPay(newTotalToPay)

    const newTotalNet = calculateTotalNet(articles)
    updateTotalNet(newTotalNet)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articles])

  return (
    <View>
      {articles
        .filter((article) => article.amount > 0)
        .map((article) => (
          <View key={article.id}>
            <View style={OrderDetailStyle.cardProduct}>
              <Text style={OrderDetailStyle.textProductView}>
                {article.name}
              </Text>
              <View style={OrderDetailStyle.cardTotal}>
                <Text style={OrderDetailStyle.textSecondProductView}>
                  {' '}
                  £ {calculateItemToPay(article, article.amount)}
                </Text>
                <DeleteProduct
                  articles={articles}
                  setArticles={setArticles}
                  article={article}
                  articlesToPay={articlesToPay}
                  setArticlesToPay={setArticlesToPay}
                  calculateTotalToPay={calculateTotalToPay}
                  updateTotalToPay={updateTotalToPay}
                />
              </View>
            </View>
            {
              <View style={OrderDetailStyle.cardProduct}>
                <View style={ProductsStyles.containSelect}>
                  <SelectQuantity
                    widthOrder
                    productData={article}
                    onAmountChange={handleAmountChange}
                    counter={counter}
                  />
                </View>
                <Dropdown
                  style={[
                    styles.dropdown,
                    isFocus && { borderColor: '#04444f' },
                  ]}
                  containerStyle={{
                    borderRadius: 20,
                    color: '#04444f',
                  }}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  data={article.prices}
                  maxHeight={200}
                  labelField="nameUoms"
                  valueField="nameUoms"
                  placeholder={!isFocus ? 'Unit' : '...'}
                  value={article.uomToPay}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(event) => {
                    const { nameUoms } = event
                    handleUomChange(article.id, nameUoms)
                  }}
                />
              </View>
            }
          </View>
        ))}
    </View>
  )
}
const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: '#f2f2f2',
    borderWidth: 1.5,
    backgroundColor: 'white',
    borderRadius: 51,
    paddingHorizontal: 8,
    width: 100,
  },
  extraSpace: {
    height: 225,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#04444f',
    fontFamily: 'PoppinsMedium',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#04444f',
    fontFamily: 'PoppinsMedium',
  },
})
