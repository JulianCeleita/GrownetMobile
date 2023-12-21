import {
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native'
import React, { useEffect } from 'react'
import { ApiSuppliers } from '../../config/urls.config'
import { SuppliersStyle } from '../../styles/SupplierStyle'
import axios from '../../../axiosConfig'
import useOrderStore from '../../store/useOrderStore'
import useTokenStore from '../../store/useTokenStore'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const Suppliers = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const { token } = useTokenStore()
  const {
    suppliers,
    setSuppliers,
    setSelectedSupplier,
    selectedSupplier: currentSelectedSupplier,
    setArticlesToPay,
    selectedRestaurant,
  } = useOrderStore()

  useEffect(() => {
    if (selectedRestaurant === null) {
      navigation.navigate('restaurants')
      return
    }
    async function fetchData() {
      const requestBody = {
        accountNumber: selectedRestaurant.accountNumber,
      }

      try {
        const response = await axios.post(`${ApiSuppliers}`, requestBody, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setSuppliers(response.data.supplier)
      } catch (error) {
        console.error('Error al obtener los proveedores:', error)
      }
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSupplierSelect = (supplier) => {
    setSelectedSupplier(supplier)
    if (currentSelectedSupplier?.id !== supplier.id) {
      setArticlesToPay([])
    }
  }

  const onPressAdd = () => {
    navigation.navigate('TabNavigator', { screen: 'Chat' })
  }
  const iosStyles = Platform.OS === 'ios' ? { flex: 1, marginTop: 15 } : {}
  return (
    <SafeAreaView style={{ ...iosStyles }}>
      <ScrollView>
        <View style={SuppliersStyle.suppliers}>
          {suppliers.map((supplier) => {
            return (
              <TouchableOpacity
                key={supplier.id}
                onPress={() => {
                  handleSupplierSelect(supplier)
                  navigation.navigate('TabNavigator')
                }}
              >
                <ImageBackground
                  resizeMode="cover"
                  style={[
                    SuppliersStyle.suppliersBg,
                    { marginBottom: Platform.OS === 'ios' ? 10 : null },
                  ]}
                  key={supplier.id}
                  source={{
                    uri: supplier.image,
                    cache: 'reload',
                  }}
                />
              </TouchableOpacity>
            )
          })}
          <TouchableOpacity
            onPress={onPressAdd}
            style={SuppliersStyle.buttonAddCont}
          >
            <View style={SuppliersStyle.containButtonAdd}>
              <Ionicons
                name="add-circle-outline"
                size={34}
                color="#ffff"
                style={{ padding: 10 }}
              />
              <Text style={SuppliersStyle.textAddRestaurant}>
                {t('suppliers.addSuppliers')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Suppliers
