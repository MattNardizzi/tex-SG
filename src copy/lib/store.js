import { create } from 'zustand';

const usePanelStore = create((set) => ({
  panelData: {},

  updatePanelData: (channel, data) =>
    set((state) => ({
      panelData: {
        ...state.panelData,
        [channel]: data,
      },
    })),
}));

export default usePanelStore;
