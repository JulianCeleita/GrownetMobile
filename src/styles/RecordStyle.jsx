import { StyleSheet } from 'react-native'

export const RecordStyle = StyleSheet.create({
  record: {
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    height: '100%',
  },
  cardRecord: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 350,
    borderRadius: 15,
    padding: 10,
    margin: 1,
    marginBottom: 20,
  },
  tittle: {
    fontSize: 18,
    color: '#04444F',
    fontFamily: 'PoppinsSemi',
  },
  text: {
    fontSize: 15,
    color: '#04444F',
    fontFamily: 'PoppinsRegular',
    marginBottom: 8,
  },
  btnPrimary: {
    backgroundColor: '#026cd2',
    paddingHorizontal: 25,
    paddingVertical: 5,
    borderRadius: 30,
    margin: 0.5,
    alignItems: 'center',
  },
  textCard: {
    alignItems: 'center',
  },
  /* Tab*/
  tabContainer: {
    flexDirection: 'row',
    margin: 15,
    borderRadius: 15,
    marginTop: 0,
    backgroundColor: 'white',
  },
  btnTab: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 15,
  },
  /* input*/
  input: {
    flexDirection: 'row',
    width: 320,
    paddingVertical: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 51,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginLeft: 12,
  },
  BgInput: {
    width: 200,
    fontSize: 15,
    fontFamily: 'PoppinsRegular',
    marginLeft: 10,
  },
})
