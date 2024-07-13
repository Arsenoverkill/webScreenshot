'use client';
import { useDeleteTodoMutation, useGetTodosQuery } from '@/redux/api/todo';
import scss from './TodoList.module.scss';
import Image from 'next/image';

const TodoList = () => {
	const { data } = useGetTodosQuery();
	const [deleteTodoMutation] = useDeleteTodoMutation();
	async function deletImage(id: number) {
		deleteTodoMutation(id);

		alert('Фото успешно удалено ✅');
	}
	return (
		<section className={scss.TodoList}>
			<div className="container">
				<div className={scss.content}>
					<h3>TodoList</h3>
					<div className={scss.items}>
						{data?.map((item) => (
							<div key={item._id} className={scss.item}>
								<h1>{item.title}</h1>
								<Image
									width={500}
									height={300}
									src={item.img}
									alt={item.title}
								/>
								<button onClick={() => deletImage(item._id!)}>Delete</button>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default TodoList;
