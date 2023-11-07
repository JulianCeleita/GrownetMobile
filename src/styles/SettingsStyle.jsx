import { StyleSheet } from 'react-native'

export const SettingsStyle = StyleSheet.create({
  settings: {
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
  },
  tittle: {
    fontSize: 22,
    color: '#04444F',
    fontFamily: 'PoppinsSemi',
  },
  subtittle: {
    color: '#04444F',
    fontSize: 17,
    fontFamily: 'PoppinsRegular',
  },
  btnlogOut: {
    padding: 16,
    width: '80%',
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 20,
  },
  textLogout: {
    color: '#026cd2',
    fontSize: 18,
    fontFamily: 'PoppinsSemi',
    marginLeft: 10,
  },
  cardButton: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#04444F',
    width: 300,
    height: 120,
    marginTop: 10,
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
  },
  card1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerCard: {
    width: 330,
    height: 150,
  },
  txtCard: {
    color: 'white',
    fontFamily: 'PoppinsSemi',
  },
  txtCard2: {
    color: 'white',
    marginVertical: 10,
    fontFamily: 'PoppinsRegular',
  },
  settingButton: {
    width: 300,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 15,
    marginTop: 10,
    justifyContent: 'space-between',
  },
  containerFaqAndTerms: {
    width: 300,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 15,
    marginTop: 10,
  },
  FaqAndTerms: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingLeft: 10,
    marginHorizontal: 30,
  },

  // ACCORDION_LIST
  bodyBackground: {
    backgroundColor: '#EFEFEF',
    overflow: 'hidden',
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingLeft: 10,
    marginHorizontal: 30,
  },
  bodyContainer: {
    padding: 10,
    paddingLeft: 10,
    bottom: 0,
    position: 'absolute',
  },
  styleTextTitle: {
    color: '#04444f',
    fontSize: 15,
    fontFamily: 'PoppinsRegular',
  },
  Languages: {
    color: '#04444f',
    fontFamily: 'PoppinsRegular',
    marginVertical: 5,
    marginHorizontal: 8,
  },
  itemsAccordion: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
