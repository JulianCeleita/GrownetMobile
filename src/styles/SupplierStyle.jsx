import { StyleSheet } from 'react-native'

export const SuppliersStyle = StyleSheet.create({
  suppliers: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 16,
  },

  suppliersBg: {
    width: 350,
    height: 150,
    marginVertical: 10,
    borderRadius: 21,
    marginBottom: 10,
  },
  buttonAddCont: {
    marginTop: 10,
    backgroundColor: '#026cd2',
    paddingHorizontal: 10,
    borderRadius: 50,
    width: '80%',
  },
  containButtonAdd: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textAddRestaurant: {
    fontFamily: 'PoppinsSemi',
    fontSize: 15,
    color: '#ffff',
    paddingRight: 10,
    textAlign: 'center',
  },
})
