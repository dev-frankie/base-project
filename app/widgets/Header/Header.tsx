import { Button } from '@/shared/ui';

export interface HeaderProps {
  title?: string;
  onLoginClick?: () => void;
}

export const Header = ({ title = 'My App', onLoginClick }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-xl font-bold text-gray-900">{title}</h1>
          {onLoginClick && (
            <Button variant="outline" size="sm" onClick={onLoginClick}>
              로그인
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

