import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

type Todo = {
  _id: number;
  userId: number;
  text: string;
  completed: boolean;
  loading?: boolean;
};

type TodoState = {
  todos: Todo[];
  error: string | null | unknown;
  loading: boolean;
};

const initialState: TodoState = {
  todos: [],
  error: null,
  loading: false,
};
export const addTodo = createAsyncThunk<{ rejectValue: string }>(
  "todos/addTodo",
  async (data, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3001/addTodo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: data }),
      });

      const addTodoBack = await res.json();
      return thunkAPI.fulfillWithValue(addTodoBack);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchTodo = createAsyncThunk<
  Todo[],
  void,
  { rejectValue: string }
>("todos/fetchTodo", async (_, thunkAPI) => {
  try {
    const res = await fetch("http://localhost:3001/getTodo");
    const todo = await res.json();
    return thunkAPI.fulfillWithValue(todo);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const removeTodo = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("todos/removeTodo", async (id, thunkAPI) => {
  try {
    const res = await fetch(`http://localhost:3001/deleteTodo/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      return id;
    }
    const deleteTodoBack = await res.json();
    return thunkAPI.rejectWithValue(deleteTodoBack);
  } catch (error) {
    res.json(error);
  }
});

export const changeTodo = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("todos/changeTodo", async ({ id, completed }, thunkAPI) => {
  try {
    console.log(completed);
    
    const res = await fetch(`http://localhost:3001/changeTodo/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ completed: !completed }),
      headers: {
        'Content-type': 'application/json'
      }
    });
    const changeRes = await res.json();
    return thunkAPI.fulfillWithValue(changeRes);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const todosSlice = createSlice({
  name: "Todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodo.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.todos = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(
        fetchTodo.rejected,
        (state, action: PayloadAction<string | unknown>) => {
          state.error = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeTodo.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.error = null;
        state.todos = state.todos.filter((todo) => todo._id !== action.payload);
      })
      .addCase(
        removeTodo.rejected,
        (state, action: PayloadAction<string | unknown>) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addCase(removeTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.todos.push(action.payload);
      })

      .addCase(changeTodo.fulfilled, (state, action: PayloadAction<number>) => {
        console.log(action.payload);
        
        state.loading = false;
        state.error = null;
        state.todos = state.todos.map((todo) => {
          if (todo._id === action.payload._id) {
            todo.completed = !todo.completed;
          }
          return todo;
        });
      })
      .addCase(
        changeTodo.rejected,
        (state, action: PayloadAction<string | unknown>) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addCase(changeTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
  },
});

export default todosSlice.reducer;
