import { create } from 'zustand';

function getTimeString() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export const useStore = create((set) => ({
  // Text processing state
  textData: {
    text: '',
    operation: 'summarize',
  },
  loading: {
    text: false,
  },

  // Statistics state
  stats: {
    totalGenerations: 0,
    successfulGenerations: 0,
  },

  // Recent activity state
  recentActivity: [],

  // Actions
  setTextData: (data) => set({ textData: data }),
  setLoading: (key, value) => set((state) => ({
    loading: { ...state.loading, [key]: value }
  })),
  
  // Statistics actions
  incrementTotalGenerations: () => set((state) => ({
    stats: {
      ...state.stats,
      totalGenerations: state.stats.totalGenerations + 1
    }
  })),
  incrementSuccessfulGenerations: () => set((state) => ({
    stats: {
      ...state.stats,
      successfulGenerations: state.stats.successfulGenerations + 1
    }
  })),

  // Recent activity actions
  addActivity: (activity) => set((state) => ({
    recentActivity: [
      { ...activity, id: Date.now(), time: getTimeString() },
      ...state.recentActivity
    ].slice(0, 10) // keep only last 10
  })),
})); 