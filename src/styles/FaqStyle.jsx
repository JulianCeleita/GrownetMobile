import { StyleSheet } from 'react-native'

export const FaqStyle = StyleSheet.create({
  faq: {
    backgroundColor: 'white',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginLeft: '18%',
    marginTop: 10,
  },
  tittle: {
    fontFamily: 'PoppinsSemi',
    fontSize: 20,
    color: '#04444F',
    marginTop: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  span: {
    fontFamily: 'PoppinsSemi',
    fontSize: 20,
    color: '#026CD2',
  },
  accordion: {
    backgroundColor: 'white',
    width: 350,
    borderRadius: 10,
    margin: 8,
    marginBottom: 25,
  },
  faqHead: {
    width: 320,
    paddingVertical: 10,
    paddingLeft: 8,
    textAlign: 'left',
    color: '#04444f',
    fontFamily: 'PoppinsMedium',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e3e5',
  },
  faqContent: {
    width: 350,
    padding: 20,
    paddingVertical: 8,
    fontFamily: 'PoppinsRegular',
    color: '#04444f',
    backgroundColor: '#f3f9ff',
  },
  question: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
})
