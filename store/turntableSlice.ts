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
  list: [
    {
      id: "default-1",
      name: "今天吃什么",
      options: [
        { id: "opt-1", text: "米饭" },
        { id: "opt-2", text: "面条" },
        { id: "opt-3", text: "火锅" },
        { id: "opt-4", text: "烧烤" },
        { id: "opt-5", text: "沙拉" },
        { id: "opt-6", text: "快餐" },
      ],
    },
  ],
  selectedId: "default-1",
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
