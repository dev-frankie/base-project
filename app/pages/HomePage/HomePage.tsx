import { Header } from '@/widgets/Header';
import { TodoList } from '@/widgets/TodoList';

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="FSD 패턴 예제" />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TodoList />
      </main>
    </div>
  );
};

