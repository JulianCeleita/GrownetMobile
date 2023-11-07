import { StyleSheet } from 'react-native'

export const DeleteModalStyle = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  modalView: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTittle: {
    marginBottom: 5,
    marginTop: 5,
    textAlign: 'center',
    fontSize: 22,
    fontFamily: 'PoppinsSemi',
    color: '#04444f',
  },
  modalText: {
    fontSize: 15,
    fontFamily: 'PoppinsRegular',
    color: '#04444f',
  },
  viewButtons: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 10,
  },
  spaceButton: {
    marginRight: 10,
  },
  textProduct: {
    color: '#ee6055',
    fontFamily: 'PoppinsSemi',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo negro semitransparente
    justifyContent: 'center',
  },
})
