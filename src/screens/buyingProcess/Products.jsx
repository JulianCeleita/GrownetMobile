import React, { useEffect, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ActivityIndicator } from 'react-native-paper'
import axios from '../../../axiosConfig'
import ProductCard from '../../components/buyingProcess/ProductCards'
import ProductCategories from '../../components/buyingProcess/ProductCategories'
import ProductSearcher from '../../components/buyingProcess/ProductSearch'
import ProductsFind from '../../components/buyingProcess/ProductsFind'
import useOrderStore from '../../store/useOrderStore'
import useTokenStore from '../../store/useTokenStore'
import {
  favoritesBySupplier,
  supplierCategorie,
  supplierProducts,
} from '../../config/urls.config'
import { ProductsStyle } from '../../styles/ProductsStyle'
import { useTranslation } from 'react-i18next'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function Products() {
  const navigation = useNavigation()
  const { token } = useTokenStore()
  const [showFavorites, setShowFavorites] = useState(false)
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [products, setProducts] = useState([])
  const [articles, setArticles] = useState(products)
  const { articlesToPay, selectedSupplier, selectedRestaurant, categories } =
    useOrderStore()
  const { t } = useTranslation()
  const [showProductSearch, setShowProductSearch] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [resetInput, setResetInput] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [loader, setLoader] = useState(false)

  const fetchProducts = async (page) => {
    if (loader === false) {
      try {
        setLoader(true)
        const requestBody = {
          id: selectedSupplier.id,
          accountNumber: selectedRestaurant.accountNumber,
          page: page,
        }

        const response = await axios.post(`${supplierProducts}`, requestBody, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        console.log('SE HIZO UNA PETICIÓN CON LA PAGINA:', page)
        const defaultProducts = response.data.products

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
          const productIds = new Set(prevProducts.map((p) => p.id))
          const newProducts = productsWithTax.filter(
            (p) => !productIds.has(p.id),
          )
          setTimeout(() => {
            setLoader(false)
          }, 2000)

          return [...prevProducts, ...newProducts]
        })
      } catch (error) {
        console.error('Error al obtener los productos del proveedor:', error)
      }
    }
  }

  useEffect(() => {
    fetchProducts(currentPage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  // PAGINACION

  const handleScroll = (event) => {
    if (selectedCategory === 'All' && loader === false) {
      const { contentOffset, contentSize, layoutMeasurement } =
        event.nativeEvent

      const offsetY = contentOffset.y
      const contentHeight = contentSize.height
      const screenHeight = layoutMeasurement.height

      if (offsetY >= contentHeight - screenHeight - 80) {
        setCurrentPage((prevPage) => prevPage + 1)
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

      const updatedArticlesToPay = [
        ...articlesToPay,
        ...productsWithTax,
      ].filter(
        (product, index, self) =>
          index ===
          self.findIndex(
            (p) => p.id === product.id && p.uomToPay === product.uomToPay,
          ),
      )

      useOrderStore.setState({ articlesToPay: updatedArticlesToPay })

      setArticles(updatedArticlesToPay)
      setProducts(updatedArticlesToPay)
      setLoader(false)
    } catch (error) {
      console.error('Error al obtener los productos por categoría:', error)
    }
  }

  // TODO AGREGAR LA LOGICA DE LOS FAVORITOS DESDE LA PWA

  const resetInputSearcher = () => {
    setResetInput((prevKey) => prevKey + 1)
  }
  const fetchFavorites = async () => {
    setLoader(true)
    setCurrentPage(0)
    const requestBody = {
      supplier_id: selectedSupplier.id,
      accountNumber: selectedRestaurant.accountNumber,
    }

    try {
      const response = await axios.post(favoritesBySupplier, requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const defaultFavorites = response.data.favorites

      const productsWithTax = defaultFavorites
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
        .filter((product) => {
          const isValidProduct = product.prices.some(
            (price) => price.priceWithTax && parseFloat(price.priceWithTax) > 0,
          )

          return isValidProduct
        })

      // setArticles((prevProducts) => {
      //   const productIds = new Set(prevProducts.map((p) => p.id));
      //   const newProducts = productsWithTax.filter(
      //     (p) => !productIds.has(p.id)
      //   );
      //   return [...prevProducts, ...newProducts];
      // });

      setArticles(productsWithTax)

      setLoader(false)
    } catch (error) {
      console.error('Error al obtener los productos favoritos:', error)
    }
  }
  const toggleShowFavorites = async () => {
    setShowFavorites(!showFavorites)
    setSelectedCategory('All')
    resetInputSearcher()
    try {
      await fetchFavorites()
    } catch (error) {
      console.error('Error al obtener productos al mostrar favoritos:', error)
    }
  }
  const toggleShowFavorites2 = async () => {
    setShowFavorites(!showFavorites)
    resetInputSearcher()
    try {
      await fetchProducts(currentPage)
    } catch (error) {
      console.error('Error al obtener productos al mostrar favoritos:', error)
    }
  }

  // CAMBIO DE CANTIDAD DE ARTICULOS
  const handleAmountChange = (productId, newAmount) => {
    setArticles((prevArticles) =>
      prevArticles.map((article) =>
        article.id === productId ? { ...article, amount: newAmount } : article,
      ),
    )
    const updatedArticlesToPay = articles.map((article) =>
      article.id === productId ? { ...article, amount: newAmount } : article,
    )

    useOrderStore.setState({ articlesToPay: updatedArticlesToPay })
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
    useOrderStore.setState({ articlesToPay: updatedArticlesToPay })
  }

  const filterCategories = async (category, categoryId) => {
    setSelectedCategory(category)
    setShowFavorites(false)
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
              showFavorites={showFavorites}
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
              {showFavorites ? (
                <>
                  <Text style={styles.StyleText}>
                    {t('favorites.findFirstPart')}{' '}
                    {articles.filter((article) => article.active === 1).length}{' '}
                    {t('favorites.findSecondPart')}{' '}
                  </Text>
                  {articles
                    .filter((article) => article.active === 1)
                    .map((article) => (
                      <View key={article.id}>
                        <ProductCard
                          key={article.id}
                          productData={article}
                          onAmountChange={handleAmountChange}
                          onUomChange={handleUomChange}
                          fetchProducts={fetchProducts}
                          currentPage={currentPage}
                          fetchFavorites={fetchFavorites}
                          opacity
                        />
                      </View>
                    ))}
                </>
              ) : (
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
              )}
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
