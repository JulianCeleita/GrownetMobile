import React, { useState } from 'react'
import { Text, View, TextInput, ScrollView } from 'react-native'
import { Button, Checkbox } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons'
import { DisputeStyle } from '../../styles/PendingRecordStyle'
import { GlobalStyles } from '../../styles/Styles'
import { useTranslation } from 'react-i18next'
import useRecordStore from '../../store/useRecordStore'
import axios from 'axios'

function DisputeRecord() {
  const [activeTab, setActiveTab] = useState('1')
  const { t } = useTranslation()
  const [description, setDescription] = useState('')
  const [quantityDispute, setQuantityDispute] = useState('')
  const [motive, setMotive] = useState('1')
  const { selectedPendingOrder } = useRecordStore()
  const [solutionSelected, setSolutionSelected] = useState('1')
  console.log("SELECTED OPTION", solutionSelected)

  const resetFormData = () => {
    setDescription('')
    setQuantityDispute('')
  }

  const handleQuantityChange = (e) => {
    const inputValue = e.target.value;
    const re = /^[0-9\b]+$/;
    if (inputValue === "" || re.test(inputValue)) {
      setQuantityDispute(inputValue);
    }
  };

  const onToggleCheckbox = (value) => {
    setSolutionSelected(value)
  }

  // ENVIAR LA DISPUTA
  const handleSubmit = (e) => {
    e.preventDefault();
    setShow(true);
    const formData = new FormData();

    const disputeBody = {
      order: selectedPendingOrder,
      motive: motive,
      id_solutionsDisputes: solutionSelected,
      product_id: id,
      description: description,
      quantity: quantityDispute,
    };
    for (let key in disputeBody) {
      if (disputeBody.hasOwnProperty(key)) {
        formData.append(key, disputeBody[key]);
      }
    }

    axios
      .post(createDisputeOrder, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error al crear la disputa:", error);
      });
  };


  const renderContent = () => {
    if (activeTab === '1') {
      return (
        <View>
          <View style={[GlobalStyles.boxShadow, DisputeStyle.cardForm]}>
            <Text style={DisputeStyle.text}>
              {t('disputeRecord.quantityDelivered')}
            </Text>
            <TextInput
              style={DisputeStyle.input}
              placeholder="Total received"
              required
            />            
          </View>
          <View style={[GlobalStyles.boxShadow, DisputeStyle.cardForm]}>
            <View style={DisputeStyle.optionForm}>
              <Text style={DisputeStyle.text}>
                {t('disputeRecord.sendNextOrder')}
              </Text>
              <Checkbox.Item
                label=""
                status={
                  solutionSelected === '1' ? 'checked' : 'unchecked'
                }
                onPress={() => onToggleCheckbox('1')}
              />
            </View>
            <View style={DisputeStyle.optionForm}>
              <Text style={DisputeStyle.text}>
                {t('disputeRecord.creditNote')}
              </Text>
              <Checkbox.Item
                label=""
                status={
                  solutionSelected === '2' ? 'checked' : 'unchecked'
                }
                onPress={() => onToggleCheckbox('2')}
              />
            </View>
          </View>
        </View>
      )
    } else if (activeTab === '2') {
      return (
        <View>
          <View style={[GlobalStyles.boxShadow, DisputeStyle.cardForm]}>
            <Text style={DisputeStyle.text}>
              {t('disputeRecord.quantityDefective')}
            </Text>
            <TextInput
              style={DisputeStyle.input}
              placeholder="Total defective"
              required
            />
          </View>
          <View style={[GlobalStyles.boxShadow, DisputeStyle.cardForm]}>
            <View style={DisputeStyle.optionForm}>
              <Text style={DisputeStyle.text}>
                {t('disputeRecord.sendNextOrder')}
              </Text>
              <Checkbox.Item
                label=""
                status={
                  solutionSelected === '1' ? 'checked' : 'unchecked'
                }
                onPress={() => onToggleCheckbox('1')}
              />
            </View>
            <View style={DisputeStyle.optionForm}>
              <Text style={DisputeStyle.text}>
                {t('disputeRecord.creditNote')}
              </Text>
              <Checkbox.Item
                label=""
                status={
                  solutionSelected === '2' ? 'checked' : 'unchecked'
                }
                onPress={() => onToggleCheckbox('2')}
              />
            </View>
          </View>
        </View>
      )
    }
  }
  const activeButtonColor = {
    backgroundColor: '#04444f',
    color: 'white',
    borderRadius: 10,
    margin: 8,
  }

  return (
    <SafeAreaView style={DisputeStyle.dispute}>
      <ScrollView>
        <View style={DisputeStyle.cardTittle}>
          <MaterialIcons name="error-outline" size={60} color="#62c471" />
          <View style={{ marginLeft: 15 }}>
            <Text style={DisputeStyle.title}>Broccoli</Text>
            <Text style={DisputeStyle.quantity}>1 Box</Text>
          </View>
        </View>
        <View style={DisputeStyle.dispute}>
          <View style={[GlobalStyles.boxShadow, DisputeStyle.cardTabs]}>
            <Button
              mode={activeTab === '1' ? 'contained' : 'text'}
              onPress={() => setActiveTab('1')}
              style={activeTab === '1' ? activeButtonColor : null}
            >
              <Text style={DisputeStyle.text}>
                {t('disputeRecord.wrongQuantity')}
              </Text>
            </Button>
            <Button
              mode={activeTab === '2' ? 'contained' : 'text'}
              onPress={() => setActiveTab('2')}
              style={activeTab === '2' ? activeButtonColor : null}
            >
              <Text style={DisputeStyle.text}>
                {t('disputeRecord.defective')}
              </Text>
            </Button>
          </View>
          {renderContent()}
          <Button style={[GlobalStyles.btnPrimary, DisputeStyle.space]}>
            <Text style={GlobalStyles.textBtnSecundary}>
              {t('disputeRecord.send')}
            </Text>
          </Button>
          <View style={DisputeStyle.space} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default DisputeRecord
