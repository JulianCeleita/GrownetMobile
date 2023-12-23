import { create } from 'zustand'

const useRecordStore = create((set) => ({
  allOrders: [],
  selectedOrder: null,
  detailsToShow: {},
  selectedProduct: null,
  setAllOrders: (allOrders) => set({ allOrders: allOrders }),
  setSelectedOrder: (selectedOrder) => set({ selectedOrder: selectedOrder }),
  setDetailsToShow: (detailsToShow) => set({ detailsToShow: detailsToShow }),
  setSelectedProduct: (selectedProduct) => set({ selectedProduct: selectedProduct })
}));
export default useRecordStore
