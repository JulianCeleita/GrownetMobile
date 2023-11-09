import { Text, View, Image } from 'react-native'
import React from 'react'
import { ChatStyle } from '../styles/ChatStyle'
import { useTranslation } from 'react-i18next'
import { WebView } from 'react-native-webview'
import useOrderStore from '../store/useOrderStore'

const Chat = () => {
  const { t } = useTranslation()
  const { selectedRestaurant } = useOrderStore()

  const userName = selectedRestaurant?.accountName || "Chef";

  return (
    <WebView
      originWhitelist={['*']}
      source={{
        uri: `https://grownet-all.vercel.app/chatintercom?name=${userName}`,
      }}
      style={{ flex: 1 }}
      startInLoadingState={true}
      javaScriptEnabled={true}
      domStorageEnabled={true}
    />
  )
}

export default Chat

{
  /* <WebView
      source={{ uri: 'https://github.com/JulianCeleita' }}
      startInLoadingState={true}
      javaScriptEnabled={true}
      domStorageEnabled={true}
    /> */
}

{
  /* <View style={ChatStyle.chat}>
      <Image
        source={require('../../assets/img/img-succesful.png')}
        resizeMode="cover"
        style={ChatStyle.image}
      />
      <Text style={ChatStyle.tittle}>We are working on it</Text>
      <Text style={ChatStyle.text}>
        Soon we will have the chat service up and running again.
      </Text>
    </View> */
}
