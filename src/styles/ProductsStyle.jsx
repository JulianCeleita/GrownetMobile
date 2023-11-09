import { StyleSheet } from 'react-native'

export const ProductsStyle = StyleSheet.create({
  products: {
    flex: 1,
    position: 'relative',
  },
  viewCategories: {
    position: 'absolute',
    bottom: 10,
    zIndex: 1,
  },
  // MAKE YOUR ORDER

  // SEARCH BAR
  containerSearch: {
    flexDirection: 'row',
    marginHorizontal: 30,
    height: 50,
  },

  BgInput: {
    flex: 1,
    borderRadius: 51,
    paddingLeft: 20,
    fontSize: 20,
    backgroundColor: '#f2f2f2',
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
    height: 'auto',
    width: '85%',
    padding: 18,
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
    textAlign: 'center',
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
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'transparent',
    fontSize: 25,
    color: '#62c471',
    fontFamily: 'PoppinsSemi',
    marginLeft: 4,
  },
  countSelect: {
    fontSize: 16,
    color: '#04444f',
    fontFamily: 'PoppinsMedium',
    marginLeft: 6,
  },
  button2: {
    backgroundColor: 'transparent',
    fontSize: 25,
    color: '#62c471',
    fontFamily: 'PoppinsSemi',
    textAlign: 'center',
    marginRight: 4,
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
    fontSize: 16,
    width: 120,
    fontFamily: 'PoppinsMedium',
  },
  textName1: {
    color: '#868686',
    fontSize: 14,
    fontFamily: 'PoppinsRegular',
  },
  textPrice: {
    color: '#026cd2',
    fontFamily: 'PoppinsMedium',
    fontSize: 16,
  },

  containerCards: { flex: 1, marginTop: 10 },
  // PRODUCT CATEGORIES
  fixedContainer: {
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
  },
  contenImage: {
    justifyContent: 'center',
    backgroundColor: 'white',
    width: 100,
    height: 100,
    borderRadius: 25,
    margin: 10,
    alignItems: 'center',
    shadowColor: '#144D56',
    elevation: 4,
  },
  text: { color: '#04444f', textAlign: 'center', fontFamily: 'PoppinsSemi' },
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
    marginBottom: 8,
    marginTop: 5,
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
