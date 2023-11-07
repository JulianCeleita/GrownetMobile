import * as DocumentPicker from 'expo-document-picker'
import React from 'react'
import { Text, View } from 'react-native'
import { Button } from 'react-native-paper'
import { DisputeStyle } from '../styles/PendingRecordStyle'
import { Feather } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'

const UploadFile = () => {
  const { t } = useTranslation()
  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: '*/*',
    })

    if (result.type === 'success') {
      console.log('URI:', result.uri)
      console.log('Nombre:', result.name)
      console.log('Tamaño:', result.size)
    } else {
      console.log('El usuario canceló la selección de archivos')
    }
  }

  return (
    <View>
      <Text style={DisputeStyle.text}>{t('uploadFile.attachPhoto')}</Text>
      <Button style={DisputeStyle.buttonUpload} onPress={pickDocument}>
        <Feather name="upload" size={18} color="white" />
        <Text style={DisputeStyle.textBtnUpload}>
          {' '}
          {t('uploadFile.customUpload')}
        </Text>
      </Button>
    </View>
  )
}

export default UploadFile
