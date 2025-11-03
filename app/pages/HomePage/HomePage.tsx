import Link from "next/link";

import { Header } from "@/widgets/Header";
import { TodoList } from "@/widgets/TodoList";
import { Button } from "@/shared/ui";

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="FSD 패턴 예제" />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex gap-4">
          <Link href="/users">
            <Button variant="outline">사용자 목록 보기 (API 예제)</Button>
          </Link>
        </div>
        <TodoList />
      </main>
    </div>
  );
};
