import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import useOrderStore from '../../store/useOrderStore'
import { printToFileAsync } from 'expo-print'
import { shareAsync } from 'expo-sharing'
import * as FileSystem from 'expo-file-system'
import { useTranslation } from 'react-i18next'
import { OrderSuccessfulStyle } from '../../styles/OrderSuccessfulStyle'
import { GlobalStyles } from '../../styles/Styles'
const OrderSuccessful = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()

  const [articlesData, setArticlesData] = useState([])
  const {
    selectedRestaurant,
    selectedSupplier,
    articlesToPay,
    orderNumber,
    totalNet,
    totalTaxes,
    totalToPay,
    specialRequirements,
    deliveryData,
  } = useOrderStore()

  useEffect(() => {
    const filteredArticles = articlesToPay.filter(
      (article) => article.amount > 0,
    )
    setArticlesData(filteredArticles)
  }, [articlesToPay])

  const generatePdfDocument = async () => {
    try {
      const articlesHtml = articlesData
        .filter((article) => article.amount > 0)
        .map(
          (article) => `
          <tr key="${article.id}">
          <td class="textTable">£ ${article.id}</td>
          <td class="textTable">£ ${article.name}</td>
          <td class="textTable">£ ${article.amount}</td>
          <td class="textTable">£ ${article.uomToPay}</td>
          <td class="textTable">£ ${article.selectedPriceWithTax}</td>
          <td class="textTable">£ ${article.totalItemToPay}</td>
        </tr>
      `,
        )
        .join('')

      const { uri } = await printToFileAsync({
        html: `
        <html>
        <head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
        <style>
          html {
            margin: 0;
            padding: 0;
          }
          body {
            background-color: #E9F4FF;
            color: #04444F;
            font-family: "Poppins";
            margin: 0 !important;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 0;
          }
          .informationPdf{
            width: 100%;
            background-color: white;
            padding-top: 2rem;
            padding-bottom: 2rem;
            margin: 0;
            margin-bottom: 2rem;
            border-bottom-left-radius: 50px;
            border-bottom-right-radius: 50px;
            box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
          }
          .topPdf{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-right: 4rem;
            margin-left: 4rem;
            margin-bottom: 2rem;
          }
          .divInformation {
            display: flex;
            justify-content: space-between;
            margin-right: 4rem;
            margin-left: 4rem;
          }
          .tittleRestaurant{
            font-size: 40;
            margin: 0;
            padding: 0;
          }
          .text {
            font-size: 16px;
            margin: 0;
            padding: 0;
          }
          .fontSpan {
            color: #026CD2;
            font-weight: 600;
          }
          .imageLogo {
            width: 30%;
            margin-top: -5px;
          }
          .columnRight{
            text-align: left;
            padding-right: 1.5rem;
          }

          .tittle {
            font-size: 16px;
            font-weight: 600;
            margin: 0;
          }
          .description {
            margin-left: 4rem;
          }
          table {
            border-collapse:collapse; 
            border: none;
          }
          .tableProducts {
            border: 1px solid #026CD2;
            border-radius: 15px;
            background-color: #026CD2;
            width: 90%;
            margin: 0;
            text-align: center;
            overflow: hidden;
          }
          .tableTop{
            background-color: #026CD2;
            color: white;
          }
          .tableBottom{
            color: #04444F;
            background-color: white;
          }
          .tableBottom td {
            border: 1px solid white;
          }
          .textTable {
            font-weight: 400;
            padding: 12px;
            padding-top: 1.2rem;
            padding-bottom: 1.2rem;
            width: 16px;
          }
          .tableTotal {
            border: 1px solid #026CD2;
            border-radius: 15px;
            background-color: #026CD2;
            text-align: center;
            overflow: hidden;
            color: white;
            margin-top: 1.5rem;
          }
          .totalValues {
            color: #04444F;
            background-color: white;
            font-weight: 400;
            padding: 1rem;
            padding-right: 2rem;
            padding-left: 2rem;
          }
          .tittleTable {
            font-weight: 400;
            padding: .8rem;
            padding: 1rem;
            padding-right: 2rem;
            padding-left: 2rem;
          }
          .table2 {
            display: flex;
            justify-content: flex-end;
            width: 90%;
          }
        </style>
        </head>
        <body>
        <div class="informationPdf">
          <div class="topPdf">
            <div>
              <h1 class="tittleRestaurant">Purchase Order</h1>
              <h3 class="text">for <span class="fontSpan">${selectedSupplier.name}</span> produce</h3>
            </div>
            <img class="imageLogo" src="https://grownetapp.com/wp-content/uploads/2023/06/logo.svg" alt="logo"/>
          </div>
          <div class="divInformation">
            <div>
            <div>
              <p class="text">Requested delivery date</p>
              <h3 class="tittle">${deliveryData}</h3>
            </div>
            <div>
              <p class="text">Order number</p>
              <h3 class="tittle">${orderNumber}</h3>
            </div>
          </div>
          <div>
            <div>
              <p class="text">Ordered by</p>
              <h3 class="tittle">${selectedRestaurant.accountName}</h3>
            </div>
            <div class="columnRight"> 
              <p class="text">Delivery address</p>
              <h3 class="tittle">${selectedRestaurant.address}</h3>
            </div>
          </div>
          </div>

          <div class="description">
            <p class="text">Special requirements</p>
            <h3 class="tittle">${specialRequirements}</h3>
          </div>

        </div>
              
        <table class="tableProducts">
        <thead class="tableTop">
          <tr>
            <th class="textTable">ID</th>
            <th class="textTable">Product name</th>
            <th class="textTable">Quantity</th>
            <th class="textTable">UOM</th>
            <th class="textTable">Item price</th>
            <th class="textTable">Total items price</th>
          </tr>
        </thead>
        <tbody class="tableBottom">
        ${articlesHtml}
        </tbody>
      </table>
      
      <div class="table2">
        <table class="tableTotal">
          <tr>
            <th class="tittleTable">Total Net:</th>
            <th class="totalValues">£ ${totalNet}</th>
          </tr>
          <tr>
            <th class="tittleTable">Total Tax:</th>
            <th class="totalValues">£ ${totalTaxes}</th>
          </tr>
          <tr>
            <th class="tittleTable">Total:</th>
            <th class="totalValues">£ ${totalToPay}</th>
          </tr>
        </table>   
      </div>
    </body>
        </html>
      `,
        base64: false,
      })

      const fileName = `GrownetInvoice_order_${orderNumber}.pdf`
      const documentsDirectory =
        FileSystem.documentDirectory || `${FileSystem.cacheDirectory}Documents/`
      const newUri = `${documentsDirectory}${fileName}`
      await FileSystem.moveAsync({ from: uri, to: newUri })

      await shareAsync(newUri)
    } catch (error) {
      console.error('Error generating PDF', error)
    }
  }
  const rocordsNavigate = () => {
    navigation.navigate('Records')
  }
  return (
    <View style={OrderSuccessfulStyle.container}>
      <View style={OrderSuccessfulStyle.containerImage}>
        <Image
          source={require('../../../assets/img/img-succesful.png')}
          resizeMode="cover"
          style={OrderSuccessfulStyle.image}
        />
        <Text style={OrderSuccessfulStyle.tittleSuccessful}>
          {t('orderSuccessful.successful')}
        </Text>
        <Text style={OrderSuccessfulStyle.textSuccessful}>
          {t('orderSuccessful.yourOrderSuccessful')}
        </Text>
      </View>
      <View style={OrderSuccessfulStyle.containerButtons}>
        <TouchableOpacity
          style={[GlobalStyles.btnPrimary, OrderSuccessfulStyle.spaceBttn]}
          onPress={rocordsNavigate}
        >
          <Text style={GlobalStyles.textBtnSecundary}>
            {' '}
            {t('orderSuccessful.yourOrders')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[GlobalStyles.btnOutline, OrderSuccessfulStyle.spaceBttn]}
          onPress={generatePdfDocument}
        >
          <Text style={GlobalStyles.textBtnOutline}>
            {t('orderSuccessful.downloadPDF')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default OrderSuccessful
