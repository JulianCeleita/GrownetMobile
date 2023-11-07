import { StyleSheet } from 'react-native'

export const SearchStyle = StyleSheet.create({
  containerSearch: {
    flexDirection: 'row',
    marginHorizontal: 30,
    backgroundColor: '#f2f2f2',
    borderRadius: 51,
    marginBottom: 15,
  },

  BgInput: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    color: '#04444F',
    paddingLeft: 20,
    fontSize: 15,
    fontFamily: 'PoppinsRegular',
    borderRadius: 51,
    borderTopLeftRadius: 51,
    borderTopRightRadius: 51,
    borderWidth: 0,
  },
  iconSearch: {
    position: 'absolute',
    right: 30,
    top: 15,
  },
  placeholderText: {
    fontFamily: 'PoppinsRegular',
    color: '#04444F',
  },
})
