namespace TODO {
	type GetResponse = Todo[];
	type GetRequest = void;

	type PostResponse = Todo[];
	type PostRequest = Todo;

	type DeleteResponse = Todo[];
	type DeleteRequest = number;
}
