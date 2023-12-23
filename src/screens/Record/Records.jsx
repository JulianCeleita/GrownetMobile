import { Ionicons } from '@expo/vector-icons'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from '../../../axiosConfig'
import { allStorageOrders } from '../../config/urls.config'
import Settings from '../../screens/settings/Settings'
import useOrderStore from '../../store/useOrderStore'
import useRecordStore from '../../store/useRecordStore'
import useTokenStore from '../../store/useTokenStore'
import { RecordStyle } from '../../styles/RecordStyle'
import { GlobalStyles } from '../../styles/Styles'

const Records = () => {
  const { t } = useTranslation()
  const { token } = useTokenStore()
  const navigation = useNavigation()
  const {
    allOrders,
    setAllOrders,
    setSelectedPendingOrder,
    setSelectedClosedOrder,
  } = useRecordStore()
  const { selectedRestaurant } = useOrderStore()
  const apiOrders = allStorageOrders + selectedRestaurant.accountNumber
  const [activeTab, setActiveTab] = useState('allOrders')
  const switchTab = () => {
    setActiveTab((prevTab) =>
      prevTab === 'allOrders' ? 'settings' : 'allOrders',
    )
  }
  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        if (selectedRestaurant === null) {
          navigation.navigate('restaurants')
          return
        }
        try {
          const response = await axios.get(apiOrders, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          const allOrders = response.data.orders
          allOrders.sort(
            (a, b) => new Date(b.created_date) - new Date(a.created_date),
          )
          setAllOrders(allOrders)
        } catch (error) {
          console.log('Error al llamar las ordenes', error)
        }
      }
      fetchData()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apiOrders]),
  )

  //MANEJADOR DE ORDEN SELECCIONADA
  const handleOrderSelected = (order) => {
    console.log('orderReference.id_stateorder', order.reference)
    if (order.id_stateOrders === 5) {
      setSelectedClosedOrder(order.reference)
      navigation.navigate('pastRecord')
    } else {
      setSelectedPendingOrder(order.reference)
      navigation.navigate('pendingRecord')
    }
  }

  return (
    <SafeAreaView style={RecordStyle.record}>
      <ScrollView>
        <View style={[RecordStyle.tabContainer, GlobalStyles.boxShadow]}>
          {/* SWITCH ENTRE SETTINGS Y ORDERS */}
          <TouchableOpacity
            style={[
              {
                flex: 1,
                backgroundColor:
                  activeTab === 'allOrders' ? '#62c471' : 'white',
                padding: 10,
                alignItems: 'center',
              },
              RecordStyle.btnTab,
            ]}
            onPress={switchTab}
          >
            <Text
              style={{
                marginTop: 5,
                fontFamily: 'PoppinsRegular',
                color: activeTab === 'allOrders' ? 'white' : '#04444f',
              }}
            >
              {t('record.allOrders')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              {
                flex: 1,
                backgroundColor: activeTab === 'settings' ? '#62c471' : 'white',
                padding: 10,
                alignItems: 'center',
              },
              RecordStyle.btnTab,
            ]}
            onPress={() => setActiveTab('settings')}
          >
            <Text
              style={{
                marginTop: 5,
                fontFamily: 'PoppinsRegular',
                color: activeTab === 'settings' ? 'white' : '#04444f',
              }}
            >
              {t('record.settings')}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          {/* VISTA SI ESTÁ SETTINGS SELECCIONADO */}
          {activeTab === 'settings' ? (
            <Settings />
          ) : (
            <View>
              {/* VISTA SI ESTÁ ORDERS SELECCIONADO */}
              {/* AVISO DE QUE NO HAY ORDENES */}
              {allOrders.length === 0 ? (
                <View style={RecordStyle.recordZero}>
                  <Image
                    source={require('../../../assets/img/img-succesful.png')}
                  />
                  <Text style={RecordStyle.textZero}>
                    {t('record.noOrders')}
                  </Text>
                  <TouchableOpacity
                    style={GlobalStyles.btnPrimary}
                    onPress={() => navigation.navigate('suppliers')}
                  >
                    <Text style={GlobalStyles.textBtnSecundary}>
                      {t('record.bttnNoOrders')}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  {allOrders.map((order) => (
                    <TouchableOpacity
                      style={[RecordStyle.cardRecord, GlobalStyles.boxShadow]}
                      key={order.reference}
                      onPress={() => handleOrderSelected(order)}
                    >
                      <View style={RecordStyle.textCard} key={order.reference}>
                        {order.id_stateOrders !== 5 &&
                          order.id_stateOrders !== 6 && (
                            <Text style={RecordStyle.btnPending}>
                              {t('record.pending')}
                            </Text>
                          )}
                        {order.id_stateOrders === 5 && (
                          <Text style={RecordStyle.btnDelivered}>
                            {t('record.delivered')}
                          </Text>
                        )}
                        {order.id_stateOrders === 6 && (
                          <Text style={RecordStyle.btnDispute}>
                            {t('record.dispute')}
                          </Text>
                        )}
                        <Text style={RecordStyle.tittle}>
                          {t('record.order')}
                        </Text>
                        <Text style={RecordStyle.text}>{order.reference}</Text>
                      </View>
                      <View style={RecordStyle.textCard}>
                        <Text style={RecordStyle.btnSpace}></Text>
                        <Text style={RecordStyle.tittle}>
                          {t('record.date')}
                        </Text>
                        <Text style={RecordStyle.text}>
                          {new Date(order.date_delivery).toLocaleDateString(
                            'en-GB',
                            {
                              day: '2-digit',
                              month: '2-digit',
                              year: '2-digit',
                            },
                          )}
                        </Text>
                      </View>
                      <View style={RecordStyle.textCard}>
                        <Ionicons
                          name="chevron-forward"
                          size={24}
                          color="#62C471"
                          style={{ margin: 4 }}
                        />
                        <Text style={RecordStyle.tittle}>
                          {t('record.amount')}
                        </Text>
                        <Text style={RecordStyle.text}>£{order.total}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Records
