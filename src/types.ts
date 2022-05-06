export interface ToDo {
   id: number;
   text: string;
   completed: boolean;
   isEdit: boolean;
}

export interface Note {
   title: string;
   todos: Array<ToDo>;
   id: number;
}
