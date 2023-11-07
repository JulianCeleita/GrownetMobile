import { StyleSheet } from 'react-native'

export const OrderDetailStyle = StyleSheet.create({
  details: {
    backgroundColor: 'white',
    height: '100%',
  },
  containerDetails: {
    width: 350,
    backgroundColor: '#e9f4ff',
    padding: 24,
    borderRadius: 20,
  },
  tittle: {
    fontFamily: 'PoppinsSemi',
    fontSize: 20,
    borderBottomColor: '#04444F',
    borderBottomWidth: 1,
    borderStyle: 'dashed',
  },
  text: {
    fontSize: 18,
    fontFamily: 'PoppinsMedium',
    color: '#04444f',
  },
  currentText: {
    fontSize: 18,
    fontFamily: 'PoppinsSemi',
    color: '#04444f',
  },
  cardProduct: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTotal: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 0,
    paddingTop: 0,
  },
  textProductView: {
    fontSize: 18,
    fontFamily: 'PoppinsMedium',
    color: '#04444f',
    width: '65%',
  },
  textSecondProductView: {
    fontSize: 18,
    fontFamily: 'PoppinsMedium',
    color: '#04444f',
    width: '50%',
  },
  spaceButton: {
    marginBottom: 20,
    marginTop: 10,
  },
  productDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  totalDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#bbfacf',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    fontWeight: 'bold',
  },
  btnPrimary: {
    alignItems: 'center',
    backgroundColor: '#026cd2',
    paddingHorizontal: 35,
    paddingVertical: 12,
    borderRadius: 30,
    marginTop: 32,
  },
  Paymenttext: {
    color: '#04444f',
  },
  CurrentValuetext: {
    color: '#04444f',
    fontWeight: 'bold',
  },
  ContinueText: { color: '#ffff', fontWeight: 'bold' },
})
