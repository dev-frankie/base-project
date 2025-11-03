'use client';

import { useState } from 'react';
import { Button, Input } from '@/shared/ui';
import { useTodoStore } from '../../model/store';

export const CreateTodoForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTodo({ title: title.trim(), description: description.trim() || undefined });
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="할 일을 입력하세요"
        required
      />
      <Input
        label="설명 (선택)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="설명을 입력하세요"
      />
      <Button type="submit" variant="primary">
        추가하기
      </Button>
    </form>
  );
};

