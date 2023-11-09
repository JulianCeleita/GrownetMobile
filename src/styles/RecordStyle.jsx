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
  filter: {
    backgroundColor: '#f2f2f2',
    flexDirection: 'row',
    width: 340,
    paddingVertical: 10,
    borderRadius: 51,
    paddingHorizontal: 20,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
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
  textFilter: {
    fontSize: 14,
    fontFamily: 'PoppinsMedium',
    color: '#04444F',
  },
  /* No orders*/
  recordZero: {
    flex: 1,
    alignItems: 'center',
    marginTop: '20%',
  },
  textZero: {
    fontFamily: 'PoppinsRegular',
    fontSize: 18,
    marginBottom: 10,
  },
  /* Date no-found*/
  dateZero: {
    paddingTop: '35%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textDateZero: {
    fontSize: 18,
    fontFamily: 'PoppinsRegular',
    color: '#04444F',
    marginTop: 15,
  },
  textDateFilter: {
    fontSize: 18,
    fontFamily: 'PoppinsSemi',
    color: '#026CD2',
  },
  btnCloseFilter: {
    flexDirection: 'row',
  },
})
