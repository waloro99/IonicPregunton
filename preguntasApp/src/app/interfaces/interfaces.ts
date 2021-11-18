export interface ContenidoPreguntas {
  response_code: number;
  results: Preguntas[];
}

export interface Preguntas {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface Usuarios{
    nombre: string;
    usuario: string;
    respuestas: number;
    tiempo: number;
    categoria: string;
}