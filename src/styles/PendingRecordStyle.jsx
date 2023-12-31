import { StyleSheet } from 'react-native'

export const PendingStyle = StyleSheet.create({
  receptionCard: {
    backgroundColor: 'white',
    alignItems: 'center',
    width: 350,
    borderRadius: 20,
    margin: 5,
    paddingBottom: 20,
  },
  title: {
    fontFamily: 'PoppinsSemi',
    fontSize: 20,
    color: '#04444f',
    marginVertical: 15,
  },
  cardProduct: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 17,
    fontFamily: 'PoppinsMedium',
    color: '#04444f',
  },
  p: {
    fontFamily: 'PoppinsRegular',
    fontSize: 17,
    color: '#A4A4A4',
  },
  dispute: {
    paddingLeft: 30,
    justifyContent: 'space-between',
    width: '50%',
  },
  disputeRight: {
    width: '50%',
    paddingRight: 20,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
})
export const DisputeStyle = StyleSheet.create({
  dispute: {
    alignItems: 'center',
    backgroundColor: 'white',
  },
  cardTittle: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    marginHorizontal: 65,
  },
  optionForm: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'PoppinsMedium',
    fontSize: 25,
    color: '#04444f',
  },
  quantity: {
    fontFamily: 'PoppinsRegular',
    fontSize: 15,
    color: '#04444f',
  },
  cardTabs: {
    width: 350,
    backgroundColor: 'white',
    borderRadius: 20,
    flexDirection: 'column',
    justifyContent: 'space-around',
    margin: 10,
    marginTop: 0,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    fontFamily: 'PoppinsMedium',
  },
  p: {
    fontFamily: 'PoppinsRegular',
    fontSize: 17,
    color: '#868686',
  },
  cardForm: {
    width: 350,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    paddingLeft: 25,
    textAlign: 'left',
    marginTop: 10,
  },
  input: {
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    width: 300,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'gray',
    marginLeft: 5,
    borderRadius: 15,
  },
  buttonUpload: {
    marginVertical: 25,
  },
  buttonSendEmail: {
    marginBottom: 25,
  },
  textBtnUpload: {
    color: '#04444F',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'PoppinsMedium',
  },
  space: {
    marginTop: 20,
  },
})
