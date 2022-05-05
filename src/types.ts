export interface ToDo {
   text: string;
   completed: boolean;
}

export interface Note {
   title: string;
   todos: Array<ToDo>;
   id: number;
}
