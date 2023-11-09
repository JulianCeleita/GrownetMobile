import { Platform, StyleSheet } from 'react-native'

export const LoginStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#026CD2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tinyLogo2: {
    width: 240,
    height: 196,
    marginBottom: 30,
  },
  inputCountry: {
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: 30,
  },
})
export const OtpStyle = StyleSheet.create({
  containerOtpPage: {
    flex: 1,
    backgroundColor: '#026CD2',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  tinyLogoOtp: {
    width: 200,
    height: 200,
  },
  textTittle: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 15,
    marginTop: 30,
    marginBottom: 20,
    fontFamily: 'PoppinsSemi',
  },
  textP: {
    color: 'white',
    fontFamily: 'PoppinsRegular',
    fontSize: 13,
  },
  containerOTP: {
    backgroundColor: '#026CD2',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 100,
    marginBottom: 20,
  },
  textInputView: {
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
    textAlign: 'center',
    justifyContent: 'center',
    width: 55,
    height: 60,
    marginHorizontal: 12,
  },
  textInput: {
    color: '#04444F',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'PoppinsSemi',
  },
  ContainerdidntCode: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  sendCode: {
    color: '#85FE9D',
    fontWeight: '600',
    marginLeft: 5,
    fontFamily: 'PoppinsSemi',
  },
})
export const CarouselStyle = StyleSheet.create({
  slide: {
    marginTop: '30%',
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
  },
  containerButtton: {
    marginBottom:
      Platform.OS === 'android' || Platform.OS === 'ios' ? '20%' : '40%',
  },
  paginatioCarousel: {
    marginBottom: 33,
  },
})
export const ModalStyle = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
  },
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
  modalTextTitle: {
    fontFamily: 'PoppinsSemi',
    fontSize: 25,
    color: '#04444f',
  },
  modalText: {
    fontFamily: 'PoppinsRegular',
    color: '#04444f',
    fontSize: 15,
  },
  modalText2: {
    fontFamily: 'PoppinsSemi',
    color: '#026CD2',
    fontSize: 15,
    marginBottom: 5,
  },
  TextChange: {
    fontFamily: 'PoppinsRegular',
    color: '#026CD2',
    marginTop: 10,
  },
  TextChange2: {
    fontFamily: 'PoppinsRegular',
    color: 'white',
    marginTop: 10,
    textAlign: 'center',
    paddingVertical: 3,
    marginBottom: 6,
  },
  bgInt: {
    backgroundColor: '#026CD2',
    borderRadius: 51,
    width: '50%',
  },
  space: {},
})
