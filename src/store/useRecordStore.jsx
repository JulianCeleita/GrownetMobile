import { create } from 'zustand'

const useRecordStore = create((set) => ({
  pendingOrders: [],
  closedOrders: [],
  selectedClosedOrder: null,
  selectedPendingOrder: null,
  detailsToShow: {},
  selectedProduct: null,
  setPendingOrders: (pendingOrders) => set({ pendingOrders: pendingOrders }),
  setClosedOrders: (closedOrders) => set({ closedOrders: closedOrders }),
  setSelectedPendingOrder: (selectedPendingOrder) => set({ selectedPendingOrder: selectedPendingOrder }),
  setSelectedClosedOrder: (selectedClosedOrder) => set({ selectedClosedOrder: selectedClosedOrder }),
  setDetailsToShow: (detailsToShow) => set({ detailsToShow: detailsToShow }),
  setSelectedProduct: (selectedProduct) => set({ selectedProduct: selectedProduct })
}));
export default useRecordStore
