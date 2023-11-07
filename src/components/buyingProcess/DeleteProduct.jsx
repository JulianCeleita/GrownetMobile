import React, { useState } from 'react'
import { Modal, Text, View, TouchableOpacity } from 'react-native'

import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { DeleteModalStyle } from '../../styles/DeleteModalStyle'
import { GlobalStyles } from '../../styles/Styles'
import { useTranslation } from 'react-i18next'

export default function DeleteProduct({
  article,
  setArticles,
  articlesToPay,
  setArticlesToPay,
  calculateTotalToPay,
  updateTotalToPay,
}) {
  const { t } = useTranslation()
  const [show, setShow] = useState(false)

  const handleShow = () => setShow(true)

  const handleClose = () => setShow(false)

  const deleteFunction = (productId) => {
    setArticles((prevArticles) =>
      prevArticles.map((articl) =>
        articl.id === productId
          ? { ...articl, amount: 0, totalItemToPay: 0 }
          : articl,
      ),
    )

    const updatedArticlesToPay = articlesToPay.map((articl) =>
      articl.id === productId
        ? { ...articl, amount: 0, totalItemToPay: 0 }
        : articl,
    )

    setArticlesToPay(updatedArticlesToPay)

    const newTotalToPay = calculateTotalToPay(updatedArticlesToPay)

    updateTotalToPay(newTotalToPay)
  }

  return (
    <>
      <TouchableOpacity>
        <AntDesign
          name="delete"
          size={18}
          color="#ee6055"
          onPress={handleShow}
        />
      </TouchableOpacity>
      <Modal visible={show} animationType="fade" transparent={true}>
        <View style={DeleteModalStyle.modalBackground}>
          <View style={DeleteModalStyle.centeredView}>
            <View style={DeleteModalStyle.modalView}>
              <MaterialIcons name="error-outline" size={45} color="#ee6055" />
              <Text style={DeleteModalStyle.modalTittle}>
                {t('deleteProduct.deleteProduct')}
              </Text>
              <Text style={DeleteModalStyle.modalText}>
                {t('deleteProduct.areYouSureToDelete')}{' '}
                <Text style={DeleteModalStyle.textProduct}>
                  {article.name}?
                </Text>
              </Text>
              <View style={DeleteModalStyle.viewButtons}>
                <TouchableOpacity
                  style={[
                    GlobalStyles.btnPrimary,
                    DeleteModalStyle.spaceButton,
                  ]}
                  onPress={() => deleteFunction(article.id)}
                >
                  <Text style={GlobalStyles.textBtnSecundary}>
                    {' '}
                    {t('deleteProduct.delete')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleClose}
                  style={GlobalStyles.btnOutline}
                >
                  <Text style={GlobalStyles.textBtnOutline}>
                    {' '}
                    {t('deleteProduct.cancel')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  )
}
