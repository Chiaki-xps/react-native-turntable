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
    addTurntable: (state, action: PayloadAction<Omit<Turntable, "id">>) => {
      const newTurntable: Turntable = {
        ...action.payload,
        id: Math.random().toString(36).slice(2),
      };
      state.list.push(newTurntable);
      state.selectedId = newTurntable.id;
    },
    importTurntable: (state, action: PayloadAction<Omit<Turntable, "id">>) => {
      let { name } = action.payload;
      let counter = 1;

      // 检查是否存在重名转盘，如果存在则添加序号
      while (state.list.some((t) => t.name === name)) {
        name = `${action.payload.name} (${counter})`;
        counter++;
      }

      const newTurntable: Turntable = {
        ...action.payload,
        name,
        id: Math.random().toString(36).slice(2),
      };
      state.list.push(newTurntable);
      state.selectedId = newTurntable.id;
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
    deleteTurntable: (state, action: PayloadAction<string>) => {
      const deleteId = action.payload;
      state.list = state.list.filter((turntable) => turntable.id !== deleteId);
      // 如果删除的是当前选中的转盘，则选中第一个转盘
      if (state.selectedId === deleteId) {
        state.selectedId = state.list.length > 0 ? state.list[0].id : undefined;
      }
    },
  },
});

export const {
  addTurntable,
  importTurntable,
  addOption,
  removeOption,
  setSelectedTurntable,
  deleteTurntable,
} = turntableSlice.actions;
export default turntableSlice.reducer;
