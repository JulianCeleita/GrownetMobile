import { AntDesign } from '@expo/vector-icons'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { FaqStyle } from '../../styles/FaqStyle'
import { GlobalStyles } from '../../styles/Styles'
const Faq = () => {
  const { t, i18n } = useTranslation()

  const [expandedSection, setExpandedSection] = useState(null)

  const toggleExpand = (section) => {
    setExpandedSection((prevSection) =>
      prevSection === section ? null : section,
    )
  }
  const cards = [
    {
      title: 'settingsFaq.question1',
      content: 'settingsFaq.answer1',
    },
    {
      title: 'settingsFaq.question2',
      content: 'settingsFaq.answer2',
    },
    {
      title: 'settingsFaq.question3',
      content: 'settingsFaq.answer3',
    },
    {
      title: 'settingsFaq.question4',
      content: 'settingsFaq.answer4',
    },
    {
      title: 'settingsFaq.question5',
      content: 'settingsFaq.answer5',
    },
  ]
  return (
    <SafeAreaView style={FaqStyle.faq}>
      <ScrollView>
        <Image
          source={require('../../../assets/favicon.png')}
          resizeMode="cover"
          style={FaqStyle.image}
        />
        <Text style={FaqStyle.tittle}>
          {t('settingsFaq.tittle1')}
          <Text style={FaqStyle.span}>{t('settingsFaq.tittle2')}</Text>
        </Text>
        <View style={[FaqStyle.accordion, GlobalStyles.boxShadow]}>
          {cards.map((card, index) => (
            <View key={`section-${index}`}>
              <TouchableOpacity
                onPress={() => toggleExpand(`section${index + 1}`)}
                style={FaqStyle.question}
              >
                <AntDesign name="questioncircleo" size={22} color="#62C471" />
                <Text style={FaqStyle.faqHead}> {t(card.title)}</Text>
              </TouchableOpacity>

              {expandedSection === `section${index + 1}` && (
                <View>
                  <Text style={FaqStyle.faqContent}>{t(card.content)}</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Faq
