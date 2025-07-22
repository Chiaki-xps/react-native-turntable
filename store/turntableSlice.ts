import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

export interface TurntableOption {
  id: string;
  text: string;
}

export interface Turntable {
  id: string;
  name: string;
  options: TurntableOption[];
}

interface TurntableState {
  list: Turntable[];
  selectedId?: string;
}

const initialState: TurntableState = {
  list: [],
  selectedId: undefined,
};

const turntableSlice = createSlice({
  name: "turntable",
  initialState,
  reducers: {
    addTurntable: (
      state,
      action: PayloadAction<{ name: string; options: TurntableOption[] }>
    ) => {
      state.list.push({
        id: nanoid(),
        name: action.payload.name,
        options: action.payload.options,
      });
    },
    removeTurntable: (state, action: PayloadAction<{ id: string }>) => {
      state.list = state.list.filter((t) => t.id !== action.payload.id);
    },
    addOption: (
      state,
      action: PayloadAction<{ turntableId: string; text: string }>
    ) => {
      const t = state.list.find((t) => t.id === action.payload.turntableId);
      if (t) {
        t.options.push({ id: nanoid(), text: action.payload.text });
      }
    },
    removeOption: (
      state,
      action: PayloadAction<{ turntableId: string; optionId: string }>
    ) => {
      const t = state.list.find((t) => t.id === action.payload.turntableId);
      if (t) {
        t.options = t.options.filter((o) => o.id !== action.payload.optionId);
      }
    },
    setSelectedTurntable: (state, action: PayloadAction<string>) => {
      state.selectedId = action.payload;
    },
  },
});

export const {
  addTurntable,
  removeTurntable,
  addOption,
  removeOption,
  setSelectedTurntable,
} = turntableSlice.actions;
export default turntableSlice.reducer;
