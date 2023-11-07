import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { TermsAndConditionsStyles } from '../styles/TermsAndConditionStyles'

const TermsAndConditions = () => {
  return (
    <ScrollView style={TermsAndConditionsStyles.container}>
      <View style={TermsAndConditionsStyles.titleContainer}>
        <Text style={TermsAndConditionsStyles.title}>
          Terms and Conditions of Use for{' '}
          <Text style={TermsAndConditionsStyles.subtitle}>Grownet</Text>
        </Text>
        <Text style={TermsAndConditionsStyles.EffectiveDate}>
          Effective Date: September 19, 2023
        </Text>
      </View>
      <View style={TermsAndConditionsStyles.textContainer}>
        <Text style={TermsAndConditionsStyles.header}>1. Introduction</Text>
        <Text style={TermsAndConditionsStyles.paragraph}>
          1.1. These terms and conditions (hereinafter referred to as the
          "Terms") govern the use of the services offered by Grownet ("We,"
          "Us," or "Our") through our mobile application and website
          (hereinafter referred to as the "Site"). By using our Site, you agree
          to these Terms and commit to abide by them.
        </Text>

        <Text style={TermsAndConditionsStyles.header}>
          2. Registration and User Account
        </Text>
        <Text style={TermsAndConditionsStyles.paragraph}>
          2.1. To utilize our services, you must register on the Site.
          Registration requires providing accurate and up-to-date information.
        </Text>
        <Text style={TermsAndConditionsStyles.paragraph}>
          2.2. Only individuals aged 18 or older may use our Site.
        </Text>
        <Text style={TermsAndConditionsStyles.paragraph}>
          2.3. Access to the Site requires the creation of an account using your
          mobile phone number. You are responsible for maintaining the
          confidentiality of your account and password.
        </Text>
        <Text style={TermsAndConditionsStyles.paragraph}>
          2.4. You must not share your account with others or allow others to
          use your account.
        </Text>

        <Text style={TermsAndConditionsStyles.header}>
          3. Orders and Deliveries
        </Text>
        <Text style={TermsAndConditionsStyles.paragraph}>
          3.1. Grownet acts as an intermediary between restaurants and
          suppliers. Restaurants can place orders for products through our Site.
        </Text>
        <Text style={TermsAndConditionsStyles.paragraph}>
          3.2. We facilitate communication between restaurants and suppliers but
          do not assume responsibility for the quality of products or services
          provided by the suppliers.
        </Text>
        <Text style={TermsAndConditionsStyles.paragraph}>
          3.3. Prices for products and delivery times are set by the suppliers
          and may be subject to change without prior notice.
        </Text>
        <Text style={TermsAndConditionsStyles.paragraph}>
          3.4. Deliveries will be made to the address specified in the order.
          Restaurants are responsible for providing an accurate address and
          being available to receive products at the agreed-upon time.
        </Text>

        <Text style={TermsAndConditionsStyles.header}>
          4. Cancellation and Returns
        </Text>
        <Text style={TermsAndConditionsStyles.paragraph}>
          4.1. Cancellation and return policies are subject to the policies of
          each supplier. We recommend reviewing the policies of each supplier
          before placing an order.
        </Text>

        <Text style={TermsAndConditionsStyles.header}>
          5. Liability and Warranty
        </Text>
        <Text style={TermsAndConditionsStyles.paragraph}>
          5.1. Grownet does not assume responsibility for the products or
          services provided by suppliers.
        </Text>

        <Text style={TermsAndConditionsStyles.header}>6. Privacy</Text>
        <Text style={TermsAndConditionsStyles.paragraph}>
          6.1. Your privacy is important to us. Please refer to our Privacy
          Policy to learn how we collect, use, and protect your personal data.
        </Text>

        <Text style={TermsAndConditionsStyles.header}>
          7. Changes to the Terms
        </Text>
        <Text style={TermsAndConditionsStyles.paragraph}>
          7.1. Grownet reserves the right to modify these Terms at any time.
          Modifications will become effective as soon as they are published on
          the Site.
        </Text>

        <Text style={TermsAndConditionsStyles.header}>
          8. Applicable Law and Jurisdiction
        </Text>
        <Text style={TermsAndConditionsStyles.paragraph}>
          8.1. These Terms are governed by the laws of the United Kingdom, and
          any disputes arising in connection with these Terms will be subject to
          the exclusive jurisdiction of the courts of the United Kingdom.
        </Text>

        <Text style={TermsAndConditionsStyles.header}>9. Contact</Text>
        <Text style={TermsAndConditionsStyles.paragraph} id="space-terms">
          9.1. If you have any questions or concerns about these Terms, please
          contact us at{' '}
          <Text style={TermsAndConditionsStyles.link}>www.grownetapp.com</Text>
        </Text>
      </View>
    </ScrollView>
  )
}

export default TermsAndConditions
