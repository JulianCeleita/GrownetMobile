import { StyleSheet } from 'react-native'

export const PastStyle = StyleSheet.create({
  past: {
    backgroundColor: 'white',
    alignItems: 'center',
    marginBottom: 20,
    height: '100%',
  },
  tittle: {
    fontFamily: 'PoppinsSemi',
    fontSize: 20,
    borderBottomColor: '#04444F',
    borderBottomWidth: 1,
    borderStyle: 'dashed',
  },
  products: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  subtittle: {
    fontFamily: 'PoppinsMedium',
    fontSize: 18,
  },
  p: {
    fontFamily: 'PoppinsRegular',
    fontSize: 18,
    color: '#868686',
    marginTop: -1,
  },
  total: {
    backgroundColor: '#bbfacf',
    padding: 10,
    borderRadius: 15,
  },
  textTotal: {
    fontFamily: 'PoppinsSemi',
    fontSize: 18,
  },
})
