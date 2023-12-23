import { create } from 'zustand'

const useRecordStore = create((set) => ({
  allOrders: [],
  selectedClosedOrder: null,
  selectedPendingOrder: null,
  detailsToShow: {},
  selectedProduct: null,
  setAllOrders: (allOrders) => set({ allOrders: allOrders }),
  setSelectedPendingOrder: (selectedPendingOrder) => set({ selectedPendingOrder: selectedPendingOrder }),
  setSelectedClosedOrder: (selectedClosedOrder) => set({ selectedClosedOrder: selectedClosedOrder }),
  setDetailsToShow: (detailsToShow) => set({ detailsToShow: detailsToShow }),
  setSelectedProduct: (selectedProduct) => set({ selectedProduct: selectedProduct })
}));
export default useRecordStore
