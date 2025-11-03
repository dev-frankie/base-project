import { Header } from "@/widgets/Header";
import { UserList } from "@/widgets/UserList";

export const UsersPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="사용자 목록" />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <UserList />
      </main>
    </div>
  );
};
