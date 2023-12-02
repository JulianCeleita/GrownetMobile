import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { TermsAndConditionsStyles } from '../styles/TermsAndConditionStyles'
import { useTranslation } from 'react-i18next'

const TermsAndConditions = () => {
  const { t } = useTranslation()
  return (
    <ScrollView style={TermsAndConditionsStyles.container}>
      <View style={TermsAndConditionsStyles.titleContainer}>
        <Text style={TermsAndConditionsStyles.title}>
          {t('termsAndConditions.title')}{' '}
          <Text style={TermsAndConditionsStyles.subtitle}>Grownet</Text>
        </Text>
        <Text style={TermsAndConditionsStyles.EffectiveDate}>
        {t('termsAndConditions.availableDate')} 19, 2023
        </Text>
      </View>
      <View style={TermsAndConditionsStyles.textContainer}>
        <Text style={TermsAndConditionsStyles.header}>1. {t('termsAndConditions.subtitleOne')}</Text>
        <Text style={TermsAndConditionsStyles.paragraph}>
          1.1. {t('termsAndConditions.paragraphOne')}
        </Text>

       <Text style={TermsAndConditionsStyles.header}>2. {t('termsAndConditions.subtitleTwo')}</Text>
        <Text style={TermsAndConditionsStyles.paragraph}>
          2.1. {t('termsAndConditions.paragraphTwo')}
        </Text>
        <Text style={TermsAndConditionsStyles.paragraph}>
          2.2. {t('termsAndConditions.paragraphTwoPointTwo')}
        </Text>
        <Text style={TermsAndConditionsStyles.paragraph}>
          2.3. {t('termsAndConditions.paragraphTwoPointThree')}
        </Text>
        <Text style={TermsAndConditionsStyles.paragraph}>
          2.4. {t('termsAndConditions.paragraphTwoPointFour')}
        </Text>

        <Text style={TermsAndConditionsStyles.header}>3. {t('termsAndConditions.subtitleThree')}</Text>
        <Text style={TermsAndConditionsStyles.paragraph}>
          3.1. {t('termsAndConditions.paragraphThreeOne')}
        </Text>
        <Text style={TermsAndConditionsStyles.paragraph}>
          3.2. {t('termsAndConditions.paragraphThreeTwo')}
        </Text>
        <Text style={TermsAndConditionsStyles.paragraph}>
          3.3. {t('termsAndConditions.paragraphThreeThree')}
        </Text>
        <Text style={TermsAndConditionsStyles.paragraph}>
          3.4. {t('termsAndConditions.paragraphThreeFour')}
        </Text>

        <Text style={TermsAndConditionsStyles.header}>4. {t('termsAndConditions.subtitleFour')}</Text>
        <Text style={TermsAndConditionsStyles.paragraph}>
          4.1. {t('termsAndConditions.paragraphFourOne')}
        </Text>

        <Text style={TermsAndConditionsStyles.header}>5. {t('termsAndConditions.subtitleFive')}</Text>
        <Text style={TermsAndConditionsStyles.paragraph}>
          5.1. {t('termsAndConditions.paragraphFiveOne')}
        </Text>

        <Text style={TermsAndConditionsStyles.header}>6. {t('termsAndConditions.subtitleSix')}</Text>
        <Text style={TermsAndConditionsStyles.paragraph}>
          6.1. {t('termsAndConditions.paragraphSixOne')}
        </Text>

        <Text style={TermsAndConditionsStyles.header}>7. {t('termsAndConditions.subtitleSeven')}</Text>
        <Text style={TermsAndConditionsStyles.paragraph}>
          7.1. {t('termsAndConditions.paragraphSevenOne')}
        </Text>

        <Text style={TermsAndConditionsStyles.header}>8. {t('termsAndConditions.subtitleEight')}</Text>
        <Text style={TermsAndConditionsStyles.paragraph}>
          8.1. {t('termsAndConditions.paragraphEightOne')}
        </Text>

        <Text style={TermsAndConditionsStyles.header}>9. {t('termsAndConditions.subtitleNine')}</Text>
        <Text style={TermsAndConditionsStyles.paragraph} id="space-terms">
          9.1. {t('termsAndConditions.paragraphNineOne')}
          <Text style={TermsAndConditionsStyles.link}>{t('termsAndConditions.paragraphNineLink')}</Text>
        </Text>
      </View>
    </ScrollView>
  )
}

export default TermsAndConditions
