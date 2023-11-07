import React, { useState, useRef } from 'react'
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
  Easing,
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { SettingsStyle } from '../../styles/SettingsStyle'

const AccordionListItem = ({ title, children, onListToggle }) => {
  const [open, setOpen] = useState(false)
  const animatedController = useRef(new Animated.Value(0)).current
  const [bodySectionHeight, setBodySectionHeight] = useState()

  const bodyHeight = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: [0, bodySectionHeight || 0],
  })

  const arrowAngle = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: ['0rad', `${Math.PI}rad`],
  })

  const toggleListItem = () => {
    if (open) {
      Animated.timing(animatedController, {
        duration: 300,
        useNativeDriver: false,
        toValue: 0,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      }).start()
    } else {
      Animated.timing(animatedController, {
        duration: 300,
        useNativeDriver: false,
        toValue: 1,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      }).start()
    }
    setOpen(!open)
    onListToggle()
  }

  return (
    <>
      <TouchableWithoutFeedback onPress={() => toggleListItem()}>
        <View style={SettingsStyle.titleContainer}>
          <Text style={SettingsStyle.styleTextTitle}>{title}</Text>
          <Animated.View style={{ transform: [{ rotateZ: arrowAngle }] }}>
            <MaterialIcons
              name="keyboard-arrow-down"
              size={30}
              color="#04444f"
            />
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
      <Animated.View
        style={[SettingsStyle.bodyBackground, { height: bodyHeight }]}
      >
        <View
          style={SettingsStyle.bodyContainer}
          onLayout={(event) =>
            setBodySectionHeight(event.nativeEvent.layout.height)
          }
        >
          {children}
        </View>
      </Animated.View>
    </>
  )
}

export default AccordionListItem
