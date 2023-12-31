import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from '../../../axiosConfig'
import ProductCard from '../../components/buyingProcess/ProductCards'
import ProductCategories from '../../components/buyingProcess/ProductCategories'
import ProductsFind from '../../components/buyingProcess/ProductsFind'
import { supplierCategorie, supplierProducts } from '../../config/urls.config'
import useOrderStore from '../../store/useOrderStore'
import useTokenStore from '../../store/useTokenStore'
import { ProductsStyle } from '../../styles/ProductsStyle'

export default function Products() {
  const navigation = useNavigation()
  const { token } = useTokenStore()

  const [showSearchResults, setShowSearchResults] = useState(false)
  const [products, setProducts] = useState([])
  const [articles, setArticles] = useState(products)
  const { articlesToPay, selectedSupplier, selectedRestaurant } =
    useOrderStore()
  const { t } = useTranslation()
  const [showProductSearch, setShowProductSearch] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [resetInput, setResetInput] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [loader, setLoader] = useState(false)
  const [continuePagination, setContinuePagination] = useState(true)

  const fetchProducts = async (page) => {
    if (loader === false && continuePagination) {
      try {
        setLoader(true)
        const requestBody = {
          id: selectedSupplier.id,
          accountNumber: selectedRestaurant.accountNumber,
          //To do quitar country
          //country: 44,
          page: page,
        }

        const response = await axios.post(`${supplierProducts}`, requestBody, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const defaultProducts = response.data.products

        if (defaultProducts.length === 0) {
          // Si no hay más productos, detener la carga.
          setContinuePagination(false)
          setLoader(false)
          return
        }

        const productsWithTax = defaultProducts
          .filter((product) => product.prices.some((price) => price.nameUoms))
          .map((product) => {
            const pricesWithTax = product.prices.map((price) => {
              const priceWithTaxCalculation = (
                price.price +
                price.price * price.tax
              ).toFixed(2)
              return {
                ...price,
                priceWithTax:
                  isNaN(priceWithTaxCalculation) ||
                  parseFloat(priceWithTaxCalculation) === 0
                    ? null
                    : priceWithTaxCalculation,
              }
            })

            return {
              ...product,
              amount: 0,
              uomToPay: product.prices[0].nameUoms,
              idUomToPay: product.prices[0].id,
              prices: pricesWithTax,
            }
          })
          .filter((product) =>
            product.prices.some(
              (price) =>
                price.priceWithTax && parseFloat(price.priceWithTax) > 0,
            ),
          )

        setArticles((prevProducts) => {
          const newProducts = productsWithTax
            .map((product) => {
              const existingProduct = articlesToPay.find(
                (prevProduct) => prevProduct.id === product.id,
              )

              return existingProduct || product
            })
            .filter(
              (product, index, self) =>
                index === self.findIndex((t) => t.id === product.id),
            )

          setLoader(false)

          return newProducts
        })
      } catch (error) {
        console.error('Error al obtener los productos del proveedor:', error)
        setLoader(false)
      }
    }
  }

  useEffect(() => {
    fetchProducts(currentPage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [continuePagination])

  // PAGINACION

  const handleScroll = (event) => {
    if (selectedCategory === 'All' && loader === false) {
      const { contentOffset, contentSize, layoutMeasurement } =
        event.nativeEvent

      const offsetY = contentOffset.y
      const contentHeight = contentSize.height
      const screenHeight = layoutMeasurement.height
      const seventyPercentPosition = contentHeight * 0.7

      if (offsetY >= seventyPercentPosition && continuePagination) {
        setCurrentPage((prevPage) => {
          const updatedPage = prevPage + 1
          fetchProducts(updatedPage)
          return updatedPage
        })
      }
    } else {
      return
    }
  }

  // TRAER PRODUCTOS POR CATEGORIA
  const fetchProductsByCategory = async (categoryId) => {
    setLoader(true)
    if (categoryId === 'All') {
      setCurrentPage(0)
      await fetchProducts(currentPage)
      return
    }
    setCurrentPage(0)
    const requestBody = {
      supplier: selectedSupplier.id,
      categorie: categoryId,
      accountNumber: selectedRestaurant.accountNumber,
    }

    try {
      const response = await axios.post(supplierCategorie, requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const categorizedProducts = response.data.products

      const productsWithTax = categorizedProducts
        .filter((product) => product.prices.some((price) => price.nameUoms))
        .map((product) => {
          const pricesWithTax = product.prices.map((price) => {
            const priceWithTaxCalculation = (
              price.price +
              price.price * price.tax
            ).toFixed(2)
            return {
              ...price,
              priceWithTax:
                isNaN(priceWithTaxCalculation) ||
                parseFloat(priceWithTaxCalculation) === 0
                  ? null
                  : priceWithTaxCalculation,
            }
          })

          return {
            ...product,
            amount: 0,
            uomToPay: product.prices[0].nameUoms,
            idUomToPay: product.prices[0].id,
            prices: pricesWithTax,
          }
        })
        .filter((product) =>
          product.prices.some(
            (price) => price.priceWithTax && parseFloat(price.priceWithTax) > 0,
          ),
        )
      setArticles((prevProducts) => {
        const newProducts = productsWithTax
          .map((product) => {
            const existingProduct = articlesToPay.find(
              (prevProduct) => prevProduct.id === product.id,
            )

            return existingProduct || product
          })
          .filter(
            (product, index, self) =>
              index === self.findIndex((t) => t.id === product.id),
          )

        setLoader(false)

        return newProducts
      })
    } catch (error) {
      console.error('Error al obtener los productos por categoría:', error)
    }
  }
  const resetInputSearcher = () => {
    setResetInput((prevKey) => prevKey + 1)
  }
  const toggleShowFavorites = async () => {
    setSelectedCategory('All')
    resetInputSearcher()
  }
  const toggleShowFavorites2 = async () => {
    resetInputSearcher()
  }

  // CAMBIO DE CANTIDAD DE ARTICULOS
  const handleAmountChange = (productId, newAmount) => {
    setArticles((prevArticles) =>
      prevArticles.map((article) =>
        article.id === productId ? { ...article, amount: newAmount } : article,
      ),
    )

    const currentArticlesToPay = articlesToPay

    const productExists = currentArticlesToPay.some(
      (article) => article.id === productId,
    )

    const product = articles.find((article) => article.id === productId)

    if (productExists) {
      useOrderStore.setState((prevState) => ({
        articlesToPay: prevState.articlesToPay.map((article) =>
          article.id === productId && newAmount > 0
            ? { ...product, amount: newAmount }
            : article,
        ),
      }))
    } else if (newAmount > 0) {
      useOrderStore.setState((prevState) => ({
        articlesToPay: [
          ...prevState.articlesToPay,
          { ...product, amount: newAmount },
        ],
      }))
    }
  }

  // CAMBIO DE UOM DE ARTICULOS (EACH, BOX, KG)
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
  }

  const filterCategories = async (category, categoryId) => {
    setSelectedCategory(category)

    resetInputSearcher()
    try {
      await fetchProductsByCategory(categoryId)
    } catch (error) {
      console.error('Error al obtener productos al mostrar categoría:', error)
    }
  }

  //Filtro

  const toggleProductSearch = () => {
    setShowProductSearch(!showProductSearch)
  }
  const onPressHandler = () => {
    toggleProductSearch()
  }
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ marginRight: 22 }}>
          <TouchableOpacity onPress={onPressHandler}>
            <Ionicons name="search-circle-outline" size={32} color="#04444f" />
          </TouchableOpacity>
        </View>
      ),
    })
  }, [toggleProductSearch])

  return (
    <View style={styles.container}>
      {/*showProductSearch && (
        <ProductSearcher
          products={articlesToPay}
          setShowSearchResults={setShowSearchResults}
          resetInput={resetInput}
        />
      )*/}

      <SafeAreaView style={ProductsStyle.containerCards}>
        <ScrollView onMomentumScrollEnd={handleScroll}>
          <View
            style={{
              backgroundColor: 'white',
            }}
          >
            <ProductCategories
              toggleShowFavorites={toggleShowFavorites}
              toggleShowFavorites2={toggleShowFavorites2}
              filterCategory={filterCategories}
              selectedCategory={selectedCategory}
            />
          </View>
          {showSearchResults ? (
            <ProductsFind
              onAmountChange={handleAmountChange}
              onUomChange={handleUomChange}
            />
          ) : (
            <>
              <>
                {articles
                  .filter((article) => {
                    if (selectedCategory === 'All') {
                      return true
                    }
                    return article.nameCategorie === selectedCategory
                  })
                  .map((article) => (
                    <ProductCard
                      key={article.id}
                      productData={article}
                      onAmountChange={handleAmountChange}
                      onUomChange={handleUomChange}
                      fetchProducts={fetchProducts}
                      currentPage={currentPage}
                    />
                  ))}
              </>
            </>
          )}
          {loader && (
            <View style={styles.loadingMore}>
              <ActivityIndicator
                animating={isLoading}
                color="#026CD2"
                size="large"
                style={isLoading ? styles.loading : styles.hidden}
              />
            </View>
          )}
          <View style={{ height: 220 }} />
        </ScrollView>
      </SafeAreaView>
      {/*<View style={ProductsStyle.viewCategories} />
      <ProductCategories
        showFavorites={showFavorites}
        toggleShowFavorites={toggleShowFavorites}
        toggleShowFavorites2={toggleShowFavorites2}
        filterCategory={filterCategories}
        selectedCategory={selectedCategory}
          />*/}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'white',
  },

  loadingMore: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  StyleText: {
    textAlign: 'center',
    color: '#04444f',
    fontSize: 15,
  },
})
