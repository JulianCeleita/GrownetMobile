import { StyleSheet } from 'react-native'

export const OrderSuccessfulStyle = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  image: {
    width: 307,
    height: 359,
  },
  containerImage: {
    alignItems: 'center',
  },
  tittleSuccessful: {
    color: '#026cd2',
    fontSize: 30,
    fontFamily: 'PoppinsBold',
    marginTop: 8,
  },
  textSuccessful: {
    color: '#04444f',
    fontSize: 17,
    fontFamily: 'PoppinsRegular',
    marginBottom: 10,
  },
  containerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  spaceBttn: {
    marginHorizontal: 4,
  },
})
