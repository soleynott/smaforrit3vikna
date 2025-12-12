import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
	paddingTop: 15,
  },

  body: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },

  form: {
    flex: 1,
  },
  formContent: {
    paddingBottom: 8,
  },

  field: {
    marginBottom: 14,
  },

  label: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 14,
    backgroundColor: '#f5f5f5',
  },

  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  marginLeft: {
    marginLeft: 8,
  },
  multiline: {
    minHeight: 60,
    textAlignVertical: 'top',
  },

  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#f7f7f7',
    marginVertical: 4,
  },
  checkboxLabel: {
    marginLeft: 12,
    fontSize: 15,
    color: '#222',
  },

  actions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  buttonClear: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  buttonClearText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  buttonApply: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#4a90e2',
    alignItems: 'center',
  },
  buttonApplyText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },

  column: {
    flexDirection: 'column',
  },
  flex1: {
    flex: 1,
  },
});

export default styles;