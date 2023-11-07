import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { PastStyle } from '../../styles/PastRecordStyle'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GlobalStyles } from '../../styles/Styles'
import axios from 'axios'
import useTokenStore from '../../store/useTokenStore'
import useRecordStore from '../../store/useRecordStore'
import { selectedStorageOrder } from '../../config/urls.config'
import { ScrollView } from 'react-native-gesture-handler'
import { useTranslation } from 'react-i18next'

function PastRecord() {
  const { t } = useTranslation()
  const { token } = useTokenStore()
  const { selectedPendingOrder } = useRecordStore()
  const [detailsToShow, setDetailsToShow] = useState({})

  useEffect(() => {
    axios
      .get(`${selectedStorageOrder}/${selectedPendingOrder}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDetailsToShow(response.data.order)
      })
      .catch((error) => {
        console.log(error)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <SafeAreaView style={PastStyle.past}>
      <ScrollView>
        {detailsToShow && (
          <View style={GlobalStyles.cardInvoces}>
            <Text style={PastStyle.tittle}>
              {t('pastRecord.supplierDetails')}
            </Text>
            <View style={PastStyle.products}>
              <Text style={PastStyle.subtittle}>
                {detailsToShow.nameSuppliers}
              </Text>
              <Text style={PastStyle.subtittle}>
                #{detailsToShow.reference}
              </Text>
            </View>
            <Text style={PastStyle.p}>{detailsToShow.created_date}</Text>
            <Text style={PastStyle.tittle}>
              {' '}
              {t('pastRecord.productDetails')}
            </Text>
            {detailsToShow.products?.map((product) => (
              <View key={product.id}>
                <View style={PastStyle.products}>
                  <Text style={PastStyle.subtittle}>{product.name}</Text>
                  <Text style={PastStyle.subtittle}>£{product.price}</Text>
                </View>
                <Text style={PastStyle.p}>
                  {product.quantity} {product.uom}
                </Text>
              </View>
            ))}
            <Text style={PastStyle.tittle}>
              {t('pastRecord.paymentDetails')}
            </Text>
            <View style={PastStyle.products}>
              <Text style={PastStyle.subtittle}>{t('pastRecord.tax')}</Text>
              <Text style={PastStyle.subtittle}>
                £{detailsToShow.total_tax}
              </Text>
            </View>
            <View style={PastStyle.total}>
              <View style={PastStyle.products}>
                <Text style={PastStyle.textTotal}>
                  {t('pastRecord.currentTotal')}
                </Text>
                <Text style={PastStyle.textTotal}>£{detailsToShow.total}</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default PastRecord
