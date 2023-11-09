import { create } from 'zustand'

const useRecordStore = create((set) => ({
  pendingOrders: [],
  selectedPendingOrder: null,
  setPendingOrders: (pendingOrders) => set({ pendingOrders: pendingOrders }),
  setSelectedPendingOrder: (selectedPendingOrder) =>
    set({ selectedPendingOrder: selectedPendingOrder }),
}))

export default useRecordStore
