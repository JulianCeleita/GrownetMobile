import {
  Feather,
  MaterialIcons,
  AntDesign,
} from '@expo/vector-icons'
import { useFocusEffect } from '@react-navigation/native'
import { isSameDay, parseISO } from 'date-fns'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Button } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from '../../../axiosConfig'
import { allStorageOrders } from '../../config/urls.config'
import useOrderStore from '../../store/useOrderStore'
import useRecordStore from '../../store/useRecordStore'
import useTokenStore from '../../store/useTokenStore'
import { RecordStyle } from '../../styles/RecordStyle'
import { GlobalStyles } from '../../styles/Styles'
import Settings from '../../screens/settings/Settings';


const Records = ({ navigation }) => {
  const { t } = useTranslation()
  const { token } = useTokenStore()
  const {
    pendingOrders,
    closedOrders,
    setPendingOrders,
    setClosedOrders,
    setSelectedPendingOrder,
    setSelectedClosedOrder,
  } = useRecordStore()
  const { selectedRestaurant } = useOrderStore()
  const apiOrders = allStorageOrders + selectedRestaurant.accountNumber
  const [activeTab, setActiveTab] = useState('pastRecord')
  const switchTab = () => {
    setActiveTab((prevTab) =>
      prevTab === 'pastRecord' ? 'settings' : 'pastRecord',
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

          const closedOrders = response.data.orders.filter(
            (order) => order.id_stateOrders === 5,
          )
          const pendingOrders = response.data.orders.filter(
            (order) => order.id_stateOrders !== 5,
          )
          setClosedOrders(closedOrders)
          setPendingOrders(pendingOrders)
        } catch (error) {
          console.log('Error al llamar las ordenes', error)
        }
      }
      fetchData()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apiOrders]),
  )
  const handleClosedOrderSelect = (orderReference) => {
    setSelectedPendingOrder(orderReference)
    navigation.navigate('pastRecord')
  }

  const handlePendingOrderSelect = (orderReference) => {
    setSelectedPendingOrder(orderReference)
    navigation.navigate('settings')
  }

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [formattedDate, setFormattedDate] = useState('All orders')

  
  const closeDatepicker = () => {
    setFormattedDate('All orders')
  }

  return (
    <SafeAreaView style={RecordStyle.record}>
      <ScrollView>
        {/* AVISO DE QUE NO HAY ORDENES */}
        {pendingOrders.length === 0 && closedOrders.length === 0 ? (
          <View style={RecordStyle.recordZero}>
            <Image source={require('../../../assets/img/img-succesful.png')} />
            <Text style={RecordStyle.textZero}>{t('record.noOrders')}</Text>
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
          <>
            <View style={[RecordStyle.tabContainer, GlobalStyles.boxShadow]}>
              {/* SWITCH ENTRE PASTORDERS Y PENDINGORDERS */}
              <TouchableOpacity
                style={[
                  {
                    flex: 1,
                    backgroundColor:
                      activeTab === 'pastRecord' ? '#62c471' : 'white',
                    padding: 10,
                    alignItems: 'center',
                  },
                  RecordStyle.btnTab,
                ]}
                onPress={switchTab}
              >
                <Text
                  style={{
                    marginTop : 5,
                    fontFamily: 'PoppinsRegular',
                    color: activeTab === 'pastRecord' ? 'white' : '#04444f',
                  }}
                >
                  {t('Orders')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
          style={[
            {
              flex: 1,
              backgroundColor:
                activeTab === 'settings' ? '#62c471' : 'white',
              padding: 10,
              alignItems: 'center',
            },
            RecordStyle.btnTab,
          ]}
          onPress={() => setActiveTab('settings')}
        >
          <Text
            style={{
              marginTop:5,
              fontFamily: 'PoppinsRegular',
              color:
                activeTab === 'settings' ? 'white' : '#04444f',
            }}
          >
                {t('Settings')}
          </Text>
        </TouchableOpacity>
            </View>
            <View>
              {/* VISTA SI ESTÁ PASTRECORD SELECCIONADO */}
              {activeTab === 'pendingRecord' ? (
                <View>
                  {formattedDate === 'All orders'
                    ? closedOrders.map((order) => (
                        <View
                          style={[
                            RecordStyle.cardRecord,
                            GlobalStyles.boxShadow,
                          ]}
                          key={order.reference}
                        >
                          <View
                            style={RecordStyle.textCard}
                            key={order.reference}
                          >
                            <Text style={RecordStyle.tittle}>
                              {' '}
                              {t('record.order')}
                            </Text>
                            <Text style={RecordStyle.text}>
                              {order.reference}
                            </Text>
                            <Text style={RecordStyle.tittle}>
                              {t('record.amount')}
                            </Text>
                            <Text style={RecordStyle.text}>£{order.total}</Text>
                          </View>
                          <View style={RecordStyle.textCard}>
                            <Text style={RecordStyle.tittle}>
                              {t('record.date')}
                            </Text>
                            <Text style={RecordStyle.text}>
                              {order.date_delivery}
                            </Text>
                            <Button
                              title="View details"
                              style={RecordStyle.btnPrimary}
                              onPress={() =>
                                handleClosedOrderSelect(order.reference)
                              }
                            >
                              <Text style={GlobalStyles.textBtnSecundary}>
                                {t('record.viewDetails')}
                              </Text>
                            </Button>
                          </View>
                        </View>
                      ))
                    : closedOrders
                        .filter((order) => {
                          const orderDate = new Date(order.date_delivery)
                          const selectedDateUTC = new Date(
                            selectedDate.toUTCString(),
                          )

                          return (
                            orderDate.getUTCDate() ===
                              selectedDateUTC.getUTCDate() &&
                            orderDate.getUTCMonth() ===
                              selectedDateUTC.getUTCMonth() &&
                            orderDate.getUTCFullYear() ===
                              selectedDateUTC.getUTCFullYear()
                          )
                        })
                        .map((order) => (
                          <View
                            style={[
                              RecordStyle.cardRecord,
                              GlobalStyles.boxShadow,
                            ]}
                            key={order.reference}
                          >
                            <View
                              style={RecordStyle.textCard}
                              key={order.reference}
                            >
                              <Text style={RecordStyle.tittle}>
                                {' '}
                                {t('record.order')}
                              </Text>
                              <Text style={RecordStyle.text}>
                                {order.reference}
                              </Text>
                              <Text style={RecordStyle.tittle}>
                                {t('record.amount')}
                              </Text>
                              <Text style={RecordStyle.text}>
                                £{order.total}
                              </Text>
                            </View>
                            <View style={RecordStyle.textCard}>
                              <Text style={RecordStyle.tittle}>
                                {t('record.date')}
                              </Text>
                              <Text style={RecordStyle.text}>
                                {order.date_delivery}
                              </Text>
                              <Button
                                title="View details"
                                style={RecordStyle.btnPrimary}
                                onPress={() =>
                                  handleClosedOrderSelect(order.reference)
                                }
                              >
                                <Text style={GlobalStyles.textBtnSecundary}>
                                  {t('record.viewDetails')}
                                </Text>
                              </Button>
                            </View>
                          </View>
                        ))}
                  {selectedDate &&
                    formattedDate !== 'All orders' &&
                    !closedOrders.some((order) => {
                      const orderDate = parseISO(order.date_delivery)
                      return isSameDay(orderDate, selectedDate)
                    }) && (
                      <View style={RecordStyle.dateZero}>
                        <MaterialIcons
                          name="error-outline"
                          size={100}
                          color="#026CD2"
                        />
                        <Text style={RecordStyle.textDateZero}>
                          {t('record.noOrdersDate')}
                        </Text>
                        <Text style={RecordStyle.textDateFilter}>
                          {formattedDate}
                        </Text>
                      </View>
                    )}
                </View>
              ) : (
                <View>
                 {/* VISTA SI ESTÁ SETTINGS SELECCIONADO */}
                {activeTab === 'settings' ? (
                  <Settings />
                ) : (
                    <View>
                      {pendingOrders
                        .filter((order) => {
                          const orderDate = new Date(order.date_delivery)
                          const selectedDateUTC = new Date(
                            selectedDate.toUTCString(),
                          )

                          return (
                            orderDate.getUTCDate() ===
                              selectedDateUTC.getUTCDate() &&
                            orderDate.getUTCMonth() ===
                              selectedDateUTC.getUTCMonth() &&
                            orderDate.getUTCFullYear() ===
                              selectedDateUTC.getUTCFullYear()
                          )
                        })
                        .map((order) => (
                          <View
                            style={[
                              RecordStyle.cardRecord,
                              GlobalStyles.boxShadow,
                            ]}
                            key={order.reference}
                          >
                            <View
                              style={RecordStyle.textCard}
                              key={order.reference}
                            >
                              <Text style={RecordStyle.tittle}>
                                {' '}
                                {t('record.order')}
                              </Text>
                              <Text style={RecordStyle.text}>
                                {order.reference}
                              </Text>
                              <Text style={RecordStyle.tittle}>
                                {t('record.amount')}
                              </Text>
                              <Text style={RecordStyle.text}>
                                £{order.total}
                              </Text>
                            </View>
                            <View style={RecordStyle.textCard}>
                              <Text style={RecordStyle.tittle}>
                                {t('record.date')}
                              </Text>
                              <Text style={RecordStyle.text}>
                                {order.date_delivery}
                              </Text>
                              <Button
                                title="View details"
                                style={RecordStyle.btnPrimary}
                                onPress={() =>
                                  handlePendingOrderSelect(order.reference)
                                }
                              >
                                <Text style={GlobalStyles.textBtnSecundary}>
                                  {t('record.viewDetails')}
                                </Text>
                              </Button>
                            </View>
                          </View>
                        ))}
                    </View>
                  )}
                  {selectedDate &&
                    formattedDate !== 'All orders' &&
                    !pendingOrders.some((order) => {
                      const orderDate = parseISO(order.date_delivery)
                      return isSameDay(orderDate, selectedDate)
                    }) && (
                      <View style={RecordStyle.dateZero}>
                        <MaterialIcons
                          name="error-outline"
                          size={100}
                          color="#026CD2"
                        />
                        <Text style={RecordStyle.textDateZero}>
                          {t('record.noOrdersDate')}
                        </Text>
                        <Text style={RecordStyle.textDateFilter}>
                          {formattedDate}
                        </Text>
                      </View>
                    )}
                </View>
              )}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default Records
