import { StyleSheet } from 'react-native'

export const GlobalStyles = StyleSheet.create({
  boxShadow: {
    shadowColor: '#3B3B3B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 9,
    elevation: 3,
  },
  btnPrimary: {
    backgroundColor: '#026cd2',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 30,
    margin: 0.5,
    alignItems: 'center',
  },
  btnSecundary: {
    backgroundColor: '#04444F',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 30,
    margin: 0.5,
    alignItems: 'center',
  },
  textBtnSecundary: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'PoppinsSemi',
  },
  btnWhite: {
    backgroundColor: 'white',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 30,
    marginVertical: 16,
    alignItems: 'center',
  },
  textBtnW: {
    color: '#04444F',
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'PoppinsSemi',
  },
  btnOutline: {
    backgroundColor: 'white',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 30,
    margin: 0.5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#026cd2',
  },
  textBtnOutline: {
    color: '#026cd2',
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'PoppinsSemi',
  },
  cardSuppliers: {
    backgroundColor: '#1D446A',
    fontWeight: '500',
  },
  container: {
    flex: 1,
    backgroundColor: '#026CD2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkWhite: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
    paddingVertical: 50,
    fontFamily: 'PoppinsRegular',
  },
  p: {
    color: 'white',
    fontSize: 16,
    marginBottom: 25,
    fontFamily: 'PoppinsRegular',
  },
  cardInvoces: {
    backgroundColor: '#E9F4FF',
    padding: 25,
    borderRadius: 20,
    width: 330,
  },
})

export const ProductsStyles = StyleSheet.create({
  // MAKE YOUR ORDER

  // SEARCH BAR
  containerSearch: {
    flexDirection: 'row',
    marginHorizontal: 30,
    height: 50,
  },

  BgInput: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 51,
    paddingLeft: 20,
    fontSize: 20,
  },
  iconSearch: {
    position: 'absolute',
    right: 30,
    top: 15,
  },
  // PRODUCT CARD
  container: {
    backgroundColor: 'white',
    marginVertical: 10,
    flexDirection: 'row',
    borderRadius: 20,
    height: 175,
    width: '85%',
  },
  containerImage: {
    width: '40%',
    height: '100%',
  },
  ImageCardProduct: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  containName: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  count: {
    flexDirection: 'row',
    borderWidth: 1.5,
    borderColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginRight: 5,
    width: 80,
    height: 45,
    borderRadius: 51,
  },
  countOrderD: {
    flexDirection: 'row',
    borderWidth: 1.5,
    borderColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginRight: 5,
    width: 100,
    height: 45,
    borderRadius: 51,
  },
  button: {
    backgroundColor: 'transparent',
    width: 20,
    fontSize: 25,
    color: '#62c471',
    fontWeight: 'bold',
  },
  countSelect: {
    fontSize: 20,
    color: '#04444f',
    marginLeft: 3,
  },
  button2: {
    backgroundColor: 'transparent',
    width: 20,
    fontSize: 25,
    color: '#62c471',
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 5,
  },
  containerSelect: {
    flexDirection: 'row',
    marginTop: 10,
    marginRight: 10,
  },
  containerDrop: {
    width: 80,
  },
  textName: {
    color: '#04444f',
    fontWeight: 'bold',
    fontSize: 15,
    width: 120,
  },
  textName1: {
    color: '#868686',
    fontSize: 12,
  },
  textPrice: {
    color: '#0d6efd',
    fontWeight: 'bold',
  },

  containerCards: { flex: 1, marginTop: 10 },
  // PRODUCT CATEGORIES
  contenImage: {
    justifyContent: 'center',
    backgroundColor: 'white',
    width: 120,
    height: 120,
    borderRadius: 25,
    margin: 10,
    alignItems: 'center',
    shadowColor: '#144D56',
    elevation: 4,
  },
  text: { color: '#04444f', textAlign: 'center', fontWeight: 'bold' },
  bgContinue: {
    alignItems: 'center',
    backgroundColor: '#026cd2',
    paddingHorizontal: 35,
    paddingVertical: 12,
    borderRadius: 30,
    marginTop: 20,
    width: '50%',
  },
  ContinueText: {
    color: '#ffff',
    fontWeight: 'bold',
  },
  containerButton: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  // PRODUCT DETAIL

  containerDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containSelect: {
    backgroundColor: 'white',
    borderRadius: 51,
    marginRight: 5,
    width: 100,
    height: 45,
  },

  textOrder: {
    color: '#04444f',
    fontSize: 20,
    marginBottom: 5,
  },
  rowPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 90,
  },
})
