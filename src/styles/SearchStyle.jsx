import { StyleSheet } from 'react-native'

export const SearchStyle = StyleSheet.create({
  search: {
    backgroundColor: 'white',
    height: '100%',
  },
  topSearch: {
    backgroundColor: '#04444F',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  containerSearch: {
    flexDirection: 'row',
    marginHorizontal: 20,
    height: 50,
    marginTop: Platform.OS === 'ios' ? 25 : null,
    marginTop: 60,
    marginBottom: 30,
  },

  BgInput: {
    flex: 1,
    borderRadius: 51,
    paddingLeft: 20,
    fontSize: 16,
    color: '#04444f',
    fontFamily: 'PoppinsRegular',
    backgroundColor: 'white',
    shadowColor: '#3B3B3B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 9,
    elevation: 3,
  },
  iconSearch: {
    position: 'absolute',
    right: 20,
    top: 15,
  },
  placeholderText: {
    fontFamily: 'PoppinsRegular',
    color: '#04444F',
  },
  suggestion: {
    marginHorizontal: 20,
  },
  tittle: {
    fontFamily: 'PoppinsSemi',
    fontSize: 18,
    marginTop: 20,
  },
  name: {
    padding: 5,
    backgroundColor: '#B2FBC6',
    width: 'auto',
  },
  image: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '75%',
  },
  text: {
    fontFamily: 'PoppinsRegular',
    fontSize: 15,
    color: '#969696',
  },
})
